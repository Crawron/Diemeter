<template>
  <button
    v-if="!lit"
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

  <button
    v-else
    class="
      h-8
      w-8
      grid
      place-items-center
      rounded
      transition
      bg-blueGray-200
      hover:bg-blueGray-50
      active:bg-blueGray-400
      text-blueGray-800
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
  props: { icon: String, lit: Boolean },
  setup(props) {
    return { ...toRefs(props) };
  },
});
</script>

