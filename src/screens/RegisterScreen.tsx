import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { Navigation } from '../types';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';
import { signUpApi } from "../services/user"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { messages } from '../constants';


type Props = {
  navigation: Navigation;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [passwordConfirmation, setPasswordConfirmation] = useState({ value: '', error: '' });

  const _onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const passwordConfirmationError = passwordValidator(passwordConfirmation.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setPasswordConfirmation({ ...passwordConfirmation, error: passwordConfirmationError });
      return;
    }

    const user = await signUpApi(name.value, email.value, password.value, passwordConfirmation.value)

    if (user.accessToken) {
      const jsonValue = JSON.stringify(user.accessToken)
      await AsyncStorage.setItem('authToken', jsonValue)
      navigation.navigate('Dashboard');
      return
    } 
    if (user.error) {
      if (user.error.includes("already registered")){
        setEmail({ ...email, error: messages.emailInUse });
      }

      if (user.error.includes("passwordConfirmation")){
        setPassword({ ...password, error: messages.divergentPasswords });
        setPasswordConfirmation({ ...passwordConfirmation, error: messages.divergentPasswords });
      }
    }
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Crie uma conta</Header>

      <TextInput
        label="Nome"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

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
        label="Confime sua senha"
        returnKeyType="done"
        value={passwordConfirmation.value}
        onChangeText={text => setPasswordConfirmation({ value: text, error: '' })}
        error={!!passwordConfirmation.error}
        errorText={passwordConfirmation.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Cadastre-se
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Já tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
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

export default memo(RegisterScreen);
