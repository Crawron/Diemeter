<template>
  <div
    class="font-bold mt-0.5 tabular-nums flex flex-row w-20"
    :style="{ color }"
  >
    <span class="w-3 text-center">{{ sign }}</span>
    <span class="w-full text-right">{{ formattedValue }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";
import { meterColor } from "./common";

export default defineComponent({
  props: {
    value: { type: Number, required: true },
  },

  setup(props) {
    const { value } = toRefs(props);

    return {
      color: computed(() => meterColor(value.value)),
      sign: computed(() =>
        value.value > 0 ? "+" : value.value < 0 ? "-" : "±"
      ),
      formattedValue: computed(
        () => `${Math.abs(value.value * 100).toFixed(2)}%`
      ),
    };
  },
});
</script>
