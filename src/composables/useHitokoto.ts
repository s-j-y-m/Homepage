import { computed, onMounted, onUnmounted, ref } from "vue";

type HitokotoResponse = {
  hitokoto: string;
  from: string;
};

const HITOKOTO_API = "https://international.v1.hitokoto.cn/";
const FALLBACK_HITOKOTO: HitokotoResponse = {
  hitokoto: "让每一位玩家都能体会到MC最纯粹的乐趣!",
  from: "世间一梦",
};
const REFRESH_INTERVAL = 30_000;
const TYPE_SPEED = 150;
const DELETE_SPEED = 80;
const SOURCE_PAUSE = 500;

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function useHitokoto() {
  const text = ref("");
  const from = ref("");
  const loading = ref(false);
  const quote = ref<HitokotoResponse>(FALLBACK_HITOKOTO);

  const formattedText = computed(() => `『${quote.value.hitokoto}』`);
  const formattedFrom = computed(() => `——「${quote.value.from}」`);

  let timer: ReturnType<typeof window.setInterval> | undefined;
  let animationId = 0;
  let active = false;

  async function deleteText(currentAnimationId: number) {
    while (active && animationId === currentAnimationId && text.value.length > 0) {
      text.value = text.value.slice(0, -1);
      await sleep(DELETE_SPEED);
    }
  }

  async function typeText(value: string, currentAnimationId: number) {
    for (const char of value) {
      if (!active || animationId !== currentAnimationId) return;
      text.value += char;
      await sleep(TYPE_SPEED);
    }
  }

  async function fetchHitokoto() {
    try {
      const response = await fetch(HITOKOTO_API);
      if (!response.ok) return FALLBACK_HITOKOTO;

      const data = (await response.json()) as Partial<HitokotoResponse>;
      if (!data.hitokoto || !data.from) return FALLBACK_HITOKOTO;

      return {
        hitokoto: data.hitokoto,
        from: data.from,
      };
    } catch {
      return FALLBACK_HITOKOTO;
    }
  }

  async function refreshHitokoto() {
    const currentAnimationId = ++animationId;
    loading.value = true;
    from.value = "";
    quote.value = await fetchHitokoto();

    await deleteText(currentAnimationId);
    if (!active || animationId !== currentAnimationId) return;

    await sleep(SOURCE_PAUSE);
    if (!active || animationId !== currentAnimationId) return;

    await typeText(formattedText.value, currentAnimationId);
    if (!active || animationId !== currentAnimationId) return;

    from.value = formattedFrom.value;
    loading.value = false;
  }

  onMounted(() => {
    active = true;
    void refreshHitokoto();
    timer = window.setInterval(() => {
      void refreshHitokoto();
    }, REFRESH_INTERVAL);
  });

  onUnmounted(() => {
    active = false;
    animationId += 1;
    if (timer) window.clearInterval(timer);
  });

  return {
    text,
    from,
    loading,
  };
}
