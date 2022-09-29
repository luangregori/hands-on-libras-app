import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = 'https://hands-on-libras-api.herokuapp.com'
// axios.defaults.baseURL = 'http://192.168.18.4:5000'

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