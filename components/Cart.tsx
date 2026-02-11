
import React from 'react';
import { CartItem } from '../types';

interface Props {
  items: CartItem[];
  total: number;
  onNext: () => void;
  onBack: () => void;
  onRemove: (index: number) => void;
  onApplyCoupon: () => void;
}

const Cart: React.FC<Props> = ({ items, total, onNext, onBack, onRemove, onApplyCoupon }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-10 bg-slate-50 dark:bg-zinc-950 animate-toast">
      <div className="w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-[40px] shadow-2xl border border-neutral-100 dark:border-zinc-800 flex flex-col md:flex-row overflow-hidden min-h-[600px]">
        <div className="flex-1 p-8 md:p-16 flex flex-col">
          <div className="flex items-center justify-between mb-12">
            <div className="flex flex-col">
              <h1 className="text-3xl font-black tracking-tight">Carrinho</h1>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary mt-1">Sua seleção premium</span>
            </div>
            <span className="bg-slate-100 dark:bg-zinc-800 px-4 py-1.5 rounded-full text-xs font-black uppercase text-slate-500">{items.length} Itens</span>
          </div>
          
          <div className="flex-1 space-y-6 overflow-y-auto custom-scrollbar pr-2 mb-8">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-slate-50 dark:bg-zinc-800 rounded-3xl flex items-center justify-center mb-6 text-slate-300">
                  <span className="material-icons-round text-5xl">shopping_cart</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Seu carrinho está vazio</h3>
                <p className="text-sm text-slate-400 max-w-xs mx-auto">Navegue em nossa loja e descubra o futuro da tecnologia.</p>
              </div>
            ) : items.map((item, idx) => (
              <div key={`${item.product.id}-${idx}`} className="flex gap-6 p-6 rounded-3xl bg-slate-50/50 dark:bg-zinc-800/30 border border-transparent hover:border-slate-100 dark:hover:border-zinc-800 transition-all group animate-toast">
                <div className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl shrink-0 overflow-hidden flex items-center justify-center p-3 ${item.product.bgColor || 'bg-slate-100'}`}>
                  <img src={item.product.image} className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-lg" alt={item.product.name} loading="lazy" onError={handleImageError} />
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate">{item.product.name}</h3>
                    <button onClick={() => onRemove(idx)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-brand-error hover:bg-brand-error/10 transition-all"><span className="material-icons-round text-lg">close</span></button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.addons.length > 0 ? item.addons.map(a => (
                      <span key={a.id} className="text-[9px] font-black uppercase tracking-widest bg-white dark:bg-zinc-800 text-slate-400 px-2 py-1 rounded-md border border-slate-100 dark:border-zinc-700">{a.name}</span>
                    )) : <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Sem adicionais</span>}
                  </div>
                  <div className="mt-auto flex justify-between items-end">
                    <div className="flex items-center bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl p-1"><span className="text-[10px] font-black px-3 text-slate-500">QTD: {item.quantity}</span></div>
                    <span className="text-xl font-black text-brand-primary">R$ {item.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary transition-all group">
            <span className="material-icons-round text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span> Continuar Explorando
          </button>
        </div>

        <div className="w-full md:w-[380px] bg-slate-50 dark:bg-zinc-800/50 p-8 md:p-16 flex flex-col border-t md:border-t-0 md:border-l border-slate-100 dark:border-zinc-800">
          <h2 className="text-xl font-black tracking-tight mb-10">Resumo</h2>
          <div className="space-y-5 mb-10 flex-1">
             <div className="flex justify-between items-center text-sm font-bold"><span className="text-slate-400 uppercase tracking-widest text-[10px]">Subtotal</span><span className="text-slate-900 dark:text-white">R$ {total.toFixed(2)}</span></div>
             <div className="flex justify-between items-center text-sm font-bold"><span className="text-slate-400 uppercase tracking-widest text-[10px]">Envio Express</span><span className="text-brand-success font-black uppercase text-[10px] tracking-widest">Grátis</span></div>
             <div className="pt-5 border-t border-slate-200 dark:border-zinc-700">
               <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block">Cupom Promocional</label>
               <div className="flex gap-2">
                  <input className="flex-1 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl text-xs font-bold p-3.5 focus:ring-2 focus:ring-brand-primary/20" placeholder="Código" />
                  <button onClick={onApplyCoupon} className="px-5 py-3 bg-slate-900 text-white dark:bg-white dark:text-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-transform">Ativar</button>
               </div>
             </div>
          </div>
          <div className="mt-auto">
             <div className="flex justify-between items-end mb-8">
                <div className="flex flex-col"><span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Total do Investimento</span><span className="text-4xl font-black tracking-tighter">R$ {total.toFixed(2)}</span></div>
             </div>
             <button disabled={items.length === 0} onClick={onNext} className="w-full py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-brand-primary/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 transition-all flex items-center justify-center gap-2">Finalizar <span className="material-icons-round text-lg">arrow_forward</span></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
