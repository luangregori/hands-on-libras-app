import React, { memo, useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image } from 'react-native';
import { Navigation, Route } from '../types';
import { theme } from '../core/theme';
import { startChallengesApi } from '../services/challenges';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Paragraph from '../components/Paragraph';

type Props = {
  navigation: Navigation;
  route: Route;
};

const StartChallenge = ({ route, navigation }: Props) => {
  const [challengeInfo, setChallengeInfo] = useState({ name: '', description: '', image_url: ' ', categoryId: '', id: '' });
  const [userInfo, setUserInfo] = useState({ account: '', challengeId: '', status: ' ', id: '' });
  const { challengeId } = route.params;

  const _getChallengeInfo = async () => {
    const infos = await startChallengesApi(challengeId);

    if (infos) {
      setChallengeInfo(infos.challengeInfo)
      setUserInfo(infos.userInfo)
    }
  };

  useEffect(() => {
    _getChallengeInfo();

    const listener = navigation.addListener('focus', () => {
      _getChallengeInfo()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return listener;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor={theme.colors.backdrop} />

      <Image style={styles.image} source={{ uri: challengeInfo.image_url }} />

      <BackButton leftMargin={{ left: 15 }} goBack={() => navigation.navigate('Dashboard')} />

      <Text style={styles.title}>{challengeInfo.name}</Text>

      <View style={styles.description}>
        <Paragraph>
          {challengeInfo.description}
        </Paragraph>
      </View>

      <View style={styles.buttons}>
        <Button mode="contained"
          onPress={() => navigation.navigate('LearnChallenge', { challengeId })}>
          Aprender
        </Button>

        {userInfo.status !== 'started' ?
          <Button mode="contained"
            onPress={() => navigation.navigate('RegisterScreen')}>
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
    height: 300,
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
  buttons: {
    marginTop: 70,
    paddingHorizontal: 40,
  }
});


export default memo(StartChallenge);
