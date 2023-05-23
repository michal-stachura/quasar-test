import { boot } from 'quasar/wrappers';
import { date } from 'quasar';

const { formatDate } = date;

export default boot(async ({ app }) => {
  app.config.globalProperties.$niceDate = (value: string): string => {
    return formatDate(value, 'MMM D');
  };
});
