import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E6EDF5',
    padding: 5,
    borderRadius: 25,
    marginHorizontal: 20,
  },
  selectedTab: {
    backgroundColor: Colors.backgroundAccent,
    borderRadius: 25,
    padding: 10,
  },
  tabTransparent: {
    backgroundColor: Colors.transparent,
  },
});
