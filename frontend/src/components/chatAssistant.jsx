import { useState } from 'react'

function ChatAssistant({ results, medications }) {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: `I've finished analyzing your medications. Feel free to ask me any follow up questions.`
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    // Add user message to chat
    const userMessage = { role: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          context: `Medications: ${medications.join(', ')}. Analysis: ${results.summary}`
        })
      })
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, something went wrong. Please try again.' }])
    }

    setLoading(false)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        <span className="text-sm font-medium text-gray-700">Follow-up Assistant</span>
      </div>

      {/* Messages */}
      <div className="p-4 flex flex-col gap-3 max-h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>

            {/* Avatar */}
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
              msg.role === 'ai' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {msg.role === 'ai' ? 'AI' : 'You'}
            </div>

            {/* Bubble */}
            <div className={`max-w-xs px-3 py-2 rounded-xl text-sm leading-relaxed ${
              msg.role === 'ai'
                ? 'bg-gray-50 text-gray-800'
                : 'bg-green-600 text-white'
            }`}>
              {msg.text}
            </div>

          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-xs font-semibold text-green-700">
              AI
            </div>
            <div className="bg-gray-50 px-3 py-2 rounded-xl flex gap-1 items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
      </div>

      {/* Input row */}
      <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about your medications..."
          className="flex-1 border border-gray-200 rounded-lg px-3 h-9 text-sm focus:outline-none focus:border-green-500"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 h-9 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>

    </div>
  )
}

export default ChatAssistant