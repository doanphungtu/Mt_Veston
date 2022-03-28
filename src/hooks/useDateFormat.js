import moment from 'moment';

import {DATE_FORMAT} from '../constants/DateFormat';

export default function useDateFormat() {
  const format = (date = moment(), _df) => {
    return moment(date).format(DATE_FORMAT[_df]);
  };

  return {
    format,
  };
}
