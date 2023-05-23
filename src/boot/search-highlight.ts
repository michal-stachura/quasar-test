import { boot } from 'quasar/wrappers';

export default boot(async ({ app }) => {
  app.config.globalProperties.$searchHighlight = (
    search: string,
    value: string
  ): string => {
    if (search) {
      const regex = new RegExp(search, 'gi');
      return value.replace(regex, '<span class="bg-yellow-6">$&</span>');
    }
    return value;
  };
});
