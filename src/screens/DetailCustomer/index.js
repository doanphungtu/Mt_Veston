import database from '@react-native-firebase/database';
import {useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import {Divider, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {Platform, SafeAreaView, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import ReactNativeBlobUtil from 'react-native-blob-util';
import RNPermissions from 'react-native-permissions';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

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

const DocumentDir = ReactNativeBlobUtil.fs.dirs.DocumentDir;

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
      thighs: data?.thighs,
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
          showSuccessNotification('C???p nh???t th??nh c??ng');
          dispatch(changeCustomerAction({...data, ...newData}));
          disbleEdit();
        })
        .catch(() => {
          setHideLoading();
          showErrorNotification('C???p nh???t th???t b???i, vui l??ng th??? l???i sau');
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
        showSuccessNotification('Xo?? th??nh c??ng');
        dispatch(removeCustomerAction({id: data?.id}));
        goBack();
      })
      .catch(() => {
        setHideLoading();
        showErrorNotification('Th???t b???i, vui l??ng th??? l???i sau');
      });
  }

  async function handleSaveFile() {
    try {
      if (Platform.OS === 'android') {
        const permissionRead = await RNPermissions.check(
          RNPermissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        if (permissionRead !== RNPermissions.RESULTS.GRANTED) {
          const grantedRead = await RNPermissions.request(
            RNPermissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          );
          if (grantedRead !== RNPermissions.RESULTS.GRANTED) {
            showErrorNotification('Kh??ng c?? quy???n');
            return;
          }
        }

        const permissionWrite = await RNPermissions.check(
          RNPermissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );
        if (permissionWrite !== RNPermissions.RESULTS.GRANTED) {
          const grantedWrite = await RNPermissions.request(
            RNPermissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          );
          if (grantedWrite !== RNPermissions.RESULTS.GRANTED) {
            showErrorNotification('Kh??ng c?? quy???n');
            return;
          }
        }
      }
      let options = {
        html: `
          <p>H??? t&ecirc;n: ${formik.values.fullname}</p>
          <p>S??? ??i???n tho???i: ${formik.values.phonenumber}</p>
          <p>D&agrave;i &aacute;o: ${formik.values.longShirt}</p>
          <p>Vai: ${formik.values.shoulder}</p>
          <p>Tay: ${formik.values.hand}</p>
          <p>Ng???c: ${formik.values.chest}</p>
          <p>C???: ${formik.values.neck} / B???p tay: ${formik.values.arm}</p>
          <p>B???ng tr&ecirc;n: ${formik.values.belly}</p>
          <p>Ghi ch&uacute;: ${formik.values.note0}</p>
          <p>eo: ${formik.values.waist}</p>
          <p>M&ocirc;ng: ${formik.values.butt}</p>
          <p>D&agrave;i qu???n: ${formik.values.longPan}</p>
          <p>???ng: ${formik.values.leg}</p>
          <p>Th&agrave;nh ti???n: ${formik.values.totalMoney}</p>
          <p>Ghi ch&uacute;: ${formik.values.note}</p>
        `,
        fileName: 'tableTest',
        directory: 'Documents',
      };
      let file = await RNHTMLtoPDF.convert(options);
      if (file.filePath) {
        await RNPrint.print({filePath: file.filePath});
        // if (Platform.OS === 'ios') {
        //   ReactNativeBlobUtil.ios.openDocument(file.filePath);
        // } else {
        //   ReactNativeBlobUtil.android.actionViewIntent(file.filePath, 'application/pdf');
        // }
      }
    } catch (error) {
      showErrorNotification('L???i h??? th???ng. Vui l??ng th??? l???i');
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <ConfirmModal
        confirmMessage="B???n ch???c ch???n mu???n xo?? kh??ch h??ng n??y?"
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
        title="Kh??ch h??ng"
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
                <Text color={'black'}>S???a</Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onPress={() => {
                  setOpenModalConfirm();
                  hideMenu();
                }}>
                <Text color={'black'}>Xo??</Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onPress={() => {
                  handleSaveFile();
                  hideMenu();
                }}>
                <Text color={'black'}>In</Text>
              </MenuItem>
            </Menu>
          );
        }}
      />
      <KeyboardAwareScrollView style={{flex: 1}} enableOnAndroid={true}>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="T??n kh??ch h??ng"
            input={{
              placeholder: 'Nh???p t??n kh??ch h??ng',
              value: formik.values.fullname,
              onChangeText: text => formik.setFieldValue('fullname', text),
              isDisabled: !isEdit,
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
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        {/* <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <Text color="#808080" fontSize={14}>
            Ng??y tr???
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
              {formik.values.payDate ? format(formik.values.payDate) : 'Nh???p ng??y tr???'}
            </Text>
          </TouchableOpacity>
          {isEdit && <Divider background="#808080" />}
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="M?? v???i"
            input={{
              placeholder: 'Nh???p m?? v???i',
              value: formik.values.fabricCode,
              onChangeText: text => formik.setFieldValue('fabricCode', text),
              isDisabled: !isEdit,
            }}
          />
        </VStack> */}
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="D??i ??o"
            input={{
              placeholder: 'Nh???p d??i ??o',
              value: formik.values.longShirt,
              onChangeText: text => formik.setFieldValue('longShirt', text),
              // keyboardType: 'numeric',
              isDisabled: !isEdit,
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
              isDisabled: !isEdit,
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
              isDisabled: !isEdit,
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
              label="C???"
              input={{
                placeholder: 'Nh???p c???',
                value: formik.values.neck,
                onChangeText: text => formik.setFieldValue('neck', text),
                // keyboardType: 'numeric',
                isDisabled: !isEdit,
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
                isDisabled: !isEdit,
              }}
            />
          </VStack>
        </HStack>
        {/* <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="C???"
            input={{
              placeholder: 'Nh???p c???',
              value: formik.values.neck,
              onChangeText: text => formik.setFieldValue('neck', text),
              // keyboardType: 'numeric',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="B???p tay"
            input={{
              placeholder: 'Nh???p b???p tay',
              value: formik.values.arm,
              onChangeText: text => formik.setFieldValue('arm', text),
              // keyboardType: 'numeric',
              isDisabled: !isEdit,
            }}
          />
        </VStack> */}
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="B???ng tr??n"
            input={{
              placeholder: 'Nh???p b???ng tr??n',
              value: formik.values.belly,
              onChangeText: text => formik.setFieldValue('belly', text),
              // keyboardType: 'numeric',
              isDisabled: !isEdit,
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
              isDisabled: !isEdit,
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
              isDisabled: !isEdit,
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
              isDisabled: !isEdit,
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
              isDisabled: !isEdit,
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
              isDisabled: !isEdit,
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
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Th??nh ti???n"
            input={{
              placeholder: 'Nh???p th??nh ti???n',
              value: formik.values.totalMoney,
              onChangeText: text => formik.setFieldValue('totalMoney', text),
              keyboardType: 'numeric',
              isDisabled: !isEdit,
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
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        {isEdit && (
          <TouchableOpacity style={styles.btnNext} onPress={formik.handleSubmit}>
            <Text fontSize={20} color="white">
              C???p nh???t
            </Text>
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default DetailCustomer;
