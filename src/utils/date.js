import moment from 'moment';
export const getNow = () => moment.unix() / 1000
export const formatDate = (unix, format = 'DD.MM.YYYY') => moment.unix(unix).format(format);