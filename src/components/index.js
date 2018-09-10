
import Alert from './Alert';
import Button from './Button';
import Confirm from './Confirm';
import DataFilter from './DataFilter';
import Notify from './Notify';
import Pager from './Pager';
import PopConfirmButton from './PopConfirmButton';

const components = [
  Alert,
  Button,
  Confirm,
  DataFilter,
  Notify,
  Pager,
  PopConfirmButton,
];

export default {
  install(Vue, options) {
    components.forEach(item => {
      Vue.use(item, options);
    });
  },
};
