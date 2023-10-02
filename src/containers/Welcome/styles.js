// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: "#D8E0F0",
    flex: 1,
    padding: Metrics.baseMargin,
    ...AppStyles.centerInner,
  },
  image: {width: 204, height: 62},
});
