import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Navigation } from '../types';
import { theme } from '../core/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"
import { loadUserApi, updateUserApi } from '../services/user';
import { firebase } from '../services/firebase'
import { Icon } from 'react-native-elements';

type Props = {
  navigation: Navigation;
};

const Profile = ({ navigation }: Props) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    id: '',
    image_url: '',
    achievements: [{
      id: '',
      accountId: '',
      name: '',
      icon: ''
    }],
  })
  const [image, setImage] = useState(null)
  const [userScore, setUserScore] = useState(0)
  const [userRank, setUserRank] = useState('X')
  const [uploading, setUploading] = useState(false)

  const _loadUserInfo = async () => {
    let infos = await loadUserApi()

    if (infos) {
      setUserInfo(infos.userInfo)
      setUserScore(infos.userScore)
      setUserRank(infos.userPosition)
      setImage(infos.userInfo.image_url)
    }
  };

  const _logout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('expiresIn');

    console.log('logout success');

    navigation.navigate('HomeScreen');
  }

  const updateImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    }) as any;

    if (!result.cancelled) {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', result.uri, true);
        xhr.send(null);
      }) as any;
      console.log('blob', blob)

      const ref = firebase.storage().ref().child(`/accounts/${userInfo.id}/profile.png`);
      const snapshot = ref.put(blob)

      snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          setUploading(true)
        },
        (error) => {
          setUploading(false)
          console.log('error', error)
          blob.close()
          return
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then((url) => {
            setUploading(false)
            console.log("Download URL: ", url)
            setImage(result.uri)
            updateUserApi({ image_url: url })
            blob.close()
            return url
          })
        }
      )
    }
  }

  useEffect(() => {
    _loadUserInfo();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.titleBar} onPress={() => { navigation.navigate('Dashboard') }} >
          <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
        </TouchableOpacity>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            {image ?
              <Image source={{ uri: image }} style={styles.image} resizeMode="cover"></Image> :
              <Image source={require("../assets/profile.png")} style={styles.image} resizeMode="center"></Image>
            }
          </View>

          <TouchableOpacity style={styles.add} onPress={updateImage}>
            {uploading ?
              <ActivityIndicator size="large" color={theme.colors.primary} /> :
              <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
            }
          </TouchableOpacity>
        </View>


        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            {/* // TODO: buscar classificação atual */}
            <Text style={[styles.text, { fontSize: 24 }]}>{userRank}°</Text>
            <Text style={[styles.text, styles.subText]}>Classificação</Text>
          </View>
          <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
            <Text style={[styles.text, { fontSize: 24 }]}>{userScore}</Text>
            <Text style={[styles.text, styles.subText]}>Pontuação</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Nome</Text>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{userInfo.name}</Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Email</Text>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{userInfo.email}</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Conquistas</Text>
          {userInfo.achievements.map((achievement, index) => (
            <View key={index} style={styles.recentItem}>
              <Icon
                name={achievement.icon ? achievement.icon : 'trophy'}
                type='font-awesome'
                size={34}
                color={theme.colors.primary}
                tvParallaxProperties={undefined}
              />
              <Text style={[styles.text, { fontWeight: "200", fontSize: 26, marginLeft: 10 }]}>{achievement.name}</Text>
            </View>
          ))}

          <TouchableOpacity onPress={_logout}>
            <Text style={styles.logout}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  text: {
    color: theme.colors.secondary
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: theme.colors.surface
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
  },
  statsBox: {
    alignItems: "center",
    flex: 1
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10
  },
  recentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activityIndicator: {
    marginTop: -3,
    marginRight: 10
  },
  logout: {
    fontSize: 16,
    marginTop: 10,
    color: theme.colors.error,
  }
});


export default memo(Profile);
