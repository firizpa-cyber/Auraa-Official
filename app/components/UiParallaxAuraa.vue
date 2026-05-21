<template>
  <div
    aria-hidden="true"
    class="auraa-watermark"
    :class="extraClass"
    :style="{ transform: `translateY(${parallaxY}px)` }"
  >
    Auraa
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  extraClass?: string
  speed?: number
}>()

// Disabled parallax scrolling to improve scroll performance
const parallaxY = ref(0)
</script>
