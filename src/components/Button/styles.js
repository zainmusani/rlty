// @flow
import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.defaultUIHeight,
    borderRadius: 15,
  },
  spinner: {
    alignSelf: 'center',
  },
  opacity: {
    opacity: 0.5,
  },
  icon: {
    position: 'absolute',
    width: Metrics.icon.normal,
    height: Metrics.icon.normal,
  },
  iconCenter: {
    width: Metrics.icon.small,
    height: Metrics.icon.small,
  },
});
