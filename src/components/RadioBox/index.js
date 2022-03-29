import {View, Text, HStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

const RadioBox = props => {
  const {value, onChangeValue, label = '', containerStyle} = props;
  return (
    <HStack style={containerStyle}>
      <TouchableOpacity
        onPress={onChangeValue}
        style={[styles.viewContainer, value ? {borderColor: '#0A52A8'} : {}]}>
        {value ? <View style={styles.box} /> : <View />}
      </TouchableOpacity>
      <Text ml="2" style={[styles.labelStyle, value ? {color: '#0A52A8'} : {}]}>
        {label}
      </Text>
    </HStack>
  );
};

const styles = ScaledSheet.create({
  viewContainer: {
    width: 30,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#0A52A8',
  },
  labelStyle: {
    fontSize: 18,
  },
});

export default RadioBox;
