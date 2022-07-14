import React, { memo, useEffect, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { Navigation } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: Navigation;
};

const HomeScreen = ({ navigation }: Props) => {
  useEffect(() => {
		_hasSessionToken()
	}, []);

  const _hasSessionToken = async () => {
    const token = await AsyncStorage.getItem('authToken')
    const expiresIn = await AsyncStorage.getItem('expiresIn')
    if (token && Number(expiresIn) > new Date().getTime()) {
      navigation.navigate('Dashboard')
    }
  }

  return (
    <Background>
      <Logo />
      <Header>Hands On Libras</Header>
  
      <Paragraph>
        Uma maneira fácil de aprender Libras
      </Paragraph>
      <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Cadastro
      </Button>
    </Background>
  );
}

export default memo(HomeScreen);
