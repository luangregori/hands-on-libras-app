import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { Navigation } from '../types';
import { theme } from '../core/theme';
type Props = {
  navigation: Navigation;
};

const Ranking = ({ navigation }: Props) => {
  const [categories, setCategories] = useState([]);

  const range = ['semanal', 'mensal', 'anual']

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.colors.backdrop} />

      <View style={styles.header}>
        <Header>Classificação</Header>
        <View style={styles.ranges}>
          {range.map((el: any) =>
            <TouchableOpacity key={el} onPress={() => { }}>
              <Text style={styles.name}>{el.toUpperCase()}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <BottomNavigation navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 70,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: -30,
  },
  ranges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    marginRight: 15,
    color: theme.colors.primary,
  }
});


export default memo(Ranking);
