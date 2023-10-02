// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.background.primary,
    paddingTop: Metrics.statusBarHeight,
    paddingHorizontal: Metrics.smallMargin,
    height: Metrics.navBarHeight,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1.0,
    elevation: 5,
  },

  btnImage: {
    width: 20,
    height: 20,
  },
  btnWrapper: {
    padding: Metrics.smallMargin,
    justifyContent: 'center',
    minWidth: 80,
  },
  rightBtn: {
    alignItems: 'flex-end',
  },
  searchHeader: {
    height: Metrics.navBarHeight + 50,
  },
  borderBottom: {
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    borderBottomWidth: 1,
  },
});
