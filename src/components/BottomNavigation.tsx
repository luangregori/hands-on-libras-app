import React, { memo } from 'react';
import { Avatar } from 'react-native-paper';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../core/theme';
import { Navigation } from '../types';

type Props = {
  navigation: Navigation;
};

const BottomNavigation = ({ navigation }: Props) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.content} onPress={() => {navigation.navigate('Dashboard')}}>
      <Avatar.Icon size={40} icon="home" />
      <Text style={styles.text}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.content} onPress={() => {navigation.navigate('Ranking')}}>
      <Avatar.Icon size={40} icon="medal" />
      <Text style={styles.text}>Classificação</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.content} onPress={() => {navigation.navigate('LoginScreen')}}>
      <Avatar.Icon size={40} icon="account" />
      <Text style={styles.text}>Perfil</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    backgroundColor: theme.colors.surface,
    height: 75,
    paddingLeft: 30,
    paddingRight: 30,
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -20,
    width: '100%',
  },
  content:{
    alignItems: 'center',
    alignContent: 'center',
  },
  text:{
    color: theme.colors.secondary,
  }
});

export default memo(BottomNavigation);
