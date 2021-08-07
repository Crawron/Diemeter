<template>
  <div class="flex flex-row align-middle gap-2">
    <div class="flex flex-row h-8 w-60 gap-0.5">
      <div class="bg-blueGray-600 w-1/5 overflow-hidden rounded-bl rounded-tl">
        <div
          class="h-full w-full transition transform origin-right"
          :style="{ transform: `scaleX(${-fill})`, background: color }"
        />
      </div>
      <div class="bg-blueGray-600 w-4/5 rounded-br rounded-tr overflow-hidden">
        <div
          class="h-full w-full transition transform origin-left"
          :style="{ transform: `scaleX(${fill})`, background: color }"
        />
      </div>
    </div>
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

    const fill = computed(() => {
      if (value.value > 0) return Math.cbrt(value.value);
      else return value.value;
    });

    return { value, color: computed(() => meterColor(value.value)), fill };
  },
});
</script>
