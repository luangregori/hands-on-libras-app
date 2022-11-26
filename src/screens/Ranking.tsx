import React, { memo, useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import { Button, } from "react-native-elements";
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
  const [index, setIndex] = useState(0);

  const ranges = [{ name: 'semanal', days: 7 }, { name: 'mensal', days: 30 }, { name: 'anual', days: 365 }]

  const _getRanking = async (days: number) => {
    setLoadingRanking(true);

    let loadedRanking = await loadRankingApi(days)

    loadedRanking = loadedRanking.map(el => el.image_url ? el : Object.assign(el, { image_url: "https://firebasestorage.googleapis.com/v0/b/hands-on-libras.appspot.com/o/accounts%2Fprofile.png?alt=media&token=4e06bf47-a985-43ad-ab04-08d5ee32f7d9" }))

    setRanking(loadedRanking)
    setLoadingRanking(false);
  };

  const _clickedButton = (index: number, days: number) => {
    setIndex(index)
    _getRanking(days)
  }

  useEffect(() => {
    _getRanking(7);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.colors.backdrop} />

      <View style={styles.header}>
        <Header>Classificação</Header>
        <View style={styles.ranges}>
          {ranges.map((el: any, indx: number) =>
            <Button
              title={el.name.toUpperCase()}
              key={indx}
              type={index === indx ? "solid" : "clear"}
              titleStyle={{ fontWeight: '600', color: index === indx ? theme.colors.placeholder : theme.colors.primary }}
              onPress={() => _clickedButton(indx, el.days)}
              buttonStyle={{
                borderColor: theme.colors.primary,
                backgroundColor: index === indx ? theme.colors.primary : null,
              }}
            />
          )}
        </View>
      </View>

      <View style={styles.ranking}>
        <Text style={styles.title}>Placar</Text>
        {loadingRanking ? (
          <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginVertical: 10 }} />
        ) :
          <Leaderboard
            data={ranking}
            sortBy='score'
            labelBy='name'
            icon='image_url' />
        }
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
