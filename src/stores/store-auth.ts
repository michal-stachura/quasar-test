import { defineStore } from 'pinia';
import { RegisterUser, LoginUser } from 'src/types/User';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { LocalStorage, Loading } from 'quasar';
import { showErrorMessage } from 'src/composables/show-error-message';
import { useTasksStore } from './store-tasks';
import { firebaseAuth } from 'src/boot/firebase';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const tasksStore = useTasksStore();
  const { fbReadData } = tasksStore;

  const loggedIn = ref<boolean>(false);

  const registerUser = async (payload: RegisterUser) => {
    Loading.show();
    await firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((userCredentials) => {
        console.log(userCredentials.user);
      })
      .catch((error) => {
        showErrorMessage(error.message);
      });
  };

  const loginUser = async (payload: LoginUser) => {
    Loading.show();
    await firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((userCredentials) => {
        console.log(userCredentials.user);
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
      }
    });
  };

  return { loggedIn, registerUser, loginUser, handleAuthStateChange, signOut };
});
