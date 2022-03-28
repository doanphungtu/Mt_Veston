import {HStack, Icon, Text, VStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {goBack} from '~/utils/navigationHelpers';

const Header = props => {
  const {rootStyle, headerContainerStyle, viewTitleContainerStyle, title, titleStyle, headerRight} =
    props;
  return (
    <VStack py={3} style={[styles.rootStyle, rootStyle]}>
      <HStack style={[styles.defaultHeaderContainer, headerContainerStyle]}>
        <TouchableOpacity style={styles.backButtonStyle} onPress={() => goBack()}>
          <Icon as={Ionicons} name="chevron-back" color="white" size={35} />
        </TouchableOpacity>
        <VStack
          flex="1"
          justifyContent="center"
          alignItems="center"
          style={viewTitleContainerStyle}>
          <Text
            fontSize={24}
            fontWeight="bold"
            numberOfLines={1}
            color="white"
            style={[styles.defaultTitleStyle, titleStyle]}>
            {title}
          </Text>
        </VStack>
        {headerRight ? headerRight() : <VStack style={styles.backButtonStyle} />}
      </HStack>
    </VStack>
  );
};

const styles = ScaledSheet.create({
  rootStyle: {
    backgroundColor: '#0A52A8',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  defaultHeaderContainer: {
    paddingHorizontal: 10,
  },
  backButtonStyle: {
    minWidth: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
