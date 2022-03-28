import React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import {Icon, Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {get} from 'lodash';

import SvgIcon from '~/components/SvgIcon';
import styles from './styles';
import {changeLanguageAction} from '~/store/sessionSlice';

const Home = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const session = useSelector(state => get(state, 'session'));

  const updateLanguage = () => {
    if (session?.language == 'en') {
      dispatch(changeLanguageAction('vi'));
    } else {
      dispatch(changeLanguageAction('en'));
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text color="slateGray.500" onPress={() => updateLanguage()}>
        Home
      </Text>
      <Text>{t('welcome')}</Text>
      <FontAwesome name="rocket" size={30} color="#900" />
      <SvgIcon name="home" fill="red" />
      <Icon as={SvgIcon} name="home" fill="grey" />
      <LottieView
        style={{width: 100, height: 100}}
        source={require('../../assets/lotties/skeleton.json')}
        autoPlay
        loop
      />
    </SafeAreaView>
  );
};

export default Home;
