import React, { memo } from 'react';
import { DataTable } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';

type Props = {
  items: Array<RankingElementProps>;
}

interface RankingElementProps {
  position: number;
  name: string;
  score: number;
};

const RankingElement = ({ items }: Props) => {
  return (
    <View>
      <Text style={styles.header}>Placar Geral</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title textStyle={styles.title}>Posição</DataTable.Title>
          <DataTable.Title textStyle={styles.title}>Nome</DataTable.Title>
          <DataTable.Title textStyle={styles.title} numeric>Pontos</DataTable.Title>
        </DataTable.Header>

        {items.map((el: RankingElementProps) =>
          <DataTable.Row key={el.position}>
            <DataTable.Cell textStyle={styles.text}>{el.position}°</DataTable.Cell>
            <DataTable.Cell textStyle={styles.text}>{el.name}</DataTable.Cell>
            <DataTable.Cell textStyle={styles.text} numeric>{el.score}</DataTable.Cell>
          </DataTable.Row>
        )}
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.colors.secondary,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    lineHeight: 26,
    color: theme.colors.secondary,
    textAlign: 'center',
    marginBottom: 14,
  },
});

export default memo(RankingElement);