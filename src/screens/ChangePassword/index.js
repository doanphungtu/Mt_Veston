import database from '@react-native-firebase/database';
import {useFormik} from 'formik';
import {Text, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';

import Header from '~/components/Header';
import InputVStack from '~/components/InputVStack';
import {LoadingOverlay} from '~/components/Loading';
import useBoolean from '~/hooks/useBoolean';
import {useNotification} from '~/hooks/useNotification';
import {changeUserinfoAction} from '~/store/sessionSlice';
import styles from './styles';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
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
        .ref('users/' + session?.userinfo?.id)
        .update(newData)
        .then(() => {
          setHideLoading();
          showSuccessNotification('Đổi mật khẩu thành công');
          dispatch(changeUserinfoAction({...session?.userinfo, ...newData}));
        })
        .catch(error => {
          setHideLoading();
          showErrorNotification('Đổi mật khẩu thất bại, vui lòng thử lại sau');
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
      <Header title="Đổi mật khẩu" />
      <KeyboardAwareScrollView style={{flex: 1}}>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Mật khẩu mới"
            input={{
              placeholder: 'Nhập mật khẩu mới',
              value: formik.values.password,
              onChangeText: text => formik.setFieldValue('password', text),
            }}
            formControl={{isInvalid: formik.touched.password && formik.errors.password}}
            errorMsg={formik.errors.password}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Xác nhận mật khẩu"
            input={{
              placeholder: 'Xác nhận mật khẩu',
              value: formik.values.repassword,
              onChangeText: text => formik.setFieldValue('repassword', text),
            }}
            formControl={{isInvalid: formik.touched.repassword && formik.errors.repassword}}
            errorMsg={formik.errors.repassword}
          />
        </VStack>
        <TouchableOpacity
          style={styles.btnSave}
          onPress={() => {
            formik.handleSubmit();
          }}>
          <Text fontSize={20} color="white">
            Cập nhật
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
