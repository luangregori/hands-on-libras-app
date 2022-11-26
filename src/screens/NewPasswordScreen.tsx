import React, { memo, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { Navigation, Route } from '../types';
import {
  passwordValidator,
} from '../core/utils';
import { newPasswordApi, signUpApi } from "../services/user"
import { messages } from '../constants';


type Props = {
  navigation: Navigation;
  route: Route;
};

const NewPasswordScreen = ({ route, navigation }: Props) => {
  const [password, setPassword] = useState({ value: '', error: '' });
  const [passwordConfirmation, setPasswordConfirmation] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const { code } = route.params;

  const _onSignUpPressed = async () => {
    const passwordError = passwordValidator(password.value);
    const passwordConfirmationError = passwordValidator(passwordConfirmation.value);

    if (passwordError) {
      setPassword({ ...password, error: passwordError });
      setPasswordConfirmation({ ...passwordConfirmation, error: passwordConfirmationError });
      return;
    }

    setLoading(true);
    const data = await newPasswordApi(code, password.value, passwordConfirmation.value)

    if (data.error) {
      if (data.error.includes("passwordConfirmation")) {
        setPassword({ ...password, error: messages.divergentPasswords });
        setPasswordConfirmation({ ...passwordConfirmation, error: messages.divergentPasswords });
      }
      setLoading(false)
    } else {
      navigation.navigate('LoginScreen')
    }
  };

  return (
    <Background>

      <Logo />

      <Header>Crie sua nova senha!</Header>

      <TextInput
        label="Senha"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <TextInput
        label="Confirme sua senha"
        returnKeyType="done"
        value={passwordConfirmation.value}
        onChangeText={text => setPasswordConfirmation({ value: text, error: '' })}
        error={!!passwordConfirmation.error}
        errorText={passwordConfirmation.error}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : null}

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Enviar
      </Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(NewPasswordScreen);
