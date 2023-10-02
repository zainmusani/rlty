import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  agentSection: {
    paddingRight: 10,
    flexDirection: 'row',
    paddingVertical: 15,

    alignItems: 'center',
  },
  iconBg: {
    height: 45,
    width: 45,
    backgroundColor: '#F4F9FD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 10,
  },
  icon: {
    height: 17,
    width: 17,
  },
});
