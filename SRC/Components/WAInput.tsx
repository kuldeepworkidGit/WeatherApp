import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import WAButton from './WAButton';
import {themeLight} from '../Utils/Color';
import {useTheme} from '../Theme/ThemeContext';

interface WAInputProps {
  onPress: () => void;
  onChangeText: (text: string) => void;
  isLoading?: boolean;
}
function WAInput(props: WAInputProps): React.JSX.Element {
  const {onPress, onChangeText, isLoading} = props;
  const {theme} = useTheme();
  return (
    <View style={[styles.container, theme === 'dark' && styles.darkBG]}>
      <TextInput
        style={[styles.input, theme === 'dark' ? styles.darkB : styles.darkL]}
        placeholder="Search"
        onChangeText={onChangeText}
        placeholderTextColor={theme === 'dark' ? themeLight.white : 'black'}
      />
      <WAButton title="Search" onPress={onPress} isLoading={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    backgroundColor: themeLight.white,
    elevation: 7,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    borderWidth: 1,
    height: 56,
    borderRadius: 8,
    borderColor: themeLight.borderColor,
    marginBottom: 10,
    paddingHorizontal: 5,
  },

  darkBG: {backgroundColor: '#404040'},
  darkB: {color: themeLight.white},
  darkL: {color: '#000'},
});

export default WAInput;
