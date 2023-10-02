import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    height: Metrics.tabBarHeight,
    backgroundColor: Colors.white,
  },
  blackContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    ...AppStyles.flexRow,
    ...AppStyles.spaceAround,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderTopColor: Colors.background.secondary,
    borderRightColor: Colors.background.secondary,
    borderLeftColor: Colors.background.secondary,
    borderWidth: 1,
    borderBottomWidth: 0,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1.0,

    elevation: 1,
  },
  itemWrapper: {
    alignItems: 'center',
  },
  btn1: {
    marginTop: 10,
    width: 50,
    height: 30,
    ...AppStyles.centerInner,
  },
});
