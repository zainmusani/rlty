import _ from 'lodash';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import util from '../util';

export const FBLogin = (loginRequest) => {
    LoginManager.logOut();
    LoginManager.logInWithPermissions([
        // 'name',
        // 'picture',
        'email',
        // 'public_profile',
    ]).then(
        function (result) {
            if (result.isCancelled) {
                // console.warn('user has cancelled the fb login pop up');
                // errorCallback();
            } else {
                AccessToken.getCurrentAccessToken().then(data => {
                    loginRequest({token: data.accessToken, tokenType: 'facebook'});
                });
            }
        },
        function (error) {
            console.log({error});
            util.socialLoginError(error);
        },
    );
};
