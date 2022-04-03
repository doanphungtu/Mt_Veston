import database from '@react-native-firebase/database';
import {useFormik} from 'formik';
import {FormControl, Input, Text, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity, useWindowDimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';

import {LoadingOverlay} from '~/components/Loading';
import SvgIcon from '~/components/SvgIcon';
import {FILL_PHONE, HOME_TAB, SIGNUP} from '~/constants/Routes';
import useBoolean from '~/hooks/useBoolean';
import {useNotification} from '~/hooks/useNotification';
import {changeUserinfoAction} from '~/store/sessionSlice';
import {navigate} from '~/utils/navigationHelpers';
import styles from './styles';

const Signin = () => {
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const {showErrorNotification} = useNotification();
  const {value: loading, setTrue: setShowLoading, setFalse: setHideLoading} = useBoolean();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      setShowLoading();
      database()
        .ref()
        .child('users')
        .orderByChild('username')
        .equalTo(values.username)
        .once('value')
        .then(snapshot => {
          setHideLoading();
          if (snapshot.exists()) {
            let userData = {};
            snapshot.forEach(child => {
              userData = {...child.val(), id: child?.key};
            });
            if (userData?.password === values.password) {
              dispatch(changeUserinfoAction(userData));
              navigate(HOME_TAB);
            } else {
              showErrorNotification(
                'Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu',
              );
            }
          } else {
            showErrorNotification(
              'Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu',
            );
          }
        })
        .catch(error => {
          setHideLoading();
          showErrorNotification('Hệ thống gặp sự cố. Vui lòng thử lại');
        });
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Đây là trường bắt buộc'),
      password: Yup.string().required('Đây là trường bắt buộc'),
    }),
  });

  return (
    <SafeAreaView style={styles.root}>
      {loading && <LoadingOverlay />}
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
          <Text
            fontSize={16}
            alignSelf="flex-end"
            mr="5%"
            mt="3"
            onPress={() => navigate(FILL_PHONE)}>
            Quên mật khẩu
          </Text>
          <TouchableOpacity style={styles.btnSignin} onPress={formik.handleSubmit}>
            <Text fontSize={20} color="white">
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </VStack>
        {/* <Text fontSize={18} color="black" alignSelf={'center'} mt={15}>
          Bạn chưa có tài khoản?{' '}
          <Text color="#0A52A8" onPress={() => navigate(SIGNUP)}>
            ĐĂNG KÝ
          </Text>
        </Text> */}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signin;
