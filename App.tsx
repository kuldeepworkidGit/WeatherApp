import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DefaultTheme} from '@react-navigation/native';
import HomeScreen from './SRC/Screens/Homescreen';
import {ThemeProvider, useTheme} from './SRC/Theme/ThemeContext';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const AppContent = () => {
  const {theme} = useTheme(); // Get current theme
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  const backgroundStyle = {
    backgroundColor: theme === 'dark' ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={backgroundStyle} />
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <HomeScreen />

      <SafeAreaView
        style={theme === 'dark' ? styles.subContainerB : styles.subContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    backgroundColor: 'white',
  },
  subContainerB: {
    backgroundColor: '#404040',
  },
});

export default App;
