import {VStack, Text, Input} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity, useWindowDimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import SvgIcon from '~/components/SvgIcon';
import styles from './styles';

const Signin = () => {
  const {width} = useWindowDimensions();

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <SvgIcon name="header" width={width} height={295} />
        <VStack mt="-65" bg="white" w="90%" alignSelf="center" borderRadius={10} shadow={1}>
          <Text fontSize={28} fontWeight="bold" alignSelf="center" mt="3">
            Đăng nhập
          </Text>
          <VStack style={styles.input}>
            <Input flex="1" fontSize={18} placeholder="Tên đăng nhập" />
          </VStack>
          <VStack style={styles.input}>
            <Input flex="1" fontSize={18} placeholder="Mật khẩu" />
          </VStack>
          <TouchableOpacity style={styles.btnSignin}>
            <Text fontSize={24} color="white">
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </VStack>
        <Text fontSize={18} color="black" alignSelf={'center'} mt={15}>
          Bạn chưa có tài khoản?{' '}
          <Text color="#0A52A8" onPress={() => {}}>
            ĐĂNG KÝ
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signin;
