<template>
  <footer
    class="py-20 border-t"
    style="background-color: var(--bg-primary); border-color: var(--border-subtle)"
  >
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div class="md:col-span-2">
          <div
            class="text-3xl font-display font-bold tracking-tighter mb-8"
            style="color: var(--text-primary)"
          >
            AURA<span style="color: var(--text-muted)">.</span>
          </div>
          <p
            class="max-w-sm text-lg leading-relaxed mb-8"
            style="color: var(--text-muted)"
          >
            Создание премиальных цифровых продуктов, которые вдохновляют и обеспечивают значимый рост для передовых брендов.
          </p>
          <div class="grid grid-cols-2 gap-3 max-w-sm">
            <a
              v-for="icon in socialIcons"
              :key="icon.name"
              href="#"
              class="glass-card group inline-flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200"
              :style="{
                color: 'var(--text-primary)',
              }"
              @mouseenter="handleSocialHover($event, true)"
              @mouseleave="handleSocialHover($event, false)"
            >
              <span
                class="social-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200"
                :style="{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }"
              >
                <component :is="icon.component" class="w-4 h-4" />
              </span>
              <span class="leading-none">{{ icon.label }}</span>
            </a>
          </div>
        </div>

        <div>
          <h4
            class="text-sm font-bold uppercase tracking-widest mb-8"
            style="color: var(--text-primary)"
          >
            Навигация
          </h4>
          <ul class="flex flex-col gap-4" style="color: var(--text-muted)">
            <li v-for="link in navLinks" :key="link.label">
              <a
                :href="link.href"
                class="transition-colors duration-200 hover:underline"
                style="color: var(--text-muted)"
                @mouseenter="($event.target as HTMLElement).style.color = 'var(--text-primary)'"
                @mouseleave="($event.target as HTMLElement).style.color = 'var(--text-muted)'"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4
            class="text-sm font-bold uppercase tracking-widest mb-8"
            style="color: var(--text-primary)"
          >
            Контакты
          </h4>
          <ul class="flex flex-col gap-4" style="color: var(--text-muted)">
            <li>ioauura@gmail.com</li>
            <li>+992 92 000 0000</li>
            <li>Таджикистан<br />город, Худжанд</li>
          </ul>
        </div>
      </div>

      <div
        class="pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium"
        style="border-color: var(--border-subtle); color: var(--text-muted)"
      >
        <p>© 2026 Aura Digital Agency. Все права защищены.</p>
        <div class="flex gap-8">
          <a href="#" class="transition-colors duration-200 hover:underline" style="color: var(--text-muted)">Политика конфиденциальности</a>
          <a href="#" class="transition-colors duration-200 hover:underline" style="color: var(--text-muted)">Условия использования</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Github, Instagram, MessageCircle, Send } from 'lucide-vue-next'

const socialIcons = [
  { name: 'instagram', label: 'Instagram', component: Instagram },
  { name: 'telegram', label: 'Telegram', component: Send },
  { name: 'whatsapp', label: 'WhatsApp', component: MessageCircle },
  { name: 'github', label: 'GitHub', component: Github },
]

function handleSocialHover(event: MouseEvent, isActive: boolean) {
  const link = event.currentTarget as HTMLElement
  const icon = link.querySelector('.social-icon') as HTMLElement | null

  link.style.borderColor = isActive ? 'var(--border-medium)' : 'var(--border-subtle)'
  link.style.backgroundColor = isActive ? 'var(--accent-subtle)' : 'var(--glass-bg)'
  link.style.transform = isActive ? 'translateY(-2px)' : 'translateY(0)'
  link.style.boxShadow = isActive ? '0 12px 32px var(--shadow-color)' : '0 1px 3px var(--shadow-color)'

  if (icon) {
    icon.style.backgroundColor = isActive ? 'var(--accent)' : 'var(--accent-subtle)'
    icon.style.color = isActive ? '#ffffff' : 'var(--accent)'
  }
}

const navLinks = [
  { label: 'О нас', href: '#about' },
  { label: 'Преимущества', href: '#features' },
  { label: 'Услуги', href: '#services' },
  { label: 'Кейсы', href: '#cases' },
]
</script>
