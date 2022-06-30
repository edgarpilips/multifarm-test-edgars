import moment from 'moment';

export const formatAprValue = (value: number) => {
  return value.toFixed(2) + '%';
};

export const formatTvlValue = (value: number) => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(2) + 'B';
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(2) + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(2) + 'k';
  }
  return value.toFixed(2);
};

export const formatXAxisDate = (date: string) => {
  return moment(date).format('MMM D');
};
