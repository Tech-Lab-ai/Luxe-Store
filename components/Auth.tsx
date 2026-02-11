
import React, { useState } from 'react';
import { AppView } from '../types';

interface Props {
  view: AppView;
  onBack: () => void;
  onNavigate: (view: AppView) => void;
}

const Auth: React.FC<Props> = ({ view, onBack, onNavigate }) => {
  const [isRegistering, setIsRegistering] = useState(view === AppView.SIGNUP);

  const Title = isRegistering ? "Crie sua conta premium" : view === AppView.RECOVER_PASSWORD ? "Recuperar senha" : "Bem-vindo de volta";
  const Subtitle = isRegistering ? "Comece sua jornada tecnológica conosco hoje." : view === AppView.RECOVER_PASSWORD ? "Enviaremos um link de recuperação para seu e-mail." : "Entre com seus dados para gerenciar seus pedidos.";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-zinc-950 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[40px] shadow-2xl border border-neutral-100 dark:border-zinc-800 overflow-hidden animate-toast">
        <div className="p-10 text-center">
          <div onClick={onBack} className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-8 cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-brand-primary/5">
            <span className="material-icons-round text-3xl">storefront</span>
          </div>
          
          <h1 className="text-3xl font-black mb-3 tracking-tight">{Title}</h1>
          <p className="text-neutral-500 body-base mb-10 px-4">{Subtitle}</p>
          
          {view === AppView.RECOVER_PASSWORD ? (
            <form className="space-y-6 text-left">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">E-mail Cadastrado</label>
                <input className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20" placeholder="seu@email.com" />
              </div>
              <button type="button" className="w-full py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-primary/20 hover:opacity-95 transition-all">Enviar Link de Recuperação</button>
              <button onClick={() => onNavigate(AppView.LOGIN)} type="button" className="w-full py-4 text-neutral-400 font-black uppercase tracking-widest text-[10px] hover:text-brand-primary transition-colors">Voltar para o Login</button>
            </form>
          ) : (
            <form className="space-y-6 text-left" onSubmit={(e) => { e.preventDefault(); onNavigate(AppView.CUSTOMER_DASHBOARD); }}>
              {isRegistering && (
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">Nome Completo</label>
                  <input className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20" placeholder="Ex: João Silva" />
                </div>
              )}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">E-mail</label>
                <input className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20" placeholder="seu@email.com" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between px-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Senha</label>
                  {!isRegistering && (
                    <button onClick={() => onNavigate(AppView.RECOVER_PASSWORD)} type="button" className="text-[10px] font-black text-brand-primary uppercase hover:underline">Esqueci a senha</button>
                  )}
                </div>
                <input type="password" className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20" placeholder="••••••••" />
              </div>
              
              <button type="submit" className="w-full py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-brand-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all">
                {isRegistering ? "Criar Minha Conta" : "Entrar na Conta"}
              </button>
              
              <div className="relative py-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-100 dark:border-zinc-800"></div></div>
                <div className="relative flex justify-center text-[9px] font-black uppercase bg-white dark:bg-zinc-900 px-4 text-neutral-400 tracking-widest italic">Acesso Rápido</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-center gap-3 py-4 border border-neutral-100 dark:border-zinc-800 rounded-2xl hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors">
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Google</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-3 py-4 bg-zinc-900 text-white rounded-2xl hover:opacity-90 transition-colors">
                  <span className="material-icons-round text-sm">apple</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Apple ID</span>
                </button>
              </div>
              
              <p className="text-center text-xs text-neutral-500 mt-10 font-medium">
                {isRegistering ? "Já possui uma conta?" : "Ainda não tem conta?"}{' '}
                <button 
                  type="button" 
                  onClick={() => setIsRegistering(!isRegistering)} 
                  className="text-brand-primary font-black uppercase text-[10px] tracking-widest hover:underline"
                >
                  {isRegistering ? "Entrar" : "Cadastre-se grátis"}
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
