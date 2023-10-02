import React from 'react';
import {useEffect} from 'react';
import {Image as RnImage, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getNotificationListRequest} from '../../actions/GeneralActions';
import {activeOpacity} from '../../constants';
import {Fonts, Images} from '../../theme';
import styles from "./styles";

const App = () => {
    const {notificationCount} = useSelector(state => state.general);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotificationListRequest({offset: 0, limit: 15, }));
    }, []);

    return (
        <TouchableOpacity
            onPress={() => Actions.notifications()}
            activeOpacity={activeOpacity.medium}>
            <RnImage source={Images.notification} />
            {!!notificationCount && <View style={styles.notificationsCount}></View>}
            {/* for count */}
            {/* <View style={styles.notificationsCount1}>
                <Text style={styles.countTxt1} size={Fonts.size.xxxxSmall}>99+</Text>
            </View> */}
        </TouchableOpacity>
    );
};

export default App;