import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { Navigation } from '../types';
import { theme } from '../core/theme';
import RankingElement from '../components/RankingElement';
import { loadRankingApi } from '../services/ranking';
import Leaderboard from 'react-native-leaderboard';

type Props = {
  navigation: Navigation;
};

const Ranking = ({ navigation }: Props) => {
  const [ranking, setRanking] = useState([{ position: 0, name: '', score: 0 }]);
  const [loadingRanking, setLoadingRanking] = useState(false);

  const ranges = [{ name: 'semanal', days: 7 }, { name: 'mensal', days: 30 }, { name: 'anual', days: 365 }]

  const _getRanking = async (days: number) => {
    setLoadingRanking(true);

    let loadedRanking = await loadRankingApi(days)

    loadedRanking = loadedRanking.map(el => Object.assign(el, { image_url: "https://firebasestorage.googleapis.com/v0/b/hands-on-libras.appspot.com/o/accounts%2F62d01c57b0d4f50016d50207%2Fprofile.png?alt=media&token=0f9a7df8-35f4-4e6c-908b-60c34839aacd" }))

    setRanking(loadedRanking)
    setLoadingRanking(false);
  };

  useEffect(() => {
    _getRanking(7);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.colors.backdrop} />

      <View style={styles.header}>
        <Header>Classificação</Header>
        <View style={styles.ranges}>
          {ranges.map((el: any) =>
            <TouchableOpacity key={el.days} onPress={() => { _getRanking(el.days) }}>
              <Text style={styles.name}>{el.name.toUpperCase()}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* <ScrollView style={styles.ranking}>
        {loadingRanking ? (
          <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loadingRanking} />
        ) : (
          <RankingElement items={ranking} />
        )}
      </ScrollView> */}
      <View style={styles.ranking}>
        <Text style={styles.title}>Placar Geral</Text>
        <Leaderboard
          data={ranking}
          sortBy='score'
          labelBy='name'
          icon='image_url' />
      </View>

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
  ranges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
    alignSelf: 'center',
  },
  name: {
    marginRight: 15,
    color: theme.colors.primary,
  },
  loadingRanking: {
    marginTop: 20,
  },
  ranking: {
    paddingHorizontal: 10
  }
});


export default memo(Ranking);
