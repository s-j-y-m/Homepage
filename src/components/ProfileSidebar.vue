<script setup lang="ts">
defineProps<{
  name: string;
  nickname: string;
  bio: string;
  avatar: string;
  links: { label: string; url: string; icon: string }[];
}>();
</script>

<template>
  <aside
    class="w-full md:w-[350px] shrink-0 p-5 rounded-[20px] h-full overflow-y-auto flex flex-col gap-4"
    style="background: var(--card-bg); box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)"
  >
    <div
      class="profile-card text-center rounded-[20px] p-[25px] mb-0 glass"
      style="background: var(--card-bg)"
    >
      <img
        :src="avatar"
        :alt="`${name}的头像`"
        class="mx-auto w-[120px] h-[120px] rounded-[60px] mb-[15px] object-cover"
      />
      <h1 class="text-2xl font-bold" style="color: var(--text-color)">
        {{ name }}
      </h1>
      <h3 class="text-lg italic opacity-80" style="color: var(--text-color)">
        {{ nickname }}
      </h3>
      <p
        class="my-[15px] text-[0.9em] leading-relaxed whitespace-pre-line"
        style="color: var(--text-color)"
      >
        {{ bio }}
      </p>

      <div class="flex flex-wrap justify-center gap-2.5 mt-5">
        <a
          v-for="link in links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="profile-link min-w-[60px] no-underline px-4 py-2 rounded-[10px] glass-sm inline-flex items-center justify-center gap-1.5"
          style="
            background: var(--card-bg);
            color: var(--link-color);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          "
        >
          <i :class="link.icon"></i>
          {{ link.label }}
        </a>
      </div>
    </div>

    <slot name="hitokoto" />
  </aside>
</template>
