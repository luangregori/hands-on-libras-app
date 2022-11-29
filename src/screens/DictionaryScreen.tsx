import React, { memo, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
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
  const { loading, setLoading } = useBetween(useShareableState);

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
          style={styles.webview}
          width={'200%'}
          onMessage={(event) => {
            if (event.nativeEvent.data === "GLOSSA_LOADED") {
              console.log("event GLOSSA_LOADED");
              setTimeout(() => {
                setLoading(false)
              }, 2);
            }
          }}
          ref={(ref) => webViewRef = ref}
          source={{ uri: 'https://hands-on-libras.web.app/?cc=true' }}
        />
      </View>

      <View style={styles.description}>

        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} style={{ margin: 15 }} />
        ) : (
          <SearchBar
            placeholder="Pesquise aqui..."
            lightTheme
            round
            value={searchValue}
            onChangeText={(text) => searchFunction(text)}
            autoCorrect={false}
          />
        )}
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
  webview: {
    marginLeft: "-50%",
  },
  avatar: {
    height: '50%',
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
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
