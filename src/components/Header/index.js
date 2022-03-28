import {HStack, Icon, Text, VStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {goBack} from '~/utils/navigationHelpers';

const Header = props => {
  const {headerContainerStyle, title, titleStyle, headerRight} = props;
  return (
    <HStack style={[styles.defaultHeaderContainer, headerContainerStyle]}>
      <TouchableOpacity style={styles.backButtonStyle} onPress={() => goBack()}>
        <Icon as={Ionicons} name="chevron-back" color="gray.500" />
      </TouchableOpacity>
      <VStack flex="1">
        <Text style={[styles.defaultTitleStyle, titleStyle]}>{title}</Text>
      </VStack>
      {headerRight ? headerRight() : <VStack style={styles.backButtonStyle} />}
    </HStack>
  );
};

const styles = ScaledSheet.create({
  defaultHeaderContainer: {
    paddingHorizontal: 10,
  },
  backButtonStyle: {
    minWidth: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
