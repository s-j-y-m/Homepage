<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useSakura } from "../composables/useSakura";

let cleanup: (() => void) | undefined;

onMounted(() => {
  const { startSakura, stopp } = useSakura();
  startSakura();
  cleanup = stopp;
});

onUnmounted(() => {
  cleanup?.();
});
</script>

<template>
  <canvas id="canvas_sakura" aria-hidden="true"></canvas>
</template>
