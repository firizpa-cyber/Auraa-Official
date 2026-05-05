<template>
  <section
    id="features"
    class="section-padding relative overflow-hidden"
    style="background-color: var(--bg-secondary)"
  >
    <UiParallaxAuraa
      extra-class="text-[56vw] md:text-[32vw] -bottom-[10%] -left-[18%] md:-left-[10%] rotate-[-7deg]"
      :speed="-0.85"
    />
    <div class="max-w-6xl mx-auto px-6 relative z-10">
      <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div class="max-w-xl">
          <span
            class="font-bold text-[10px] tracking-[0.2em] uppercase mb-4 block"
            style="color: var(--text-muted)"
          >
            Преимущества
          </span>
          <h2 style="color: var(--text-primary)">Технологическое превосходство</h2>
        </div>
        <p class="text-sm max-w-xs leading-relaxed" style="color: var(--text-secondary)">
          Мы используем стек технологий, который обеспечивает стабильность и гибкость вашего продукта.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(feature, i) in features"
          :key="feature.title"
          ref="featureEls"
          class="glass-card p-8 rounded-2xl hover:shadow-lg transition-all duration-500 ease-out group"
          :style="getFeatureStyle(i)"
          @mouseenter="hoveredFeatureIndex = i"
          @mouseleave="hoveredFeatureIndex = null"
        >
          <div
            class="mb-6 p-3 rounded-xl w-fit transition-all duration-500 ease-out group-hover:scale-105"
            style="background-color: var(--accent-subtle)"
          >
            <component :is="feature.icon" class="w-5 h-5" style="color: var(--accent)" />
          </div>
          <h3
            class="text-lg font-display font-bold mb-3"
            style="color: var(--text-primary)"
          >
            {{ feature.title }}
          </h3>
          <p class="text-xs leading-relaxed" style="color: var(--text-secondary)">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Zap, Shield, Globe, Cpu } from 'lucide-vue-next'

const features = [
  { icon: Zap,    title: 'Скорость',     description: 'Оптимизация производительности на уровне ядра системы.' },
  { icon: Shield, title: 'Безопасность', description: 'Защита данных по стандартам корпоративного уровня.' },
  { icon: Globe,  title: 'Масштаб',      description: 'Инфраструктура, готовая к росту вашего бизнеса.' },
  { icon: Cpu,    title: 'Интеллект',    description: 'Интеграция ИИ для автоматизации сложных процессов.' },
]

const featureEls = ref<HTMLElement[]>([])
const visibleFeatures = ref<boolean[]>(features.map(() => false))
const hoveredFeatureIndex = ref<number | null>(null)

function getFeatureStyle(i: number) {
  const isVisible = visibleFeatures.value[i]
  const isHovered = hoveredFeatureIndex.value === i

  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? `translate3d(0, ${isHovered ? '-6px' : '0'}, 0)`
      : 'translate3d(0, 20px, 0)',
    transition: `opacity 0.55s var(--motion-ease-soft) ${i * 0.08}s, transform 0.45s var(--motion-ease) ${i * 0.08}s, box-shadow 0.45s var(--motion-ease)`,
  }
}

onMounted(async () => {
  await nextTick()
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const idx = featureEls.value.indexOf(entry.target as HTMLElement)
        if (entry.isIntersecting && idx !== -1) visibleFeatures.value[idx] = true
      })
    },
    { threshold: 0.1 }
  )
  featureEls.value.forEach((el) => el && observer.observe(el))
})
</script>
