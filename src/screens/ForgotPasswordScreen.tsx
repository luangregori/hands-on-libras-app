import React, { memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { emailValidator } from '../core/utils';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import Button from '../components/Button';
import { Navigation } from '../types';
import { recoverPasswordApi } from '../services/user';

type Props = {
  navigation: Navigation;
};

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);

  const _onSendPressed = async () => {
    setLoading(true);
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    const status = await recoverPasswordApi(email.value)
    if (status.success) {
      navigation.navigate('VerifyCodeScreen', { email: email.value });
    }
    setLoading(false);
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />

      <Logo />

      <Header>Recuperar senha</Header>

      <TextInput
        label="Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : null}

      <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
        Enviar
      </Button>

      <View style={styles.backToLogin}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.label}>← Voltar ao login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  backToLogin: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  back: {
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

export default memo(ForgotPasswordScreen);
