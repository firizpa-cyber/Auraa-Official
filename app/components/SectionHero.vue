<template>
  <section
    ref="heroRef"
    class="hero-stage relative min-h-screen overflow-hidden px-5 pt-28 pb-16 sm:px-6 lg:px-8"
    @pointermove="handlePointerMove"
    @pointerleave="resetPointer"
  >
    <div class="hero-backdrop" aria-hidden="true" />
    <div class="hero-clouds" aria-hidden="true" />
    <div class="hero-curtain" aria-hidden="true" />

    <div class="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.82fr_1.18fr]">
      <div ref="copyRef" class="hero-copy max-w-2xl">
        <h1 ref="titleRef" class="hero-title font-display">
          <span>Разработка </span>
          сайтов для разных стран
        </h1>

        <p class="hero-subtitle">
          Закройте вопрос с клиентами раз и навсегда
        </p>

        <div class="hero-note">
          <Zap class="h-6 w-6" />
          <span>
            Делаем <b>красивые и современные сайты</b> для привлечения клиентов
            в ваш бизнес
          </span>
        </div>

        <div class="hero-actions">
          <NuxtLink to="/brief" class="hero-primary-btn group">
            <span>Оставить заявку</span>
          </NuxtLink>
        </div>

      </div>

      <div ref="visualRef" class="hero-visual" aria-label="Премиальный сайт на ноутбуке и телефоне">
        <div class="hero-device">
          <div class="laptop-screen">
            <div class="browser-bar">
              <div>
                <span />
                <span />
                <span />
              </div>
              <small>aura.studio/project</small>
            </div>

            <div class="site-preview">
              <div class="preview-copy">
                <small>Запуск под ключ</small>
                <strong>Проект, который превращает интерес в заявку</strong>
                <span>Дизайн, структура и продвижение для роста клиентов</span>
                <i />
              </div>
              <div class="preview-card">
                <strong>94%</strong>
                <span>brand impact</span>
              </div>
            </div>
          </div>

          <div class="laptop-base">
            <div class="keyboard">
              <i v-for="key in keyboardKeys" :key="key" />
            </div>
            <div class="trackpad" />
          </div>
        </div>

        <div class="phone-preview">
          <div class="phone-notch" />
          <div class="phone-screen">
            <strong>AURA</strong>
            <span>Сайт адаптирован</span>
            <i />
            <i />
            <i />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Zap } from 'lucide-vue-next'

const keyboardKeys = Array.from({ length: 38 }, (_, index) => index)

const heroRef = ref<HTMLElement | null>(null)
const copyRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const visualRef = ref<HTMLElement | null>(null)

let gsapInstance: typeof import('gsap').gsap | null = null
let ctx: import('gsap').Context | null = null

onMounted(async () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion || !heroRef.value) return

  const { gsap } = await import('gsap')
  gsapInstance = gsap

  ctx = gsap.context(() => {
    gsap.from('.hero-copy > *', {
      y: 22,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08,
    })

    gsap.from('.hero-device', {
      y: 30,
      rotate: -4,
      opacity: 0,
      duration: 1.05,
      ease: 'power3.out',
      delay: 0.12,
    })

    gsap.from('.phone-preview', {
      y: 18,
      scale: 0.95,
      opacity: 0,
      duration: 0.78,
      ease: 'back.out(1.45)',
      stagger: 0.08,
      delay: 0.3,
    })
  }, heroRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})

function handlePointerMove(event: PointerEvent) {
  if (!heroRef.value || !gsapInstance) return

  const rect = heroRef.value.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width - 0.5
  const y = (event.clientY - rect.top) / rect.height - 0.5

  gsapInstance.to(visualRef.value, {
    x: x * 18,
    y: y * 14,
    rotateY: x * -5,
    rotateX: y * 4,
    duration: 0.8,
    ease: 'power3.out',
  })

  gsapInstance.to(titleRef.value, {
    x: x * -7,
    y: y * -5,
    duration: 0.8,
    ease: 'power3.out',
  })

}

function resetPointer() {
  if (!gsapInstance) return

  gsapInstance.to([visualRef.value, titleRef.value], {
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    duration: 0.9,
    ease: 'power3.out',
  })
}
</script>

