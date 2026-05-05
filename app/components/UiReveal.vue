<template>
  <div
    ref="el"
    class="ui-reveal"
    :style="{ width: width || '100%' }"
  >
    <div
      class="ui-reveal__inner"
      :class="isVisible ? 'is-visible' : ''"
      :style="{ transitionDelay: `${delay}ms` }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  width?: string
  delay?: number
}>(), {
  width: '100%',
  delay: 120,
})

const el = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    isVisible.value = true
    return
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )
  if (el.value) observer.observe(el.value)
})
</script>

<style scoped>
.ui-reveal {
  position: relative;
  overflow: hidden;
}

.ui-reveal__inner {
  opacity: 0;
  transform: translate3d(0, 32px, 0);
  transition:
    opacity var(--motion-slow) var(--motion-ease-soft),
    transform var(--motion-slow) var(--motion-ease-soft);
  will-change: opacity, transform;
}

.ui-reveal__inner.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  will-change: auto;
}
</style>
