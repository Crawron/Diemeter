<template>
  <div class="flex flex-row align-middle gap-2">
    <div class="flex flex-row h-8 w-60 gap-0.5">
      <div class="bg-blueGray-600 w-1/2 overflow-hidden rounded-bl rounded-tl">
        <div
          class="h-full flex-1 transform origin-right"
          :style="{ transform: `scaleX(${-fill})`, background: color }"
        />
      </div>
      <div class="bg-blueGray-600 w-1/2 rounded-br rounded-tr overflow-hidden">
        <div
          class="h-full flex-1 transform origin-left"
          :style="{ transform: `scaleX(${fill})`, background: color }"
        />
      </div>
    </div>
    <div
      class="font-bold mt-0.5 tabular-nums flex flex-row w-20"
      :style="{ color }"
    >
      <span class="w-3 text-center">{{ sign }}</span>
      <span class="w-full text-right">{{ formattedValue }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    value: { type: Number, required: true },
  },

  setup(props) {
    const { value } = toRefs(props);

    const fill = computed(
      () => Math.cbrt(Math.abs(value.value)) * Math.sign(value.value)
    );

    const colors = [
      "#FF595A",
      "#FF7D77",
      "#FF9B94",
      "#FFB7B0",
      "#F8D3CF",
      "#D8EAC7",
      "#C0E5A0",
      "#A6E178",
      "#89DB4D",
      "#66D500",
    ];

    function lerp(min: number, max: number, delta: number) {
      return Math.min(Math.max(min + (max - min) * delta, min), max);
    }

    function lerpInverse(min: number, max: number, value: number) {
      return (value - min) / (max - min);
    }

    const color = computed(() =>
      value.value === 0
        ? "#EEEEEE"
        : colors[
            Math.floor(
              lerp(
                0,
                colors.length - 0.0000001,
                lerpInverse(-0.09, 0.09, value.value)
              )
            )
          ]
    );

    const sign = computed(() =>
      value.value > 0 ? "+" : value.value < 0 ? "-" : "±"
    );

    const formattedValue = computed(
      () => `${Math.abs(value.value * 100).toFixed(2)}%`
    );

    return { value, color, fill, formattedValue, sign };
  },
});
</script>
