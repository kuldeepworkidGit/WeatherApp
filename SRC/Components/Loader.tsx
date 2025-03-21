import React from 'react';
import {ActivityIndicator} from 'react-native';
import {themeLight} from '../Utils/Color';

function Loader(): React.JSX.Element {
  return <ActivityIndicator testID="loader" color={themeLight.themeColor} />;
}

export default Loader;
