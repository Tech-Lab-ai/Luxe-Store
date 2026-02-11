
import React, { useState } from 'react';
import { AppView } from '../types';

interface Props {
  onBack: () => void;
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<Props> = ({ onBack, onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de autenticação de alta segurança
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-zinc-950 text-white overflow-hidden">
      {/* Lado Esquerdo - Visual Impact */}
      <div className="hidden lg:flex w-1/2 relative p-20 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426" 
            className="w-full h-full object-cover opacity-20 grayscale scale-110"
            alt="Business Background"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/40 to-black"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="material-icons-round text-brand-primary text-3xl font-black">hub</span>
            </div>
            <span className="font-black text-3xl tracking-tighter uppercase italic">MarketStore Business</span>
          </div>
          <h1 className="text-7xl font-black leading-none tracking-tighter mb-8">
            Domine o <br/> <span className="text-brand-primary">Ecossistema.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-md font-medium leading-relaxed">
            Painel de controle centralizado para gestão de inventário, métricas SaaS e experiência do cliente.
          </p>
        </div>

        <div className="relative z-10 flex gap-12 border-t border-white/10 pt-12">
          <div>
            <p className="text-3xl font-black mb-1">99.9%</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Uptime Garantido</p>
          </div>
          <div>
            <p className="text-3xl font-black mb-1">AES-256</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Criptografia Ativa</p>
          </div>
        </div>
      </div>

      {/* Lado Direito - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-24 relative bg-zinc-900 lg:bg-transparent">
        <div className="w-full max-w-md animate-toast">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center">
              <span className="material-icons-round text-white">hub</span>
            </div>
            <span className="font-black text-xl tracking-tighter">Business Console</span>
          </div>

          <header className="mb-12">
            <h2 className="text-4xl font-black tracking-tighter mb-4">Acesso Corporativo</h2>
            <p className="text-zinc-500 font-medium">Insira suas credenciais de nível Enterprise para acessar o painel administrativo.</p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">E-mail Corporativo</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-zinc-600">
                  <span className="material-icons-round text-xl">admin_panel_settings</span>
                </span>
                <input 
                  required
                  type="email"
                  placeholder="admin@marketstore.com"
                  className="block w-full pl-14 pr-5 py-5 bg-zinc-800/50 border-2 border-zinc-800 focus:border-brand-primary focus:ring-0 rounded-3xl text-sm font-bold transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Chave de Acesso</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-zinc-600">
                  <span className="material-icons-round text-xl">vpn_key</span>
                </span>
                <input 
                  required
                  type="password"
                  placeholder="••••••••••••"
                  className="block w-full pl-14 pr-5 py-5 bg-zinc-800/50 border-2 border-zinc-800 focus:border-brand-primary focus:ring-0 rounded-3xl text-sm font-bold transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-2 text-[10px] font-black uppercase tracking-widest">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded-lg bg-zinc-800 border-none text-brand-primary focus:ring-0" />
                <span className="group-hover:text-white transition-colors">Manter Conectado</span>
              </label>
              <button type="button" className="text-zinc-500 hover:text-brand-primary transition-colors">Esqueci a Chave</button>
            </div>

            <button 
              disabled={loading}
              className={`w-full py-6 bg-brand-primary text-white rounded-[24px] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-brand-primary/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Autenticando...
                </>
              ) : (
                <>
                  Entrar no Console <span className="material-icons-round">arrow_forward</span>
                </>
              )}
            </button>
            
            <button 
              type="button" 
              onClick={onBack}
              className="w-full text-zinc-500 font-black uppercase tracking-widest text-[9px] hover:text-white transition-colors mt-4"
            >
              Voltar para Loja Pública
            </button>
          </form>

          <footer className="mt-16 text-center">
            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed">
              © 2024 MarketStore Ecosystem Security Protocol<br/>
              Acesso restrito a colaboradores autorizados.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
