<template>
  <button
    class="
      h-8
      w-8
      grid
      place-items-center
      rounded
      transition
      bg-blueGray-600
      hover:bg-blueGray-500
      active:bg-blueGray-700
    "
  >
    <Icon :name="icon" />
  </button>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import Icon from "./Icon.vue";

export default defineComponent({
  components: { Icon },
  props: { icon: String },
  setup(props) {
    return { ...toRefs(props) };
  },
});
</script>

