import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  containerUnread: {backgroundColor: Colors.background.tertiary},
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    height: 40,
    width: 40,
    marginRight: 10,
  },
  image: {height: 40, width: 40},
});
