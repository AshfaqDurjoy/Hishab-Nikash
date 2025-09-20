import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const send = async () => {
    if (!msg) return;
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setMsg('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      });
      if (!res.ok) {
        console.error('API error', res.status);
        return;
      }
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
    } catch (err) {
      console.log('Fetch error', err);
    }
  };

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border border-gray-300 rounded-lg shadow-lg overflow-hidden">
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`px-4 py-2 rounded-lg max-w-xs break-words
              ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-900'}`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="flex p-2 border-t border-gray-300 bg-white">
        <input
          type="text"
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button
          onClick={send}
          className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}
