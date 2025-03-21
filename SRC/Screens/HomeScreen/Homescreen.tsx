import React, {useEffect, useState} from 'react';
import {ScrollView, KeyboardAvoidingView, Switch, View} from 'react-native';
import WAText from '../../Components/WAText';
import WAInput from '../../Components/WAInput';
import {getWeather} from '../../Utils/Services';
import {checkWeatherNearMe} from '../../Utils/Helpers';
import WeatherCard from '../../Components/WeatherCard';
import Loader from '../../Components/Loader';
import {useTheme} from '../../Theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WeatherApiResponse, WeatherData} from './types';
import {styles} from './styles';

const HomeScreen: React.FC = () => {
  const {theme, toggleTheme} = useTheme();
  const [data, setData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let res: WeatherApiResponse | null = await getData();
      if (!res) {
        res = await checkWeatherNearMe();
      }

      if (res?.error) {
        setErrorMsg(res.error.message);
        setIsLoading(false);
      } else {
        setErrorMsg('');
        setData(res as WeatherData); // Type assertion
        setIsLoading(false);
      }
    })();
  }, []);

  const getData = async (): Promise<WeatherApiResponse | null> => {
    try {
      const res = await AsyncStorage.getItem('data');
      return res ? (JSON.parse(res) as WeatherApiResponse) : null;
    } catch (error) {
      return null;
    }
  };

  const searchWeather = async () => {
    setIsLoading(true);
    const res: WeatherApiResponse = await getWeather(location);

    if (res?.error) {
      setErrorMsg(res.error.message);
      setIsLoading(false);
    } else {
      setErrorMsg('');
      setData(res as WeatherData);
      setIsLoading(false);
      await AsyncStorage.setItem('data', JSON.stringify(res));
    }
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
          data && (
            <WeatherCard
              temperature={data.temp}
              location={data.location}
              icon={data.icon}
              condition={data.condition}
            />
          )
        )}
      </ScrollView>
      <View style={styles.subContainer}>
        <WAText value={theme} style={styles.themeText} />
        <Switch testID="switch-theme" value={theme === 'dark'} onValueChange={toggleTheme} />
      </View>
      <WAInput
        onChangeText={setLocation}
        onPress={searchWeather}
        isLoading={isLoading}
      />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
