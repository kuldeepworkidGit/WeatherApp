import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import WAText from './WAText';
import {useTheme} from '../Theme/ThemeContext';
import {themeLight} from '../Utils/Color';

interface WeatherCardProps {
  temperature: number;
  location: string;
  icon: string;
  condition: string;
}
function WeatherCard(props: WeatherCardProps): React.JSX.Element {
  const {temperature, location, icon, condition} = props;
  const {theme} = useTheme();
  return (
    <View
      style={[
        styles.headerContainer,
        theme === 'dark' ? styles.darkBG : styles.lightBG,
      ]}>
      <View style={styles.subContainer}>
        <WAText
          style={styles.degreeText}
          value={`${temperature}${'\u00b0'}C`}
        />
        <WAText style={styles.titleText} value={location} />
      </View>
      <View style={styles.imgContainer}>
        <Image source={{uri: `https:${icon}`}} style={styles.img} />
        <WAText style={styles.conditionText} value={condition} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    margin: 10,
    borderRadius: 8,
  },
  subContainer: {
    width: '80%',
  },
  degreeText: {
    fontSize: 30,
  },
  titleText: {marginVertical: 5, flex: 1},
  imgContainer: {alignItems: 'center'},
  img: {height: 60, width: 60, resizeMode: 'contain'},
  conditionText: {fontSize: 12, marginTop: -5},
  lightBG: {backgroundColor: themeLight.white},
  darkBG: {backgroundColor: '#404040'},
});

export default WeatherCard;