<style scoped>
.hero-stage {
  --hero-accent: var(--accent);
  --hero-accent-hover: var(--accent-hover);
  color: var(--text-primary);
  background:
    radial-gradient(ellipse at 80% 8%, rgba(15, 37, 75, 0.08), transparent 34%),
    linear-gradient(180deg, #fbfbfc 0%, #f2f3f5 100%);
  isolation: isolate;
}

.hero-backdrop {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(100deg, rgba(15, 37, 75, 0.035) 0 1px, transparent 1px 84px);
  opacity: 0.9;
}

.hero-clouds {
  position: absolute;
  right: -10%;
  bottom: -10%;
  left: -8%;
  height: 26%;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 8% 80%, color-mix(in srgb, var(--bg-primary), white 40%) 0 28%, transparent 29%),
    radial-gradient(ellipse at 26% 72%, color-mix(in srgb, var(--bg-primary), white 50%) 0 24%, transparent 25%),
    radial-gradient(ellipse at 50% 82%, color-mix(in srgb, var(--bg-primary), white 45%) 0 30%, transparent 31%),
    radial-gradient(ellipse at 74% 76%, color-mix(in srgb, var(--bg-primary), white 40%) 0 26%, transparent 27%),
    radial-gradient(ellipse at 94% 82%, color-mix(in srgb, var(--bg-primary), white 45%) 0 28%, transparent 29%);
  opacity: 0.92;
  filter: blur(1px);
}

.hero-curtain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(80deg, transparent 0 45%, rgba(15, 37, 75, 0.08) 45.2% 45.45%, transparent 45.7% 100%),
    radial-gradient(ellipse at 72% 0%, rgba(15, 37, 75, 0.08), transparent 46%);
  opacity: 0.75;
}

.hero-title {
  max-width: 13ch;
  font-size: clamp(2.9rem, 5.55vw, 5.45rem);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: 0;
  text-wrap: balance;
}

.hero-title span {
  display: block;
  color: var(--hero-accent);
}

.hero-subtitle {
  margin-top: 0.45rem;
  max-width: 40rem;
  color: var(--text-primary);
  font-size: clamp(1.35rem, 2vw, 1.85rem);
  font-weight: 400;
  line-height: 1.25;
}

.hero-note {
  display: flex;
  max-width: 31rem;
  align-items: center;
  gap: 0.8rem;
  margin-top: 2.45rem;
  color: var(--text-secondary);
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.25;
}

.hero-note svg {
  flex: 0 0 auto;
  color: var(--hero-accent);
  fill: var(--hero-accent);
  filter: drop-shadow(0 10px 18px var(--accent-subtle3));
}

.hero-note b {
  color: var(--hero-accent);
  font-weight: 700;
}

.hero-actions {
  margin-top: 2.9rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hero-primary-btn {
  display: inline-flex;
  min-height: 4.9rem;
  min-width: 15.5rem;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  border-radius: 1.55rem;
  padding: 1rem 2.3rem;
  background: var(--hero-accent);
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 800;
  line-height: 1.12;
  box-shadow: 0 18px 34px var(--accent-subtle3);
  transition:
    transform var(--motion-base) var(--motion-ease),
    background-color var(--motion-base) var(--motion-ease),
    box-shadow var(--motion-base) var(--motion-ease);
}

.hero-primary-btn:hover {
  transform: translateY(-3px);
  background: var(--hero-accent-hover);
  box-shadow: 0 24px 46px var(--accent-subtle3);
}

.hero-visual {
  position: relative;
  min-height: min(58vw, 540px);
  perspective: 1200px;
}

.hero-device {
  position: relative;
  z-index: 2;
  width: min(100%, 625px);
  margin-left: auto;
  transform: rotate(12deg) translate(0.8rem, 1.4rem);
  transform-style: preserve-3d;
  filter: drop-shadow(0 34px 50px var(--shadow-strong));
}

.laptop-screen {
  overflow: hidden;
  border: 1px solid var(--border-medium);
  border-radius: 1.25rem 1.25rem 0.35rem 0.35rem;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.055)),
    #0b1424;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.browser-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.65rem 0.85rem;
}

.browser-bar div {
  display: flex;
  gap: 0.42rem;
}

.browser-bar span {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.38);
}

