import {Box} from 'native-base';
import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import LottieView from 'lottie-react-native';

const LoadingNormal = () => (
  <Box style={[styles.container, {alignItems: 'center'}]}>
    <ActivityIndicator size="large" color="#452CB1" />
  </Box>
);

const LoadingOverlay = () => (
  <Box style={styles.overlaycontainer}>
    <ActivityIndicator size="large" color="#452CB1" />
  </Box>
);

const LoadingLottie = () => (
  <Box style={styles.container}>
    <LottieView
      style={{width: '100%', height: 200}}
      source={require('~/assets/lotties/skeleton.json')}
      autoPlay
      loop
    />
  </Box>
);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  overlaycontainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {LoadingNormal, LoadingOverlay, LoadingLottie};
