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
              :href="icon.href"
              target="_blank"
              rel="noopener noreferrer"
              class="glass-card group inline-flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300"
              :style="{
                color: 'var(--text-primary)',
                borderColor: hoveredSocial === icon.name ? 'var(--border-medium)' : 'var(--border-subtle)',
                backgroundColor: hoveredSocial === icon.name ? 'var(--accent-subtle)' : 'var(--glass-bg)',
                transform: hoveredSocial === icon.name ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hoveredSocial === icon.name ? '0 12px 32px var(--shadow-color)' : '0 1px 3px var(--shadow-color)'
              }"
              @mouseenter="hoveredSocial = icon.name"
              @mouseleave="hoveredSocial = null"
            >
              <span
                class="social-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300"
                :style="{
                  backgroundColor: hoveredSocial === icon.name ? 'var(--accent)' : 'var(--accent-subtle)',
                  color: hoveredSocial === icon.name ? '#ffffff' : 'var(--accent)'
                }"
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
            <li>+992 92 888 0719</li>
            <li>Таджикистан, Худжанд</li>
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
  { name: 'instagram', label: 'Instagram', component: Instagram, href: 'https://www.instagram.com/auraa_io/?e=8db77f0f-e2f2-4a39-9cb9-3b7fa0744d53&g=5' },
  { name: 'telegram', label: 'Telegram', component: Send, href: 'https://t.me/Auraa_tj' },
  { name: 'whatsapp', label: 'WhatsApp', component: MessageCircle, href: 'https://wa.me/992928880719' },
]

const hoveredSocial = ref<string | null>(null)

const navLinks = [
  { label: 'О нас', href: '#about' },
  { label: 'Преимущества', href: '#features' },
  { label: 'Услуги', href: '#services' },
  { label: 'Кейсы', href: '#cases' },
]
</script>
