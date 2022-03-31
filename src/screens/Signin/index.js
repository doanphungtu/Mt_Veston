import {useFormik} from 'formik';
import {FormControl, Input, Text, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity, useWindowDimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import database from '@react-native-firebase/database';

import SvgIcon from '~/components/SvgIcon';
import {SIGNUP} from '~/constants/Routes';
import {navigate} from '~/utils/navigationHelpers';
import styles from './styles';
const reference = database().ref('/users');

const Signin = () => {
  const {width} = useWindowDimensions();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {},
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Đây là trường bắt buộc'),
      password: Yup.string().required('Đây là trường bắt buộc'),
    }),
  });
  database()
    .ref('/users/123')
    .set({
      name: 'Ada Lovelace',
      age: 31,
    })
    .then(() => console.log('Data set.'));
  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <SvgIcon name="header" width={width} height={270} />
        <VStack mt="-65" bg="white" w="90%" alignSelf="center" borderRadius={10} shadow={1}>
          <Text fontSize={28} fontWeight="bold" alignSelf="center" mt="3">
            Đăng nhập
          </Text>
          <FormControl isInvalid={formik.touched.username && formik.errors.username}>
            <VStack style={styles.input}>
              <Input
                flex="1"
                fontSize={18}
                placeholder="Tên đăng nhập"
                leftElement={
                  <SvgIcon name="user" width={16} height={16} style={{marginLeft: 10}} />
                }
                variant="filled"
                borderWidth={0}
                bg="#E4EBF1"
                color={'black'}
                value={formik.values.username}
                onChangeText={text => formik.setFieldValue('username', text)}
              />
            </VStack>
            <FormControl.ErrorMessage ml={'5%'}>{formik.errors.username}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={formik.touched.password && formik.errors.password}>
            <VStack style={styles.input}>
              <Input
                flex="1"
                fontSize={18}
                placeholder="Mật khẩu"
                leftElement={
                  <SvgIcon name="password" width={16} height={16} style={{marginLeft: 10}} />
                }
                variant="filled"
                borderWidth={0}
                bg="#E4EBF1"
                color={'black'}
                value={formik.values.password}
                onChangeText={text => formik.setFieldValue('password', text)}
              />
            </VStack>
            <FormControl.ErrorMessage ml={'5%'}>{formik.errors.password}</FormControl.ErrorMessage>
          </FormControl>
          <TouchableOpacity style={styles.btnSignin} onPress={() => formik.handleSubmit()}>
            <Text fontSize={20} color="white">
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </VStack>
        <Text fontSize={18} color="black" alignSelf={'center'} mt={15}>
          Bạn chưa có tài khoản?{' '}
          <Text color="#0A52A8" onPress={() => navigate(SIGNUP)}>
            ĐĂNG KÝ
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signin;
