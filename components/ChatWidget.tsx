
import React, { useState, useRef, useEffect } from 'react';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: 'Olá! Como podemos ajudar com seu checkout hoje?', 
      sender: 'agent', 
      time: '10:45 AM' 
    },
    { 
      id: 2, 
      text: 'Oi, estou com uma dúvida sobre o prazo de entrega para São Paulo.', 
      sender: 'user', 
      time: '10:46 AM' 
    },
    { 
      id: 3, 
      text: 'Claro! Para a região de São Paulo, o prazo médio é de 3 a 5 dias úteis após a confirmação do pagamento.', 
      sender: 'agent', 
      time: '10:48 AM' 
    },
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Resposta automática simulada
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: 'Entendido! Só um momento enquanto verifico essa informação para você...',
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[300] font-inter">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] h-[600px] bg-white dark:bg-zinc-900 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-slate-100 dark:border-zinc-800 animate-toast">
          {/* Header */}
          <div className="p-6 border-b border-slate-50 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-zinc-800 shadow-sm">
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=100" alt="Suporte" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-success border-4 border-white dark:border-zinc-900 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white leading-tight">Suporte Online</h3>
                <p className="text-[10px] text-slate-400 font-medium">Normalmente responde em 2min</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-slate-500 transition-colors">
              <span className="material-icons-round">close</span>
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#FDFDFD] dark:bg-zinc-950 custom-scrollbar">
            <div className="flex justify-center">
              <span className="bg-slate-50 dark:bg-zinc-900 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400">Hoje</span>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-4 text-sm font-medium leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 text-slate-700 dark:text-slate-200 rounded-[24px_24px_4px_24px]' 
                    : 'bg-brand-primary text-white shadow-lg shadow-brand-primary/10 rounded-[24px_24px_24px_4px]'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-300 font-bold mt-2 mx-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Footer / Input */}
          <div className="p-6 bg-white dark:bg-zinc-900 border-t border-slate-50 dark:border-zinc-800">
            <form onSubmit={handleSend} className="relative flex items-center bg-slate-50 dark:bg-zinc-800/50 rounded-2xl p-1.5 border border-slate-100 dark:border-zinc-800">
              <button type="button" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-brand-primary transition-colors">
                <span className="material-icons-round">attach_file</span>
              </button>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium px-2 py-3 placeholder:text-slate-300"
              />
              <button 
                type="submit"
                className="w-10 h-10 bg-brand-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                <span className="material-icons-round text-lg">send</span>
              </button>
            </form>
            <div className="mt-4 flex items-center justify-center gap-2 text-slate-300">
               <span className="material-icons-round text-sm">bolt</span>
               <span className="text-[8px] font-black uppercase tracking-widest">Powered by SuporteLive</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 bg-brand-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        <span className="material-icons-round text-3xl group-hover:rotate-12 transition-transform">
          {isOpen ? 'close' : 'chat'}
        </span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-brand-error border-4 border-slate-50 dark:border-zinc-950 rounded-full flex items-center justify-center text-[10px] font-black">1</span>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
