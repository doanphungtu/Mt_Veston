import {useFormik} from 'formik';
import {FormControl, Input, Text, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity, useWindowDimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';

import SvgIcon from '~/components/SvgIcon';
import {VERIFY_PHONE} from '~/constants/Routes';
import {goBack, navigate} from '~/utils/navigationHelpers';
import styles from './styles';
import {useNotification} from '~/hooks/useNotification';

const FillPhone = () => {
  const {width} = useWindowDimensions();
  const {showErrorNotification} = useNotification();

  const formik = useFormik({
    initialValues: {
      phonenumber: '',
    },
    onSubmit: values => {
      signInWithPhoneNumber(values.phonenumber);
    },
    validationSchema: Yup.object().shape({
      phonenumber: Yup.string().required('Đây là trường bắt buộc'),
    }),
  });

  async function signInWithPhoneNumber(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber('+84' + phoneNumber.slice(1));
      navigate(VERIFY_PHONE, {
        phonenumber: phoneNumber,
        confirmation: confirmation,
      });
    } catch (error) {
      console.log('aaa', error);
      showErrorNotification('Số điện thoại không hợp lệ. Vui lòng nhập lại');
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <SvgIcon name="header" width={width} height={270} />
        <TouchableOpacity onPress={() => goBack()} style={styles.btnBack}>
          <MaterialIcons name="arrow-back-ios" color={'white'} size={30} />
        </TouchableOpacity>
        <VStack mt="-60" bg="white" w="90%" alignSelf="center" borderRadius={10} shadow={1}>
          <Text fontSize={28} fontWeight="bold" alignSelf="center" mt="3">
            Quên mật khẩu
          </Text>
          <VStack width="95%" alignSelf="center">
            <Text textAlign="center" fontSize={18} alignSelf="center" mt="3">
              Vui lòng nhập số điện thoại của bạn để tiếp tục
            </Text>
          </VStack>
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
        </VStack>
        <TouchableOpacity
          style={styles.btnNext}
          onPress={() => {
            formik.handleSubmit();
          }}>
          <Text fontSize={20} color="white">
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default FillPhone;
