import database from '@react-native-firebase/database';
import {useFormik} from 'formik';
import {HStack, Text, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';

import Header from '~/components/Header';
import InputVStack from '~/components/InputVStack';
import {LoadingOverlay} from '~/components/Loading';
import RadioBox from '~/components/RadioBox';
import useBoolean from '~/hooks/useBoolean';
import {useNotification} from '~/hooks/useNotification';
import {changeUserinfoAction} from '~/store/sessionSlice';
import styles from './styles';

const Account = () => {
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const {value: gender, setTrue, setFalse} = useBoolean(session?.userinfo?.gender);
  const {showErrorNotification, showSuccessNotification} = useNotification();
  const {value: loading, setTrue: setShowLoading, setFalse: setHideLoading} = useBoolean();

  const formik = useFormik({
    initialValues: {
      fullname: session?.userinfo?.fullname,
      phonenumber: session?.userinfo?.phonenumber,
    },
    onSubmit: values => {
      setShowLoading();
      const newData = {
        fullname: values.fullname,
        phonenumber: values.phonenumber,
        gender: gender,
      };
      database()
        .ref('users/' + session?.userinfo?.id)
        .update(newData)
        .then(() => {
          setHideLoading();
          showSuccessNotification('Cập nhật thành công');
          dispatch(changeUserinfoAction({...session?.userinfo, ...newData}));
        })
        .catch(() => {
          setHideLoading();
          showErrorNotification('Cập nhật thất bại, vui lòng thử lại sau');
        });
    },
    validationSchema: Yup.object().shape({
      fullname: Yup.string().required('Đây là trường bắt buộc'),
      phonenumber: Yup.string().required('Đây là trường bắt buộc'),
    }),
  });

  return (
    <SafeAreaView style={styles.root}>
      {loading && <LoadingOverlay />}
      <Header title="Tài khoản" />
      <KeyboardAwareScrollView style={{flex: 1}}>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Họ tên"
            input={{
              placeholder: 'Nhập họ tên',
              value: formik.values.fullname,
              onChangeText: text => formik.setFieldValue('fullname', text),
            }}
            formControl={{isInvalid: formik.touched.fullname && formik.errors.fullname}}
            errorMsg={formik.errors.fullname}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Số điện thoại"
            input={{
              placeholder: 'Nhập số điện thoại',
              value: formik.values.phonenumber,
              onChangeText: text => formik.setFieldValue('phonenumber', text),
              keyboardType: 'number-pad',
            }}
            formControl={{isInvalid: formik.touched.phonenumber && formik.errors.phonenumber}}
            errorMsg={formik.errors.phonenumber}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <Text color="#808080" fontSize={14}>
            Giới tính
          </Text>
          <HStack justifyContent={'space-between'} mt={'10px'}>
            <RadioBox value={!gender} label="Nam" onChangeValue={() => setFalse()} />
            <RadioBox
              containerStyle={{marginLeft: 20}}
              value={gender}
              label="Nữ"
              onChangeValue={() => setTrue()}
            />
          </HStack>
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

export default Account;
