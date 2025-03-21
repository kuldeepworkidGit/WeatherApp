import React from 'react';
import {StyleSheet, Pressable, PressableProps} from 'react-native';
import WAText from './WAText';
import {themeLight} from '../Utils/Color';
import Loader from './Loader';
import {useTheme} from '../Theme/ThemeContext';

interface WAButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
}

function WAButton(props: WAButtonProps): React.JSX.Element {
  const {title, isLoading, ...rest} = props;
  const {theme} = useTheme();
  return (
    <Pressable
      style={[styles.container, theme === 'dark' && styles.dark]}
      disabled={isLoading}
      {...rest}>
      {isLoading ? (
        <Loader />
      ) : (
        <WAText
          value={title}
          style={[styles.title, ...(theme === 'dark' ? [styles.darkText] : [])]}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: themeLight.themeColor,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
  },
  title: {
    color: themeLight.themeColor,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dark: {borderColor: themeLight.white},
  darkText: {color: themeLight.white},
});

export default WAButton;
