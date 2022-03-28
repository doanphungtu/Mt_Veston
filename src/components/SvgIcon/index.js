import React from 'react';
import {get} from 'lodash';
import {SvgXml} from 'react-native-svg';
import home from './icons/home';
import header from './icons/header';

const iconName = {
  home,
  header,
};

const SvgIcon = props => {
  return <SvgXml xml={get(iconName, props.name, 'home')} {...props} />;
};

export default SvgIcon;
