<template>
  <div class="bg-blueGray-900 h-8 w-12 flex flex-row rounded overflow-hidden">
    <input
      ref="inputBox"
      class="
        w-full
        h-full
        bg-transparent
        text-blueGray-200 text-center
        font-medium
      "
      type="text"
      @input="handleInputEvent"
      :value="modelValue ?? 0"
    />
    <div class="w-4 h-full gap-0.5 flex flex-col bg-blueGray-800">
      <div
        class="
          bg-blueGray-600
          hover:bg-blueGray-500
          active:bg-blueGray-700
          transition
          w-full
          h-1/2
        "
        @click="update((modelValue ?? 0) + 1)"
      />
      <div
        class="
          bg-blueGray-600
          hover:bg-blueGray-500
          active:bg-blueGray-700
          transition
          w-full
          h-1/2
        "
        @click="update((modelValue ?? 0) - 1)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from "vue";

export default defineComponent({
  props: { modelValue: Number, min: Number, max: Number },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const inputBox = ref(null);
    const modelValue = toRef(props, "modelValue");

    function update(value: number) {
      value = Number(value);

      if (
        !isFinite(value) ||
        value > (props.max || NaN) ||
        value < (props.min || NaN)
      ) {
        const oldValue = modelValue.value;
        modelValue.value = 0;
        modelValue.value = oldValue;
        return;
      }

      value = Math.min(
        Math.max(value, props.min ?? -Infinity),
        props.max ?? Infinity
      );
      modelValue.value = value;
      ctx.emit("update:modelValue", Number(value));
    }

    return {
      modelValue,
      update,
      inputBox,
      handleInputEvent(event: Event) {
        update(Number((event.currentTarget! as HTMLInputElement).value));
      },
    };
  },
});
</script>

