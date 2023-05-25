import { boot } from 'quasar/wrappers';
import { LocalStorage } from 'quasar';

export default boot(async ({ router }) => {
  router.beforeEach((to) => {
    const loggedIn = LocalStorage.getItem('loggedIn');

    if (!loggedIn && to.name !== 'Auth') {
      return { name: 'Auth' };
    }
    return true;
  });
});
