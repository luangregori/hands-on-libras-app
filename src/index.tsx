import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
} from './screens';

// TODO carregar sessão do usuario
// const getSessionUser = async () => {
//   try {
//     const value = await AsyncStorage.getItem('authToken')
//     console.log("User: ", value)
//     if(value !== null) {
//       return value
//     }
//   } catch(e) {
//     // error reading value
//     console.log(e)
//   }
// }

// getSessionUser()

const Router = createStackNavigator({
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
