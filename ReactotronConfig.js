import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

(() => {
  if (!__DEV__) {
    return;
  }

  Reactotron
    .configure()
    .useReactNative({
      asyncStorage: true,
      devTools: true,
      networking: {
        ignoreUrls: /symbolicate/,
      },
    })
    .setAsyncStorageHandler(AsyncStorage)
    .connect();

  console.tron = Reactotron; // eslint-disable-line
})();
