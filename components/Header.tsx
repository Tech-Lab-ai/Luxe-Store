
import React, { useState } from 'react';
import { AppView } from '../types';
import { CATEGORIES } from '../constants';

interface Props {
  onNavigate: (view: AppView) => void;
  cartCount: number;
  onSelectCategory?: (category: string) => void;
}

const Header: React.FC<Props> = ({ onNavigate, cartCount, onSelectCategory }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const MobileLink: React.FC<{ label: string, icon?: string, image?: string, onClick: () => void }> = ({ label, icon, image, onClick }) => (
    <button 
      onClick={() => {
        onClick();
        setIsMobileMenuOpen(false);
      }}
      className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 text-slate-600 dark:text-slate-300 font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all shadow-sm border border-transparent hover:border-brand-primary/10 group"
    >
      {image ? (
        <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-700 shrink-0">
          <img src={image} alt={label} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
        </div>
      ) : (
        <span className="material-icons-round text-xl">{icon}</span>
      )}
      {label}
    </button>
  );

  return (
    <div className="sticky top-0 z-[100] flex flex-col">
      {/* Cabeçalho Principal */}
      <nav className="bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-slate-100 dark:border-zinc-900 px-4 md:px-8 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {/* Hamburger Menu Trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-zinc-900 rounded-xl text-slate-400 active:scale-95 transition-transform"
            aria-label="Abrir menu"
          >
            <span className="material-icons-round">menu</span>
          </button>

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(AppView.STOREFRONT)}>
            <div className="w-9 h-9 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <span className="material-icons-round text-white text-xl">storefront</span>
            </div>
            <span className="font-extrabold text-xl tracking-tighter hidden sm:block">MarketStore</span>
          </div>
        </div>

        {/* Busca Central */}
        <div className="hidden lg:flex max-w-xl flex-1 mx-10 relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 pointer-events-none">
            <span className="material-icons-round text-lg">search</span>
          </span>
          <input 
            className="w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-brand-primary/20 transition-all placeholder:text-slate-400"
            placeholder="O que você está procurando hoje?"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && onSelectCategory) {
                onSelectCategory(e.currentTarget.value);
              }
            }}
          />
        </div>

        <div className="flex items-center gap-3 md:gap-6 shrink-0">
          <div className="hidden lg:flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
            <button onClick={() => onNavigate(AppView.BLOG)} className="hover:text-brand-primary transition-colors">Blog</button>
            <button onClick={() => onNavigate(AppView.ABOUT)} className="hover:text-brand-primary transition-colors">Sobre</button>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => onNavigate(AppView.CART)}
              className="relative p-2.5 bg-slate-100 dark:bg-zinc-900 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-brand-primary/10 hover:text-brand-primary transition-all"
            >
              <span className="material-icons-round">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-primary text-white text-[10px] font-black flex items-center justify-center rounded-full ring-2 ring-white dark:ring-zinc-950 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => onNavigate(AppView.LOGIN)}
              className="flex items-center gap-2 p-2.5 bg-brand-primary text-white rounded-xl px-3 md:px-6 hover:opacity-90 transition-all shadow-lg shadow-brand-primary/20"
            >
              <span className="material-icons-round text-lg">account_circle</span>
              <span className="text-xs font-black uppercase tracking-widest hidden sm:block">Acessar</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sub-Header: Categorias com Imagens */}
      <div className="bg-white dark:bg-zinc-950 border-b border-slate-100 dark:border-zinc-900 shadow-sm overflow-x-auto no-scrollbar relative z-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-2 gap-4 md:gap-8 min-w-max md:min-w-0">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.slug} 
              onClick={() => onSelectCategory?.(cat.name)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 transition-all group"
            >
              <div className="w-7 h-7 rounded-lg overflow-hidden border border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 shrink-0 shadow-sm transition-transform group-hover:scale-110">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[1000] lg:hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          
          {/* Menu Drawer */}
          <div className="absolute top-0 left-0 bottom-0 w-80 bg-white dark:bg-zinc-950 shadow-2xl flex flex-col animate-slide-left overflow-hidden border-r border-slate-100 dark:border-zinc-800">
            <div className="p-8 flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg">
                   <span className="material-icons-round text-white">storefront</span>
                 </div>
                 <span className="font-black text-xl tracking-tighter">MarketStore</span>
               </div>
               <button 
                 onClick={() => setIsMobileMenuOpen(false)} 
                 className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-zinc-900 rounded-full text-slate-400"
               >
                 <span className="material-icons-round">close</span>
               </button>
            </div>

            <div className="flex-1 px-8 space-y-4 overflow-y-auto custom-scrollbar pb-10">
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 pl-2">Navegação</p>
               <MobileLink label="Início" icon="home" onClick={() => onNavigate(AppView.STOREFRONT)} />
               <MobileLink label="Novidades Blog" icon="article" onClick={() => onNavigate(AppView.BLOG)} />
               <MobileLink label="Sobre Nós" icon="info" onClick={() => onNavigate(AppView.ABOUT)} />
               <MobileLink label="Central de Ajuda" icon="help" onClick={() => onNavigate(AppView.FAQ)} />
               
               <div className="h-px bg-slate-100 dark:bg-zinc-900 my-6" />
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 pl-2">Principais Categorias</p>
               <div className="grid grid-cols-1 gap-3">
                 {CATEGORIES.map(cat => (
                   <MobileLink key={cat.slug} label={cat.name} image={cat.image} onClick={() => { onSelectCategory?.(cat.name); }} />
                 ))}
               </div>
            </div>

            <div className="p-8 border-t border-slate-100 dark:border-zinc-900 bg-slate-50/50 dark:bg-zinc-900/50">
               <button 
                 onClick={() => {
                   onNavigate(AppView.CUSTOMER_DASHBOARD);
                   setIsMobileMenuOpen(false);
                 }}
                 className="w-full flex items-center justify-center gap-3 py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
               >
                 <span className="material-icons-round">person</span>
                 Minha Conta Premium
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
