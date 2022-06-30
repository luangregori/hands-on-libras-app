import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
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

  // const _getCategories = async () => {
  //   const allCategories = await loadCategoriesApi()

  //   if (allCategories) {
  //     setCategories(allCategories)
  //   }
  // };
  // useEffect(() => {
	// 	_getCategories();
	// }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header>Classificação</Header>
        <View style={styles.categories}>
          { range.map((el: any) => 
            <TouchableOpacity key={el} onPress={() => {}}>
              <Text style={styles.name}>{el.toUpperCase()}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <BottomNavigation navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%', 
    padding: 20,
  },
  header: {
    padding: 10,
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name : {
    marginRight: 15,
    color: theme.colors.primary,
  },
  content: {
    backgroundColor: 'red',
  }
});


export default memo(Ranking);
