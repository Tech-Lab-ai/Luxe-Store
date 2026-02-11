
import React from 'react';
import { Order } from '../types';

interface Props {
  order: Order;
  onClose: () => void;
}

const EmailTemplate: React.FC<Props> = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-10">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl flex flex-col max-h-screen">
        <header className="p-8 border-b border-slate-100 dark:border-zinc-900 flex justify-between items-center bg-white dark:bg-zinc-950 sticky top-0">
           <div>
             <h2 className="text-xl font-black uppercase tracking-widest">Email Template Preview</h2>
             <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mt-1">SaaS Communication Module</p>
           </div>
           <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-zinc-900 flex items-center justify-center text-slate-400 hover:text-brand-primary transition-all shadow-sm">
             <span className="material-icons-round">close</span>
           </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-slate-100 dark:bg-zinc-900/50 custom-scrollbar">
           {/* Email Wrapper */}
           <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
              {/* Email Header */}
              <div className="bg-brand-primary p-12 text-center relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                       <span className="material-icons-round text-brand-primary text-3xl">storefront</span>
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight leading-none">Pedido Confirmado!</h1>
                    <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mt-4">MarketStore Ecosystem</p>
                 </div>
                 <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              </div>

              {/* Email Content */}
              <div className="p-12 space-y-10">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">Olá, {order.customer}!</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                       Recebemos a confirmação do seu pagamento para o pedido <span className="text-brand-primary font-black">#{order.id}</span>. 
                       Nossa equipe logística já está preparando seu pacote com todo cuidado industrial que você merece.
                    </p>
                 </div>

                 <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 space-y-6">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Status Atual</span>
                       <span className="bg-brand-success/10 text-brand-success px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Processando Envio</span>
                    </div>
                    <div className="h-px bg-slate-200"></div>
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Total do Pedido</p>
                          <p className="text-2xl font-black text-slate-900 leading-none">R$ {order.total.toFixed(2)}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Entrega Estimada</p>
                          <p className="text-sm font-black text-brand-primary uppercase tracking-widest">18-20 Out</p>
                       </div>
                    </div>
                 </div>

                 <div className="text-center">
                    <button className="px-12 py-5 bg-brand-primary text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-brand-primary/30">Rastrear Meu Pedido</button>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-8">Precisa de ajuda? Responda este e-mail.</p>
                 </div>
              </div>

              {/* Email Footer */}
              <div className="p-12 bg-slate-50 border-t border-slate-100 text-center">
                 <div className="flex justify-center gap-6 mb-8 opacity-40 grayscale">
                    <span className="material-icons-round text-2xl">public</span>
                    <span className="material-icons-round text-2xl">local_post_office</span>
                    <span className="material-icons-round text-2xl">shield</span>
                 </div>
                 <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em] leading-relaxed">
                    © 2024 MarketStore Ecosystem • CNPJ 00.000.000/0001-00<br/>
                    Av. Paulista, 1000 - São Paulo, SP - Brasil
                 </p>
              </div>
           </div>
        </div>

        <footer className="p-8 border-t border-slate-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex gap-4">
              <button className="px-6 py-3 bg-brand-primary/10 text-brand-primary rounded-xl font-black uppercase text-[10px] tracking-widest">Test Send (Prod)</button>
              <button className="px-6 py-3 border border-slate-200 dark:border-zinc-800 text-slate-400 rounded-xl font-black uppercase text-[10px] tracking-widest">Copy HTML</button>
           </div>
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Template responsive v2.4 verified</p>
        </footer>
      </div>
    </div>
  );
};

export default EmailTemplate;
