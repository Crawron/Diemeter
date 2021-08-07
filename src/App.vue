<template>
  <div class="grid place-items-center w-full max-w-56 mx-auto mt-16">
    <div class="flex flex-col gap-2 mb-16">
      <label class="flex flex-row items-center gap-2 h-8 mb-4">
        <div class="w-8 h-8 grid place-items-center"><Icon name="dice" /></div>
        <NumberInput v-model="diceCount" :min="1" :max="5" />
      </label>
      <div class="flex flex-row gap-2" v-for="i in diceRange.length" :key="i">
        <label class="flex flex-row gap-2">
          <RollLabel
            :label="faceLabel(i).toString()"
            :dotted="diceCount == 1"
          />
          <NumberInput
            :min="0"
            :modelValue="rollCounts.get(faceLabel(i))"
            @update:modelValue="rollCounts.set(faceLabel(i), Number($event))"
          />
        </label>
        <DeltaMeter :value="deltaProbs.get(faceLabel(i)) ?? 0" />
        <span class="w-14 text-right text-blueGray-400 mt-0.5 italic">{{
          format(averageProbs.get(faceLabel(i)) ?? 0)
        }}</span>
      </div>
      <span class="text-blueGray-400 font-medium italic">
        Total {{ rollSum }} rolls
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import DeltaMeter from "./components/DeltaMeter.vue";
import RollLabel from "./components/RollLabel.vue";
import NumberInput from "./components/NumberInput.vue";
import Icon from "./components/Icon.vue";
import Button from "./components/Button.vue";

import { weightList } from "./math";
export default defineComponent({
  name: "App",
  components: { DeltaMeter, RollLabel, NumberInput, Icon, Button },
  setup() {
    const diceCount = ref(2);
    const rollCounts = ref(new Map<number, number>());

    const diceRange = computed(() => {
      const lowest = diceCount.value;
      const highest = diceCount.value * 6;
      return {
        lowest,
        highest,
        length: highest - lowest + 1,
      };
    });

    const averageProbs = computed(() => weightList(diceCount.value, 6));

    const rollSum = computed(() =>
      [...rollCounts.value.entries()]
        .filter(
          ([k]) => k <= diceRange.value.highest && k >= diceRange.value.lowest
        )
        .reduce((p, [_, c]) => p + c, 0)
    );

    const resultingProbs = computed(
      () =>
        new Map(
          [...rollCounts.value.entries()].map(([k, v]) => [
            k,
            rollSum.value !== 0 ? v / rollSum.value : 0,
          ])
        )
    );

    const deltaProbs = computed(
      () =>
        new Map(
          [...averageProbs.value.entries()].map(([k, v]) => [
            k,
            (resultingProbs.value.get(k) ?? 0) - v,
          ])
        )
    );

    const faceLabel = (index: number) => index + diceRange.value.lowest - 1;

    return {
      meterValue: ref(0),
      diceCount,
      diceRange,
      faceLabel,
      format(num: number) {
        return `${Math.abs(num * 100).toFixed(2)}%`;
      },
      rollCounts,
      rollSum,
      averageProbs,
      resultingProbs,
      deltaProbs,
    };
  },
});
</script>

<style>
.downside-up {
  rotate: 180deg;
}
</style>
