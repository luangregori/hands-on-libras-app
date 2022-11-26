import React, { memo, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import { theme } from '../core/theme';
import Button from '../components/Button';
import { Navigation, Route } from '../types';
import CodeField from '../components/CodeField';
import { confirmCodeApi } from '../services/user';
import { messages } from '../constants';

type Props = {
  navigation: Navigation;
  route: Route;
};

const VerifyCodeScreen = ({ route, navigation }: Props) => {
  const [code, setCode] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { email } = route.params;

  useEffect(() => {
    if (!!setErrorMessage) {
      setHasError(false)
    }
  }, [code]);

  const _onSendPressed = async () => {
    setLoading(true)
    const user = await confirmCodeApi(email, code)

    if (user.accessToken) {
      const accessTokenValue = JSON.stringify(user.accessToken)
      await AsyncStorage.setItem('authToken', accessTokenValue)

      const expirationValue = JSON.stringify(new Date().getTime() + (user.expiresIn * 1000))
      await AsyncStorage.setItem('expiresIn', expirationValue)

      console.log('expiresIn', expirationValue)

      navigation.navigate('NewPasswordScreen', { code });
    } else {
      setLoading(false)
      setHasError(true)
      setErrorMessage(messages.wrongCode)
    }
  };

  return (
    <Background>

      <Logo />

      <Text style={styles.header}>Insira o Token recebido no seu Email</Text>

      <View style={styles.codeField}>
        <CodeField hasError={hasError} errorMessage={errorMessage} onChangeValue={setCode} />
      </View>

      {
        loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : null
      }

      <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
        Verificar
      </Button>

    </Background >
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
    textAlign: 'center'
  },
  codeField: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

export default memo(VerifyCodeScreen);
