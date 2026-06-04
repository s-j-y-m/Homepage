<script setup lang="ts">
import { useTheme } from "../composables/useTheme";

const { isHidden, toggleTheme, toggleHidden } = useTheme();
</script>

<template>
  <div class="fixed right-5 bottom-5 z-[1000] group">
    <div
      class="flex flex-col gap-2.5 absolute right-0 bottom-[50px] opacity-0 invisible translate-y-2.5 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
    >
      <button
        @click="toggleTheme"
        title="切换主题"
        class="control-btn w-10 h-10 rounded-full glass-sm flex items-center justify-center cursor-pointer"
        style="
          background: var(--card-bg);
          color: var(--text-color);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        "
      >
        <i class="fas fa-adjust"></i>
      </button>
      <button
        @click="toggleHidden"
        title="隐藏界面"
        class="control-btn w-10 h-10 rounded-full glass-sm flex items-center justify-center cursor-pointer"
        style="
          background: var(--card-bg);
          color: var(--text-color);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        "
        :style="{ opacity: isHidden ? 0.3 : 1 }"
      >
        <i :class="isHidden ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
      </button>
    </div>

    <button
      class="w-10 h-10 rounded-full glass-sm flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
      style="
        background: var(--card-bg);
        color: var(--text-color);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      "
    >
      <i class="fa-solid fa-ellipsis"></i>
    </button>
  </div>
</template>
