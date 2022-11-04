import React, { memo, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, SearchBar } from "react-native-elements";
import BackButton from '../components/BackButton';
import { Navigation, Route } from '../types';
import { theme } from '../core/theme';
import filter from "lodash.filter";
import words from '../constants/words'
import { useBetween } from 'use-between';

import { WebView } from 'react-native-webview';

type Props = {
  navigation: Navigation;
  route: Route;
};

let webViewRef;

const playWord = (word: string) => {
  webViewRef.injectJavaScript(`window.player.play('${word}')`);
}

const useShareableState = () => {
  const [loading, setLoading] = useState(false);
  return {
    loading,
    setLoading
  }
}

const Item = ({ text }) => {
  const { setLoading } = useBetween(useShareableState);
  return (
    <TouchableOpacity
      onPress={() => {
        playWord(text)
        setLoading(true)
      }}
      style={styles.item}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const renderItem = ({ item }) => <Item text={item} />;

const Dictionary = ({ route, navigation }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [arrayholder, setArrayholder] = useState([]);
  const { loading } = useBetween(useShareableState);

  const searchFunction = (text) => {
    const updatedData = arrayholder.filter((item) => {
      const item_data = `${item.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setData(updatedData)
    setSearchValue(text)
  };

  useEffect(() => {
    setArrayholder(words)
    setData(words)
  }, []);
  return (
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor={theme.colors.backdrop} />

      <BackButton goBack={() => navigation.navigate('Dashboard')} />

      <View style={styles.avatar}>
        <WebView
          style={{ marginLeft: "-50%" }}
          width={'200%'}
          onMessage={(event) => {
            if (event.nativeEvent.data === "PLAYER_LOADED") {
              console.log("PLAYER_LOADED");
              // playWord(learningInfo.find(val => val.id === stepId)?.word)
            }
          }}
          ref={(ref) => webViewRef = ref}
          source={{ uri: 'https://hands-on-libras.web.app/?cc=true' }}
        />
      </View>

      <View style={styles.description}>
        <SearchBar
          placeholder="Pesquise aqui..."
          lightTheme
          round
          showLoading={loading}
          value={searchValue}
          onChangeText={(text) => searchFunction(text)}
          autoCorrect={false}
        />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* <BottomNavigation navigation={navigation} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme.colors.background,
  },
  avatar: {
    height: '50%',
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
  },
  description: {
    // height: '40%',
    marginHorizontal: 20,
    fontSize: 14,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    fontSize: 14,
  },
});


export default memo(Dictionary);
