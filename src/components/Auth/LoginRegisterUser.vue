<template>
  <q-form @submit="submitForm()">
    <div class="row q-mb-md">
      <q-banner
        class="col"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        <span v-if="props.tab === 'login'"> Login to your account </span>
        <span v-else> Register to access your Todos anywhere! </span>
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        filled
        v-model="formData.email"
        label="Email"
        class="col"
        lazy-rules
        type="email"
        :rules="[
          (val) =>
            isValidEmailAddress(val) || 'Please enter a valid email address'
        ]"
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        filled
        v-model="formData.password"
        type="password"
        label="Password"
        class="col"
        lazy-rules
        :rules="[(val) => val.length >= 6 || 'Please use minimum 6 characters']"
      />
    </div>
    <div v-if="props.tab === 'register'" class="q-mb-md">
      <div class="row">
        <q-toggle
          v-model="formData.terms"
          label="I accept the license and terms"
        />
      </div>
      <div class="row">
        <p
          v-if="formData.terms === false && validateForm"
          class="col text-negative text-caption q-pl-sm q-ml-xs"
        >
          Please accept terms & conditions
        </p>
      </div>
    </div>
    <div class="row">
      <q-space />
      <q-btn
        type="submit"
        color="primary"
        :label="props.tab === 'login' ? 'Login' : 'Register'"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
  import { PropType, reactive, ref } from 'vue';
  import { useQuasar } from 'quasar';
  import { LoginUser, RegisterUser, User } from 'src/types/User';
  import { useAuthStore } from 'src/stores/store-auth';

  const authStore = useAuthStore();
  const { registerUser, loginUser } = authStore;
  const $q = useQuasar();
  const formData = reactive<User>({
    email: '',
    password: '',
    terms: false
  });

  const props = defineProps({
    tab: {
      type: String as PropType<string>,
      required: true
    }
  });

  const validateForm = ref<boolean>(false);

  const isValidEmailAddress = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const submitForm = () => {
    if (props.tab === 'login') {
      if (formData.password) {
        const payload: LoginUser = {
          email: formData.email,
          password: formData.password
        };
        loginUser(payload);
      }
    } else {
      if (formData.terms !== true) {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        });
      } else {
        if (
          formData.terms &&
          formData.password &&
          formData.password.length > 0
        ) {
          const payload: RegisterUser = {
            ...formData,
            password: formData.password,
            terms: formData.terms
          };
          registerUser(payload);
        }
      }
    }
  };
</script>
