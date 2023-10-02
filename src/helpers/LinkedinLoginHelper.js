import React from 'react';
import {Image as RnImage, TouchableOpacity, Button} from 'react-native';
import {activeOpacity} from '../constants';
import styles from '../containers/Login/LoginStyles';
import {Images} from '../theme';
import LinkedInModal from 'react-native-linkedin';

export default class AppContainer extends React.Component {
    linkedRef = React.createRef();

    // logoutFun = async () => {
    //     setIsLoggedOut(true);
    //     await AsyncStorage.setItem('ISLOGGEDIN', false);
    //     props.navigation.replace('LoginWithLinkedIn');
    // };

    render() {
        return (
            <LinkedInModal
                ref={this.linkedRef}
                clientID="78trrwdfp4c0as"
                clientSecret="Z0a6OYduf10vxzMf"
                redirectUri="http://localhost:8081/auth/linkedin/callback"
                onSuccess={token => {
                    const payload = {
                        platform: 'app',
                        token: token.access_token,
                        tokenType: 'linkedin',
                        redirectUri: 'http://localhost:8081/auth/linkedin/callback'
                    };
                    this.props.socialLoginHandler(payload);
                }}
                renderButton={() => (
                    <TouchableOpacity
                        onPress={() => {
                            this.linkedRef.current.logoutAsync();
                            this.linkedRef.current.open();
                        }}
                        activeOpacity={activeOpacity.medium}
                        style={[styles.socialLoginItem, {paddingHorizontal: 24}]}>
                        <RnImage
                            source={Images.linkedin_in}
                            resizeMode="contain"
                            style={styles.socialLoginItemImage}
                        />
                    </TouchableOpacity>
                )}
            />
        );
    }
}


// const [payload, setPayload] = useState();
// const getUser = async data => {
//     const {access_token, authentication_code} = data;
//     if (!authentication_code) {
//         const response = await fetch(
//             'https://api.linkedin.com/v2/me?projection= (id,firstName,lastName,profilePicture(displayImage~:playableStreams) )',
//             {
//                 method: 'GET',
//                 headers: {
//                     Authorization: 'Bearer ' + access_token,
//                 },
//             },
//         );
//         const apipayload = await response.json();
//         setPayload(apipayload);
//     } else {
//         alert(`authentication_code = ${authentication_code}`);
//     }
// };