.browser-bar small {
  color: rgba(247, 251, 255, 0.5);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.site-preview {
  display: grid;
  min-height: 15.5rem;
  grid-template-columns: 1fr 0.8fr;
  align-items: stretch;
  gap: 1rem;
  padding: 1.1rem;
  background:
    radial-gradient(circle at 84% 42%, var(--accent-subtle3), transparent 18%),
    linear-gradient(135deg, rgba(0, 0, 0, 0.2), transparent 45%),
    linear-gradient(135deg, #122138, #0f254b);
}

.preview-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #ffffff;
}

.preview-copy small {
  width: fit-content;
  border-radius: 999px;
  padding: 0.4rem 0.55rem;
  background: rgba(255, 255, 255, 0.11);
  color: rgba(247, 251, 255, 0.72);
  font-size: 0.58rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.preview-copy strong {
  display: block;
  max-width: 15rem;
  margin-top: 0.85rem;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.5vw, 2.2rem);
  font-weight: 800;
  line-height: 0.98;
}

.preview-copy span {
  display: block;
  max-width: 15rem;
  margin-top: 0.8rem;
  color: rgba(247, 251, 255, 0.62);
  font-size: 0.82rem;
  line-height: 1.45;
}

.preview-copy i {
  display: block;
  width: 7rem;
  height: 2.2rem;
  margin-top: 1rem;
  border-radius: 999px;
  background: var(--hero-accent);
}

.preview-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.2rem;
  padding: 1rem;
  background:
    linear-gradient(to top, rgba(74, 127, 212, 0.52), transparent),
    rgba(255, 255, 255, 0.08);
}

.preview-card strong {
  color: #ffffff;
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 900;
  line-height: 1;
}

.preview-card span {
  margin-top: 0.25rem;
  color: rgba(247, 251, 255, 0.62);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.laptop-base {
  width: 92%;
  margin: 0 auto;
  border-radius: 0 0 2rem 2rem;
  padding: 0.72rem 1.35rem 0.95rem;
  background:
    linear-gradient(180deg, #e9edf4, #b9c3d0);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.keyboard {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.34rem;
}

.keyboard i {
  height: 0.48rem;
  border-radius: 0.18rem;
  background: rgba(15, 37, 75, 0.45);
}

.trackpad {
  width: 34%;
  height: 1.7rem;
  margin: 0.75rem auto 0;
  border-radius: 0.45rem;
  background: rgba(15, 37, 75, 0.14);
}

.phone-preview {
  position: absolute;
  z-index: 4;
  left: 17%;
  right: auto;
  bottom: 23%;
  width: min(16vw, 106px);
  min-width: 82px;
  border: 0.45rem solid #111827;
  border-radius: 1.45rem;
  background: #111827;
  box-shadow: 0 26px 60px var(--shadow-strong);
  transform: rotate(-8deg);
}

.phone-notch {
  position: absolute;
  top: 0.35rem;
  left: 50%;
  z-index: 2;
  width: 34%;
  height: 0.32rem;
  transform: translateX(-50%);
  border-radius: 999px;
  background: #111827;
}

.phone-screen {
  display: grid;
  gap: 0.45rem;
  min-height: 12rem;
  border-radius: 1rem;
  padding: 1.1rem 0.7rem 0.7rem;
  background:
    radial-gradient(circle at 80% 18%, rgba(116, 255, 189, 0.22), transparent 30%),
    linear-gradient(160deg, #10203a, #0f254b);
  color: #ffffff;
}

.phone-screen strong {
  font-family: var(--font-display);
  font-size: 1.1rem;
}

.phone-screen span {
  color: rgba(247, 251, 255, 0.62);
  font-size: 0.62rem;
  font-weight: 800;
}

.phone-screen i {
  height: 1.7rem;
  border-radius: 0.55rem;
  background: rgba(255, 255, 255, 0.13);
}

@media (min-width: 1024px) {
}

@media (max-width: 1023px) {
  .hero-copy {
    max-width: none;
    text-align: center;
  }

  .hero-kicker,
  .hero-actions,
  .hero-note {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-note {
    justify-content: center;
  }

  .hero-title,
  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-device {
    margin: 0 auto;
    transform: rotate(7deg) translateY(1.2rem);
  }

  .hero-visual {
    min-height: 34rem;
  }
}

@media (max-width: 640px) {
  .hero-stage {
    padding-top: 7.5rem;
  }

  .hero-title {
    font-size: clamp(2.6rem, 12.5vw, 4.25rem);
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-primary-btn {
    width: 100%;
  }

  .site-preview {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    display: none;
  }

  .site-preview {
    min-height: 13rem;
  }

  .preview-card {
    display: none;
  }

  .laptop-base {
    padding: 0.7rem 1rem 0.85rem;
  }

  .phone-preview {
    left: 4%;
    bottom: 12%;
  }

}

@media (prefers-reduced-motion: reduce) {
  .hero-device,
  .phone-preview {
    transform: none !important;
  }
}
</style>
