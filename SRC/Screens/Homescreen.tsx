import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Switch,
  View,
} from 'react-native';
import WAText from '../Components/WAText';
import WAInput from '../Components/WAInput';
import {getWeather} from '../Utils/Services';
import {checkWeatherNearMe} from '../Utils/Helpers';
import WeatherCard from '../Components/WeatherCard';
import Loader from '../Components/Loader';
import {useTheme} from '../Theme/ThemeContext';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen(): React.JSX.Element {
  const {theme, toggleTheme} = useTheme();
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let res = await getData();
      if (!res) {
        res = await checkWeatherNearMe();
      }

      if (res?.error) {
        setErrorMsg(res?.error?.message);
        setIsLoading(false);
      } else {
        setErrorMsg('');
        setData(res);
        setIsLoading(false);
      }
    })();
  }, []);

  const getData = async () => {
    const res = await AsyncStorage.getItem('data');
    if (res) {
      return JSON.parse(res);
    }
    return null;
  };

  const searchWeather = async () => {
    setIsLoading(true);
    const res = await getWeather(location);

    if (res?.error) {
      setErrorMsg(res?.error?.message);
      setIsLoading(false);
    } else {
      setErrorMsg('');
      setData(res);
      setIsLoading(false);
    }
    await AsyncStorage.setItem('data', JSON.stringify(res));
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          theme === 'dark' ? styles.darkBG : styles.lightBG,
        ]}>
        <Loader />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[
        styles.container,
        theme === 'dark' ? styles.darkBG : styles.lightBG,
      ]}>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        style={styles.container}>
        {errorMsg && !!location ? (
          <WAText value={errorMsg} style={styles.errText} />
        ) : (
          <WeatherCard
            temperature={data?.temp}
            location={data?.location}
            icon={data?.icon}
            condition={data?.condition}
          />
        )}
      </ScrollView>
      {
        <View style={styles.subContainer}>
          <WAText value={theme} style={styles.themeText} />
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        </View>
      }
      <WAInput
        onChangeText={setLocation}
        onPress={searchWeather}
        isLoading={isLoading}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errText: {fontWeight: 'bold', marginTop: 20, textAlign: 'center'},
  lightBG: {backgroundColor: 'white'},
  darkBG: {backgroundColor: Colors.darker},
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    padding: 20,
  },
  themeText: {fontWeight: '600', textTransform: 'uppercase'},
});

export default HomeScreen;
