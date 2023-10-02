import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {},
  headerImage: {
    alignSelf: 'center',
    marginTop: 16,
  },
  content: {
    paddingHorizontal: 27,
    paddingTop: Metrics.statusBarHeight,
    flex: 1,
  },
  contentInner: {
    marginTop: 30,
    paddingHorizontal: 25,
    paddingVertical: 27,
    backgroundColor: 'white',
    borderRadius: 25,
  },

  socialLoginContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 26,
  },
  socialLoginItem: {
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: 21,
    paddingVertical: 18,
    borderRadius: 14,
  },
  socialLoginItemImage: {alignSelf: 'center'},
  orParent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginTop: 35,
  },
  line: {
    borderColor: '#C4C4C4',
    borderTopWidth: 1,
    flex: 1,
  },
  forgotParent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  loginButton: {marginTop: 45},

  //old
  buttonParent: {
    marginTop: 15,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  button: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    height: 25,
    width: 27,
  },
  forgotText: {
    alignSelf: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  termServiceText: {
    alignSelf: 'center',
    marginTop: 13,
    textAlign: 'center',
  },
  betaImage: {
    position: 'absolute',
    zIndex: 100,
    height: 100,
    width: 100,
    resizeMode: 'contain',
    top: Metrics.statusBarHeight,
  },
});
