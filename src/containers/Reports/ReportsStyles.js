import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
    container: {flex: 1, backgroundColor: 'white'},
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E6EDF5',
        padding: 5,
        borderRadius: 25,
        marginHorizontal: 20,
        marginTop: 20
    },
    selectedTab: {
        backgroundColor: Colors.backgroundAccent,
        borderRadius: 25,
        padding: 10,
        paddingHorizontal: 30
    },
    tabTransparent: {
        backgroundColor: Colors.transparent,
    },
    itemContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
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
    conformationButton: {
        flex: 1,
        borderColor: Colors.background.secondary,
        borderWidth: 1,
        marginTop: 10,
        marginHorizontal: 30,
    }
});
