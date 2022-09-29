import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { memo } from 'react';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  Ranking,
  StartLesson,
  Profile,
  LearnLesson,
  ChallengeLesson
} from './screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeScreen" >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Ranking" component={Ranking} />
        <Stack.Screen name="StartLesson" component={StartLesson} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="LearnLesson" component={LearnLesson} />
        <Stack.Screen name="ChallengeLesson" component={ChallengeLesson} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default memo(App);
