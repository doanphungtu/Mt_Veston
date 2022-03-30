import {Divider, Menu, Pressable, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '~/components/Header';
import InputVStack from '~/components/InputVStack';
import useBoolean from '~/hooks/useBoolean';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfirmModal from '~/components/ConfirmModal';

const DetailCustomer = () => {
  const {value: isEdit, setTrue: enableEdit, setFalse: disbleEdit} = useBoolean(false);
  const {
    value: isOpenModalConfirm,
    setTrue: setOpenModalConfirm,
    setFalse: setHideModalConfirm,
  } = useBoolean(false);

  return (
    <SafeAreaView style={styles.root}>
      <ConfirmModal
        confirmMessage="Bạn chắc chắn muốn xoá khách hàng này?"
        isOpen={isOpenModalConfirm}
        onClose={setHideModalConfirm}
      />
      <Header
        title="Khách hàng"
        headerRight={() => {
          if (isEdit) {
            return (
              <TouchableOpacity onPress={disbleEdit}>
                <MaterialCommunityIcons name="check" size={30} color="white" />
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
            label="Ngày trả"
            input={{
              placeholder: 'Nhập ngày trả',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Mã vải"
            input={{
              placeholder: 'Nhập mã vải',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Dài áo"
            input={{
              placeholder: 'Nhập dài áo',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Vai"
            input={{
              placeholder: 'Nhập vai',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Tay"
            input={{
              placeholder: 'Nhập tay',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Ngực"
            input={{
              placeholder: 'Nhập ngực',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Cổ"
            input={{
              placeholder: 'Nhập cổ',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Bắp tay"
            input={{
              placeholder: 'Nhập bắp tay',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Bụng"
            input={{
              placeholder: 'Nhập bụng',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Mông"
            input={{
              placeholder: 'Nhập mông',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Dài quần"
            input={{
              placeholder: 'Nhập dài quần',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Ống"
            input={{
              placeholder: 'Nhập ống',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="Thành tiền"
            input={{
              placeholder: 'Nhập thành tiền',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%" mb="5%">
          <InputVStack
            label="Ghi chú"
            input={{
              placeholder: 'Nhập ghi chú',
              isDisabled: !isEdit,
            }}
          />
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default DetailCustomer;
