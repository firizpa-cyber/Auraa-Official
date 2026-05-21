<template>
  <section
    id="cases"
    class="section-padding relative overflow-hidden"
    style="background-color: var(--bg-primary)"
  >
    <UiParallaxAuraa
      extra-class="text-[56vw] md:text-[34vw] -bottom-[10%] -left-[18%] md:-left-[10%] rotate-[10deg]"
      :speed="-0.9"
    />
    <div class="max-w-6xl mx-auto px-6 relative z-10">
      <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
        <div class="max-w-xl">
          <span
            class="font-bold text-[10px] tracking-[0.3em] uppercase mb-4 block"
            style="color: var(--text-muted)"
          >
            Портфолио
          </span>
          <h2 style="color: var(--text-primary)">Избранные проекты</h2>
        </div>
        <button class="outline-button hover:scale-105 active:scale-95 transition-transform">
          Все кейсы
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <a
          v-for="(project, i) in cases"
          :key="project.title"
          :href="project.href"
          target="_blank"
          rel="noopener noreferrer"
          ref="caseEls"
          class="group cursor-pointer relative block"
          :style="getCaseStyle(i)"
          @mouseenter="hoveredIndex = i"
          @mouseleave="hoveredIndex = null"
        >
          <div
            class="relative aspect-[16/11] rounded-[2.5rem] overflow-hidden mb-8 border shadow-2xl transition-shadow duration-700 ease-out group-hover:shadow-[0_30px_80px_var(--shadow-strong)]"
            style="border-color: var(--border-subtle)"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
              referrerpolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />

            <!-- Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-all duration-700 ease-out flex flex-col justify-end p-10"
              :class="hoveredIndex === i ? 'opacity-100' : 'opacity-0'"
            >
              <div
                class="will-change-transform"
                :style="{
                  opacity: hoveredIndex === i ? 1 : 0,
                  transform: hoveredIndex === i ? 'translate3d(0, 0, 0)' : 'translate3d(0, 18px, 0)',
                  transition: `opacity 720ms var(--motion-ease-soft) ${hoveredIndex === i ? '140ms' : '0ms'}, transform 720ms var(--motion-ease-soft) ${hoveredIndex === i ? '140ms' : '0ms'}`,
                }"
              >
                <div class="flex gap-2 mb-4">
                  <span
                    v-for="tag in project.tags"
                    :key="tag"
                    class="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-bold text-white uppercase tracking-wider border border-white/10 transition-all duration-700 ease-out"
                  >
                    {{ tag }}
                  </span>
                </div>
                <p class="text-white/80 text-sm font-light leading-relaxed mb-6 max-w-sm transition-opacity duration-700 ease-out">
                  {{ project.description }}
                </p>
                <div class="flex items-center gap-2 text-white font-display font-bold text-sm transition-opacity duration-700 ease-out">
                  Смотреть кейс
                  <ArrowUpRight class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>

            <!-- FAB -->
            <div
              class="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-700 ease-out"
              :class="hoveredIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
            >
              <Plus class="w-6 h-6" />
            </div>
          </div>

          <div class="flex justify-between items-end px-4">
            <div>
              <h3
                class="text-2xl font-display font-bold mb-2 transition-colors duration-500 ease-out"
                :style="{ color: hoveredIndex === i ? 'var(--text-secondary)' : 'var(--text-primary)' }"
              >
                {{ project.title }}
              </h3>
              <p
                class="text-[10px] font-bold uppercase tracking-[0.2em]"
                style="color: var(--text-muted)"
              >
                {{ project.category }}
              </p>
            </div>
            <div
              class="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ease-out"
              :style="{
                borderColor: hoveredIndex === i ? 'var(--accent)' : 'var(--border-light)',
                backgroundColor: hoveredIndex === i ? 'var(--accent)' : 'transparent',
                color: hoveredIndex === i ? '#fff' : 'var(--text-primary)',
              }"
            >
              <ArrowUpRight class="w-5 h-5" />
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight, Plus } from 'lucide-vue-next'

const cases = [
  { title: 'Oshiqona',       category: 'Разработка',      description: 'Современная платформа для заказа еды с удобным интерфейсом.',                                      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200&h=800', tags: ['E-commerce', 'Nuxt', 'UI/UX'], href: 'https://test.oshiqona.tj' },
  { title: 'FinGroup',       category: 'Финансы',         description: 'Корпоративный сайт для финансовой группы компаний.',                                               image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200&h=800', tags: ['Corporate', 'Business'],       href: 'https://www.fingroup.tj/' },
  { title: 'Ant Lumier',     category: 'Кино и ТВ',       description: 'Стриминговая платформа и каталог фильмов с глубокой проработкой деталей.',                        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200&h=800', tags: ['Streaming', 'Media'],         href: 'https://antlumier.vercel.app/' },
  { title: 'SitDownPls',     category: 'Магазин мебели',  description: 'Интернет-магазин мебели с акцентом на визуальную подачу товаров.',                                image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200&h=800', tags: ['Shop', 'Furniture'],          href: 'https://ishuvaloff.github.io/SitDownPls/' },
]

const hoveredIndex = ref<number | null>(null)
const caseEls = ref<HTMLElement[]>([])
const visibleCases = ref<boolean[]>(cases.map(() => false))

function getCaseStyle(i: number) {
  const isVisible = visibleCases.value[i]
  const isHovered = hoveredIndex.value === i

  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? `translate3d(0, ${isHovered ? '-8px' : '0'}, 0)`
      : 'translate3d(0, 40px, 0)',
    transition: `opacity 0.8s var(--motion-ease-soft) ${i * 0.1}s, transform 0.55s var(--motion-ease) ${i * 0.1}s`,
  }
}

let observer: IntersectionObserver | null = null

onMounted(async () => {
  await nextTick()
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const idx = caseEls.value.indexOf(entry.target as HTMLElement)
        if (entry.isIntersecting && idx !== -1) {
          visibleCases.value[idx] = true
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '-100px' }
  )
  caseEls.value.forEach((el) => el && observer?.observe(el))
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
