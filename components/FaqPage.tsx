
import React, { useState } from 'react';
import { AppView } from '../types';
import Header from './Header';
import Footer from './Footer';

interface Props {
  onNavigate: (view: AppView) => void;
  cartCount: number;
}

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

const FAQ_DATA: FaqItem[] = [
  { category: 'Entregas', q: "Qual o prazo de entrega expressa?", a: "Nossa entrega expressa para capitais é de até 48h úteis após confirmação do pagamento. Utilizamos malha aérea prioritária para garantir que sua tecnologia chegue em tempo recorde." },
  { category: 'Entregas', q: "A MarketStore envia para todo o Brasil?", a: "Sim, atendemos todos os municípios brasileiros via transportadoras parceiras e Correios SEDEX, com seguro total incluso no frete." },
  { category: 'Produtos', q: "Os produtos possuem garantia oficial?", a: "Sim, 100% do nosso catálogo possui garantia do fabricante + 90 dias de suporte MarketStore Care para configurações iniciais e dúvidas técnicas." },
  { category: 'Pagamentos', q: "Quais as formas de pagamento aceitas?", a: "Aceitamos Pix com 5% de desconto, Cartão de Crédito em até 12x (sendo 6x sem juros) e Boleto Bancário." },
  { category: 'Devoluções', q: "Como funciona a política de devolução?", a: "Oferecemos 7 dias para arrependimento com logística reversa grátis. O produto deve estar em sua embalagem original e sem marcas de uso." },
  { category: 'Segurança', q: "Meus dados estão protegidos?", a: "Absolutamente. Utilizamos criptografia AES-256 e protocolos SSL/TLS de nível bancário para processar todas as transações e proteger seus dados pessoais." },
];

const FaqPage: React.FC<Props> = ({ onNavigate, cartCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('Todas');

  const categories = ['Todas', ...new Set(FAQ_DATA.map(item => item.category))];

  const filteredFaq = FAQ_DATA.filter(item => {
    const matchesSearch = item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Todas' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      <Header onNavigate={onNavigate} cartCount={cartCount} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-toast">
          <span className="inline-block px-4 py-1.5 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Suporte ao Cliente</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">Central de Ajuda<span className="text-brand-primary">.</span></h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Encontre respostas rápidas para as dúvidas mais comuns sobre pedidos, entregas e garantias.
          </p>
        </section>

        {/* Search Bar */}
        <section className="relative mb-12 max-w-2xl mx-auto animate-toast" style={{ animationDelay: '0.1s' }}>
          <span className="absolute inset-y-0 left-0 pl-6 flex items-center text-slate-400">
            <span className="material-icons-round text-2xl">search</span>
          </span>
          <input 
            type="text"
            placeholder="Como podemos ajudar você hoje?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-zinc-900 border-2 border-slate-100 dark:border-zinc-800 rounded-[32px] py-6 pl-16 pr-8 text-lg font-bold focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm"
          />
        </section>

        {/* Category Filters */}
        <section className="flex gap-3 overflow-x-auto no-scrollbar pb-8 mb-12 justify-center animate-toast" style={{ animationDelay: '0.2s' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20' 
                : 'bg-slate-50 dark:bg-zinc-900 text-slate-400 hover:text-brand-primary border border-slate-100 dark:border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* FAQ List */}
        <section className="space-y-4 animate-toast" style={{ animationDelay: '0.3s' }}>
          {filteredFaq.length > 0 ? (
            filteredFaq.map((item, idx) => (
              <div 
                key={idx}
                className={`bg-white dark:bg-zinc-900 rounded-[32px] border transition-all duration-500 overflow-hidden ${
                  openIndex === idx ? 'border-brand-primary ring-4 ring-brand-primary/5 shadow-xl' : 'border-slate-100 dark:border-zinc-800 hover:border-slate-200'
                }`}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full px-8 py-8 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg ${openIndex === idx ? 'bg-brand-primary text-white' : 'bg-slate-50 dark:bg-zinc-800 text-slate-400'}`}>
                      {item.category}
                    </span>
                    <span className={`text-lg md:text-xl font-black tracking-tight transition-colors ${openIndex === idx ? 'text-brand-primary' : 'text-slate-900 dark:text-white'}`}>
                      {item.q}
                    </span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    openIndex === idx ? 'bg-brand-primary text-white rotate-180 shadow-lg' : 'bg-slate-50 dark:bg-zinc-900 text-slate-300'
                  }`}>
                    <span className="material-icons-round">expand_more</span>
                  </div>
                </button>
                
                <div 
                  className={`transition-all duration-500 ease-in-out ${
                    openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-8 pb-8 pt-2">
                    <div className="h-px bg-slate-50 dark:bg-zinc-800 mb-8" />
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-4xl">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center bg-slate-50/50 dark:bg-zinc-900/50 rounded-[48px] border-2 border-dashed border-slate-100 dark:border-zinc-800">
               <div className="w-20 h-20 bg-white dark:bg-zinc-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <span className="material-icons-round text-slate-300 text-4xl">help_outline</span>
               </div>
               <h3 className="text-xl font-black mb-2">Nenhum resultado para "{searchQuery}"</h3>
               <p className="text-slate-400 font-medium mb-8">Tente usar palavras-chave mais simples ou procure por categoria.</p>
               <button onClick={() => {setSearchQuery(''); setActiveCategory('Todas');}} className="text-brand-primary font-black uppercase text-xs tracking-widest hover:underline">Ver todas as perguntas</button>
            </div>
          )}
        </section>

        {/* Support CTA */}
        <section className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 animate-toast" style={{ animationDelay: '0.4s' }}>
          <div className="bg-brand-primary p-12 rounded-[48px] text-white shadow-2xl shadow-brand-primary/20 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-3xl font-black tracking-tight mb-4 leading-tight">Ainda precisa <br/>de ajuda?</h3>
              <p className="text-white/80 font-medium mb-10 leading-relaxed">Nossos especialistas estão online de Seg-Sex das 09h às 18h para tirar suas dúvidas.</p>
              <button className="px-10 py-5 bg-white text-brand-primary rounded-[24px] font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                <span className="material-icons-round text-xl">chat</span>
                Iniciar Chat ao Vivo
              </button>
            </div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-12 rounded-[48px] border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-black tracking-tight mb-4">E-mail MarketStore</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 leading-relaxed">Prefere nos enviar uma mensagem detalhada? Respondemos em até 4 horas úteis.</p>
            </div>
            <button className="w-full py-5 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-colors border border-slate-100 dark:border-zinc-700 flex items-center justify-center gap-3">
              <span className="material-icons-round text-xl">alternate_email</span>
              suporte@marketstore.com
            </button>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default FaqPage;
