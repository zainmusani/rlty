import _ from 'lodash';
import moment from 'moment';
import util from '../util';

// in this manipulator we are getting some params from API
export function manipulateShowingListData(data) {
  try {
    if (_.isEmpty(data)) return {};

    const {getHoursAndMinutes} = util;

    const time = (date, time, formate = 'YYYY-MM-DD HH:mm:ss') => {
      //   const temp = moment
      //     .utc(date.replace('00:00:00', time))
      //     .local()
      //     .format(formate);
      const formattedDate = `${date.replace('T00:00:00', `T${time}`)}`;
      const timedifference = new Date().getTimezoneOffset();

      const newDate = moment(formattedDate).utc(false);
      const timeZoneDate =
        timedifference < 0
          ? newDate.add(Math.abs(timedifference), 'minutes').format(formate)
          : newDate
              .subtract(Math.abs(timedifference), 'minutes')
              .format(formate);

      return timeZoneDate;
    };

    const dates = [
      ...new Set(
        data?.map((obj, i) =>
          time(obj?.date, data[i].start_time, 'YYYY-MM-DD'),
        ),
      ),
    ];
    let objectList = {};

    let i = 0;

    console.log('muz -->> ', {dates});
    for (let date of dates) {
      const dateKey = time(date, data[i].start_time, 'YYYY-MM-DD');
      if (!objectList?.[dateKey]?.dots) {
        objectList = {
          ...objectList,
          [dateKey]: {
            dots: [],
          },
        };
      }

      const filteredDates = data?.filter(
        (obj, j) => time(obj?.date, data[j].start_time, 'YYYY-MM-DD') === date,
      );

      for (let obj of filteredDates) {
        const payload = {
          color: '#999999',
          key: obj?.name,
          id: obj?.id,
          start: time(obj?.date, obj?.start_time, 'hh:mm A'),
          end: time(obj?.date, obj?.end_time, 'hh:mm A'),
          description: obj?.description,
          date: time(obj?.date, obj?.start_time, 'YYYY-MM-DD HH:mm:ss'),
          address: obj?.address,
          hours: String(
            getHoursAndMinutes(
              moment(time(obj?.date, obj?.start_time)).format('HH:mm A'),
              moment(time(obj?.date, obj?.end_time)).format('HH:mm A'),
              'hours',
            ),
          ),
        };

        objectList[dateKey]?.dots?.push(payload);
      }

      i++;
    }

    console.log({objectList});

    return objectList;
  } catch (error) {
    console.log('error --->>>', error);
    return {};
  }
}

// dates?.map(
//     (date, i) =>
//     (objectList[time(date, data[i].start_time, 'YYYY-MM-DD')] = {
//         dots: data
//             ?.filter(obj => obj?.date === date)
//             ?.map(obj => ({
//                 color: '#999999',
//                 key: obj?.name,
//                 id: obj?.id,
//                 start: time(obj?.date, obj?.start_time, 'hh:mm A'),
//                 end: time(obj?.date, obj?.end_time, 'hh:mm A'),
//                 description: obj?.description,
//                 date: moment(obj?.date).format('YYYY-MM-DD HH:mm:ss'),
//                 address: obj?.address,
//                 hours: String(
//                     getHoursAndMinutes(
//                         moment(time(obj?.date, obj?.start_time)).format('HH:mm A'),
//                         moment(time(obj?.date, obj?.end_time)).format('HH:mm A'),
//                         'hours',
//                     ),
//                 ),
//             })),
//     }),
// );

// in this manipulator we are getting some params from API
export function manipulateShowingListData2(data) {
  if (_.isEmpty(data)) return {};
  const {convertUtcDateTimeIntoLocale, getHoursAndMinutes} = util;
  const time = (date, time, formate = 'YYYY-MM-DD HH:mm:ss') => {
    const temp = moment
      .utc(date.replace('00:00:00', time))
      .local()
      .format(formate);

    return temp;
  };

  const dates = [...new Set(data?.map(obj => obj?.date))];
  console.log('wrong -->>>', dates);
  const objectList = {};
  dates?.map((date, i) => {
    console.log(
      'wrong',
      moment(date).format('DD-MM-YYYY'),
      data?.filter(
        obj =>
          moment(obj?.date).format('DD-MM-YYYY') ===
          moment(date).format('DD-MM-YYYY'),
      ),
    );
    objectList[time(date, data[i].start_time, 'YYYY-MM-DD')] = {
      dots: data
        ?.filter(
          obj =>
            moment(obj?.date).utc(true).format('DD-MM-YYYY') ===
            moment(date).utc(true).format('DD-MM-YYYY'),
        )
        ?.map(obj => {
          console.log(
            'main2',
            time(date, data[i].start_time, 'YYYY-MM-DD'),
            obj.date,
            obj,
          );
          return {
            color: '#999999',
            key: obj?.name,
            id: obj?.id,
            start: time(obj?.date, obj?.start_time, 'hh:mm A'),
            end: time(obj?.date, obj?.end_time, 'hh:mm A'),
            description: obj?.description,
            date: time(obj?.date, obj?.start_time),
            address: obj?.address,
            hours: String(
              getHoursAndMinutes(
                moment(time(obj?.date, obj?.start_time)).format('HH:mm A'),
                moment(time(obj?.date, obj?.end_time)).format('HH:mm A'),
                'hours',
              ),
            ),
          };
        }),
    };
  });

  return objectList;
}
