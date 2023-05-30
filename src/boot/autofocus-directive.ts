import { boot } from 'quasar/wrappers';
import { autofocusDirective } from 'src/directives/autofocus-directive';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.directive('autofocus', autofocusDirective);
});
