import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { Images } from '../theme';
import util from '../util';

// export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const APP_URL = '';
export const APP_DOMAIN = '';
export const QUERY_LIMIT = 10;
export const SAGA_ALERT_TIMEOUT = 500;

// date time formats
export const DATE_FORMAT1 = 'dddd, DD MMMM, YYYY';

// Messages
export const stripeKeys = {
  publishableKey:
    'pk_test_51LpYz5Di1ArLKWwEvlVj45SyHTkau8yWxAIr87eZ2mrl6HgTCe1YGLPYFZCEpozeeZFNuDWZyifZjLAkgemYBEPy006vGpQwwk',
  // publishableKey1:
  //   'pk_test_51KjhLRBKK2uXhQtKEdgaLEshbU89WLEBT97r4gSQzjA2oq8FeDaRwNA67sNr2TH53W2gdHHIeDFbZ6JZnT1YtWIm00LvF7nDDY',
};

export const merchant_id = 'merchant.com.rlty';
// export const merchant_id_1 = 'merchant.com.myrlty';

export const subscriptionTabs = [
  { id: 2, label: 'Monthly' },
  { id: 3, label: 'Yearly' },
];

export const LOCATION_PERMISSION_DENIED_ERROR2 =
  'Location permission required, please go to app settings to allow access';
export const INVALID_NAME_ERROR = 'Invalid name';
export const INVALID_EMAIL_ERROR = 'Invalid email';
export const INTERNET_ERROR = 'Please connect to the working internet';
export const SESSION_EXPIRED_ERROR = 'Session expired, Please login again';
export const INVALID_PASSWORD_ERROR =
  'Password must contain 8 to 10 characters including 1 small letter, 1 capital letter, 1 digit and 1 special character!';
export const SOMETHING_WRONG = 'Something went wrong';
export const hundredYearsMilliseconds = 3153600000000;
export const tenYearsMilliseconds = 31536000000;

export const minimumHundredYear = util.isPlatformAndroid() ? Date.now() - hundredYearsMilliseconds : new Date(`01-01-${new Date().getFullYear() - 100}`);

export const maxTenYear = util.isPlatformAndroid() ? Date.now() + tenYearsMilliseconds : new Date(`01-01-${new Date().getFullYear() + 10}`);

// export const maxTenYear = moment().add(10, "years").format();

export const maximumCurrentDate = new Date();
export const moreThanCharError = (length = 255) =>
  `more than ${length} characters not allowed`;

export const strings = {
  PROPERTY_SOLD: 'Are you sure you want to mark this property as sold?',
  PROPERTY_SELL_AND_BUYER_NOT_ADDED_SOLD:
    "You haven't added any buyer or seller on this property. Are you sure you want to mark this property as sold?",
  PROPERTY_BUYER_NOT_ADDED_SOLD:
    "You haven't added any buyer on this property. Are you sure you want to mark this property as sold?",
  PROPERTY_SALLER_NOT_ADDED_SOLD:
    "You haven't added any seller on this property. Are you sure you want to mark this property as sold?",
};

// Message types
export const MESSAGE_TYPES = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
};
//Activeopacity values
export const activeOpacity = {
  high: 0.2,
  medium: 0.5,
  low: 0.8,
  off: 100,
};

export const NOTIFICATION_TYPES = {
  showing_notification: "showings_notification",
  buyer_notification: "open_period_end_buyer_notification",
  seller_notification: "open_period_end_seller_notification"

};


// File Types
export const FILE_TYPES = { VIDEO: 'video', IMAGE: 'image', AUDIO: 'audi' };

//User fields names

export const USER_FIELDS_NAME = {
  NAME: 'name',
  ADDRESS: 'address',
  PROPERTIES: 'properties',
  MSL_PROPERTIES: 'mslProperties',
  SALE_PROPERTIES: 'saleProperties',
  IMAGE: 'image',
  AGENCY: 'agency',
  AVAILABILITY: 'availability',
  EMAIL: 'email',
  PHONE: 'phone',
  PREFERENCES: 'preferences',
  LOCATION: 'location',
  BIO: 'bio',
};
export const defaultImage =
  'https://rlty-dev.s3.amazonaws.com/ea5e5aca6e6e429d89a08d2c42bfc402.jpg';

//phone input country list
export const phoneInputCountryList = [
  {
    name: 'France',
    iso2: 'fr',
    dialCode: '33',
    priority: 0,
    areaCodes: null,
  },
  {
    name: 'United States',
    iso2: 'us',
    dialCode: '1',
    priority: 0,
    areaCodes: null,
  },
  {
    name: 'Canada',
    iso2: 'ca',
    dialCode: '1',
    priority: 1,
    areaCodes: [
      '204',
      '226',
      '236',
      '249',
      '250',
      '289',
      '306',
      '343',
      '365',
      '387',
      '403',
      '416',
      '418',
      '431',
      '437',
      '438',
      '450',
      '506',
      '514',
      '519',
      '548',
      '579',
      '581',
      '587',
      '604',
      '613',
      '639',
      '647',
      '672',
      '705',
      '709',
      '742',
      '778',
      '780',
      '782',
      '807',
      '819',
      '825',
      '867',
      '873',
      '902',
      '905',
    ],
  },
  {
    name: 'Australia',
    iso2: 'au',
    dialCode: '61',
    priority: 0,
    areaCodes: null,
  },
  {
    name: 'United Kingdom',
    iso2: 'gb',
    dialCode: '44',
    priority: 0,
    areaCodes: null,
  },
  {
    name: 'Pakistan (‫پاکستان‬‎)',
    iso2: 'pk',
    dialCode: '92',
    priority: 0,
    areaCodes: null,
  },
  {
    name: 'India (भारत)',
    iso2: 'in',
    dialCode: '91',
    priority: 0,
    areaCodes: null,
  },
  {
    name: 'Oman (‫عُمان‬‎)',
    iso2: 'om',
    dialCode: '968',
    priority: 0,
    areaCodes: null,
  },
  {
    name: 'United Arab Emirates (‫الإمارات العربية المتحدة‬‎)',
    iso2: 'ae',
    dialCode: '971',
    priority: 0,
    areaCodes: null,
  },
];

