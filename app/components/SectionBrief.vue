<template>
  <div>
    <!-- Success state -->
    <div
      v-if="submitted"
      class="min-h-screen flex items-center justify-center px-6 pt-20"
      style="background-color: var(--bg-primary)"
    >
      <div
        class="max-w-md w-full text-center p-12 glass-card rounded-2xl"
      >
        <div
          class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
          style="background-color: var(--accent-subtle)"
        >
          <CheckCircle class="w-10 h-10" style="color: var(--accent)" />
        </div>
        <h2
          class="text-2xl font-display font-bold mb-4"
          style="color: var(--text-primary)"
        >
          Бриф отправлен!
        </h2>
        <p
          class="mb-8 leading-relaxed text-sm"
          style="color: var(--text-secondary)"
        >
          Спасибо за доверие. Наш стратег изучит ваш проект и свяжется с вами в течение 24 часов.
        </p>
        <NuxtLink to="/" class="navy-button w-full inline-flex justify-center">
          Вернуться на главную
        </NuxtLink>
      </div>
    </div>

    <!-- Form -->
    <div
      v-else
      class="min-h-screen pt-32 pb-20 px-6"
      style="background-color: var(--bg-secondary)"
    >
      <div class="max-w-2xl mx-auto">
        <div class="mb-12">
          <NuxtLink
            to="/"
            class="text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 mb-8"
            style="color: var(--text-muted)"
          >
            <ChevronLeft class="w-3 h-3" /> Назад
          </NuxtLink>
          <div class="flex justify-between items-end mb-4">
            <h1
              class="text-3xl md:text-4xl font-display font-bold"
              style="color: var(--text-primary)"
            >
              Бриф проекта
            </h1>
            <span
              class="text-[10px] font-bold uppercase tracking-widest"
              style="color: var(--text-muted)"
            >
              Шаг {{ step }} из 3
            </span>
          </div>
          <!-- Progress bar -->
          <div
            class="h-1 rounded-full overflow-hidden"
            style="background-color: var(--border-subtle)"
          >
            <div
              class="h-full rounded-full transition-all duration-500"
              :style="{ width: `${(step / 3) * 100}%`, backgroundColor: 'var(--accent)' }"
            />
          </div>
        </div>

        <form
          class="glass-card p-8 md:p-12 rounded-2xl"
          @submit.prevent="handleSubmit"
        >
          <Transition name="step-slide" mode="out-in">
            <!-- Step 1 -->
            <div v-if="step === 1" key="step1" class="space-y-6">
              <h3
                class="text-lg font-display font-bold mb-8"
                style="color: var(--text-primary)"
              >
                Контактная информация
              </h3>
              <div class="space-y-4">
                <div v-for="field in step1Fields" :key="field.key">
                  <label
                    class="block text-[10px] font-bold uppercase tracking-widest mb-2"
                    style="color: var(--text-muted)"
                  >
                    {{ field.label }}
                  </label>
                  <div v-if="field.key === 'phone'" ref="phoneCountryRef" class="relative">
                    <div
                      class="flex rounded-xl border transition-all duration-300"
                      :style="isPhoneCountryOpen
                        ? { borderColor: 'var(--accent)', boxShadow: '0 18px 45px var(--shadow-strong)', backgroundColor: 'var(--bg-primary)' }
                        : { borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }"
                    >
                      <button
                        type="button"
                        class="flex shrink-0 items-center gap-2 rounded-l-xl px-3 py-3 text-sm transition-colors"
                        :style="{ color: 'var(--text-primary)', borderRight: '1px solid var(--border-subtle)' }"
                        aria-label="Выбрать страну"
                        @click="isPhoneCountryOpen = !isPhoneCountryOpen"
                      >
                        <span class="text-base leading-none">{{ selectedPhoneCountry.flag }}</span>
                        <span class="font-medium">{{ selectedPhoneCountry.dialCode }}</span>
                        <ChevronDown
                          class="w-4 h-4 transition-transform duration-300"
                          :class="isPhoneCountryOpen ? 'rotate-180' : ''"
                          :style="{ color: isPhoneCountryOpen ? 'var(--accent)' : 'var(--text-muted)' }"
                        />
                      </button>
                      <input
                        v-model="formData.phone"
                        type="tel"
                        :required="field.required"
                        :placeholder="field.placeholder"
                        :inputmode="field.inputmode"
                        class="min-w-0 flex-1 rounded-r-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                        :style="{ backgroundColor: 'transparent', color: 'var(--text-primary)' }"
                        @input="handleFieldInput(field.key, $event)"
                      />
                    </div>

                    <Transition name="dropdown">
                      <div
                        v-if="isPhoneCountryOpen"
                        class="absolute z-30 left-0 right-0 top-[calc(100%+0.6rem)] overflow-hidden rounded-2xl border backdrop-blur-xl"
                        :style="{ borderColor: 'var(--border-light)', backgroundColor: 'var(--glass-bg-solid)', boxShadow: '0 22px 60px var(--shadow-strong)' }"
                      >
                        <div class="p-2">
                          <div
                            class="mb-2 flex items-center gap-2 rounded-xl border px-3 py-2"
                            :style="{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }"
                          >
                            <Search class="h-4 w-4 shrink-0" style="color: var(--text-muted)" />
                            <input
                              v-model="phoneCountrySearch"
                              type="search"
                              placeholder="Поиск страны"
                              class="min-w-0 flex-1 bg-transparent text-sm outline-none"
                              :style="{ color: 'var(--text-primary)' }"
                            />
                          </div>
                          <div class="max-h-72 overflow-y-auto pr-1">
                            <button
                              v-for="country in filteredPhoneCountries"
                              :key="country.iso"
                              type="button"
                              class="w-full rounded-xl px-4 py-3 text-left text-sm transition-all duration-200"
                              :style="selectedPhoneCountry.iso === country.iso
                                ? { backgroundColor: 'var(--accent)', color: '#fff' }
                                : { color: 'var(--text-primary)' }"
                              @click="selectPhoneCountry(country)"
                            >
                              <span class="flex items-center justify-between gap-3">
                                <span class="min-w-0">
                                  <span class="mr-2 text-base leading-none">{{ country.flag }}</span>
                                  <span class="font-medium">{{ country.name }}</span>
                                </span>
                                <span
                                  class="shrink-0 text-xs font-semibold"
                                  :style="{ color: selectedPhoneCountry.iso === country.iso ? 'rgba(255,255,255,0.72)' : 'var(--text-muted)' }"
                                >
                                  {{ country.dialCode }}
                                </span>
                              </span>
                            </button>
                            <div
                              v-if="filteredPhoneCountries.length === 0"
                              class="px-4 py-5 text-center text-sm"
                              style="color: var(--text-muted)"
                            >
                              Страна не найдена
                            </div>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </div>
                  <input
                    v-else
                    v-model="formData[field.key as keyof typeof formData]"
                    :type="field.type"
                    :required="field.required"
                    :placeholder="field.placeholder"
                    :inputmode="field.inputmode"
                    class="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                    :style="inputStyle"
                    @input="handleFieldInput(field.key, $event)"
                  />
                </div>
              </div>
              <button
                type="button"
                class="navy-button w-full flex items-center justify-center gap-2"
                @click="nextStep"
              >
                Далее <ChevronRight class="w-4 h-4" />
              </button>
            </div>

            <!-- Step 2 -->
            <div v-else-if="step === 2" key="step2" class="space-y-6">
              <h3
                class="text-lg font-display font-bold mb-8"
                style="color: var(--text-primary)"
              >
                О проекте
              </h3>
              <div class="space-y-4">
                <!-- Company -->
                <div>
                  <label
                    class="block text-[10px] font-bold uppercase tracking-widest mb-2"
                    style="color: var(--text-muted)"
                  >
                    Компания
                  </label>
                  <input
                    v-model="formData.company"
                    type="text"
                    placeholder="Расскажите о вашей компании"
                    class="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors border"
                    :style="inputStyle"
                  />
                </div>

                <!-- Service type dropdown -->
                <div>
                  <label
                    class="block text-[10px] font-bold uppercase tracking-widest mb-2"
                    style="color: var(--text-muted)"
                  >
                    Тип услуги
                  </label>
                  <div ref="projectTypeRef" class="relative">
                    <button
                      type="button"
                      class="w-full rounded-xl px-4 py-3 text-sm text-left transition-all duration-300 flex items-center justify-between border"
                      :style="isProjectTypeOpen
                        ? { borderColor: 'var(--accent)', boxShadow: '0 18px 45px var(--shadow-strong)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }
                        : { borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }"
                      @click="isProjectTypeOpen = !isProjectTypeOpen"
                    >
                      <span>{{ formData.projectType }}</span>
                      <ChevronDown
                        class="w-4 h-4 transition-transform duration-300"
                        :class="isProjectTypeOpen ? 'rotate-180' : ''"
                        :style="{ color: isProjectTypeOpen ? 'var(--accent)' : 'var(--text-muted)' }"
                      />
                    </button>

                    <Transition name="dropdown">
                      <div
                        v-if="isProjectTypeOpen"
                        class="absolute z-30 left-0 right-0 top-[calc(100%+0.6rem)] overflow-hidden rounded-2xl border backdrop-blur-xl"
                        :style="{ borderColor: 'var(--border-light)', backgroundColor: 'var(--glass-bg-solid)', boxShadow: '0 22px 60px var(--shadow-strong)' }"
                      >
                        <div class="p-2">
                          <button
                            v-for="type in PROJECT_TYPES"
                            :key="type"
                            type="button"
                            class="w-full rounded-xl px-4 py-3 text-left text-sm transition-all duration-200"
                            :style="formData.projectType === type
                              ? { backgroundColor: 'var(--accent)', color: '#fff' }
                              : { color: 'var(--text-primary)' }"
                            @click="formData.projectType = type; isProjectTypeOpen = false"
                          >
                            <span class="block font-medium">{{ type }}</span>
                            <span
                              class="mt-1 block text-[10px] uppercase tracking-[0.22em]"
                              :style="{ color: formData.projectType === type ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)' }"
                            >
                              {{ formData.projectType === type ? 'Выбрано' : 'Выбрать' }}
                            </span>
                          </button>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>

                <!-- Budget -->
                <div>
                  <label
                    class="block text-[10px] font-bold uppercase tracking-widest mb-2"
                    style="color: var(--text-muted)"
                  >
                    Примерный бюджет
                  </label>
                  <input
                    v-model="formData.budget"
                    type="text"
                    placeholder="от 100 $"
                    class="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors border"
                    :style="inputStyle"
                    inputmode="decimal"
                    @input="handleFieldInput('budget', $event)"
                  />
                </div>
              </div>
              <div class="flex gap-4">
                <button type="button" class="outline-button flex-1" @click="prevStep">Назад</button>
                <button
                  type="button"
                  class="navy-button flex-[2] flex items-center justify-center gap-2"
                  @click="nextStep"
                >
                  Далее <ChevronRight class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Step 3 -->
            <div v-else-if="step === 3" key="step3" class="space-y-6">
              <h3
                class="text-lg font-display font-bold mb-8"
                style="color: var(--text-primary)"
              >
                Детали
              </h3>
              <div>
                <label
                  class="block text-[10px] font-bold uppercase tracking-widest mb-2"
                  style="color: var(--text-muted)"
                >
                  Какой ориентировочный срок?
                </label>
                <div ref="timelineRef" class="relative">
                  <button
                    type="button"
                    class="w-full rounded-xl px-4 py-3 text-sm text-left transition-all duration-300 flex items-center justify-between border"
                    :style="isTimelineOpen
                      ? { borderColor: 'var(--accent)', boxShadow: '0 18px 45px var(--shadow-strong)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }
                      : { borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }"
                    @click="isTimelineOpen = !isTimelineOpen"
                  >
                    <span>{{ formData.timeline || 'Выберите срок' }}</span>
                    <ChevronDown
                      class="w-4 h-4 transition-transform duration-300"
                      :class="isTimelineOpen ? 'rotate-180' : ''"
                      :style="{ color: isTimelineOpen ? 'var(--accent)' : 'var(--text-muted)' }"
                    />
                  </button>

                  <Transition name="dropdown">
                    <div
                      v-if="isTimelineOpen"
                      class="absolute z-30 left-0 right-0 top-[calc(100%+0.6rem)] overflow-hidden rounded-2xl border backdrop-blur-xl"
                      :style="{ borderColor: 'var(--border-light)', backgroundColor: 'var(--glass-bg-solid)', boxShadow: '0 22px 60px var(--shadow-strong)' }"
                    >
                      <div class="p-2">
                        <button
                          v-for="timeline in TIMELINE_OPTIONS"
                          :key="timeline"
                          type="button"
                          class="w-full rounded-xl px-4 py-3 text-left text-sm transition-all duration-200"
                          :style="formData.timeline === timeline
                            ? { backgroundColor: 'var(--accent)', color: '#fff' }
                            : { color: 'var(--text-primary)' }"
                          @click="formData.timeline = timeline; isTimelineOpen = false"
                        >
                          <span class="block font-medium">{{ timeline }}</span>
                          <span
                            class="mt-1 block text-[10px] uppercase tracking-[0.22em]"
                            :style="{ color: formData.timeline === timeline ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)' }"
                          >
                            {{ formData.timeline === timeline ? 'Выбрано' : 'Выбрать' }}
                          </span>
                        </button>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
              <div>
                <label
                  class="block text-[10px] font-bold uppercase tracking-widest mb-2"
                  style="color: var(--text-muted)"
                >
                  Описание задачи
                </label>
                <textarea
                  v-model="formData.description"
                  rows="5"
                  placeholder="Расскажите о ваших целях..."
                  class="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors resize-none border"
                  :style="inputStyle"
                />
              </div>
              <div class="flex gap-4">
                <button type="button" class="outline-button flex-1" @click="prevStep">Назад</button>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="navy-button flex-[2] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span v-if="isSubmitting" class="flex items-center gap-2">
                    <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Отправляем...
                  </span>
                  <span v-else class="flex items-center gap-2">
                    Отправить бриф <Send class="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          </Transition>

          <!-- Error message -->
          <Transition name="step-slide">
            <div
              v-if="submitError"
              class="mt-6 p-4 rounded-xl border text-sm"
              style="background-color: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.2); color: #dc2626"
            >
              ⚠️ {{ submitError }}
            </div>
          </Transition>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Send, CheckCircle, ChevronRight, ChevronLeft, ChevronDown, Search } from 'lucide-vue-next'

const PROJECT_TYPES = [
  'Веб-разработка', 'Техническое сопровождение', 'Телеграм-боты',
  'SEO оптимизация', 'Брендинг', 'Дизайн продукта', 'Маркетинг',
]

const step1Fields = [
  { key: 'name',  label: 'Ваше имя',       type: 'text',  required: true, placeholder: 'Иван Иванов', inputmode: 'text' },
  { key: 'email', label: 'Email',           type: 'email', required: true, placeholder: 'hello@example.com', inputmode: 'email' },
  { key: 'phone', label: 'Номер телефона',  type: 'tel',   required: false, placeholder: '+7 (999) 000-0000', inputmode: 'tel' },
  { key: 'messengerContact', label: 'Telegram / WhatsApp', type: 'text', required: false, placeholder: '@username или +7 (999) 000-0000', inputmode: 'text' },
]

const TIMELINE_OPTIONS = [
  'Срочно, до 1 недели',
  '1-2 недели',
  '3-4 недели',
  '1-2 месяца',
  '2-3 месяца',
  'Гибкий срок',
]

const PHONE_COUNTRIES = [
  { iso: 'RU', name: 'Россия', dialCode: '+7', flag: '🇷🇺', search: 'россия russia ru' },
  { iso: 'TJ', name: 'Таджикистан', dialCode: '+992', flag: '🇹🇯', search: 'таджикистан tajikistan tj' },
  { iso: 'UZ', name: 'Узбекистан', dialCode: '+998', flag: '🇺🇿', search: 'узбекистан uzbekistan uz' },
  { iso: 'KZ', name: 'Казахстан', dialCode: '+7', flag: '🇰🇿', search: 'казахстан kazakhstan kz' },
  { iso: 'KG', name: 'Кыргызстан', dialCode: '+996', flag: '🇰🇬', search: 'кыргызстан киргизия kyrgyzstan kg' },
  { iso: 'TM', name: 'Туркменистан', dialCode: '+993', flag: '🇹🇲', search: 'туркменистан turkmenistan tm' },
  { iso: 'BY', name: 'Беларусь', dialCode: '+375', flag: '🇧🇾', search: 'беларусь белоруссия belarus by' },
  { iso: 'UA', name: 'Украина', dialCode: '+380', flag: '🇺🇦', search: 'украина ukraine ua' },
  { iso: 'MD', name: 'Молдова', dialCode: '+373', flag: '🇲🇩', search: 'молдова moldova md' },
  { iso: 'AM', name: 'Армения', dialCode: '+374', flag: '🇦🇲', search: 'армения armenia am' },
  { iso: 'AZ', name: 'Азербайджан', dialCode: '+994', flag: '🇦🇿', search: 'азербайджан azerbaijan az' },
  { iso: 'GE', name: 'Грузия', dialCode: '+995', flag: '🇬🇪', search: 'грузия georgia ge' },
  { iso: 'CN', name: 'Китай', dialCode: '+86', flag: '🇨🇳', search: 'китай china cn' },
  { iso: 'JP', name: 'Япония', dialCode: '+81', flag: '🇯🇵', search: 'япония japan jp' },
  { iso: 'KR', name: 'Южная Корея', dialCode: '+82', flag: '🇰🇷', search: 'южная корея south korea kr' },
  { iso: 'KP', name: 'Северная Корея', dialCode: '+850', flag: '🇰🇵', search: 'северная корея north korea kp' },
  { iso: 'IN', name: 'Индия', dialCode: '+91', flag: '🇮🇳', search: 'индия india in' },
  { iso: 'PK', name: 'Пакистан', dialCode: '+92', flag: '🇵🇰', search: 'пакистан pakistan pk' },
  { iso: 'AF', name: 'Афганистан', dialCode: '+93', flag: '🇦🇫', search: 'афганистан afghanistan af' },
  { iso: 'IR', name: 'Иран', dialCode: '+98', flag: '🇮🇷', search: 'иран iran ir' },
  { iso: 'TR', name: 'Турция', dialCode: '+90', flag: '🇹🇷', search: 'турция turkey tr' },
  { iso: 'AE', name: 'ОАЭ', dialCode: '+971', flag: '🇦🇪', search: 'оаэ эмираты united arab emirates uae ae' },
  { iso: 'SA', name: 'Саудовская Аравия', dialCode: '+966', flag: '🇸🇦', search: 'саудовская аравия saudi arabia sa' },
  { iso: 'QA', name: 'Катар', dialCode: '+974', flag: '🇶🇦', search: 'катар qatar qa' },
  { iso: 'IL', name: 'Израиль', dialCode: '+972', flag: '🇮🇱', search: 'израиль israel il' },
  { iso: 'TH', name: 'Таиланд', dialCode: '+66', flag: '🇹🇭', search: 'таиланд thailand th' },
  { iso: 'VN', name: 'Вьетнам', dialCode: '+84', flag: '🇻🇳', search: 'вьетнам vietnam vn' },
  { iso: 'ID', name: 'Индонезия', dialCode: '+62', flag: '🇮🇩', search: 'индонезия indonesia id' },
  { iso: 'KH', name: 'Камбоджа', dialCode: '+855', flag: '🇰🇭', search: 'камбоджа cambodia kh' },
  { iso: 'LA', name: 'Лаос', dialCode: '+856', flag: '🇱🇦', search: 'лаос laos la' },
  { iso: 'MM', name: 'Мьянма', dialCode: '+95', flag: '🇲🇲', search: 'мьянма бирма myanmar mm' },
  { iso: 'MY', name: 'Малайзия', dialCode: '+60', flag: '🇲🇾', search: 'малайзия malaysia my' },
  { iso: 'SG', name: 'Сингапур', dialCode: '+65', flag: '🇸🇬', search: 'сингапур singapore sg' },
  { iso: 'PH', name: 'Филиппины', dialCode: '+63', flag: '🇵🇭', search: 'филиппины philippines ph' },
  { iso: 'LK', name: 'Шри-Ланка', dialCode: '+94', flag: '🇱🇰', search: 'шри-ланка sri lanka lk' },
  { iso: 'MV', name: 'Мальдивы', dialCode: '+960', flag: '🇲🇻', search: 'мальдивы maldives mv' },
  { iso: 'BD', name: 'Бангладеш', dialCode: '+880', flag: '🇧🇩', search: 'бангладеш bangladesh bd' },
  { iso: 'NP', name: 'Непал', dialCode: '+977', flag: '🇳🇵', search: 'непал nepal np' },
  { iso: 'BT', name: 'Бутан', dialCode: '+975', flag: '🇧🇹', search: 'бутан bhutan bt' },
  { iso: 'MN', name: 'Монголия', dialCode: '+976', flag: '🇲🇳', search: 'монголия mongolia mn' },
  { iso: 'DE', name: 'Германия', dialCode: '+49', flag: '🇩🇪', search: 'германия germany de' },
  { iso: 'FR', name: 'Франция', dialCode: '+33', flag: '🇫🇷', search: 'франция france fr' },
  { iso: 'IT', name: 'Италия', dialCode: '+39', flag: '🇮🇹', search: 'италия italy it' },
  { iso: 'ES', name: 'Испания', dialCode: '+34', flag: '🇪🇸', search: 'испания spain es' },
  { iso: 'PT', name: 'Португалия', dialCode: '+351', flag: '🇵🇹', search: 'португалия portugal pt' },
  { iso: 'GB', name: 'Великобритания', dialCode: '+44', flag: '🇬🇧', search: 'великобритания англия united kingdom britain uk gb' },
  { iso: 'IE', name: 'Ирландия', dialCode: '+353', flag: '🇮🇪', search: 'ирландия ireland ie' },
  { iso: 'NL', name: 'Нидерланды', dialCode: '+31', flag: '🇳🇱', search: 'нидерланды голландия netherlands holland nl' },
  { iso: 'BE', name: 'Бельгия', dialCode: '+32', flag: '🇧🇪', search: 'бельгия belgium be' },
  { iso: 'CH', name: 'Швейцария', dialCode: '+41', flag: '🇨🇭', search: 'швейцария switzerland ch' },
  { iso: 'AT', name: 'Австрия', dialCode: '+43', flag: '🇦🇹', search: 'австрия austria at' },
  { iso: 'PL', name: 'Польша', dialCode: '+48', flag: '🇵🇱', search: 'польша poland pl' },
  { iso: 'CZ', name: 'Чехия', dialCode: '+420', flag: '🇨🇿', search: 'чехия czech republic cz' },
  { iso: 'SK', name: 'Словакия', dialCode: '+421', flag: '🇸🇰', search: 'словакия slovakia sk' },
  { iso: 'HU', name: 'Венгрия', dialCode: '+36', flag: '🇭🇺', search: 'венгрия hungary hu' },
  { iso: 'RO', name: 'Румыния', dialCode: '+40', flag: '🇷🇴', search: 'румыния romania ro' },
  { iso: 'BG', name: 'Болгария', dialCode: '+359', flag: '🇧🇬', search: 'болгария bulgaria bg' },
  { iso: 'GR', name: 'Греция', dialCode: '+30', flag: '🇬🇷', search: 'греция greece gr' },
  { iso: 'RS', name: 'Сербия', dialCode: '+381', flag: '🇷🇸', search: 'сербия serbia rs' },
  { iso: 'ME', name: 'Черногория', dialCode: '+382', flag: '🇲🇪', search: 'черногория montenegro me' },
  { iso: 'HR', name: 'Хорватия', dialCode: '+385', flag: '🇭🇷', search: 'хорватия croatia hr' },
  { iso: 'SI', name: 'Словения', dialCode: '+386', flag: '🇸🇮', search: 'словения slovenia si' },
  { iso: 'SE', name: 'Швеция', dialCode: '+46', flag: '🇸🇪', search: 'швеция sweden se' },
  { iso: 'NO', name: 'Норвегия', dialCode: '+47', flag: '🇳🇴', search: 'норвегия norway no' },
  { iso: 'DK', name: 'Дания', dialCode: '+45', flag: '🇩🇰', search: 'дания denmark dk' },
  { iso: 'FI', name: 'Финляндия', dialCode: '+358', flag: '🇫🇮', search: 'финляндия finland fi' },
  { iso: 'EE', name: 'Эстония', dialCode: '+372', flag: '🇪🇪', search: 'эстония estonia ee' },
  { iso: 'LV', name: 'Латвия', dialCode: '+371', flag: '🇱🇻', search: 'латвия latvia lv' },
  { iso: 'LT', name: 'Литва', dialCode: '+370', flag: '🇱🇹', search: 'литва lithuania lt' },
  { iso: 'US', name: 'США', dialCode: '+1', flag: '🇺🇸', search: 'сша америка united states usa us' },
  { iso: 'CA', name: 'Канада', dialCode: '+1', flag: '🇨🇦', search: 'канада canada ca' },
  { iso: 'MX', name: 'Мексика', dialCode: '+52', flag: '🇲🇽', search: 'мексика mexico mx' },
  { iso: 'BR', name: 'Бразилия', dialCode: '+55', flag: '🇧🇷', search: 'бразилия brazil br' },
  { iso: 'AR', name: 'Аргентина', dialCode: '+54', flag: '🇦🇷', search: 'аргентина argentina ar' },
  { iso: 'CL', name: 'Чили', dialCode: '+56', flag: '🇨🇱', search: 'чили chile cl' },
  { iso: 'CO', name: 'Колумбия', dialCode: '+57', flag: '🇨🇴', search: 'колумбия colombia co' },
  { iso: 'PE', name: 'Перу', dialCode: '+51', flag: '🇵🇪', search: 'перу peru pe' },
  { iso: 'UY', name: 'Уругвай', dialCode: '+598', flag: '🇺🇾', search: 'уругвай uruguay uy' },
  { iso: 'EG', name: 'Египет', dialCode: '+20', flag: '🇪🇬', search: 'египет egypt eg' },
  { iso: 'MA', name: 'Марокко', dialCode: '+212', flag: '🇲🇦', search: 'марокко morocco ma' },
  { iso: 'TN', name: 'Тунис', dialCode: '+216', flag: '🇹🇳', search: 'тунис tunisia tn' },
  { iso: 'DZ', name: 'Алжир', dialCode: '+213', flag: '🇩🇿', search: 'алжир algeria dz' },
  { iso: 'ZA', name: 'ЮАР', dialCode: '+27', flag: '🇿🇦', search: 'юар южная африка south africa za' },
  { iso: 'NG', name: 'Нигерия', dialCode: '+234', flag: '🇳🇬', search: 'нигерия nigeria ng' },
  { iso: 'KE', name: 'Кения', dialCode: '+254', flag: '🇰🇪', search: 'кения kenya ke' },
  { iso: 'ET', name: 'Эфиопия', dialCode: '+251', flag: '🇪🇹', search: 'эфиопия ethiopia et' },
  { iso: 'AU', name: 'Австралия', dialCode: '+61', flag: '🇦🇺', search: 'австралия australia au' },
  { iso: 'NZ', name: 'Новая Зеландия', dialCode: '+64', flag: '🇳🇿', search: 'новая зеландия new zealand nz' },
] as const

const step = ref(1)
const submitted = ref(false)
const isSubmitting = ref(false)
const submitError = ref<string | null>(null)
const isProjectTypeOpen = ref(false)
const isTimelineOpen = ref(false)
const isPhoneCountryOpen = ref(false)
const phoneCountrySearch = ref('')
const selectedPhoneCountry = ref(PHONE_COUNTRIES[0])
const projectTypeRef = ref<HTMLElement | null>(null)
const timelineRef = ref<HTMLElement | null>(null)
const phoneCountryRef = ref<HTMLElement | null>(null)

const formData = reactive({
  name: '', email: '', phone: '', messengerContact: '', company: '',
  projectType: PROJECT_TYPES[0], budget: '', description: '', timeline: '',
})

// Dynamic input style using CSS vars
const inputStyle = computed(() => ({
  backgroundColor: 'var(--bg-primary)',
  borderColor: 'var(--border-subtle)',
  color: 'var(--text-primary)',
}))

const filteredPhoneCountries = computed(() => {
  const query = phoneCountrySearch.value.trim().toLowerCase()
  if (!query) return PHONE_COUNTRIES

  return PHONE_COUNTRIES.filter((country) =>
    `${country.name} ${country.dialCode} ${country.search}`.toLowerCase().includes(query),
  )
})

function findCountryByPhone(value: string) {
  const compact = value.replace(/[\s()\-]/g, '')
  if (!compact.startsWith('+')) return null

  return [...PHONE_COUNTRIES]
    .sort((a, b) => b.dialCode.length - a.dialCode.length)
    .find((country) => compact.startsWith(country.dialCode)) || null
}

function selectPhoneCountry(country: typeof PHONE_COUNTRIES[number]) {
  const previousCode = selectedPhoneCountry.value.dialCode
  selectedPhoneCountry.value = country
  isPhoneCountryOpen.value = false
  phoneCountrySearch.value = ''

  if (!formData.phone.trim()) {
    formData.phone = `${country.dialCode} `
    return
  }

  const currentCountry = findCountryByPhone(formData.phone)
  if (currentCountry && formData.phone.trim().startsWith(previousCode)) {
    formData.phone = formData.phone.replace(previousCode, country.dialCode)
  }
}

function sanitizePhone(value: string) {
  return value.replace(/[^\d+()\-\s]/g, '').replace(/(?!^)\+/g, '')
}

function sanitizeName(value: string) {
  return value.replace(/[^a-zA-Zа-яА-ЯёЁ\s'-]/g, '')
}

function sanitizeMessenger(value: string) {
  return value.replace(/[^\w@.+()\-\s]/g, '')
}

function handleFieldInput(key: string, event: Event) {
  const input = event.target as HTMLInputElement
  let value = input.value

  if (key === 'phone') {
    value = sanitizePhone(value)
    const matchedCountry = findCountryByPhone(value)
    if (matchedCountry) {
      selectedPhoneCountry.value = matchedCountry
    }
  } else if (key === 'name') {
    value = sanitizeName(value)
  } else if (key === 'messengerContact') {
    value = sanitizeMessenger(value)
  } else if (key === 'budget') {
    value = value.replace(/[^\d\s.,+$€₽-]/g, '')
  }

  input.value = value
  ;(formData as Record<string, string>)[key] = value
}

function validateCurrentStep() {
  submitError.value = null

  if (step.value === 1) {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      submitError.value = 'Введите корректное имя.'
      return false
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      submitError.value = 'Введите корректный email.'
      return false
    }

    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (formData.phone.trim() && (phoneDigits.length < 10 || phoneDigits.length > 15)) {
      submitError.value = 'Введите корректный номер телефона.'
      return false
    }

    if (formData.messengerContact.trim() && !/^(@[\w.]{3,}|[\d+()\-\s]{10,})$/.test(formData.messengerContact.trim())) {
      submitError.value = 'Введите Telegram в формате @username или номер WhatsApp.'
      return false
    }
  }

  if (step.value === 2 && formData.budget.trim() && !/^[\d\s.,+$€₽-]+$/.test(formData.budget.trim())) {
    submitError.value = 'Введите бюджет числом или диапазоном.'
    return false
  }

  return true
}

function nextStep() {
  if (!validateCurrentStep()) return
  step.value++
}
function prevStep() { step.value-- }

async function handleSubmit() {
  if (isSubmitting.value) return
  if (!validateCurrentStep()) return
  isSubmitting.value = true
  submitError.value = null

  try {
    await $fetch('/api/brief', {
      method: 'POST',
      body: {
        name:        formData.name,
        email:       formData.email,
        phone:       formData.phone,
        messengerContact: formData.messengerContact,
        company:     formData.company,
        projectType: formData.projectType,
        budget:      formData.budget,
        description: formData.description,
        timeline:    formData.timeline,
      },
    })
    submitted.value = true
  } catch (err: any) {
    submitError.value = err?.data?.statusMessage || 'Ошибка при отправке. Попробуйте ещё раз.'
  } finally {
    isSubmitting.value = false
  }
}

function handleClickOutside(e: MouseEvent) {
  if (projectTypeRef.value && !projectTypeRef.value.contains(e.target as Node)) {
    isProjectTypeOpen.value = false
  }
  if (timelineRef.value && !timelineRef.value.contains(e.target as Node)) {
    isTimelineOpen.value = false
  }
  if (phoneCountryRef.value && !phoneCountryRef.value.contains(e.target as Node)) {
    isPhoneCountryOpen.value = false
  }
}
onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<style scoped>
.step-slide-enter-active,
.step-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.step-slide-enter-from { opacity: 0; transform: translateX(20px); }
.step-slide-leave-to   { opacity: 0; transform: translateX(-20px); }

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
</style>
