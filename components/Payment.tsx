
import React, { useState } from 'react';

interface Props {
  onNext: () => void;
  onBack: () => void;
  cartTotal: number;
}

const Payment: React.FC<Props> = ({ onNext, onBack, cartTotal }) => {
  const [method, setMethod] = useState<'pix' | 'card' | 'boleto'>('pix');
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvc: '' });

  const methods = [
    { id: 'pix', label: 'Pix Instantâneo', icon: 'pix', sub: 'Aprovação em 2 seg', color: 'emerald' },
    { id: 'card', label: 'Cartão de Crédito', icon: 'credit_card', sub: 'Até 12x sem juros', color: 'blue' },
    { id: 'boleto', label: 'Boleto Bancário', icon: 'description', sub: '1 dia útil para processar', color: 'amber' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-zinc-950">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-4xl shadow-2xl overflow-hidden border border-neutral-100 dark:border-zinc-800 flex flex-col animate-toast">
        <div className="px-8 py-6 border-b border-neutral-50 dark:border-zinc-800 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center text-neutral-400 hover:text-brand-primary transition-colors text-[10px] font-black uppercase tracking-widest">
            <span className="material-icons-round mr-1 text-sm">arrow_back</span> Voltar
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Passo 3 de 4</span>
            <div className="h-1.5 w-24 bg-slate-100 dark:bg-zinc-800 rounded-full mt-1 overflow-hidden">
               <div className="h-full w-3/4 bg-brand-primary transition-all duration-700"></div>
            </div>
          </div>
          <div className="w-10"></div>
        </div>

        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <div className="mb-10">
            <h1 className="text-2xl font-black mb-2 tracking-tight">Forma de Pagamento</h1>
            <p className="text-neutral-500 text-sm font-medium leading-relaxed">Sua transação é protegida por criptografia de ponta a ponta.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-10">
            {methods.map(m => (
              <button 
                key={m.id}
                onClick={() => setMethod(m.id as any)}
                className={`flex items-center justify-between p-6 border-2 rounded-2xl transition-all ${method === m.id ? 'border-brand-primary bg-brand-primary/5 ring-4 ring-brand-primary/10' : 'border-neutral-50 dark:border-zinc-800 hover:border-brand-primary/30'}`}
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-5 ${m.id === 'pix' ? 'bg-emerald-100 text-emerald-600' : m.id === 'card' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>
                    <span className="material-icons-round">{m.icon}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-black text-lg leading-tight tracking-tight">{m.label}</p>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">{m.sub}</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === m.id ? 'border-brand-primary shadow-inner' : 'border-neutral-200'}`}>
                  {method === m.id && <div className="w-2.5 h-2.5 bg-brand-primary rounded-full animate-pulse"></div>}
                </div>
              </button>
            ))}
          </div>

          {method === 'card' && (
            <div className="space-y-6 animate-toast">
              <div className="bg-gradient-to-br from-neutral-900 to-zinc-800 p-8 rounded-[32px] text-white shadow-2xl relative overflow-hidden h-52 flex flex-col justify-between mb-8 group">
                 <div className="flex justify-between items-start relative z-10">
                    <span className="material-icons-round text-4xl opacity-50 group-hover:rotate-12 transition-transform">contactless</span>
                    <div className="w-14 h-10 bg-white/10 rounded-lg backdrop-blur-md flex items-center justify-center border border-white/20">
                       <span className="text-[8px] font-black uppercase tracking-[0.2em]">VISA</span>
                    </div>
                 </div>
                 <div className="space-y-5 relative z-10">
                    <p className="text-2xl font-mono tracking-[0.25em] h-8">{cardData.number || '•••• •••• •••• ••••'}</p>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                       <span className="truncate max-w-[200px]">{cardData.name || 'NOME NO CARTÃO'}</span>
                       <span>{cardData.expiry || 'MM/AA'}</span>
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Número do Cartão</label>
                  <input className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 shadow-inner" placeholder="0000 0000 0000 0000" value={cardData.number} onChange={e => setCardData({...cardData, number: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Validade</label>
                  <input className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 shadow-inner" placeholder="MM/AA" value={cardData.expiry} onChange={e => setCardData({...cardData, expiry: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">CVC</label>
                  <input className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 shadow-inner" placeholder="123" value={cardData.cvc} onChange={e => setCardData({...cardData, cvc: e.target.value})} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 md:p-12 border-t border-neutral-100 dark:border-zinc-800 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-800/20">
          <div>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total com taxas</span>
            <p className="text-3xl font-black text-brand-primary tracking-tighter leading-none mt-1">R$ {cartTotal.toFixed(2)}</p>
          </div>
          <button onClick={onNext} className="bg-brand-primary text-white font-black py-5 px-12 rounded-2xl flex items-center gap-3 shadow-2xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-[10px] uppercase tracking-[0.2em]">
            Pagar Agora <span className="material-icons-round text-lg">check_circle</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
