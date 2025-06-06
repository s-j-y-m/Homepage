let isHidden = false;

window.hideAllExceptBg = function () {
  try {
    const container = document.querySelector(".container");
    const themeToggle = document.querySelector(".theme-toggle");
    const hideToggleBtn = document.querySelector(".hide-toggle");

    isHidden = !isHidden;

    if (isHidden) {
      container.style.opacity = "0";
      container.style.pointerEvents = "none";
      themeToggle.style.opacity = "0.3";
      hideToggleBtn.querySelector("i").className = "fas fa-eye-slash";
    } else {
      container.style.opacity = "1";
      container.style.pointerEvents = "auto";
      themeToggle.style.opacity = "1";
      hideToggleBtn.querySelector("i").className = "fas fa-eye";
    }
  } catch (error) {
    console.error("Error in hideAllExceptBg:", error);
  }
};

window.toggleTheme = function () {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
  localStorage.setItem("theme", isDark ? "light" : "dark");
};

// 简化初始化
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
});
