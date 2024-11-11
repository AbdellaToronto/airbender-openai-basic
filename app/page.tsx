'use client'

import { chatCompletion } from '@/server-actions'
import { useState } from 'react'


export default function Home() {
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const messages = [
      { role: 'system' as const, content: 'You are a helpful assistant.' },
      { role: 'user' as const, content: 'Tell me a short joke about programming.' }
    ]

    const result = await chatCompletion(messages)
    setLoading(false)
    
    if (result.success) {
      setResponse(result.message || '')
    } else {
      setResponse('Error: Failed to get response')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <main className="flex flex-col items-center gap-8 max-w-md">
        <h1 className="text-2xl font-bold">OpenAI Chat Demo</h1>
        
        <button
          onClick={handleClick}
          disabled={loading}
          className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Loading...' : 'Tell me a joke'}
        </button>

        {response && (
          <div className="rounded-lg border border-gray-200 p-4 w-full">
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </main>
    </div>
  )
}
