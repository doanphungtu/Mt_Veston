import React from 'react';
import {get} from 'lodash';
import {SvgXml} from 'react-native-svg';
import home from './icons/home';

const iconName = {
  home,
};

const SvgIcon = props => {
  return <SvgXml xml={get(iconName, props.name, 'home')} {...props} />;
};

export default SvgIcon;
