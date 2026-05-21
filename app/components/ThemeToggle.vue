<template>
  <button
    class="theme-toggle"
    :title="label"
    :aria-label="label"
    @click="toggle"
  >
    <!-- Sun icon (light mode) -->
    <Transition name="icon-swap">
      <Sun
        v-if="!isDark"
        key="sun"
        class="toggle-icon"
        style="color: var(--text-primary)"
      />
    </Transition>

    <!-- Moon icon (dark mode) -->
    <Transition name="icon-swap">
      <Moon
        v-if="isDark"
        key="moon"
        class="toggle-icon"
        style="color: var(--text-primary)"
      />
    </Transition>

    <!-- Tooltip -->
    <span class="toggle-tooltip" style="background-color: var(--bg-tertiary); color: var(--text-muted); border: 1px solid var(--border-subtle)">
      {{ label }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'

const { isDark, theme, toggle } = useTheme()

const label = computed(() => {
  if (theme.value === 'system') return isDark.value ? 'Тёмная (авто)' : 'Светлая (авто)'
  return isDark.value ? 'Тёмная' : 'Светлая'
})
</script>

<style scoped>
.theme-toggle {
  position: relative;
  width: 40px;
  height: 40px;
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.theme-toggle:hover {
  background-color: var(--accent-subtle);
  border-color: var(--accent);
}

.theme-toggle:hover .toggle-tooltip {
  opacity: 1;
}

.toggle-icon {
  position: absolute;
  width: 16px;
  height: 16px;
  inset: 0;
  margin: auto;
}

.toggle-tooltip {
  position: absolute;
  bottom: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  white-space: nowrap;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: opacity 0.2s ease, transform 0.25s ease;
}
.icon-swap-enter-from {
  opacity: 0;
  transform: rotate(-30deg) scale(0.7);
}
.icon-swap-leave-to {
  opacity: 0;
  transform: rotate(30deg) scale(0.7);
}
</style>