export const PROFILE_SCREEN_DATA = [
  {
    label: 'Buyers',
    icon: Images.Buyers,
    onPress: () => Actions.buyers(),
  },
  {
    label: 'Sellers',
    icon: Images.Buyers,
    onPress: () => Actions.sellers(),
  },
  {
    label: 'Reports',
    icon: Images.Reports,
    onPress: () => Actions.reports(),
  },
  {
    label: 'My Properties',
    icon: Images.MyPropertiesSmallIcon,
    onPress: () => Actions.myPropertiesSecondStack(),
  },
  {
    label: 'Showings',
    icon: Images.Showings,
    onPress: () => Actions.showings(),
  },
  {
    label: 'line',
    icon: Images.Showings,
    onPress: () => { },
  },
  {
    label: 'Change Password',
    icon: Images.ChangePasswordIcon,
    onPress: () => Actions.changePassword(),
  },
  {
    label: 'Subscription',
    icon: Images.subscription,
    onPress: () => Actions.subscription(),
  },
  {
    label: 'Push Notifications',
    icon: Images.PushNotificationSmallIcon,
    onPress: () => { },
  },
  {
    label: 'About',
    icon: Images.about,
    onPress: () => Actions.about(),
  },
  {
    label: 'Information',
    icon: Images.Information,
    onPress: () => Actions.information(),
  },
];

export const VIEW_PROFILE_ITEMS = [
  {
    label: 'Agency',
    data: USER_FIELDS_NAME.AGENCY,
    icon: Images.agencyIcon,
  },
  {
    label: 'Availability',
    data: USER_FIELDS_NAME.AVAILABILITY,
    icon: Images.time,
  },
  {
    label: 'Email',
    data: USER_FIELDS_NAME.EMAIL,
    icon: Images.emailIcon,
  },
  {
    label: 'Contact No,',
    data: USER_FIELDS_NAME.PHONE,
    icon: Images.contact,
  },
];
export const ONLY_CHAR_NUM_ERROR = 'only numbers are not valid.';
export const lorenIpsum =
  'This is dummy copy. It is not meant to be read. It has been placed here solely to demonstrate the look and feel of finished, typeset text. Only for show. He who searches for meaning here will be sorely disappointed.  These words are here to provide the reader with a basic impression of how actual text will appear in its final presentation. Think of them merely as actors on a paper stage, in a performance devoid of content yet rich in form. That being the case, there is really no point in your continuing to read them. After all, you have many other things you should be doing.';

export const types = [
  { id: 1, category_name: 'Residential' },
  { id: 2, category_name: 'Land' },
  { id: 3, category_name: 'Commercial' },
];

export const FILTER_ITEMS = [
  { value: 'By Location', key: 'location' },
  { value: 'Sold Properties', key: 'sold' },
  { value: 'Un-sold Properties', key: 'unsold' },
  { value: 'Residential', key: types[0].id },
  { value: 'Land Lot', key: types[1].id },
  { value: 'Commercial', key: types[2].id },
];

export const PROPERTY_TYPES = [
  {
    id: types[0].id,
    label: 'Residential',
    selected: true,
  },
  {
    id: types[1].id,
    label: 'Land',
    selected: false,
  },
  {
    id: types[2].id,
    label: 'Commercial',
    selected: false,
  },
];

export const PROPERTY_TYPE_NAMES = ['Residential', 'Land', 'Commercial'];

export const MY_PROPERTY_ACTIONS = [
  {
    id: util.generateGuid(),
    label: 'Mark as Sold',
    onPress: () => { },
  },
  // {
  //   id: util.generateGuid(),
  //   label: 'Add Buyer Details',
  //   onPress: ({propertyId}) => Actions.addBuyerDetails({propertyId}),
  // },
  // {
  //   id: util.generateGuid(),
  //   label: 'Add Seller Details',
  //   onPress: ({propertyId}) => Actions.addSellerDetails({propertyId}),
  // },
  {
    id: util.generateGuid(),
    label: 'Edit',
    onPress: item => Actions.addProperty({ item: item }),
  },
  {
    id: util.generateGuid(),
    label: 'Delete',
    onPress: () => { },
  },
];

export const SOCIAL_LOGIN_TYPES = {
  google: 'google',
  apple: 'apple',
  facebook: 'facebook',
};
