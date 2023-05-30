<template>
  <q-input
    filled
    v-autofocus="{ delayCordova: 700 }"
    clearable
    :model-value="name"
    @input="$emit('update:name', ($event.target as HTMLInputElement).value)"
    label="Task Name"
    class="col"
    :rules="[(val) => !!val || 'Field is required']"
    v-highlight
  />
</template>

<script setup lang="ts">
  import { PropType } from 'vue';

  defineProps({
    name: {
      type: String as PropType<string>,
      required: true
    }
  });
</script>
