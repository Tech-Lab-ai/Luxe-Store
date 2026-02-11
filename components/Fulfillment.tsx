
import React, { useState } from 'react';

interface Props {
  onNext: () => void;
  onBack: () => void;
  cartTotal: number;
}

const Fulfillment: React.FC<Props> = ({ onNext, onBack, cartTotal }) => {
  const [type, setType] = useState<'delivery' | 'pickup'>('delivery');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-zinc-950">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-[32px] lg:rounded-[40px] shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 flex flex-col animate-toast">
        <nav className="sticky top-0 z-10 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-slate-100 dark:border-zinc-800">
          <div className="px-6 lg:px-8 py-4 lg:py-6 flex items-center justify-between">
            <button onClick={onBack} className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl transition-colors text-slate-400 shrink-0">
              <span className="material-icons-round">arrow_back</span>
            </button>
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Etapa 2 de 4</span>
              <h1 className="font-black text-base lg:text-lg tracking-tight">Logística</h1>
            </div>
            <div className="w-10 shrink-0"></div>
          </div>
          <div className="w-full bg-slate-50 dark:bg-zinc-800 h-1.5">
            <div className="bg-brand-primary h-full w-2/4 transition-all duration-700"></div>
          </div>
        </nav>

        <div className="p-6 lg:p-12 space-y-8 lg:space-y-10 overflow-y-auto custom-scrollbar flex-1">
          <div className="bg-slate-50 dark:bg-zinc-800/50 p-1.5 rounded-2xl flex border border-slate-100 dark:border-zinc-800">
            <button 
              onClick={() => setType('delivery')}
              className={`flex-1 flex items-center justify-center gap-2 lg:gap-3 py-3 lg:py-4 px-2 rounded-xl transition-all font-black text-[9px] lg:text-[10px] uppercase tracking-widest ${type === 'delivery' ? 'bg-white dark:bg-zinc-700 text-brand-primary shadow-xl ring-1 ring-black/5' : 'text-slate-400'}`}
            >
              <span className="material-icons-round text-base lg:text-lg">local_shipping</span> Entrega
            </button>
            <button 
              onClick={() => setType('pickup')}
              className={`flex-1 flex items-center justify-center gap-2 lg:gap-3 py-3 lg:py-4 px-2 rounded-xl transition-all font-black text-[9px] lg:text-[10px] uppercase tracking-widest ${type === 'pickup' ? 'bg-white dark:bg-zinc-700 text-brand-primary shadow-xl ring-1 ring-black/5' : 'text-slate-400'}`}
            >
              <span className="material-icons-round text-base lg:text-lg">storefront</span> Retirada
            </button>
          </div>

          {type === 'delivery' ? (
            <section className="space-y-6 lg:space-y-8 animate-toast">
              <h2 className="text-lg lg:text-xl font-black tracking-tight">Endereço de Destino</h2>
              <div className="grid grid-cols-6 gap-4 lg:gap-6">
                <div className="col-span-6 sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">CEP</label>
                  <input className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20" placeholder="00000-000" />
                </div>
                <div className="col-span-6 sm:col-span-4 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Logradouro</label>
                  <input className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20" placeholder="Ex: Av. Paulista, 1000" />
                </div>
                <div className="col-span-6 sm:col-span-3 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Bairro</label>
                  <input className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20" />
                </div>
                <div className="col-span-6 sm:col-span-3 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Cidade/UF</label>
                  <input className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20" />
                </div>
              </div>
            </section>
          ) : (
            <section className="space-y-6 lg:space-y-8 animate-toast">
              <h2 className="text-lg lg:text-xl font-black tracking-tight">Escolha o Ponto de Coleta</h2>
              <div className="bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:border-brand-primary transition-colors cursor-pointer">
                <div className="h-32 lg:h-44 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i14!2i4850!3i10100!2m3!1e0!2sm!3i420120488!3m8!2spt-BR!3sUS!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i4111425')] opacity-20 grayscale dark:invert"></div>
                   <div className="relative z-10 w-10 h-10 lg:w-12 lg:h-12 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                     <span className="material-icons-round text-xl lg:text-2xl">location_on</span>
                   </div>
                </div>
                <div className="p-6 lg:p-8">
                  <h3 className="font-black text-base lg:text-lg mb-1 tracking-tight">MarketStore Matriz</h3>
                  <p className="text-slate-400 text-[10px] lg:text-xs font-bold uppercase tracking-widest leading-relaxed">Av. Paulista, 1000 - São Paulo</p>
                  <div className="flex items-center gap-2 mt-4 text-brand-success font-black text-[9px] lg:text-[10px] uppercase">
                    <span className="material-icons-round text-sm lg:text-base">bolt</span> Pronto em 15 min
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="p-6 lg:p-12 border-t border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50/50 dark:bg-zinc-800/20">
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total com Frete</span>
            <p className="text-2xl lg:text-3xl font-black text-brand-primary tracking-tighter leading-none mt-1">R$ {cartTotal.toFixed(2)}</p>
          </div>
          <button onClick={onNext} className="w-full sm:w-auto bg-brand-primary text-white font-black py-4 lg:py-5 px-10 lg:px-12 rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-[10px] uppercase tracking-[0.2em]">
            Continuar <span className="material-icons-round text-lg">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fulfillment;
