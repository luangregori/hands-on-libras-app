import React, { memo, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image } from 'react-native';
import { ProgressBar, IconButton } from 'react-native-paper';
import { Navigation, Route } from '../types';
import { theme } from '../core/theme';
import { testChallengeApi } from '../services/challenges';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';

import { WebView } from 'react-native-webview';

type Props = {
  navigation: Navigation;
  route: Route;
};

interface TestQuestion {
  id: string;
  options: string;
  word: string;
}

let webViewRef;

const TestChallenge = ({ route, navigation }: Props) => {
  const [testQuestions, setTestQuestions] = useState([]);
  const [stepId, setStepId] = useState('0');
  const [options, setOptions] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lives, setLives] = useState(3);
  const { challengeId } = route.params;

  const _getQuestions = async () => {
    const infos = await testChallengeApi(challengeId);

    await setTestQuestions(infos);
    await setStepId(infos[0].id);
    await setOptions(infos[0].options);
  };

  const _nextStep = async (answer: string) => {
    const stepIndex = getStepIndex()

    const step = testQuestions[stepIndex];
    if (step.word !== answer) {
      await setLives(lives - 1);
    }
    if (lives - 1 === 0) {
      setCompleted(true);
      return
    }
    
    if (stepIndex < testQuestions.length - 1) {
      const nextStep = testQuestions[stepIndex + 1]
      await setStepId(nextStep.id);
      await setOptions(nextStep.options);
      playWord(nextStep.word);
      setProgress(progress + _splitRatio());
    } else {
      await setCompleted(true);
    }
  };

  const _splitRatio = () => {
    return 1 / testQuestions.length;
  };

  const getStepIndex = (): number => {
    return testQuestions.findIndex(val => val.id === stepId)
  }

  const playWord = (word: string) => {
    webViewRef.injectJavaScript(`window.player.play('${word}')`);
  }

  useEffect(() => {
    _getQuestions();
  }, []);

  if (!completed) {
    return (
      <SafeAreaView style={styles.container}>

        <StatusBar backgroundColor={theme.colors.backdrop} />

        <View style={styles.progress}>
          <ProgressBar progress={progress} style={styles.progressBar} />
          <Text style={styles.lives}>{lives}</Text>
          <IconButton style={{ margin: -17 }} size={30} icon="heart" color={theme.colors.error} />
        </View>

        <View style={styles.avatar}>
          <WebView
            style={{ marginLeft: "-50%" }}
            width={'200%'}
            onMessage={(event) => {
              if (event.nativeEvent.data === "PLAYER_LOADED") {
                playWord(testQuestions.find(val => val.id === stepId)?.word)
              }
            }}
            ref={(ref) => webViewRef = ref}
            source={{ uri: 'https://hands-on-libras.web.app/' }}
          />
        </View>

        <View style={styles.description}>
          <Paragraph>
            Qual palavra o Avatar está demonstrando?
          </Paragraph>
        </View>

        <View style={styles.buttons}>
          {options.map((question: any) => (
            <Button
              key={question.id}
              mode="contained"
              onPress={() => { _nextStep(question) }}
            >
              {question}
            </Button>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.colors.backdrop} />
      <View style={styles.content}>
        <Image style={styles.image} source={require('../assets/learn-completed-successfully.png')} />
        <Paragraph>
          Desafio concluído com sucesso!!
        </Paragraph>
        <Button mode="contained"
          onPress={() => {
            // TODO: complete test challenge
            // completeLearnApi(challengeId)
            navigation.navigate('StartChallenge', { challengeId })
          }}>
          Finalizar
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme.colors.background,
  },
  progress: {
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBar: {
    width: 300,
    height: 7,
  },
  lives: {
    marginTop: -11,
    color: theme.colors.error,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  avatar: {
    height: '50%',
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
  },
  description: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 14,
    justifyContent: 'center',
  },
  buttons: {
    marginTop: 10,
    marginHorizontal: '25%',
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
  },
});


export default memo(TestChallenge);
