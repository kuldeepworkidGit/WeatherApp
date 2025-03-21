import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './SRC/Screens/HomeScreen/Homescreen';
import {ThemeProvider, useTheme} from './SRC/Theme/ThemeContext';
import { themeLight } from './SRC/Utils/Color';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const AppContent = () => {
  const {theme} = useTheme();

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
    backgroundColor: themeLight.white,
  },
  subContainerB: {
    backgroundColor: '#404040',
  },
});

export default App;
