import { onMounted, onUnmounted } from "vue";

const meowTexts = ["喵~", "喵喵", "喵喵喵"] as const;

function randomRGBColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r},${g},${b})`;
}

function randomMeowText() {
  return meowTexts[Math.floor(Math.random() * meowTexts.length)];
}

export function useClickEffect() {
  function handleClick(event: MouseEvent) {
    const text = document.createElement("span");
    text.className = "click-text";
    text.textContent = randomMeowText();
    text.style.left = `${event.clientX - 15}px`;
    text.style.top = `${event.clientY - 15}px`;
    text.style.color = randomRGBColor();
    text.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;

    document.body.appendChild(text);
    text.addEventListener("animationend", () => text.remove());
  }

  onMounted(() => {
    document.addEventListener("click", handleClick);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClick);
  });
}
