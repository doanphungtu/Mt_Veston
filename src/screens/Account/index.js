import {HStack, Text, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import Header from '~/components/Header';
import useBoolean from '~/hooks/useBoolean';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ConfirmModal from '~/components/ConfirmModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputVStack from '~/components/InputVStack';
import RadioBox from '~/components/RadioBox';
import {navigate} from '~/utils/navigationHelpers';
import {SIGNIN} from '~/constants/Routes';

const Account = () => {
  const {value: isEdit, setTrue: enableEdit, setFalse: disbleEdit} = useBoolean(false);
  const {
    value: isOpenModalConfirm,
    setTrue: setOpenModalConfirm,
    setFalse: setHideModalConfirm,
  } = useBoolean(false);
  const {value: gender, setTrue, setFalse} = useBoolean(false);

  return (
    <SafeAreaView style={styles.root}>
      <ConfirmModal
        confirmMessage="Bạn muốn đăng xuất?"
        isOpen={isOpenModalConfirm}
        onClose={setHideModalConfirm}
        onConfirm={() => {
          setHideModalConfirm();
          navigate(SIGNIN);
        }}
      />
      <Header
        title="Tài khoản"
        headerRight={() => {
          if (isEdit) {
            return (
              <TouchableOpacity onPress={disbleEdit}>
                <MaterialCommunityIcons name="check" size={30} color="white" />
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity onPress={enableEdit}>
              <MaterialCommunityIcons name="square-edit-outline" size={30} color="white" />
            </TouchableOpacity>
          );
        }}
      />
      <KeyboardAwareScrollView style={{flex: 1}}>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Họ tên"
            input={{
              placeholder: 'Nhập họ tên',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Số điện thoại"
            input={{
              placeholder: 'Nhập số điện thoại',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Mật khẩu"
            input={{
              placeholder: 'Nhập mật khẩu',
              isDisabled: !isEdit,
            }}
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
        <TouchableOpacity style={styles.btnLogout} onPress={setOpenModalConfirm}>
          <Text fontSize={20} color="white">
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Account;
