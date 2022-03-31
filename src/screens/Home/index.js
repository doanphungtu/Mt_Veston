import React, {useEffect, useMemo} from 'react';
import {FlatList, RefreshControl, SafeAreaView, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar, HStack, Text, VStack} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {get} from 'lodash';
import database from '@react-native-firebase/database';
import moment from 'moment';

import styles from './styles';
import Header from '~/components/Header';
import {scale} from 'react-native-size-matters';
import {navigate} from '~/utils/navigationHelpers';
import {ADD_CUSTOMER, DETAIL_CUSTOMER, FILTER} from '~/constants/Routes';
import useBoolean from '~/hooks/useBoolean';
import {useNotification} from '~/hooks/useNotification';
import {getCustomerAction} from '~/store/customerSlice';
import {LoadingNormal} from '~/components/Loading';
import useDateFormat from '~/hooks/useDateFormat';
import FilterSection from './components/FilterSection';
import {getSearchName, getSearchPhonenumber} from '~/utils/customer';

const Home = () => {
  const dispatch = useDispatch();
  const session = useSelector(state => get(state, 'session'));
  const customer = useSelector(state => get(state, 'customer'));
  const {filterByName, filterByPhonenumber, filterStartDate, filterEndDate} = useSelector(
    state => state.customer.filter,
  );
  const {showErrorNotification} = useNotification();
  const {format} = useDateFormat();

  const {value: loading, setTrue: setShowLoading, setFalse: setHideLoading} = useBoolean();
  const {value: refreshing, setTrue: setShowRefreshing, setFalse: setHideRefreshing} = useBoolean();

  useEffect(() => {
    setShowLoading();
    getlistCustomer();
  }, []);

  const listCustomer = useMemo(() => {
    let data = [...customer.data];
    const isCustomerMatchDate = item => {
      switch (true) {
        case Boolean(filterStartDate) && moment(item?.payDate) < moment(filterStartDate):
        case Boolean(filterEndDate) && moment(item?.payDate) > moment(filterEndDate):
          return false;
      }
      return true;
    };
    data = data.filter(x => isCustomerMatchDate(x));

    data = getSearchName({data, searchKey: filterByName});
    data = getSearchPhonenumber({data, searchKey: filterByPhonenumber});
    return data;
  }, [filterByName, filterByPhonenumber, filterStartDate, filterEndDate, customer]);

  function getlistCustomer() {
    database()
      .ref('/customers')
      .orderByChild('uid')
      .equalTo(session?.userinfo?.id)
      .once('value')
      .then(snapshot => {
        setHideLoading();
        setHideRefreshing();
        if (snapshot.exists()) {
          let data = [];
          snapshot.forEach(child => {
            data.push({...child.val(), id: child?.key});
          });
          dispatch(getCustomerAction(data));
        }
      })
      .catch(() => {
        setHideLoading();
        setHideRefreshing();
        showErrorNotification('Hệ thống gặp lỗi. Vui lòng thử lại sau');
      });
  }

  function getTextAvt(name) {
    const nameSplit = name.split(' ');
    return nameSplit[nameSplit.length - 1][0];
  }

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigate(DETAIL_CUSTOMER, {
            data: item,
          })
        }>
        <HStack
          background="white"
          px={scale(16)}
          py={scale(12)}
          alignItems={'center'}
          borderRadius={10}
          shadow={1}>
          <Avatar mr={scale(12)} background={'#F7F8FA'}>
            {getTextAvt(item?.fullname || '')}
          </Avatar>
          <VStack flex="1">
            <Text fontSize={18} fontWeight={'bold'}>
              {item?.fullname || ''}
            </Text>
            <Text fontSize={14}>{item?.phonenumber}</Text>
            <Text fontSize={14}>{format(item?.payDate)}</Text>
          </VStack>
        </HStack>
      </TouchableOpacity>
    );
  };

  const isFiltered = useMemo(() => {
    return filterStartDate || filterEndDate || filterByName.length || filterByPhonenumber.length;
  }, [filterByName, filterByPhonenumber, filterStartDate, filterEndDate]);

  const renderListHeader = () =>
    isFiltered ? (
      <VStack pl={scale(11)}>
        <FilterSection />
      </VStack>
    ) : (
      <VStack />
    );

  return (
    <SafeAreaView style={styles.root}>
      <Header
        showBackButton={false}
        title="Trang chủ"
        headerRight={() => (
          <TouchableOpacity onPress={() => navigate(FILTER)}>
            <Ionicons name="ios-search" color="white" size={25} />
          </TouchableOpacity>
        )}
      />
      {!loading ? (
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{padding: scale(12)}}
          data={listCustomer}
          extraData={listCustomer}
          keyExtractor={(_, i) => String(i)}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <VStack height={scale(12)} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setShowRefreshing();
                getlistCustomer();
              }}
            />
          }
          ListHeaderComponent={renderListHeader}
        />
      ) : (
        <LoadingNormal />
      )}
      <TouchableOpacity onPress={() => navigate(ADD_CUSTOMER)} style={styles.btnAdd}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
