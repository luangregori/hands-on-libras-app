import React, { memo, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image } from 'react-native';
import { Navigation, Route } from '../types';
import { theme } from '../core/theme';
import { startChallengesApi } from '../services/challenges';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Paragraph from '../components/Paragraph';

import { WebView } from 'react-native-webview';

type Props = {
  navigation: Navigation;
  route: Route;
};

interface LearningInfo {
  id: string;
  description: string;
  word: string;
}

let webViewRef;

const LearnChallenge = ({ route, navigation }: Props) => {
  const [learningInfo, setLearningInfo] = useState([]);
  const [stepId, setStepId] = useState('0');
  const { challengeId } = route.params;

  const _getLearningInfo = async () => {
    // const infos = await LearnChallengesApi(challengeId);

    const infos: Array<LearningInfo> = [
      { id: '0dfsdf', description: 'Aprendendo a palavra Olá', word: 'OLÁ' },
      { id: '1edfgdgd', description: 'Aprendendo a palavra Médico', word: 'Médico' },
      { id: '2fdsfsd', description: 'Aprendendo a palavra oi', word: 'oi' },
      { id: '3f433', description: 'Aprendendo a palavra beijo', word: 'beijo' },
      { id: '4gfdfgdf', description: 'Aprendendo a palavra dor', word: 'dor' },
    ]

    await setLearningInfo(infos);
    await setStepId(infos[0].id);
  };

  const _nextStep = async () => {
    const stepIndex = getStepIndex()
    const nextStep = learningInfo[stepIndex + 1]
    await setStepId(nextStep.id)
    playWord(nextStep.word);
  };

  const _hasNextStep = () => {
    const stepIndex = getStepIndex()
    return stepIndex < learningInfo.length - 1
  }

  const getStepIndex = (): number => {
    return learningInfo.findIndex(val => val.id === stepId)
  }

  const playWord = (word: string) => {
    webViewRef.injectJavaScript(`window.player.play('${word}')`);
  }

  useEffect(() => {
    _getLearningInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor={theme.colors.backdrop} />

      <BackButton goBack={() => navigation.navigate('Dashboard')} />

      <View style={styles.avatar}>
        <WebView
          style={{ marginLeft: "-50%" }}
          width={'200%'}
          onMessage={(event) => {
            if (event.nativeEvent.data === "PLAYER_LOADED") {
              playWord(learningInfo.find(val => val.id === stepId)?.word)
            }
          }}
          ref={(ref) => webViewRef = ref}
          source={{ uri: 'https://hands-on-libras.web.app/?cc=true' }}
        />
      </View>

      <View style={styles.description}>
        <Paragraph>
          {learningInfo.find(val => val.id === stepId)?.description}
        </Paragraph>
      </View>

      <View style={styles.buttons}>
        {_hasNextStep() ?
          <Button mode="contained" onPress={_nextStep}>
            Proximo
          </Button>
          :
          <Button mode="contained"
            //TODO: ir para tela lição aprendida com sucesso
            onPress={() => navigation.navigate('Dashboard')}>
            Finalizar
          </Button>
        }
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
  avatar: {
    height: '50%',
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
  },
  description: {
    height: '40%',
    marginHorizontal: 20,
    fontSize: 14,
    justifyContent: 'center',
    backgroundColor: 'cyan'
  },
  buttons: {
    marginTop: 10,
    marginHorizontal: 20,
    paddingLeft: '50%',
  }
});


export default memo(LearnChallenge);
