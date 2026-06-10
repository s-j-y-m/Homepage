<script setup lang="ts">
defineProps<{
  title: string;
  items: { label: string; url: string; icon: string }[];
}>();
</script>

<template>
  <section
    class="nav-section glass rounded-[20px] px-[25px] py-5 mb-[25px]"
    style="background: var(--card-bg); box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)"
  >
    <h2 class="mb-8 pl-2.5 text-xl font-semibold" style="color: var(--text-color)">
      {{ title }}
    </h2>
    <div
      class="grid gap-4 p-[5px]"
      style="grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))"
    >
      <a
        v-for="item in items"
        :key="item.url"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-link glass-sm flex items-center justify-center gap-[0.4em] text-center no-underline rounded-[10px] p-[15px]"
        style="
          background: var(--card-bg);
          color: var(--link-color);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        "
      >
        <i :class="item.icon" class="shrink-0"></i>
        {{ item.label }}
      </a>
    </div>
  </section>
</template>
