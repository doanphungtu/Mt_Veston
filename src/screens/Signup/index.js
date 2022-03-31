import database from '@react-native-firebase/database';
import {useFormik} from 'formik';
import {FormControl, HStack, Input, Text, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity, useWindowDimensions} from 'react-native';
import 'react-native-get-random-values';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {v4 as uuidv4} from 'uuid';
import * as Yup from 'yup';

import {LoadingOverlay} from '~/components/Loading';
import RadioBox from '~/components/RadioBox';
import SvgIcon from '~/components/SvgIcon';
import {SIGNIN} from '~/constants/Routes';
import useBoolean from '~/hooks/useBoolean';
import {useNotification} from '~/hooks/useNotification';
import {navigate} from '~/utils/navigationHelpers';
import styles from './styles';

const Signup = () => {
  const {width} = useWindowDimensions();
  const {showErrorNotification, showSuccessNotification} = useNotification();
  const {value: gender, setTrue, setFalse} = useBoolean(false);
  const {value: loading, setTrue: setShowLoading, setFalse: setHideLoading} = useBoolean();

  const formik = useFormik({
    initialValues: {
      username: '',
      fullname: '',
      phonenumber: '',
      password: '',
      repassword: '',
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
          if (snapshot.exists()) {
            showErrorNotification('Tên tài khoản đã tồn tại. Vui lòng dùng tên tài khoản khác');
          } else {
            database()
              .ref(`/users`)
              .push({
                uid: uuidv4(),
                username: values.username,
                fullname: values.fullname,
                phonenumber: values.phonenumber,
                password: values.password,
                gender: gender,
              })
              .then(() => {
                setHideLoading();
                showSuccessNotification('Đăng ký thành công');
                navigate(SIGNIN);
              })
              .catch(error => {
                setHideLoading();
                showErrorNotification('Đăng ký không thành công, vui lòng đăng ký lại');
              });
          }
        })
        .catch(error => {
          showErrorNotification('Hệ thống gặp sự cố. Vui lòng thử lại');
        });
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required('Đây là trường bắt buộc')
        .min(6, 'Tên đăng nhập phải có ít nhất 6 ký tự'),
      fullname: Yup.string().required('Đây là trường bắt buộc'),
      phonenumber: Yup.string().required('Đây là trường bắt buộc'),
      password: Yup.string()
        .required('Đây là trường bắt buộc')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
      repassword: Yup.string()
        .required('Đây là trường bắt buộc')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
    }),
  });

  return (
    <SafeAreaView style={styles.root}>
      {loading && <LoadingOverlay />}
      <KeyboardAwareScrollView style={{flex: 1}}>
        <SvgIcon name="header" width={width} height={270} />
        <VStack mt="-120" bg="white" w="90%" alignSelf="center" borderRadius={10} shadow={1}>
          <Text fontSize={28} fontWeight="bold" alignSelf="center" mt="3">
            Đăng ký
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
          <FormControl isInvalid={formik.touched.fullname && formik.errors.fullname}>
            <VStack style={styles.input}>
              <Input
                flex="1"
                fontSize={18}
                placeholder="Họ tên"
                leftElement={
                  <SvgIcon name="user" width={16} height={16} style={{marginLeft: 10}} />
                }
                variant="filled"
                borderWidth={0}
                bg="#E4EBF1"
                color={'black'}
                value={formik.values.fullname}
                onChangeText={text => formik.setFieldValue('fullname', text)}
              />
            </VStack>
            <FormControl.ErrorMessage ml={'5%'}>{formik.errors.fullname}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={formik.touched.phonenumber && formik.errors.phonenumber}>
            <VStack style={styles.input}>
              <Input
                flex="1"
                fontSize={18}
                placeholder="Số điện thoại"
                leftElement={
                  <SvgIcon name="phone" width={16} height={16} style={{marginLeft: 10}} />
                }
                variant="filled"
                borderWidth={0}
                bg="#E4EBF1"
                color={'black'}
                value={formik.values.phonenumber}
                onChangeText={text => formik.setFieldValue('phonenumber', text)}
                keyboardType="number-pad"
              />
            </VStack>
            <FormControl.ErrorMessage ml={'5%'}>
              {formik.errors.phonenumber}
            </FormControl.ErrorMessage>
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
          <FormControl isInvalid={formik.touched.repassword && formik.errors.repassword}>
            <VStack style={styles.input}>
              <Input
                flex="1"
                fontSize={18}
                placeholder="Nhập lại mật khẩu"
                leftElement={
                  <SvgIcon name="password" width={16} height={16} style={{marginLeft: 10}} />
                }
                variant="filled"
                borderWidth={0}
                bg="#E4EBF1"
                color={'black'}
                value={formik.values.repassword}
                onChangeText={text => formik.setFieldValue('repassword', text)}
              />
            </VStack>
            <FormControl.ErrorMessage ml={'5%'}>
              {formik.errors.repassword}
            </FormControl.ErrorMessage>
          </FormControl>
          <HStack width={'90%'} alignSelf="center" justifyContent={'center'} mt={'20px'}>
            <RadioBox value={!gender} label="Nam" onChangeValue={() => setFalse()} />
            <RadioBox
              containerStyle={{marginLeft: 20}}
              value={gender}
              label="Nữ"
              onChangeValue={() => setTrue()}
            />
          </HStack>
          <TouchableOpacity
            style={styles.btnSignin}
            onPress={() => {
              formik.handleSubmit();
            }}>
            <Text fontSize={20} color="white">
              Đăng ký
            </Text>
          </TouchableOpacity>
        </VStack>
        <Text fontSize={18} color="black" alignSelf={'center'} mt={15}>
          Bạn đã có tài khoản?{' '}
          <Text color="#0A52A8" onPress={() => navigate(SIGNIN)}>
            ĐĂNG NHẬP
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signup;
