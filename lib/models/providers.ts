import { createGoogle } from '@ai-sdk/google'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createOpenAI } from '@ai-sdk/openai'

export type ModelProvider = 'gemini' | 'claude' | 'gpt'

export const getModelInstance = (provider: ModelProvider, apiKey: string, modelName?: string) => {
  if (provider === 'gemini') {
    const googleInstance = createGoogle({
      apiKey: apiKey || process.env.GEMINI_API_KEY || '',
    })
    // Gemini 2.0 Flash is the default development model
    return googleInstance(modelName || 'gemini-2.0-flash')
  } else if (provider === 'claude') {
    const anthropicInstance = createAnthropic({
      apiKey: apiKey || process.env.ANTHROPIC_API_KEY || '',
    })
    return anthropicInstance(modelName || 'claude-3-5-sonnet-20241022')
  } else if (provider === 'gpt') {
    const openaiInstance = createOpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY || '',
    })
    return openaiInstance(modelName || 'gpt-4o-mini')
  }
  throw new Error(`Unsupported provider: ${provider}`)
}
