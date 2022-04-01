import database from '@react-native-firebase/database';
import {useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import {FormControl, Input, Text, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity, useWindowDimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';

import {LoadingOverlay} from '~/components/Loading';
import SvgIcon from '~/components/SvgIcon';
import {SIGNIN} from '~/constants/Routes';
import useBoolean from '~/hooks/useBoolean';
import {useNotification} from '~/hooks/useNotification';
import {goBack, setRoot} from '~/utils/navigationHelpers';
import styles from './styles';

const ForgotPassword = () => {
  const route = useRoute();
  const phonenumber = route?.params?.phonenumber;
  const {width} = useWindowDimensions();
  const {showErrorNotification, showSuccessNotification} = useNotification();
  const {value: loading, setTrue: setShowLoading, setFalse: setHideLoading} = useBoolean();

  const formik = useFormik({
    initialValues: {
      password: '',
      repassword: '',
    },
    onSubmit: values => {
      setShowLoading();
      const newData = {
        password: values.password,
      };
      database()
        .ref('/users')
        .orderByChild('phonenumber')
        .equalTo(phonenumber)
        .once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            let userData = {};
            snapshot.forEach(child => {
              userData = {...child.val(), id: child?.key};
            });
            database()
              .ref('users/' + userData?.id)
              .update(newData)
              .then(() => {
                setHideLoading();
                showSuccessNotification('Cập nhật mật khẩu thành công');
                setRoot(SIGNIN);
              })
              .catch(() => {
                setHideLoading();
                showErrorNotification('Cập nhật mật khẩu thất bại, vui lòng thử lại sau');
              });
          } else {
            showErrorNotification('Hệ thống gặp sự cố. Vui lòng thử lại');
          }
        })
        .catch(error => {
          setHideLoading();
          showErrorNotification('Hệ thống gặp sự cố. Vui lòng thử lại');
        });
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required('Đây là trường bắt buộc')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
      repassword: Yup.string()
        .required('Đây là trường bắt buộc')
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
    }),
  });

  return (
    <SafeAreaView style={styles.root}>
      {loading && <LoadingOverlay />}
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <SvgIcon name="header" width={width} height={270} />
        <TouchableOpacity onPress={() => goBack()} style={styles.btnBack}>
          <MaterialIcons name="arrow-back-ios" color={'white'} size={30} />
        </TouchableOpacity>
        <VStack mt="-60" bg="white" w="90%" alignSelf="center" borderRadius={10} shadow={1}>
          <Text fontSize={28} fontWeight="bold" alignSelf="center" mt="3">
            Quên mật khẩu
          </Text>
          <FormControl isInvalid={formik.touched.password && formik.errors.password}>
            <VStack style={styles.input}>
              <Input
                flex="1"
                fontSize={18}
                placeholder="Mật khẩu mới"
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
          <FormControl isInvalid={formik.touched.repassword && formik.errors.repassword} mb="20px">
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
        </VStack>
        <TouchableOpacity style={styles.btnNext} onPress={formik.handleSubmit}>
          <Text fontSize={20} color="white">
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
