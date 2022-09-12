import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { Navigation } from '../types';
import { theme } from '../core/theme';
import RankingElement from '../components/RankingElement';
import { loadRankingApi } from '../services/ranking';

type Props = {
  navigation: Navigation;
};

const Ranking = ({ navigation }: Props) => {
  const [ranking, setRanking] = useState([{ position: 0, name: '', score: 0 }]);
  const [loadingRanking, setLoadingRanking] = useState(false);

  const ranges = [{ name: 'semanal', days: 7 }, { name: 'mensal', days: 30 }, { name: 'anual', days: 365 }]

  const _getRanking = async (days: number) => {
    setLoadingRanking(true);

    const loadedRanking = await loadRankingApi(days)

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
            <TouchableOpacity key={el.days} onPress={() => {_getRanking(el.days) }}>
              <Text style={styles.name}>{el.name.toUpperCase()}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.ranking}>
        {loadingRanking ? (
          <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loadingRanking} />
        ) : (
          <RankingElement items={ranking} />
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
  ranges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
