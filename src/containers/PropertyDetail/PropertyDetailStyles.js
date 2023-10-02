import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  scrollViewContainer: {
    padding: 20,
  },
  headerImageParent: {
    width: Metrics.screenWidth - 40,
    height: 200,
    overflow: 'hidden',
    borderRadius: 14,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  headerImage: {
    width: Metrics.screenWidth - 40,
    height: 200,
  },
  favSection: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBg: {
    height: 40,
    width: 40,
    backgroundColor: '#F4F9FD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 10,
  },
  iconBig: {
    height: 17,
    width: 17,
  },
  mapImageParent: {
    width: Metrics.screenWidth - 40,
    height: 120,
    overflow: 'hidden',
    borderRadius: 14,
    marginTop: 25,
  },
  mapImage: {
    width: Metrics.screenWidth - 40,
    height: 120,
  },
  photoImageParent: {
    height: 96,
    width: 105,
    overflow: 'hidden',
    borderRadius: 17,
    marginBottom: 10,
    marginLeft: 10,
  },
  photoImage: { height: 96, width: 105 },
  imageOverly: {
    height: '100%',
    width: '100%',
    opacity: 0.7,
    backgroundColor: '#0D1D36',
    position: 'absolute',
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conformationButton: {
    flex: 1,
    borderColor: Colors.background.secondary,
    borderWidth: 1,
  },
  iconBgBig: {
    height: 45,
    width: 45,
    backgroundColor: '#F4F9FD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 10,
  },
  iconBig: {
    height: 20,
    width: 20,
  },
  markAsSoldBtn: {
    width: 280,
    height: 48,
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  markTxt: {
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },
  buyerSellerBtnWrapper: {
    flexDirection: 'row', marginTop: 15, justifyContent: "space-between"
  },
  addDetailBtn: {
    flex: 0.5,
    height: 48,
    backgroundColor: "#fff",
    borderColor: '#0d1d36',
    borderWidth: 1
  },
  borderBottom: {
    color: "blue",
    borderBottomWidth: 1,
    borderBottomColor: "blue",
  }
});
