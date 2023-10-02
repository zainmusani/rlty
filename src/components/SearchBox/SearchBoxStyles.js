import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  search: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: 'rgba(216, 224, 240, 1)',
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'android' ? 1 : 10,
    fontFamily: 'NunitoSans-Regular',
    zIndex: 999,
  },
  searchICon: {
    height: 15,
    width: 15,
    marginRight: 5,
  },
});
