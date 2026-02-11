
import React from 'react';
import { AppView } from '../types';

interface Props {
  onNavigate: (view: AppView) => void;
}

const Footer: React.FC<Props> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-50 dark:bg-zinc-950 px-4 md:px-8 py-20 border-t border-slate-200 dark:border-zinc-900 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(AppView.STOREFRONT)}>
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <span className="material-icons-round text-white text-xl">storefront</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight">MarketStore</span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs font-medium">
            Elegância e tecnologia em um só lugar. O checkout universal mais rápido do Brasil.
          </p>
          <div className="flex gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="w-10 h-10 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-400 hover:text-brand-primary transition-colors cursor-pointer">
                <span className="material-icons-round text-xl">public</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Ecosystem</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
            <li><button onClick={() => onNavigate(AppView.ABOUT)} className="hover:text-brand-primary transition-colors">Sobre Nós</button></li>
            <li><button onClick={() => onNavigate(AppView.BLOG)} className="hover:text-brand-primary transition-colors">Novidades (Blog)</button></li>
            <li><button onClick={() => onNavigate(AppView.STOREFRONT)} className="hover:text-brand-primary transition-colors">Catálogo de Produtos</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Suporte & Legal</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
            <li><button onClick={() => onNavigate(AppView.FAQ)} className="hover:text-brand-primary transition-colors">Central de Ajuda</button></li>
            <li><button onClick={() => onNavigate(AppView.POLICIES)} className="hover:text-brand-primary transition-colors">Envio e Devoluções</button></li>
            <li><button onClick={() => onNavigate(AppView.TERMS)} className="hover:text-brand-primary transition-colors">Termos e Privacidade</button></li>
          </ul>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[32px] border border-slate-100 dark:border-zinc-800 shadow-sm">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Inscreva-se</h4>
          <div className="space-y-3">
            <input className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-xl px-4 py-3 text-sm" placeholder="seu@email.com" />
            <button className="w-full bg-brand-primary text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-brand-primary/20">Enviar</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-slate-200 dark:border-zinc-800 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 gap-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <span>© 2024 MarketStore Ecosystem • CNPJ 00.000.000/0001-00</span>
          {/* Botão de Cadeado (Acesso Admin Login) */}
          <button 
            onClick={() => onNavigate(AppView.ADMIN_LOGIN)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors text-slate-300 hover:text-brand-primary"
            title="Acesso Administrativo Corporativo"
          >
            <span className="material-icons-round text-base">lock</span>
          </button>
        </div>
        <div className="flex items-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all">
          <span className="material-icons-round text-3xl">credit_card</span>
          <span className="material-icons-round text-3xl">payments</span>
          <span className="material-icons-round text-3xl">contactless</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
