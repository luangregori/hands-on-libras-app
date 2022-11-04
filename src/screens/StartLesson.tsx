import React, { memo, useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image } from 'react-native';
import { Navigation, Route } from '../types';
import { theme } from '../core/theme';
import { startLessonApi } from '../services/lessons';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Paragraph from '../components/Paragraph';

type Props = {
  navigation: Navigation;
  route: Route;
};

const StartLesson = ({ route, navigation }: Props) => {
  const [lessonInfo, setLessonInfo] = useState({ name: '', description: '', image_url: ' ', categoryId: '', id: '' });
  const [userInfo, setUserInfo] = useState({ accountId: '', lessonId: '', status: ' ', id: '', score: '' });
  const { lessonId } = route.params;

  const _getChallengeInfo = async () => {
    const infos = await startLessonApi(lessonId);

    if (infos) {
      setLessonInfo(infos.lessonInfo)
      setUserInfo(infos.userInfo)
    }
  };

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      _getChallengeInfo()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return listener;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor={theme.colors.backdrop} />

      <Image style={styles.image} source={{ uri: lessonInfo.image_url }} />

      <BackButton leftMargin={{ left: 15 }} goBack={() => navigation.navigate('Dashboard')} />

      <Text style={styles.title}>{lessonInfo.name}</Text>

      <View style={styles.description}>
        <Paragraph>
          {lessonInfo.description}
        </Paragraph>
        {userInfo.score ? <Text style={styles.score}>Pontuação: {userInfo.score}</Text> : null}
      </View>

      <View style={styles.buttons}>
        <Button mode="contained"
          onPress={() => navigation.navigate('LearnLesson', { lessonId })}>
          Aprender
        </Button>

        {userInfo.status !== 'started' ?
          <Button mode="contained"
            onPress={() => navigation.navigate('ChallengeLesson', { lessonId })}>
            Desafio
          </Button> :
          <Button mode="outlined">
            Desafio
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
  image: {
    marginTop: -30,
    width: '100%',
    height: '40%',
  },
  title: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 20,
    alignSelf: 'center',
  },
  description: {
    marginTop: 20,
    marginHorizontal: 40,
  },
  score: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  buttons: {
    marginTop: 70,
    paddingHorizontal: 40,
  }
});


export default memo(StartLesson);
