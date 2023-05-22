<template>
  <q-banner inline-actions class="text-white list-header" :class="bgClass">
    <slot />
    <template v-slot:action>
      <q-btn flat color="white" :label="`${count}`" />
    </template>
  </q-banner>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';

  defineProps({
    count: {
      type: Number as PropType<number>,
      required: true
    },
    bgClass: {
      type: String as PropType<string>,
      required: false,
      default: 'bg-blue-10'
    }
  });
</script>

<style lang="scss">
  .list-header {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }
</style>
