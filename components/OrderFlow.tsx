
import React, { useEffect, useState } from 'react';
import { AppView } from '../types';

interface Props {
  view: AppView;
  onNext?: () => void;
  onBack?: () => void;
  onNavigate?: (view: AppView) => void;
  onNpsSubmit?: () => void;
}

const OrderFlow: React.FC<Props> = ({ view, onNext, onBack, onNavigate, onNpsSubmit }) => {
  const [mapProgress, setMapProgress] = useState(0);

  useEffect(() => {
    if (view === AppView.CHECKOUT_PROCESSING && onNext) {
      const timer = setTimeout(onNext, 3000);
      return () => clearTimeout(timer);
    }
    
    if (view === AppView.ORDER_MAP) {
      const interval = setInterval(() => {
        setMapProgress(p => (p < 100 ? p + 0.1 : 100));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [view, onNext]);

  if (view === AppView.CHECKOUT_PROCESSING) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-neutral-50 dark:bg-zinc-950 animate-pulse">
        <div className="w-24 h-24 border-[6px] border-neutral-200 dark:border-zinc-800 border-t-brand-primary rounded-full animate-spin mb-8 shadow-2xl shadow-brand-primary/20"></div>
        <h1 className="text-3xl font-black mb-3">Processando...</h1>
        <p className="text-neutral-500 body-base text-center max-w-sm font-medium">Estamos conectando com segurança ao seu banco. Por favor, aguarde.</p>
      </div>
    );
  }

  if (view === AppView.ORDER_MAP) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 flex flex-col">
        <header className="h-20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between px-8 z-20">
          <button onClick={() => onNavigate && onNavigate(AppView.ORDER_TRACKING)} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-slate-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
              <span className="material-icons-round">arrow_back</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Voltar</span>
          </button>
          <div className="flex flex-col items-center">
             <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Entrega em Tempo Real</span>
             <h2 className="font-bold text-sm">Pedido #84920</h2>
          </div>
          <div className="w-24"></div>
        </header>

        <main className="flex-1 relative overflow-hidden bg-slate-200 dark:bg-zinc-800">
           <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i14!2i4850!3i10100!2m3!1e0!2sm!3i420120488!3m8!2spt-BR!3sUS!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i4111425')] opacity-40 grayscale contrast-125 dark:invert"></div>
             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
                <path d="M100,500 Q300,400 500,600 T900,500" fill="none" stroke="#5B13EC" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 10" className="opacity-20" />
                <circle cx={100 + mapProgress * 8} cy={500 + Math.sin(mapProgress/10)*50} r="12" fill="#5B13EC" className="shadow-2xl shadow-brand-primary animate-pulse" />
             </svg>
           </div>
           <div className="absolute bottom-10 left-10 right-10 md:left-auto md:right-10 md:w-96 z-10 animate-toast">
              <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl p-8 rounded-[40px] shadow-[0_32px_128px_-32px_rgba(0,0,0,0.3)] border border-white/50 dark:border-white/10">
                 <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-zinc-800"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100" className="w-full h-full object-cover" alt="Courier" /></div>
                    <div><h3 className="font-black text-xl">Lucas Silveira</h3><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Seu Entregador Premium</p></div>
                    <div className="ml-auto w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center"><span className="material-icons-round">chat</span></div>
                 </div>
                 <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-zinc-800 rounded-2xl"><span className="text-[10px] font-black uppercase text-slate-400">Previsão</span><span className="font-black text-brand-primary">12-15 Min</span></div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-zinc-800 rounded-2xl"><span className="text-[10px] font-black uppercase text-slate-400">Distância</span><span className="font-black">2.4 km</span></div>
                 </div>
                 <button className="w-full py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Ver Detalhes do Pedido</button>
              </div>
           </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 md:p-20 bg-neutral-50 dark:bg-zinc-950 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[48px] shadow-2xl border border-neutral-100 dark:border-zinc-800 p-12 md:p-16 text-center animate-toast">
        {view === AppView.ORDER_TRACKING ? (
          <>
            <div className="flex items-center justify-between mb-16"><div className="text-left"><h2 className="text-3xl font-black tracking-tight">Status do Pedido</h2><p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Acompanhamento Live</p></div><span className="bg-brand-primary/10 text-brand-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">#84920</span></div>
            <div className="space-y-12 text-left mb-16">
               {[
                 { label: 'Pedido Confirmado', desc: 'Processado às 14:20h', active: true, done: true, icon: 'check_circle' },
                 { label: 'Preparando seu pacote', desc: 'Sendo embalado com carinho', active: true, done: true, icon: 'inventory_2' },
                 { label: 'Em trânsito', desc: 'A caminho do seu endereço', active: true, done: false, icon: 'local_shipping' },
                 { label: 'Entregue', desc: 'Previsão de chegada 16:00h', active: false, done: false, icon: 'home' }
               ].map((step, idx) => (
                 <div key={idx} className="flex gap-8 relative group">
                   {idx < 3 && <div className={`absolute left-5 top-10 w-0.5 h-12 transition-all duration-1000 ${step.done ? 'bg-brand-primary' : 'bg-slate-100 dark:bg-zinc-800'}`}></div>}
                   <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-all ${step.done ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20' : step.active ? 'bg-white border-2 border-brand-primary text-brand-primary' : 'bg-slate-50 dark:bg-zinc-800 text-slate-300'}`}><span className="material-icons-round text-xl">{step.icon}</span></div>
                   <div className="flex-1"><p className={`font-black text-lg leading-none ${step.active ? 'text-slate-900 dark:text-white' : 'text-slate-300'}`}>{step.label}</p><p className="text-sm text-slate-400 font-medium mt-1 leading-relaxed">{step.desc}</p></div>
                 </div>
               ))}
            </div>
            <button onClick={() => onNavigate && onNavigate(AppView.ORDER_MAP)} className="w-full py-6 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 shadow-2xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"><span className="material-icons-round text-2xl">explore</span> Ver Mapa Ao Vivo</button>
          </>
        ) : view === AppView.ORDER_DENIED ? (
          <>
            <div className="w-24 h-24 bg-brand-error/10 text-brand-error rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-brand-error/10"><span className="material-icons-round text-6xl">warning_amber</span></div>
            <h1 className="text-3xl font-black mb-4">Pagamento Recusado</h1><p className="text-neutral-500 body-base mb-12 max-w-sm mx-auto font-medium">Não foi possível processar seu cartão. Verifique o limite ou entre em contato com seu banco.</p>
            <div className="flex flex-col gap-4">
              <button onClick={() => onNavigate && onNavigate(AppView.CHECKOUT_PAYMENT)} className="w-full py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-primary/20 transition-all hover:scale-[1.02]">Tentar Novo Método</button>
              <button onClick={onBack} className="w-full py-5 text-neutral-400 font-black uppercase tracking-widest text-[10px] hover:text-brand-primary transition-colors">Voltar para a Loja</button>
            </div>
          </>
        ) : (
          <>
            <div className="w-24 h-24 bg-brand-pending/10 text-brand-pending rounded-[32px] flex items-center justify-center mx-auto mb-10"><span className="material-icons-round text-6xl">volunteer_activism</span></div>
            <h1 className="text-3xl font-black mb-4">Sua Opinião Importa</h1><p className="text-neutral-500 body-base mb-12 font-medium">Como foi sua jornada premium com a MarketStore?</p>
            <div className="flex justify-center gap-4 mb-12">
               {[1, 2, 3, 4, 5].map(n => (
                 <button key={n} onClick={onNpsSubmit} className="w-14 h-14 rounded-2xl border-2 border-slate-100 dark:border-zinc-800 hover:border-brand-primary hover:bg-brand-primary/5 text-slate-300 hover:text-brand-primary transition-all text-2xl font-black flex items-center justify-center">{n}</button>
               ))}
            </div>
            <textarea className="w-full bg-slate-50 dark:bg-zinc-950 border-none rounded-[32px] p-8 text-sm mb-12 focus:ring-2 focus:ring-brand-primary/20 min-h-[160px] resize-none" placeholder="Conte-nos o que podemos melhorar..."></textarea>
            <button onClick={onNpsSubmit} className="w-full py-6 bg-brand-primary text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Enviar Feedback</button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderFlow;
