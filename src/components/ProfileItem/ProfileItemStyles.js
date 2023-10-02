import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 12,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconParent: {
    height: 30,
    width: 30,
    backgroundColor: '#F4F9FD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
  },
  line: {
    width: Metrics.screenWidth,
    borderColor: '#E4E6E8',
    borderBottomWidth: 1,
  },
});
