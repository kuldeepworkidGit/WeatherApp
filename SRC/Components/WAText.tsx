import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {useTheme} from '../Theme/ThemeContext';
import {themeLight} from '../Utils/Color';

interface RATextProps extends TextProps {
  value: string;
  style?: TextStyle | TextStyle[];
}

function WAText(props: RATextProps): React.JSX.Element {
  const {value, style, ...rest} = props;
  const {theme} = useTheme();
  return (
    <Text
      style={[
        styles.container,
        theme === 'dark' && {color: themeLight.white},
        style,
      ]}
      {...rest}>
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
  },
});

export default WAText;
