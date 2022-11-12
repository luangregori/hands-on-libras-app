import React, { memo, useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';
import { Button, } from "react-native-elements";
import Header from '../components/Header';
import CardChallenge from "../components/CardChallenge";
import BottomNavigation from '../components/BottomNavigation';
import { Navigation } from '../types';
import { theme } from '../core/theme';
import { loadCategoriesApi, loadLessonsApi } from '../services/lessons';
import { ScrollView } from 'react-native-gesture-handler';
import { loadScoreApi } from '../services/score';

type Props = {
  navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => {
  const [categories, setCategories] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loadingChallenges, setLoadingChallenges] = useState(false);
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);

  const _getCategories = async () => {
    let allCategories = await loadCategoriesApi()

    if (allCategories) {
      if (allCategories[0].name !== 'Todos') allCategories = allCategories.reverse()
      setCategories(allCategories)
    }
  };

  const _getChallengesFromCategory = async (categoryId?: string) => {
    setLoadingChallenges(true);
    if (categories.find(el => el.id === categoryId)?.name === 'Todos') {
      categoryId = undefined
    }

    const loadedChallenges = await loadLessonsApi(categoryId)

    setChallenges(loadedChallenges)
    setLoadingChallenges(false);

  };

  const _getScore = async () => {
    let score = await loadScoreApi()
    setScore(score)
  };

  const _clickedButton = (index: number, id: string) => {
    setIndex(index)
    _getChallengesFromCategory(id)
  }

  useEffect(() => {
    _getCategories();
    _getChallengesFromCategory();

    const listener = navigation.addListener('focus', () => {
      _getScore();
    });

    return listener;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor={theme.colors.backdrop} />

      <View style={styles.header}>
        <Header>Desafios</Header>
        <View style={styles.categories}>
          {categories.map((el: any, indx: number) =>
            <Button
              title={el.name}
              type={index === indx ? "outline" : "clear"}
              titleStyle={{ fontWeight: '600', color: index === indx ? theme.colors.placeholder : theme.colors.primary }}
              onPress={() => _clickedButton(indx, el.id)}
              buttonStyle={{
                borderColor: theme.colors.primary,
                backgroundColor: index === indx ? theme.colors.primary : null,
                borderRadius: 30
              }}
            />
          )}
          <Button
            title={score.toString()}
            icon={{
              name: 'star',
              type: 'font-awesome',
              size: 15,
              color: 'white',
            }}
            type="clear"
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: '700', color: 'white' }}
            buttonStyle={{
              backgroundColor: theme.colors.contrast,
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 30,
            }}
            onPress={() => { navigation.navigate('Ranking') }}
          />
        </View>
      </View>

      <ScrollView style={styles.challenges}>
        {loadingChallenges ? (
          <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loadingChallenges} />
        ) : (
          challenges.map((el: any) =>
            <CardChallenge
              navigation={navigation}
              key={el.id}
              id={el.id}
              title={el.name}
              subtitle={el.description}
              uri={el.image_url} />
          )
        )}
      </ScrollView>

      <BottomNavigation navigation={navigation} />
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
  category_name: {
    marginRight: 15,
    color: theme.colors.primary,
  },
  points: {
    color: theme.colors.contrast,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  loadingChallenges: {
    marginTop: 20,
  },
  challenges: {
    paddingHorizontal: 10
  }
});


export default memo(Dashboard);
