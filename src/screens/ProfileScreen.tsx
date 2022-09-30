import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import { Navigation } from '../types';
import { theme } from '../core/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import { loadUserApi } from '../services/user';
type Props = {
  navigation: Navigation;
};

const Profile = ({ navigation }: Props) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    id: '',
    image_url: '',
    achievements: [],
  })

  const _loadUserInfo = async () => {
    let infos = await loadUserApi()

    if (infos) {
      setUserInfo(infos)
    }
  };

  const _logout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('expiresIn');

    console.log('logout success');

    navigation.navigate('HomeScreen');
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
            {userInfo.image_url ?
              <Image source={{ uri: userInfo.image_url }} style={styles.image} resizeMode="cover"></Image> :
              <Image source={require("../assets/profile.png")} style={styles.image} resizeMode="center"></Image>
            }
          </View>
        </View>


        {/* <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
          <Text style={[styles.text, { fontSize: 24 }]}>2°</Text>
          <Text style={[styles.text, styles.subText]}>Classificação</Text>
          </View>
          <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
          <Text style={[styles.text, { fontSize: 24 }]}>250</Text>
          <Text style={[styles.text, styles.subText]}>Pontuação</Text>
          </View>
        </View> */}
        <View style={styles.infoContainer}>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Nome</Text>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{userInfo.name}</Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Email</Text>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{userInfo.email}</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          {userInfo.achievements.map((achievement, index) => (
            <View key={index} style={styles.recentItem}>
              {/* <View style={styles.activityIndicator}></View> */}
              <Ionicons name="trophy" size={24} style={styles.activityIndicator} color={theme.colors.primary}></Ionicons>
              <View style={{ width: 250 }}>
                <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                  <Text style={{ fontWeight: "400" }}>{achievement}</Text>
                </Text>
              </View>
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
    alignItems: "flex-start",
    marginVertical: 16
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
