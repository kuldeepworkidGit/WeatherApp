import {StyleSheet} from 'react-native';
import {themeLight} from '../../Utils/Color';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errText: {fontWeight: 'bold', marginTop: 20, textAlign: 'center'},
  lightBG: {backgroundColor: themeLight.white},
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
