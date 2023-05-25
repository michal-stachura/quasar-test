<template>
  <form>
    <div class="row q-mb-md">
      <q-banner
        class="col"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        Register to access your Todos anywhere!
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input filled v-model="formData.email" label="Email" class="col" />
    </div>
    <div class="row q-mb-md">
      <q-input
        filled
        clearable
        v-model="formData.password"
        type="password"
        label="Password"
        class="col"
      />
    </div>
    <div class="row q-mb-md">
      <q-checkbox
        v-model="formData.terms"
        label="Accept terms & conditions"
        class="col"
      />
    </div>
    <div class="row">
      <q-space />
      <q-btn color="primary" label="Register" />
    </div>
  </form>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  const formData = reactive({
    email: '',
    password: '',
    terms: false
  });
</script>
