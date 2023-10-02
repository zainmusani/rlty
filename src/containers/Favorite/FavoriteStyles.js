import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  header: {
    backgroundColor: 'white',
    height: Metrics.navBarHeight - Metrics.statusBarHeight,
    width: Metrics.screenWidth,
    marginTop: Metrics.statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1.0,
    elevation: 5,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    borderBottomWidth: 1,
  },
});
