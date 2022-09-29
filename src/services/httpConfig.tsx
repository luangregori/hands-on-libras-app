import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = 'https://hands-on-libras-api.herokuapp.com'

const apiInstance = axios.create()

apiInstance.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('authToken')
      if (token) {
        config.headers['x-access-token'] = JSON.parse(token)
      }
      return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default apiInstance