import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { Navigation } from '../types';
import { theme } from '../core/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Props = {
  navigation: Navigation;
};

const Profile = ({ navigation }: Props) => {
  const _logout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('expiresIn');

    console.log('logout success');

    navigation.navigate('HomeScreen');
  } 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.colors.backdrop} />

      <View style={styles.header}>
        <Header>Perfil</Header>
      </View>

      <TouchableOpacity onPress={_logout}>
        <Text style={styles.label}>Sair</Text>
      </TouchableOpacity>

      <BottomNavigation navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 70,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: -30,
  },
  label: {
    fontSize: 16,
    color: theme.colors.error,
  },
});


export default memo(Profile);
