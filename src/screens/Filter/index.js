import {Divider, HStack, Text, VStack} from 'native-base';
import React, {useMemo, useState} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch} from 'react-redux';

import Header from '~/components/Header';
import InputVStack from '~/components/InputVStack';
import useBoolean from '~/hooks/useBoolean';
import useDateFormat from '~/hooks/useDateFormat';
import {setFilterByAction} from '~/store/customerSlice';
import {goBack} from '~/utils/navigationHelpers';
import styles from './styles';

const Filter = () => {
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const {
    value: visibleDatePickerStart,
    setTrue: setVisibleDatePickerStart,
    setFalse: setHideDatePickerStart,
  } = useBoolean();
  const {
    value: visibleDatePickerEnd,
    setTrue: setVisibleDatePickerEnd,
    setFalse: setHideDatePickerEnd,
  } = useBoolean();
  const {format} = useDateFormat();

  function handleSubmit() {
    dispatch(
      setFilterByAction({
        filterByName: fullname,
        filterByPhonenumber: phonenumber,
        filterStartDate: startDate,
        filterEndDate: endDate,
      }),
    );
    goBack();
  }

  return (
    <SafeAreaView style={styles.root}>
      <DateTimePickerModal
        isVisible={visibleDatePickerStart}
        mode="date"
        onConfirm={date => {
          setHideDatePickerStart();
          setStartDate(date);
        }}
        date={startDate || new Date()}
        onCancel={setHideDatePickerStart}
      />
      <DateTimePickerModal
        isVisible={visibleDatePickerEnd}
        mode="date"
        onConfirm={date => {
          setHideDatePickerEnd();
          setEndDate(date);
        }}
        date={endDate || new Date()}
        onCancel={setHideDatePickerEnd}
      />
      <Header title="T??m ki???m" />
      <KeyboardAwareScrollView style={{flex: 1}}>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="T??n kh??ch h??ng"
            input={{
              placeholder: 'Nh???p t??n kh??ch h??ng',
              value: fullname,
              onChangeText: text => setFullname(text),
            }}
          />
        </VStack>
        <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <InputVStack
            label="S??? ??i???n tho???i"
            input={{
              placeholder: 'Nh???p s??? ??i???n tho???i',
              value: phonenumber,
              onChangeText: text => setPhonenumber(text),
              keyboardType: 'number-pad',
            }}
          />
        </VStack>
        {/* <VStack width="90%" alignSelf="center" background="white" shadow={1} p="2" mt="5%">
          <Text color="#808080" fontSize={14}>
            Ng??y tr???
          </Text>
          <HStack justifyContent="space-between" alignItems="center">
            <TouchableOpacity style={styles.btnDate} onPress={setVisibleDatePickerStart}>
              <Text
                adjustsFontSizeToFit
                mt="1"
                fontSize={18}
                color={!startDate ? '#808080' : 'black'}>
                {startDate ? format(startDate) : 'T??? ng??y'}
              </Text>
              <Divider mt="1" />
            </TouchableOpacity>
            <Text>~</Text>
            <TouchableOpacity style={styles.btnDate} onPress={setVisibleDatePickerEnd}>
              <Text
                adjustsFontSizeToFit
                mt="1"
                fontSize={18}
                color={!endDate ? '#808080' : 'black'}>
                {endDate ? format(endDate) : '?????n ng??y'}
              </Text>
              <Divider mt="1" />
            </TouchableOpacity>
          </HStack>
        </VStack> */}
        <TouchableOpacity style={styles.btnSignin} onPress={handleSubmit}>
          <Text fontSize={18} fontWeight="bold" color="white">
            ??p d???ng
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Filter;
