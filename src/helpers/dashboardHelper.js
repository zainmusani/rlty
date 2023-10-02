import _ from 'lodash';

export const manipulateRevenueData = data => {
    if (_.isEmpty(data)) return {};
    const newObj = {
        curMonthRevenue: +data?.current_month_rev || 0,
        preMonthRevenue: data?.pre_month_rev,
        difference: data?.diff >= 0 ? data?.diff == 0 ? 0 : `+${(Math.round(data?.diff))}% ` : `${Math.round(data?.diff)}% ` || 0,
    };

    return newObj;
};