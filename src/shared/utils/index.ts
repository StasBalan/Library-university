import moment from 'moment';

export function getDate(date: Date) {
  moment.locale('en');

  return moment.utc(date).calendar();
}
