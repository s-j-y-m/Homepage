<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useSakura } from "../composables/useSakura";

let cleanup: (() => void) | undefined;

onMounted(() => {
  cleanup = useSakura();
});

onUnmounted(() => {
  cleanup?.();
});
</script>

<template></template>
