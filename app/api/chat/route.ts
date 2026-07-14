import { streamText } from 'ai'
import { getModelInstance, ModelProvider } from '@/lib/models/providers'
import { SYSTEM_PROMPT } from '@/lib/agent/system-prompt'
import { agentTools } from '@/lib/agent/tools'

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages, provider, modelName } = body
    
    // Extract API key from custom header
    const apiKey = req.headers.get('x-api-key') || ''

    if (!provider) {
      return new Response(
        JSON.stringify({ error: 'Missing model provider configuration.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Initialize provider instance
    const model = getModelInstance(provider as ModelProvider, apiKey, modelName) as any

    // Call streamText with automatic tool execution (up to 5 steps)
    const result = streamText({
      model,
      system: SYSTEM_PROMPT,
      messages,
      tools: agentTools,
      maxSteps: 5,
    } as any)

    return (result as any).toDataStreamResponse()
  } catch (error: any) {
    console.error('Error in API Chat Route:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error during chat streaming.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
