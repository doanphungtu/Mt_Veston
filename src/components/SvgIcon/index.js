import React from 'react';
import {get} from 'lodash';
import {SvgXml} from 'react-native-svg';
import home from './icons/home';
import header from './icons/header';
import user from './icons/user';
import password from './icons/password';
import phone from './icons/phone';

const iconName = {
  home,
  header,
  user,
  password,
  phone,
};

const SvgIcon = props => {
  return <SvgXml xml={get(iconName, props.name, 'home')} {...props} />;
};

export default SvgIcon;
