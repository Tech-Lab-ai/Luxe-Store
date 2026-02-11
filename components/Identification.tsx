
import React, { useState } from 'react';

interface Props {
  onNext: (data: { name: string; phone: string; email: string }) => void;
  onBack: () => void;
  cartTotal: number;
}

const Identification: React.FC<Props> = ({ onNext, onBack, cartTotal }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-zinc-950">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-4xl shadow-2xl overflow-hidden border border-neutral-100 dark:border-zinc-800 animate-toast">
        <div className="px-8 pt-8 pb-4 flex justify-between items-center border-b border-neutral-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Passo 1 de 4</span>
            <div className="h-1.5 w-16 bg-neutral-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-1/4 bg-brand-primary"></div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-neutral-100/50 dark:bg-zinc-800/50 px-4 py-2 rounded-xl">
            <span className="material-icons-round text-neutral-400 text-lg">shopping_basket</span>
            <div className="text-sm">
              <span className="font-black text-brand-primary">R$ {cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-2xl font-black mb-2 tracking-tight">Identificação</h1>
            <p className="text-sm text-neutral-500 font-medium leading-relaxed">Seus dados estão seguros conosco. Forneça as informações abaixo para continuar.</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNext(formData); }}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">Nome Completo</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                  <span className="material-icons-round text-xl">person</span>
                </span>
                <input 
                  required
                  className="block w-full pl-11 pr-4 py-4 bg-neutral-100 dark:bg-zinc-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: João Silva"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">E-mail para Notificações</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                  <span className="material-icons-round text-xl">alternate_email</span>
                </span>
                <input 
                  required
                  type="email"
                  className="block w-full pl-11 pr-4 py-4 bg-neutral-100 dark:bg-zinc-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">WhatsApp / Celular</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                  <span className="material-icons-round text-xl">call</span>
                </span>
                <input 
                  required
                  className="block w-full pl-11 pr-4 py-4 bg-neutral-100 dark:bg-zinc-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
            
            <button className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-brand-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group mt-4">
              Prosseguir para Entrega
              <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            
            <button type="button" onClick={onBack} className="w-full text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-brand-primary transition-colors py-2">
              Voltar ao Carrinho
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Identification;
