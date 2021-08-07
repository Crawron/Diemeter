<template>
  <div
    class="
      w-8
      h-8
      grid
      select-none
      place-items-center
      bg-blueGray-200
      hover:bg-blueGray-50
      active:bg-blueGray-400
      rounded
      transition
      text-blueGray-800
    "
  >
    <span v-if="!dotted" class="block text-center font-bold">
      {{ label }}
    </span>
    <Icon v-else :name="`die-${label}`" />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import Icon from "./Icon.vue";

export default defineComponent({
  props: { label: { type: String, required: true }, dotted: Boolean },
  components: { Icon },
  setup(props) {
    return { ...toRefs(props) };
  },
});
</script>
