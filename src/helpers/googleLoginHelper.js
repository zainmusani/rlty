import {
    GoogleSignin,
    statusCodes
} from '@react-native-google-signin/google-signin';
import util from '../util';

GoogleSignin.configure({
    iosClientId: '884440680343-hp7jeomjrp7qhht6coirh1dcdbqpevdv.apps.googleusercontent.com',
    webClientId: '884440680343-992rebb4bsdf0srik67eahuoqofg9cop.apps.googleusercontent.com',
    offlineAccess: true
});

export const GoogleLogin = async (loginRequest) => {
    try {
        await GoogleSignin.signOut();

        const hasGooglePlayServices = await GoogleSignin.hasPlayServices();
        if (!hasGooglePlayServices) {
            util.socialLoginError('Not working now', "google");
        }
        const userInfo = await GoogleSignin.signIn();
        loginRequest({
            token: userInfo.idToken,
            tokenType: 'google',
        });
    } catch (error) {
        console.log(error);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            util.socialLoginError("Operation in progress", "google");
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            util.socialLoginError("Service unavailable", "google");
        } else {
            util.socialLoginError(statusCodes, "google");
        }
    }
};