import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {marginTop: 20, marginHorizontal: 5},
  radioBtnRowView: {flexDirection: 'row', marginTop: 20, flex: 1},
  radioBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.5,
  },
  radioImgYes: {marginRight: 8, width: 24, height: 24},
  radioImgNo: {marginRight: 8, width: 20, height: 20},
});
