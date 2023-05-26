import { defineStore } from 'pinia';
import { RegisterUser, LoginUser } from 'src/types/User';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { LocalStorage, Loading, useQuasar } from 'quasar';
import { showErrorMessage } from 'src/composables/show-error-message';
import { useTasksStore } from './store-tasks';
import { firebaseAuth } from 'src/boot/firebase';

export const useAuthStore = defineStore('auth', () => {
  const $q = useQuasar();
  const router = useRouter();
  const tasksStore = useTasksStore();
  const { fbReadData, setTasksDownloadedValue, clearTasks } = tasksStore;

  const loggedIn = ref<boolean>(false);

  const registerUser = async (payload: RegisterUser) => {
    Loading.show();
    await firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'done',
          message: 'User registered'
        });
      })
      .catch((error) => {
        showErrorMessage(error.message);
      });
  };

  const loginUser = async (payload: LoginUser) => {
    Loading.show();
    await firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'done',
          message: 'Login successful'
        });
      })
      .catch((error: Error) => {
        showErrorMessage(error.message);
      });
  };

  const signOut = async () => {
    await firebaseAuth
      .signOut()
      .then(() => {
        loggedIn.value = false;
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'done',
          message: 'Successfully logged out'
        });
      })
      .catch((error: Error) => {
        showErrorMessage(error.message);
      });
  };

  const handleAuthStateChange = () => {
    firebaseAuth.onAuthStateChanged((user) => {
      Loading.hide();
      if (user) {
        loggedIn.value = true;
        LocalStorage.set('loggedIn', true);
        router.push('/').catch((error: Error) => {
          showErrorMessage(error.message);
        });
        fbReadData();
      } else {
        loggedIn.value = false;
        LocalStorage.set('loggedIn', false);
        router.replace('/auth').catch((error: Error) => {
          showErrorMessage(error.message);
        });
        setTasksDownloadedValue(false);
        clearTasks();
      }
    });
  };

  return { loggedIn, registerUser, loginUser, handleAuthStateChange, signOut };
});
