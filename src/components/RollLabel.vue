<template>
  <div
    class="
      w-8
      h-8
      grid
      place-items-center
      bg-blueGray-200
      rounded
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
