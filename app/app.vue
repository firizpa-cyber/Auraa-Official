<template>
  <div>
    <div class="relative min-h-screen" style="background-color: var(--bg-primary)">
      <AppNavbar />
      <main>
        <NuxtPage />
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
const { init } = useTheme()

onMounted(() => {
  init()
})
</script>
