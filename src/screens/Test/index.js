import {Text} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';
import styles from './styles';

const Test = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Text>test</Text>
    </SafeAreaView>
  );
};

export default Test;
