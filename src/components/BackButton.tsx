import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

type Props = {
  goBack: () => void;
  leftMargin?: any
};

const BackButton = ({ goBack, leftMargin }: Props) => (
  <TouchableOpacity onPress={goBack} style={[styles.container, leftMargin || styles.leftMargin]}>
    <Image style={styles.image} source={require('../assets/arrow_back.png')} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top:  getStatusBarHeight(),
  },
  leftMargin: {
    left: 0
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(BackButton);
