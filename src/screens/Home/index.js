import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import {Avatar, HStack, Text, VStack} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {get} from 'lodash';

import SvgIcon from '~/components/SvgIcon';
import styles from './styles';
import Header from '~/components/Header';
import {scale} from 'react-native-size-matters';
import {navigate} from '~/utils/navigationHelpers';
import {FILTER} from '~/constants/Routes';

const Home = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const session = useSelector(state => get(state, 'session'));
  const [data, setData] = useState([{name: 'Doan Phung Tu'}, {name: 'Doan Phung Tu'}]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity>
        <HStack
          background="white"
          px={scale(16)}
          py={scale(12)}
          alignItems={'center'}
          borderRadius={10}
          shadow={1}>
          <Avatar mr={scale(12)} background={'#F7F8FA'}>
            T
          </Avatar>
          <VStack flex="1">
            <Text fontSize={18} fontWeight={'bold'}>
              {item?.name || ''}
            </Text>
            <Text fontSize={14}>0968312000</Text>
            <Text fontSize={14}>27/03/2022</Text>
          </VStack>
        </HStack>
      </TouchableOpacity>
    );
  };

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
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{padding: scale(12)}}
        data={data}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <VStack height={scale(12)} />}
      />
    </SafeAreaView>
  );
};

export default Home;
