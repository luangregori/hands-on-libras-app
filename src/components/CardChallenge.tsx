import React, { memo } from 'react';
import { Card, IconButton, Avatar } from 'react-native-paper';
import { StyleSheet, Image } from 'react-native';
import { theme } from '../core/theme';

const CardChallenge = (props) => {
  const uri = props.uri
  const id = props.id

  const _goToStart = ()=> {
    console.log('go to start', id)
  }
  return (
    <Card.Title
      style={styles.card}
      title={props.title}
      subtitle={props.subtitle}
      leftStyle={styles.left}
      titleNumberOfLines={2}
      // left={(props) => <Avatar.Image {...props} source={{uri}}/>}
      left={(props) =><Image style={styles.image} source={{uri}}/>}
      right={(props) => <IconButton {...props} icon="arrow-right" onPress={() => {_goToStart()}} />}
    />
  );
}

const styles = StyleSheet.create({
  card:{
    borderRadius: 6,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: theme.colors.surface,
    margin: 5
  },
  left:{
    width: 75,
    height: 60
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6
  }
});

export default memo(CardChallenge);