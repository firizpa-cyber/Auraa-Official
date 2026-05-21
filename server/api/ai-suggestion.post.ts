export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { serviceName, optionNames } = body

  const prompt = `Как эксперт по цифровым продуктам, предложи 2 коротких совета по улучшению проекта, если выбрана основная услуга "${serviceName}" и доп. опции: ${(optionNames as string[]).join(', ') || 'нет'}. Ответь на русском языке, кратко и профессионально, без воды.`

  try {
    // Используем полностью бесплатное API без ключей (Pollinations AI)
    const text = await $fetch<string>(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`)
    
    return { suggestion: text || 'Не удалось получить рекомендации.' }
  } catch (error) {
    console.error('Free AI API error:', error)
    return { suggestion: 'Ошибка при получении рекомендаций.' }
  }
})
