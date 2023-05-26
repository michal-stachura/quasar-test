<template>
  <q-input
    label="Due Time"
    filled
    :model-value="dueTime"
    @input="$emit('update:dueTime', ($event.target as HTMLInputElement).value)"
    class="col"
  >
    <template v-slot:append>
      <q-icon
        v-if="dueTime"
        name="close"
        @click="$emit('clear-time')"
        class="cursor-pointer"
      />
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time
            v-model="time"
            @update:model-value="$emit('update-time', time)"
            emit-immediately
            format24h
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
  import { PropType, ref, watch } from 'vue';

  const props = defineProps({
    dueTime: {
      type: String as PropType<string | undefined>,
      required: false
    }
  });
  defineEmits(['clear-time', 'update-time']);

  const time = ref(props.dueTime);

  watch(
    () => props.dueTime,
    (newValue) => {
      time.value = newValue;
    }
  );
</script>
