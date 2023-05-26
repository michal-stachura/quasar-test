<template>
  <q-input
    label="Due Date"
    filled
    :model-value="dueDate"
    @input="$emit('update:dueDate', ($event.target as HTMLInputElement).value)"
    class="col"
  >
    <template v-slot:append>
      <q-icon
        v-if="dueDate"
        name="close"
        @click="$emit('clear-date')"
        class="cursor-pointer"
      />
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            v-model="date"
            @update:model-value="$emit('update-date', date)"
            emit-immediately
            mask="YYYY-MM-DD"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
  import { ref, watch, PropType } from 'vue';

  const props = defineProps({
    dueDate: {
      type: String as PropType<string | undefined>,
      required: false
    }
  });

  const date = ref(props.dueDate);

  defineEmits(['clear-date', 'update-date']);

  watch(
    () => props.dueDate,
    (newValue) => {
      date.value = newValue;
    }
  );
</script>
