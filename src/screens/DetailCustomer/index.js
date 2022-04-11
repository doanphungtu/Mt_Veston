import database from '@react-native-firebase/database';
import {useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import {Divider, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';

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
  const {value: visible, setTrue: showMenu, setFalse: hideMenu} = useBoolean();
  const {
    value: visibleDatePicker,
    setTrue: setVisibleDatePicker,
    setFalse: setHideDatePicker,
  } = useBoolean();
  const {format} = useDateFormat();

  const formik = useFormik({
    initialValues: {
      fullname: data?.fullname?.trim(),
      phonenumber: data?.phonenumber,
      longShirt: data?.longShirt,
      shoulder: data?.shoulder,
      hand: data?.hand,
      chest: data?.chest,
      neck: data?.neck,
      arm: data?.arm,
      belly: data?.belly,
      note0: data?.note0,
      waist: data?.waist,
      butt: data?.butt,
      longPan: data?.longPan,
      leg: data?.leg,
      totalMoney: data?.totalMoney,
      note: data?.note,

      // payDate: new Date(data?.payDate) || null,
      // fabricCode: data?.fabricCode,
    },
    onSubmit: values => {
      setShowLoading();
      const newData = {
        fullname: values.fullname,
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
        leg: values.leg,
        totalMoney: values.totalMoney,
        note: values.note,
        // payDate: values.payDate?.toString(),
        // fabricCode: values.fabricCode,
      };
      database()
        .ref('customers/' + data?.id)
        .update(newData)
        .then(() => {
          setHideLoading();
          showSuccessNotification('Cập nhật thành công');
          dispatch(changeCustomerAction({...data, ...newData}));
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
              visible={visible}
              anchor={
                <TouchableOpacity onPress={showMenu}>
                  <MaterialCommunityIcons name="dots-vertical" size={30} color="white" />
                </TouchableOpacity>
              }
              onRequestClose={hideMenu}>
              <MenuItem
                onPress={() => {
                  enableEdit();
                  hideMenu();
                }}>
                <Text color={'black'}>Sửa</Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onPress={() => {
                  setOpenModalConfirm();
                  hideMenu();
                }}>
                <Text color={'black'}>Xoá</Text>
              </MenuItem>
            </Menu>
          );
        }}
      />
      <KeyboardAwareScrollView style={{flex: 1}} enableOnAndroid={true}>
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
        {/* <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <Text color="#808080" fontSize={14}>
            Ngày trả
          </Text>
          <TouchableOpacity
            disabled={!isEdit}
            style={styles.btnDate}
            onPress={setVisibleDatePicker}>
            <Text
              adjustsFontSizeToFit
              mt="1"
              fontSize={18}
              color={!formik.values.payDate ? '#808080' : 'black'}>
              {formik.values.payDate ? format(formik.values.payDate) : 'Nhập ngày trả'}
            </Text>
          </TouchableOpacity>
          {isEdit && <Divider background="#808080" />}
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
        </VStack> */}
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
          <Text fontSize={50} adjustsFontSizeToFit color="grey">
            /
          </Text>
          <VStack width="45%" background="white" p="2">
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
        </HStack>
        {/* <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
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
        </VStack> */}
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Bụng trên"
            input={{
              placeholder: 'Nhập bụng trên',
              value: formik.values.belly,
              onChangeText: text => formik.setFieldValue('belly', text),
              keyboardType: 'numeric',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Ghi chú"
            input={{
              placeholder: 'Nhập ghi chú',
              value: formik.values.note0,
              onChangeText: text => formik.setFieldValue('note0', text),
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Eo"
            input={{
              placeholder: 'Nhập eo',
              value: formik.values.waist,
              onChangeText: text => formik.setFieldValue('waist', text),
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
