import {HStack, Text, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';

import ConfirmModal from '~/components/ConfirmModal';
import Header from '~/components/Header';
import {ACCOUNT, CHANGE_PASSWORD, SIGNIN} from '~/constants/Routes';
import useBoolean from '~/hooks/useBoolean';
import {changeUserinfoAction} from '~/store/sessionSlice';
import {navigate, setRoot} from '~/utils/navigationHelpers';
import styles from './styles';

const Setting = () => {
  const dispatch = useDispatch();

  const {
    value: isOpenModalConfirm,
    setTrue: setOpenModalConfirm,
    setFalse: setHideModalConfirm,
  } = useBoolean(false);

  return (
    <SafeAreaView style={styles.root}>
      <ConfirmModal
        confirmMessage="Bạn muốn đăng xuất?"
        isOpen={isOpenModalConfirm}
        onClose={setHideModalConfirm}
        onConfirm={() => {
          setHideModalConfirm();
          dispatch(changeUserinfoAction(null));
          setRoot(SIGNIN);
        }}
      />
      <Header title="Cài đặt" showBackButton={false} />
      <VStack p={scale(16)}>
        <TouchableOpacity onPress={() => navigate(ACCOUNT)}>
          <HStack
            background="white"
            px={scale(16)}
            py={scale(12)}
            alignItems={'center'}
            borderRadius={10}
            shadow={1}>
            <MaterialCommunityIcons name={'account'} size={30} color={'grey'} />
            <VStack flex="1" ml={scale(10)}>
              <Text fontSize={18} fontWeight={'bold'} color="grey">
                Tài khoản
              </Text>
            </VStack>
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: scale(16)}} onPress={() => navigate(CHANGE_PASSWORD)}>
          <HStack
            background="white"
            px={scale(16)}
            py={scale(12)}
            alignItems={'center'}
            borderRadius={10}
            shadow={1}>
            <MaterialCommunityIcons name={'lock'} size={30} color={'grey'} />
            <VStack flex="1" ml={scale(10)}>
              <Text fontSize={18} fontWeight={'bold'} color="grey">
                Đổi mật khẩu
              </Text>
            </VStack>
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: scale(16)}} onPress={setOpenModalConfirm}>
          <HStack
            background="white"
            px={scale(16)}
            py={scale(12)}
            alignItems={'center'}
            borderRadius={10}
            shadow={1}>
            <MaterialCommunityIcons name={'arrow-collapse-right'} size={30} color={'grey'} />
            <VStack flex="1" ml={scale(10)}>
              <Text fontSize={18} fontWeight={'bold'} color="grey">
                Đăng xuất
              </Text>
            </VStack>
          </HStack>
        </TouchableOpacity>
      </VStack>
    </SafeAreaView>
  );
};

export default Setting;
