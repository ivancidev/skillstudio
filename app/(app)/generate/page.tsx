import { ChatInterface } from '@/components/chat/chat-interface'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

export default function GeneratePage() {
  return (
    <Suspense 
      fallback={
        <div className="flex-1 flex flex-col items-center justify-center text-center p-12 min-h-screen bg-slate-50 text-slate-400">
          <Loader2 className="w-8 h-8 text-brand-indigo animate-spin mb-4" />
          <p className="font-mono text-[12px] uppercase tracking-wider">Initializing generation workspace...</p>
        </div>
      }
    >
      <ChatInterface />
    </Suspense>
  )
}
