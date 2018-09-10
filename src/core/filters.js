import Vue from 'vue';
import moment from 'moment';

moment.locale('zh-cn');

// "2018-03-28T17:03:13.000Z"
Vue.filter('formatDate', (date, structure) => moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format(structure));

Vue.filter('avatarSize', (data, size) => `${data}!${size}`);

Vue.filter('dateFromNow', date => moment(date).fromNow());
