import { boot } from 'quasar/wrappers';
import { highlightDirective } from 'src/directive/highlight-directive';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.directive('highlight', highlightDirective);
});
