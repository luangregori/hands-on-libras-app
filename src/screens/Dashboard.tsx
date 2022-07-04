import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, StatusBar, SafeAreaView} from 'react-native';
import Header from '../components/Header';
import CardChallenge from "../components/CardChallenge";
import BottomNavigation from '../components/BottomNavigation';
import { Navigation } from '../types';
import { theme } from '../core/theme';
import { loadCategoriesApi, loadChallengesApi } from '../services/challenges';
import { IconButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
  navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => {
  const [categories, setCategories] = useState([]);
  const [challenges, setChallenges] = useState([]);

  const _getCategories = async () => {
    const allCategories = await loadCategoriesApi()

    if (allCategories) {
      setCategories(allCategories)
    }
  };

  const _getChallengesFromCategory = async (categoryId?: string) => {
    if (categories.find(el => el.id === categoryId)?.name === 'Todos') {
      categoryId = undefined
    }
    
    const loadedChallenges = await loadChallengesApi()

    if (loadedChallenges) {
      setChallenges(loadedChallenges)
    }
  };

  useEffect(() => {
		_getCategories();
    _getChallengesFromCategory();
	}, []);

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor={theme.colors.backdrop}/>

      <View style={styles.header}>
        <Header>Desafios</Header>
        <View style={styles.categories}>
          { categories.map((el: any) => 
            <TouchableOpacity key={el.id} onPress={() => _getChallengesFromCategory(el.id)}>
              <Text style={styles.category_name}>{el.name.toUpperCase()}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.categories} onPress={() => { /* go to ranking */ }}>
              <IconButton style={{margin: -17}} size={30} icon="star" color={theme.colors.contrast}/>
              <Text style={styles.points}>225</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.challenges}>
          { challenges.map((el: any) => 
            <CardChallenge 
              navigation={navigation}
              key={el.id}
              id={el.id}
              title={el.name}
              subtitle={el.description}
              uri={el.image_url}/>
          )}
      </ScrollView>

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
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category_name : {
    marginRight: 15,
    color: theme.colors.primary,
  },
  points: {
    color: theme.colors.contrast,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  challenges: {
    paddingHorizontal: 10
  }
});


export default memo(Dashboard);
