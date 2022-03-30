import {Text, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '~/components/Header';
import InputVStack from '~/components/InputVStack';
import styles from './styles';

const Filter = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Header title="Tìm kiếm" />
      <KeyboardAwareScrollView style={{flex: 1}}>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Tên khách hàng"
            input={{
              placeholder: 'Nhập tên khách hàng',
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Số điện thoại"
            input={{
              placeholder: 'Nhập số điện thoại',
            }}
          />
        </VStack>
        <TouchableOpacity style={styles.btnSignin} onPress={() => {}}>
          <Text fontSize={18} fontWeight="bold" color="white">
            Áp dụng
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Filter;
