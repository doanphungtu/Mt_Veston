import database from '@react-native-firebase/database';
import {useFormik} from 'formik';
import {Divider, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';

import Header from '~/components/Header';
import InputVStack from '~/components/InputVStack';
import {LoadingOverlay} from '~/components/Loading';
import {HOME_TAB} from '~/constants/Routes';
import useBoolean from '~/hooks/useBoolean';
import useDateFormat from '~/hooks/useDateFormat';
import {useNotification} from '~/hooks/useNotification';
import {addCustomerAction} from '~/store/customerSlice';
import {navigate} from '~/utils/navigationHelpers';
import styles from './styles';

const AddCustomer = () => {
  const dispatch = useDispatch();
  const {showErrorNotification, showSuccessNotification} = useNotification();
  const {value: loading, setTrue: setShowLoading, setFalse: setHideLoading} = useBoolean();
  const {
    value: visibleDatePicker,
    setTrue: setVisibleDatePicker,
    setFalse: setHideDatePicker,
  } = useBoolean();
  const session = useSelector(state => state?.session);
  const {format} = useDateFormat();

  const formik = useFormik({
    initialValues: {
      fullname: '',
      phonenumber: '',
      longShirt: '',
      shoulder: '',
      hand: '',
      chest: '',
      neck: '',
      arm: '',
      belly: '',
      note0: '',
      waist: '',
      butt: '',
      longPan: '',
      thighs: '',
      leg: '',
      totalMoney: '',
      note: '',
      payDate: null,
      fabricCode: '',
    },
    onSubmit: values => {
      setShowLoading();
      const newData = {
        uid: session?.userinfo?.id,
        fullname: values.fullname.trim(),
        phonenumber: values.phonenumber,
        longShirt: values.longShirt,
        shoulder: values.shoulder,
        hand: values.hand,
        chest: values.chest,
        neck: values.neck,
        arm: values.arm,
        belly: values.belly,
        note0: values.note0,
        waist: values.waist,
        butt: values.butt,
        longPan: values.longPan,
        thighs: values.thighs,
        leg: values.leg,
        totalMoney: values.totalMoney,
        note: values.note,
        // payDate: values?.payDate ? values?.payDate?.toString() : new Date().toString(),
        // fabricCode: values.fabricCode,
      };
      database()
        .ref(`/customers`)
        .push(newData)
        .then(() => {
          setHideLoading();
          dispatch(addCustomerAction(newData));
          showSuccessNotification('Th??m kh??ch h??ng th??nh c??ng');
          navigate(HOME_TAB);
        })
        .catch(error => {
          setHideLoading();
          showErrorNotification('Th??m kh??ch h??ng kh??ng th??nh c??ng, vui l??ng th??m l???i');
        });
    },
  });

  return (
    <SafeAreaView style={styles.root}>
      {loading && <LoadingOverlay />}
      <DateTimePickerModal
        isVisible={visibleDatePicker}
        mode="date"
        onConfirm={date => {
          setHideDatePicker();
          formik.setFieldValue('payDate', date);
        }}
        date={formik.values.payDate || new Date()}
        onCancel={setHideDatePicker}
      />
      <Header title="Th??m kh??ch h??ng" />
      <KeyboardAwareScrollView style={{flex: 1}}>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="T??n kh??ch h??ng"
            input={{
              placeholder: 'Nh???p t??n kh??ch h??ng',
              value: formik.values.fullname,
              onChangeText: text => formik.setFieldValue('fullname', text),
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="S??? ??i???n tho???i"
            input={{
              placeholder: 'Nh???p s??? ??i???n tho???i',
              value: formik.values.phonenumber,
              onChangeText: text => formik.setFieldValue('phonenumber', text),
              keyboardType: 'number-pad',
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="D??i ??o"
            input={{
              placeholder: 'Nh???p d??i ??o',
              value: formik.values.longShirt,
              onChangeText: text => formik.setFieldValue('longShirt', text),
              // keyboardType: 'numeric',
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Vai"
            input={{
              placeholder: 'Nh???p vai',
              value: formik.values.shoulder,
              onChangeText: text => formik.setFieldValue('shoulder', text),
              // keyboardType: 'numeric',
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Tay"
            input={{
              placeholder: 'Nh???p tay',
              value: formik.values.hand,
              onChangeText: text => formik.setFieldValue('hand', text),
              // keyboardType: 'numeric',
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Ng???c"
            input={{
              placeholder: 'Nh???p ng???c',
              value: formik.values.chest,
              onChangeText: text => formik.setFieldValue('chest', text),
              // keyboardType: 'numeric',
            }}
          />
        </VStack>
        <HStack
          width="90%"
          alignItems="center"
          justifyContent="space-between"
          alignSelf="center"
          background="white"
          shadow={1}
          mt="5%">
          <VStack width="45%" background="white" p="2">
            <InputVStack
              label="C???"
              input={{
                placeholder: 'Nh???p c???',
                value: formik.values.neck,
                onChangeText: text => formik.setFieldValue('neck', text),
                // keyboardType: 'numeric',
              }}
            />
          </VStack>
          <Text fontSize={50} adjustsFontSizeToFit color="grey">
            /
          </Text>
          <VStack width="45%" background="white" p="2">
            <InputVStack
              label="B???p tay"
              input={{
                placeholder: 'Nh???p b???p tay',
                value: formik.values.arm,
                onChangeText: text => formik.setFieldValue('arm', text),
                // keyboardType: 'numeric',
              }}
            />
          </VStack>
        </HStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="B???ng tr??n"
            input={{
              placeholder: 'Nh???p b???ng tr??n',
              value: formik.values.belly,
              onChangeText: text => formik.setFieldValue('belly', text),
              // keyboardType: 'numeric',
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Ghi ch??"
            input={{
              placeholder: 'Nh???p ghi ch??',
              value: formik.values.note0,
              onChangeText: text => formik.setFieldValue('note0', text),
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Eo"
            input={{
              placeholder: 'Nh???p eo',
              value: formik.values.waist,
              onChangeText: text => formik.setFieldValue('waist', text),
              // keyboardType: 'numeric',
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="M??ng"
            input={{
              placeholder: 'Nh???p m??ng',
              value: formik.values.butt,
              onChangeText: text => formik.setFieldValue('butt', text),
              // keyboardType: 'numeric',
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="D??i qu???n"
            input={{
              placeholder: 'Nh???p d??i qu???n',
              value: formik.values.longPan,
              onChangeText: text => formik.setFieldValue('longPan', text),
              // keyboardType: 'numeric',
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="????i qu???n"
            input={{
              placeholder: 'Nh???p ????i qu???n',
              value: formik.values.thighs,
              onChangeText: text => formik.setFieldValue('thighs', text),
              // keyboardType: 'numeric',
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="???ng"
            input={{
              placeholder: 'Nh???p ???ng',
              value: formik.values.leg,
              onChangeText: text => formik.setFieldValue('leg', text),
              // keyboardType: 'numeric',
            }}
          />
        </VStack>

        {/* <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <Text color="#808080" fontSize={14}>
            Ng??y tr???
          </Text>
          <TouchableOpacity style={styles.btnDate} onPress={setVisibleDatePicker}>
            <Text
              adjustsFontSizeToFit
              mt="1"
              fontSize={18}
              color={!formik.values.payDate ? '#808080' : 'black'}>
              {formik.values.payDate ? format(formik.values.payDate) : 'Nh???p ng??y tr???'}
            </Text>
          </TouchableOpacity>
          <Divider background="#808080" />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="M?? v???i"
            input={{
              placeholder: 'Nh???p m?? v???i',
              value: formik.values.fabricCode,
              onChangeText: text => formik.setFieldValue('fabricCode', text),
            }}
          />
        </VStack> */}

        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Th??nh ti???n"
            input={{
              placeholder: 'Nh???p th??nh ti???n',
              value: formik.values.totalMoney,
              onChangeText: text => formik.setFieldValue('totalMoney', text),
              keyboardType: 'numeric',
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%" mb="5%">
          <InputVStack
            label="Ghi ch??"
            input={{
              placeholder: 'Nh???p ghi ch??',
              value: formik.values.note,
              onChangeText: text => formik.setFieldValue('note', text),
            }}
          />
        </VStack>
        <TouchableOpacity style={styles.btnNext} onPress={formik.handleSubmit}>
          <Text fontSize={20} color="white">
            Th??m m???i
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddCustomer;
