import {useRoute} from '@react-navigation/native';
import {Text, View, VStack} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, useWindowDimensions} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import SvgIcon from '~/components/SvgIcon';
import {FORGOT_PASSWORD} from '~/constants/Routes';
import {goBack, navigate} from '~/utils/navigationHelpers';
import styles from './styles';

const VerifyPhone = () => {
  const {width} = useWindowDimensions();
  const route = useRoute();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
          <VStack width="95%" alignSelf="center" mb="20px">
            <Text textAlign="center" fontSize={18} alignSelf="center" mt="3">
              Nhập mã xác minh được gửi đến số {route?.params?.phonenumber || ''}
            </Text>
          </VStack>
        </VStack>
        <VStack width="90%" alignSelf="center" mt="30px">
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={6}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                key={index}
                style={[styles.cell, isFocused && {borderColor: '#0A52A8'}]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || isFocused ? (
                  <Text style={styles.txtCell}>{symbol || (isFocused && <Cursor />)}</Text>
                ) : (
                  <View style={styles.dot} />
                )}
              </View>
            )}
          />
        </VStack>
        <TouchableOpacity
          style={styles.btnNext}
          onPress={() => {
            navigate(FORGOT_PASSWORD);
          }}>
          <Text fontSize={20} color="white">
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default VerifyPhone;
