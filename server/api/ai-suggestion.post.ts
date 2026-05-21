import { getRandomTips } from '../utils/mock-tips'

export default defineEventHandler(async (event) => {
  // Имитируем небольшую задержку для реалистичности "раздумий ИИ" (от 0.5 до 1.5 сек)
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000))
  
  const text = getRandomTips(2)
  
  return { suggestion: text }
})
