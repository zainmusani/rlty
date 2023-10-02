import _ from 'lodash';
import moment from 'moment';
import util from '../util';

export const manipulateProfileData = data => {
    if (_.isEmpty(data)) return {};

    const getTime = (time, staticTime) => {
        return new Date('2022-08-03T00:00:00.000Z'.replace('00:00:00', time?.includes(':') ? time : staticTime)).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
    };

    const from = getTime(data?.availability_from, '08:00:00');
    const to = getTime(data?.availability_to, '16:00:00');

    const newObj = {
        subscriptionCanceled: data?.is_cancelled,
        subscriptionEndTime: data?.subscription_end_time,
        subscriptionStartTime: data?.subscription_start_time,
        subscriptionId: data?.subscription_id,
        isUserFillSubscriptionForm: data?.is_checked ? true : false,
        freeConsumed: data?.free_consumed ? true : false,
        agentName: data?.full_name ? data?.full_name : '',
        agency: data?.agency_name ? data?.agency_name : '',
        location: data?.location ? data?.location : '',
        description: data?.bio ? data?.bio : '',
        from: moment(`2022-08-03 ${from}`, 'YYYY-MM-DD hh:mm A').format('YYYY-MM-DD HH:mm:ss'),
        to: moment(`2022-08-03 ${to}`, 'YYYY-MM-DD hh:mm A').format('YYYY-MM-DD HH:mm:ss'),
        availability: from + ' - ' + to,
        email: data?.email ? data?.email : '',
        contactNo: data?.phone ? data?.phone : '+1 675 346 23-10',
        image: data?.profile_image,
        isNotificationAllowed: data?.isNotificationAllowed || false,
    };
    return newObj;
};