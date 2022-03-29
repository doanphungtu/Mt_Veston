import {useFormik} from 'formik';
import {FormControl, HStack, Input, Text, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity, useWindowDimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import RadioBox from '~/components/RadioBox';

import SvgIcon from '~/components/SvgIcon';
import {SIGNIN} from '~/constants/Routes';
import useBoolean from '~/hooks/useBoolean';
import {navigate} from '~/utils/navigationHelpers';
import styles from './styles';

const Signup = () => {
  const {width} = useWindowDimensions();
  const formik = useFormik({
    initialValues: {
      username: '',
      fullname: '',
      phonenumber: '',
      password: '',
      repassword: '',
    },
    onSubmit: values => {},
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Đây là trường bắt buộc'),
      fullname: Yup.string().required('Đây là trường bắt buộc'),
      phonenumber: Yup.string().required('Đây là trường bắt buộc'),
      password: Yup.string()
        .required('Đây là trường bắt buộc')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
      repassword: Yup.string()
        .required('Đây là trường bắt buộc')
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
    }),
  });
  const {value: gender, setTrue, setFalse} = useBoolean(false);

  return (
    <SafeAreaView style={styles.root}>
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
          <TouchableOpacity style={styles.btnSignin} onPress={() => formik.handleSubmit()}>
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
