
import React from 'react';
import { CartItem } from '../types';

interface Props {
  onNewOrder: () => void;
  cartItem: CartItem | null;
  onTrack: () => void;
  onCopyPix: () => void;
}

const Success: React.FC<Props> = ({ onNewOrder, cartItem, onTrack, onCopyPix }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-zinc-950">
      <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-[48px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-zinc-100 dark:border-zinc-800 animate-toast">
        <div className="w-full md:w-1/2 p-8 md:p-16 border-b md:border-b-0 md:border-r border-slate-100 dark:border-zinc-800 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-brand-success/10 rounded-full flex items-center justify-center mb-8 shadow-inner">
            <span className="material-icons-round text-brand-success text-6xl">check_circle</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">Pedido Confirmado!</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 italic">Pedido #84920 • 15 Out 2023</p>
          
          <div className="w-full bg-slate-50 dark:bg-zinc-950/50 rounded-[40px] p-10 mb-10 border border-slate-100 dark:border-zinc-800 shadow-sm">
            <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-6 animate-pulse">Aguardando Pagamento Pix</p>
            <div className="bg-white p-6 rounded-3xl inline-block mb-6 shadow-xl ring-1 ring-slate-100 relative group">
               <div className="w-36 h-36 bg-zinc-50 flex items-center justify-center">
                 <span className="material-icons-round text-slate-200 text-8xl group-hover:scale-105 transition-transform">qr_code_2</span>
               </div>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-8 leading-relaxed max-w-xs mx-auto">Escaneie o QR Code ou copie a chave abaixo para pagar no app do seu banco preferido.</p>
            <button onClick={onCopyPix} className="w-full flex items-center justify-center gap-3 py-5 bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
              <span className="material-icons-round text-lg">content_copy</span>
              Copiar chave Pix
            </button>
          </div>
          
          <div className="w-full flex flex-col gap-4">
            <button onClick={onTrack} className="w-full py-6 bg-brand-primary text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-[24px] shadow-2xl shadow-brand-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <span className="material-icons-round">explore</span> Acompanhar Entrega
            </button>
            <button onClick={onNewOrder} className="w-full py-4 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] hover:text-brand-primary transition-colors">
              Fazer novo pedido
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-16 bg-slate-50/50 dark:bg-zinc-800/20 flex flex-col h-full">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Resumo da Compra</h2>
            <span className="material-icons-round text-slate-300">verified</span>
          </div>

          {cartItem && (
            <div className="space-y-10 mb-12 flex-1">
              <div className="flex gap-8 group">
                <div className={`w-24 h-24 rounded-[28px] overflow-hidden shrink-0 flex items-center justify-center p-4 shadow-sm border border-white dark:border-zinc-800 group-hover:rotate-3 transition-transform ${cartItem.product.bgColor || 'bg-white'}`}>
                  <img src={cartItem.product.image} className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-md" alt={cartItem.product.name} onError={handleImageError} />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-black text-slate-900 dark:text-white leading-tight truncate text-lg tracking-tight">{cartItem.product.name}</h3>
                    <span className="text-slate-900 dark:text-white font-black whitespace-nowrap text-lg">R$ {cartItem.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cartItem.addons.length > 0 ? cartItem.addons.map((a, i) => (
                      <span key={i} className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-white/50 dark:bg-zinc-800/50 px-2 py-0.5 rounded border border-slate-100 dark:border-zinc-700">{a.name}</span>
                    )) : <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Sem adicionais</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="h-px bg-slate-200 dark:bg-zinc-800 mb-12"></div>
          <div className="space-y-10 mb-12">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary shrink-0 shadow-sm">
                <span className="material-icons-round">location_on</span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Destino do Pedido</p>
                <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight">Av. Paulista, 1000 - Apto 42</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Bela Vista, São Paulo - SP</p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-10 border-t border-slate-200 dark:border-zinc-800 flex justify-between items-end">
             <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Investimento Total</span>
                <span className="text-4xl font-black text-brand-primary tracking-tighter leading-none">R$ {cartItem?.totalPrice.toFixed(2)}</span>
             </div>
             <div className="text-right">
                <div className="flex items-center gap-2 text-brand-success mb-2">
                  <span className="material-icons-round text-sm">security</span>
                  <span className="text-[8px] font-black uppercase tracking-widest">Compra Segura</span>
                </div>
                <div className="flex gap-2 opacity-30">
                  <span className="material-icons-round text-xl">credit_card</span>
                  <span className="material-icons-round text-xl">pix</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
