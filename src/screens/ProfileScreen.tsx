import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { Navigation } from '../types';
import { theme } from '../core/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.titleBar} onPress={() => { navigation.navigate('Dashboard') }} >
          <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
        </TouchableOpacity>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image source={require("../assets/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Julie</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>2°</Text>
            <Text style={[styles.text, styles.subText]}>Classificação</Text>
          </View>
          <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
            <Text style={[styles.text, { fontSize: 24 }]}>250</Text>
            <Text style={[styles.text, styles.subText]}>Pontuação</Text>
          </View>
        </View>

        <Text style={[styles.subText, styles.recent]}>Conquistas</Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
              </Text>
            </View>
          </View>

          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
              </Text>
            </View>
          </View>

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
    overflow: "hidden"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
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
    marginBottom: 16
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20
  },
  logout: {
    fontSize: 16,
    marginTop: 10,
    color: theme.colors.error,
  }
});


export default memo(Profile);
