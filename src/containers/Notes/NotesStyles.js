import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  showingParent: {
    backgroundColor: 'white',
    marginVertical: 6,
    marginHorizontal: 10,
    padding: 15,

    borderRadius: 14,
  },
  actionsBtnWrap: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  conformationButton: {
    flex: 1,
    borderColor: Colors.background.secondary,
    borderWidth: 1,
  },
});
