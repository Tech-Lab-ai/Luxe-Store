
import React, { useState } from 'react';
import { ADDONS } from '../constants';
import { CartItem, Addon, Product, AppView } from '../types';
import Header from './Header';
import Footer from './Footer';

interface Props {
  product: Product;
  onNext: (item: CartItem) => void;
  onNavigate: (view: AppView) => void;
  cartCount: number;
}

const Customizer: React.FC<Props> = ({ product, onNext, onNavigate, cartCount }) => {
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [quantity, setQuantity] = useState(1);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800';
  };

  const toggleAddon = (addon: Addon) => {
    if (selectedAddons.find(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const totalPrice = (product.price + selectedAddons.reduce((acc, a) => acc + a.price, 0)) * quantity;

  const handleNext = () => {
    onNext({
      product,
      addons: selectedAddons,
      quantity,
      totalPrice
    });
  };

  return (
    <div className="bg-slate-50 dark:bg-zinc-950 min-h-screen flex flex-col">
      <Header onNavigate={onNavigate} cartCount={cartCount} />
      
      <main className="flex-1 flex items-center justify-center p-4 md:p-10">
        <div className="bg-white dark:bg-zinc-900 w-full max-w-6xl h-auto md:h-[800px] rounded-[48px] overflow-hidden shadow-[0_32px_128px_-32px_rgba(0,0,0,0.1)] flex flex-col md:flex-row border border-slate-100 dark:border-zinc-800 animate-toast">
          
          <div className={`w-full md:w-[45%] relative ${product.bgColor || 'bg-slate-100'} p-12 md:p-20 overflow-hidden flex items-center justify-center min-h-[400px]`}>
            <div className="relative w-full h-full flex items-center justify-center group">
              <img 
                alt={product.name} 
                className="max-w-[120%] max-h-full object-contain mix-blend-multiply drop-shadow-[0_40px_80px_rgba(0,0,0,0.2)] transition-transform duration-1000 group-hover:scale-105" 
                src={product.image} 
                loading="eager"
                onError={handleImageError}
              />
            </div>
            
            <div className="absolute top-10 left-10">
               <span className="px-5 py-2 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-xl text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary rounded-2xl shadow-xl border border-white/50 dark:border-white/10">{product.category}</span>
            </div>

            <div className="absolute bottom-10 left-10 right-10 hidden md:block">
              <div className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl border border-white/30 dark:border-white/5 rounded-[32px] p-8 shadow-2xl">
                 <div className="flex items-center gap-1.5 mb-3">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="material-icons-round text-brand-pending text-sm">star</span>
                    ))}
                    <span className="text-[10px] font-black ml-3 text-slate-900 dark:text-white uppercase tracking-widest">{product.rating} Avaliações</span>
                 </div>
                 <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed opacity-90">{product.description}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col h-full bg-white dark:bg-zinc-900">
            <div className="p-10 md:p-14 flex justify-between items-start border-b border-slate-50 dark:border-zinc-800/50 shrink-0">
              <div>
                <h1 className="text-4xl md:text-5xl font-black leading-none tracking-tight mb-4">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-brand-primary font-black text-3xl">R$ {product.price.toFixed(2)}</span>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-widest px-3 py-1 border border-slate-200 dark:border-zinc-800 rounded-full">Disponível</span>
                </div>
              </div>
              <button onClick={() => onNavigate(AppView.STOREFRONT)} className="w-12 h-12 bg-slate-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-brand-primary transition-all">
                <span className="material-icons-round">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-10 md:px-14 py-10 custom-scrollbar">
              <section className="mb-12">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex flex-col">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Serviços & Proteção</h3>
                    <p className="text-xs text-slate-300 mt-1">Personalize sua experiência</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {ADDONS.map((addon) => (
                    <label key={addon.id} className={`flex items-center justify-between p-6 border-2 rounded-3xl cursor-pointer transition-all group ${
                      selectedAddons.find(a => a.id === addon.id) ? 'border-brand-primary bg-brand-primary/5' : 'bg-slate-50 dark:bg-zinc-800/30 border-transparent hover:border-brand-primary/20'
                    }`}>
                      <div className="flex items-center gap-5">
                        <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all ${
                          selectedAddons.find(a => a.id === addon.id) ? 'bg-brand-primary border-brand-primary scale-110' : 'border-slate-200 dark:border-zinc-700'
                        }`}>
                          {selectedAddons.find(a => a.id === addon.id) && <span className="material-icons-round text-white text-sm">check</span>}
                        </div>
                        <input className="hidden" type="checkbox" onChange={() => toggleAddon(addon)} checked={!!selectedAddons.find(a => a.id === addon.id)} />
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-900 dark:text-white">{addon.name}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Ativação Instantânea</span>
                        </div>
                      </div>
                      <span className="text-sm font-black text-brand-primary">+ R$ {addon.price.toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            <div className="p-10 md:p-14 border-t border-slate-50 dark:border-zinc-800 flex flex-wrap items-center gap-8 shrink-0 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl">
              <div className="flex flex-col gap-3">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Quantidade</span>
                 <div className="flex items-center bg-slate-100 dark:bg-zinc-800 rounded-2xl p-1.5 border border-slate-200 dark:border-zinc-700 h-16">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-zinc-700 text-slate-400 transition-all active:scale-90"><span className="material-icons-round">remove</span></button>
                  <span className="px-6 font-black text-xl w-16 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-zinc-700 text-slate-400 transition-all active:scale-90"><span className="material-icons-round">add</span></button>
                </div>
              </div>
              
              <button 
                onClick={handleNext}
                className="flex-1 h-20 bg-brand-primary text-white rounded-[24px] font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-between px-10 shadow-2xl shadow-brand-primary/30 hover:scale-[1.01] active:scale-[0.98] transition-all group"
              >
                <span className="flex items-center gap-4">
                  <span className="material-icons-round text-2xl group-hover:rotate-12 transition-transform">shopping_bag</span>
                  Adicionar ao Carrinho
                </span>
                <div className="flex flex-col items-end border-l border-white/20 pl-8">
                  <span className="text-[9px] opacity-60 font-black">TOTAL</span>
                  <span className="text-2xl tracking-tight">R$ {totalPrice.toFixed(2)}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default Customizer;
