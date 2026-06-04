<script setup lang="ts">
import { useHitokoto } from "../composables/useHitokoto";

const { text, from } = useHitokoto();
</script>

<template>
  <section
    class="rounded-[20px] p-5 glass"
    style="background: var(--card-bg); color: var(--text-color)"
  >
    <p class="cursor min-h-[3rem] text-[0.95rem] leading-relaxed">
      {{ text }}
    </p>
    <p class="mt-3 min-h-6 text-right text-sm opacity-75">
      {{ from }}
    </p>
  </section>
</template>
