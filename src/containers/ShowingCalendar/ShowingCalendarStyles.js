import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  list: {
    borderTopColor: '#E4E6E8',
    borderTopWidth: 1,
    padding: 25,
  },
  listItem: {
    backgroundColor: '#F4F9FD',
    marginVertical: 7,
    padding: 7,
    borderRadius: 14,
    flexDirection: 'row',
  },
  addButton: {
    marginTop: 20,
    flex: 1,
  },
  actionsBtnWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
