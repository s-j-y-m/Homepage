import { ref } from "vue";

const theme = ref<string>("light");
const isHidden = ref(false);
const lastTheme = ref<string | null>(null);

function initTheme() {
  if (typeof document === "undefined") return;
  const saved = localStorage.getItem("theme") || "light";
  theme.value = saved;
  document.documentElement.setAttribute("data-theme", saved);
}

function applyHiddenState() {
  if (typeof document === "undefined") return;
  if (isHidden.value) {
    document.documentElement.setAttribute("data-hidden", "true");
  } else {
    document.documentElement.removeAttribute("data-hidden");
  }
}

function toggleTheme() {
  if (isHidden.value) return;
  const next = theme.value === "dark" ? "light" : "dark";
  theme.value = next;
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

function toggleHidden() {
  isHidden.value = !isHidden.value;

  if (isHidden.value) {
    lastTheme.value = theme.value;
    theme.value = "light";
    document.documentElement.setAttribute("data-theme", "light");
  } else if (lastTheme.value) {
    theme.value = lastTheme.value;
    document.documentElement.setAttribute("data-theme", lastTheme.value);
    localStorage.setItem("theme", lastTheme.value);
    lastTheme.value = null;
  }

  applyHiddenState();
}

export function useTheme() {
  return {
    theme,
    isHidden,
    initTheme,
    toggleTheme,
    toggleHidden,
  };
}
