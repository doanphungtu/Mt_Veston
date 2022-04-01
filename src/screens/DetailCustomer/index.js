import database from '@react-native-firebase/database';
import {useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import {Divider, Menu, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import ConfirmModal from '~/components/ConfirmModal';
import Header from '~/components/Header';
import InputVStack from '~/components/InputVStack';
import {LoadingOverlay} from '~/components/Loading';
import useBoolean from '~/hooks/useBoolean';
import useDateFormat from '~/hooks/useDateFormat';
import {useNotification} from '~/hooks/useNotification';
import {changeCustomerAction, removeCustomerAction} from '~/store/customerSlice';
import {goBack} from '~/utils/navigationHelpers';
import styles from './styles';

const DetailCustomer = () => {
  const route = useRoute();
  const data = route?.params?.data;
  const {value: isEdit, setTrue: enableEdit, setFalse: disbleEdit} = useBoolean(false);
  const {
    value: isOpenModalConfirm,
    setTrue: setOpenModalConfirm,
    setFalse: setHideModalConfirm,
  } = useBoolean(false);
  const dispatch = useDispatch();
  const {showErrorNotification, showSuccessNotification} = useNotification();
  const {value: loading, setTrue: setShowLoading, setFalse: setHideLoading} = useBoolean();
  const {
    value: visibleDatePicker,
    setTrue: setVisibleDatePicker,
    setFalse: setHideDatePicker,
  } = useBoolean();
  const customer = useSelector(state => state?.customer);
  const {format} = useDateFormat();

  const formik = useFormik({
    initialValues: {
      fullname: data?.fullname,
      phonenumber: data?.phonenumber,
      payDate: new Date(data?.payDate) || null,
      fabricCode: data?.fabricCode,
      longShirt: data?.longShirt,
      shoulder: data?.shoulder,
      hand: data?.hand,
      chest: data?.chest,
      neck: data?.neck,
      arm: data?.arm,
      belly: data?.belly,
      butt: data?.butt,
      longPan: data?.longPan,
      leg: data?.leg,
      totalMoney: data?.totalMoney,
      note: data?.note,
    },
    onSubmit: values => {
      setShowLoading();
      const newData = {
        fullname: values.fullname,
        phonenumber: values.phonenumber,
        payDate: values.payDate?.toString(),
        fabricCode: values.fabricCode,
        longShirt: values.longShirt,
        shoulder: values.shoulder,
        hand: values.hand,
        chest: values.chest,
        neck: values.neck,
        arm: values.arm,
        belly: values.belly,
        butt: values.butt,
        longPan: values.longPan,
        leg: values.leg,
        totalMoney: values.totalMoney,
        note: values.note,
      };
      database()
        .ref('customers/' + data?.id)
        .update(newData)
        .then(() => {
          setHideLoading();
          showSuccessNotification('Cập nhật thành công');
          dispatch(changeCustomerAction({...customer?.data, ...newData}));
          disbleEdit();
        })
        .catch(() => {
          setHideLoading();
          showErrorNotification('Cập nhật thất bại, vui lòng thử lại sau');
        });
    },
  });

  function handleDeleteCustomer() {
    setShowLoading();
    database()
      .ref('customers/' + data?.id)
      .remove()
      .then(() => {
        setHideLoading();
        showSuccessNotification('Xoá thành công');
        dispatch(removeCustomerAction({id: data?.id}));
        goBack();
      })
      .catch(() => {
        setHideLoading();
        showErrorNotification('Thất bại, vui lòng thử lại sau');
      });
  }

  return (
    <SafeAreaView style={styles.root}>
      <ConfirmModal
        confirmMessage="Bạn chắc chắn muốn xoá khách hàng này?"
        isOpen={isOpenModalConfirm}
        onClose={setHideModalConfirm}
        onConfirm={() => {
          setHideModalConfirm();
          handleDeleteCustomer();
        }}
      />
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
      <Header
        title="Khách hàng"
        headerRight={() => {
          if (isEdit) {
            return (
              <TouchableOpacity onPress={disbleEdit}>
                <MaterialCommunityIcons name="close" size={30} color="white" />
              </TouchableOpacity>
            );
          }
          return (
            <Menu
              w="190"
              trigger={triggerProps => {
                return (
                  <Pressable hitSlop={{left: 10, right: 10}} {...triggerProps}>
                    <MaterialCommunityIcons name="dots-vertical" size={30} color="white" />
                  </Pressable>
                );
              }}>
              <Menu.Item onPress={enableEdit}>Sửa</Menu.Item>
              <Divider />
              <Menu.Item onPress={setOpenModalConfirm}>Xoá</Menu.Item>
            </Menu>
          );
        }}
      />
      <KeyboardAwareScrollView style={{flex: 1}}>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Tên khách hàng"
            input={{
              placeholder: 'Nhập tên khách hàng',
              value: formik.values.fullname,
              onChangeText: text => formik.setFieldValue('fullname', text),
              isDisabled: !isEdit,
            }}
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
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Ngày trả"
            input={{
              placeholder: 'Nhập ngày trả',
              value: formik.values.payDate ? format(formik.values.payDate) : '',
              isDisabled: true,
              onPressIn: () => {
                isEdit && setVisibleDatePicker();
              },
            }}
            showDivider={isEdit}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Mã vải"
            input={{
              placeholder: 'Nhập mã vải',
              value: formik.values.fabricCode,
              onChangeText: text => formik.setFieldValue('fabricCode', text),
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Dài áo"
            input={{
              placeholder: 'Nhập dài áo',
              value: formik.values.longShirt,
              onChangeText: text => formik.setFieldValue('longShirt', text),
              keyboardType: 'numeric',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Vai"
            input={{
              placeholder: 'Nhập vai',
              value: formik.values.shoulder,
              onChangeText: text => formik.setFieldValue('shoulder', text),
              keyboardType: 'numeric',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Tay"
            input={{
              placeholder: 'Nhập tay',
              value: formik.values.hand,
              onChangeText: text => formik.setFieldValue('hand', text),
              keyboardType: 'numeric',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Ngực"
            input={{
              placeholder: 'Nhập ngực',
              value: formik.values.chest,
              onChangeText: text => formik.setFieldValue('chest', text),
              keyboardType: 'numeric',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Cổ"
            input={{
              placeholder: 'Nhập cổ',
              value: formik.values.neck,
              onChangeText: text => formik.setFieldValue('neck', text),
              keyboardType: 'numeric',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Bắp tay"
            input={{
              placeholder: 'Nhập bắp tay',
              value: formik.values.arm,
              onChangeText: text => formik.setFieldValue('arm', text),
              keyboardType: 'numeric',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Bụng"
            input={{
              placeholder: 'Nhập bụng',
              value: formik.values.belly,
              onChangeText: text => formik.setFieldValue('belly', text),
              keyboardType: 'numeric',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Mông"
            input={{
              placeholder: 'Nhập mông',
              value: formik.values.butt,
              onChangeText: text => formik.setFieldValue('butt', text),
              keyboardType: 'numeric',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Dài quần"
            input={{
              placeholder: 'Nhập dài quần',
              value: formik.values.longPan,
              onChangeText: text => formik.setFieldValue('longPan', text),
              keyboardType: 'numeric',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Ống"
            input={{
              placeholder: 'Nhập ống',
              value: formik.values.leg,
              onChangeText: text => formik.setFieldValue('leg', text),
              keyboardType: 'numeric',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Thành tiền"
            input={{
              placeholder: 'Nhập thành tiền',
              value: formik.values.totalMoney,
              onChangeText: text => formik.setFieldValue('totalMoney', text),
              keyboardType: 'numeric',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%" mb="5%">
          <InputVStack
            label="Ghi chú"
            input={{
              placeholder: 'Nhập ghi chú',
              value: formik.values.note,
              onChangeText: text => formik.setFieldValue('note', text),
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        {isEdit && (
          <TouchableOpacity style={styles.btnNext} onPress={formik.handleSubmit}>
            <Text fontSize={20} color="white">
              Cập nhật
            </Text>
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default DetailCustomer;
