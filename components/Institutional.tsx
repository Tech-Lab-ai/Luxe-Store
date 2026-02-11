
import React, { useState } from 'react';
import { AppView, Article } from '../types';
import Header from './Header';
import Footer from './Footer';

interface Props {
  view: AppView;
  article: Article | null;
  onSelectArticle: (article: Article) => void;
  onBack: () => void;
  onNavigate: (view: AppView) => void;
  cartCount: number;
}

const MOCK_ARTICLES: Article[] = [
  { id: '1', title: 'O Futuro dos Wearables e a Saúde Preventiva', date: '12 Out 2023', category: 'Tecnologia', excerpt: 'Como os novos smartwatches estão revolucionando o monitoramento de saúde a longo prazo e o que esperar da próxima década.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  { id: '2', title: 'Minimalismo no Workspace: Produtividade através do Design', date: '15 Out 2023', category: 'Design', excerpt: 'Menos é mais: como o setup minimalista aumenta sua produtividade e reduz o estresse cognitivo no dia a dia.', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  { id: '3', title: 'Som de Estúdio em Casa: O Renascimento do Hi-Fi', date: '18 Out 2023', category: 'Áudio', excerpt: 'Por que o áudio de alta fidelidade está conquistando uma nova geração e como montar seu primeiro setup audiófilo.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
];

const Institutional: React.FC<Props> = ({ view, article, onSelectArticle, onBack, onNavigate, cartCount }) => {

  const renderContent = () => {
    switch (view) {
      case AppView.ABOUT:
        return (
          <div className="animate-toast max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter leading-none">Nossa Missão<span className="text-brand-primary">.</span></h1>
            <div className="aspect-[21/9] bg-zinc-100 dark:bg-zinc-900 rounded-[48px] mb-16 overflow-hidden border border-slate-100 dark:border-zinc-800 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600" className="w-full h-full object-cover grayscale contrast-125 opacity-40" alt="Nosso Escritório" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
               <div className="space-y-8">
                 <h2 className="text-4xl font-black tracking-tight leading-tight">Elegância Industrial & <br/>Tecnologia Humana</h2>
                 <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Fundada em 2021, a MarketStore nasceu do desejo de unir tecnologia de ponta com um design que respeita o espaço e a mente do usuário.</p>
                 <div className="flex items-center gap-6 pt-6 border-t border-slate-100 dark:border-zinc-800">
                    <div>
                      <p className="text-3xl font-black text-brand-primary">50k+</p>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Clientes Premium</p>
                    </div>
                    <div className="h-10 w-px bg-slate-100 dark:bg-zinc-800"></div>
                    <div>
                      <p className="text-3xl font-black text-brand-primary">12</p>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Países Atendidos</p>
                    </div>
                 </div>
               </div>
               <div className="space-y-8">
                 <h2 className="text-4xl font-black tracking-tight leading-tight">Curadoria Absoluta</h2>
                 <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Não somos apenas um marketplace. Somos curadores. Cada item em nosso catálogo passa por um teste de 72h de performance e estética antes de ser aprovado.</p>
                 <button onClick={() => onNavigate(AppView.STOREFRONT)} className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-zinc-900 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-primary hover:text-white transition-all shadow-xl">Explorar Catálogo</button>
               </div>
            </div>
          </div>
        );

      case AppView.BLOG:
        return (
          <div className="animate-toast">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 border-b border-slate-100 dark:border-zinc-800 pb-12">
               <div>
                  <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none mb-4">Editorial<span className="text-brand-primary">.</span></h1>
                  <p className="text-xl text-slate-400 font-medium max-w-xl">Deep dives em tecnologia, design e o estilo de vida digital contemporâneo.</p>
               </div>
               <div className="flex gap-4">
                  <button className="px-6 py-2.5 bg-brand-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest">Tudo</button>
                  <button className="px-6 py-2.5 border border-slate-200 dark:border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary transition-colors">Tecnologia</button>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               {MOCK_ARTICLES.map(art => (
                 <div key={art.id} onClick={() => onSelectArticle(art)} className="group cursor-pointer flex flex-col h-full">
                   <div className="aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 rounded-[32px] mb-8 overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-zinc-800">
                     <img src={art.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={art.title} />
                   </div>
                   <div className="flex items-center gap-3 mb-4 px-2">
                     <span className="bg-brand-primary/10 text-brand-primary text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">{art.category}</span>
                     <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{art.date}</span>
                   </div>
                   <h3 className="text-2xl font-black group-hover:text-brand-primary transition-colors leading-tight mb-4 px-2 line-clamp-2">{art.title}</h3>
                   <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed px-2 font-medium">{art.excerpt}</p>
                   <button className="mt-6 flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest group-hover:translate-x-2 transition-transform px-2">
                      Ler Artigo Completo <span className="material-icons-round text-base">arrow_forward</span>
                   </button>
                 </div>
               ))}
            </div>
          </div>
        );

      case AppView.BLOG_ARTICLE:
        return article ? (
          <div className="animate-toast max-w-4xl mx-auto">
            <button onClick={() => onNavigate(AppView.BLOG)} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-brand-primary transition-colors mb-12">
              <span className="material-icons-round">arrow_back</span> Voltar ao Editorial
            </button>
            <div className="flex items-center gap-3 mb-8">
               <span className="bg-brand-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{article.category}</span>
               <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{article.date} • 5 min de leitura</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tighter mb-12">{article.title}</h1>
            <div className="aspect-[21/10] rounded-[48px] overflow-hidden mb-16 shadow-2xl border border-slate-100 dark:border-zinc-800">
               <img src={article.image} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-[1.8]">
               {article.content}
               <p className="mt-10">
                 Donec pretium justo in ante dignissim, eget condimentum neque molestie. Proin vitae libero sit amet elit tristique pellentesque. 
                 Cras congue, sem id tincidunt pellentesque, odio mi tincidunt mi, non semper orci justo eu magna. 
                 Aliquam erat volutpat. Pellentesque eu leo pulvinar, viverra eros quis, commodo libero.
               </p>
               <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-16 mb-6">O Impacto no Cotidiano</h2>
               <p>
                 Suspendisse potenti. In hac habitasse platea dictumst. Quisque facilisis, sapien eu hendrerit eleifend, diam ligula 
                 egestas eros, ut sodales est nisi eu risus. Proin rhoncus lectus at neque tincidunt, id convallis metus aliquet.
               </p>
            </div>
            <div className="mt-24 pt-16 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary"><span className="material-icons-round text-2xl">person</span></div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white leading-none">Equipe MarketStore</p>
                    <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-widest">Tech Editorial Board</p>
                  </div>
               </div>
               <div className="flex gap-3">
                  <button className="w-12 h-12 rounded-2xl border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-400 hover:text-brand-primary transition-colors"><span className="material-icons-round text-xl">share</span></button>
                  <button className="w-12 h-12 rounded-2xl border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-400 hover:text-brand-primary transition-colors"><span className="material-icons-round text-xl">bookmark_border</span></button>
               </div>
            </div>
          </div>
        ) : null;

      case AppView.POLICIES:
      case AppView.TERMS:
        return (
          <div className="animate-toast prose prose-slate dark:prose-invert max-w-4xl mx-auto">
            <h1 className="text-6xl font-black mb-4 tracking-tighter leading-none">{view === AppView.POLICIES ? 'Envio & Devolução' : 'Termos de Uso'}<span className="text-brand-primary">.</span></h1>
            <p className="text-slate-400 font-medium text-xl uppercase tracking-widest mb-16">Versão atualizada em Outubro de 2023</p>
            <div className="space-y-16 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
               <section>
                 <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-4">
                    <span className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center text-sm font-black shrink-0">01</span>
                    Regras de Envio Prioritário
                 </h2>
                 <p className="text-lg">Utilizamos a malha logística mais rápida do país. Pedidos confirmados até as 12h em dias úteis são despachados no mesmo dia. O código de rastreio é enviado automaticamente via E-mail e WhatsApp em até 2h após o despacho.</p>
               </section>
               
               <section>
                 <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-4">
                    <span className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center text-sm font-black shrink-0">02</span>
                    Reembolso Instantâneo
                 </h2>
                 <p className="text-lg">Entendemos que mudanças de ideia acontecem. Por isso, oferecemos o estorno no cartão de crédito em até 60 minutos após a confirmação do recebimento e conferência do item em nosso Centro de Distribuição. Para Pix, o valor retorna à sua conta no mesmo dia.</p>
               </section>

               <section>
                 <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-4">
                    <span className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center text-sm font-black shrink-0">03</span>
                    Proteção de Dados do Usuário
                 </h2>
                 <p className="text-lg">Sua privacidade é nosso compromisso inegociável. Não compartilhamos nem comercializamos seus dados com terceiros. Todas as transações financeiras são processadas em ambiente criptografado AES-256 via SSL/TLS com certificação internacional.</p>
               </section>

               <div className="bg-slate-50 dark:bg-zinc-900/50 p-12 rounded-[48px] border border-slate-100 dark:border-zinc-800 flex items-center justify-between gap-10">
                  <div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">Dúvidas Jurídicas?</h4>
                    <p className="text-sm text-slate-400">Entre em contato com nosso departamento legal para esclarecimentos específicos.</p>
                  </div>
                  <button className="text-[10px] font-black uppercase text-brand-primary hover:underline shrink-0">Email Jurídico</button>
               </div>
            </div>
          </div>
        );

      default:
        return <div className="text-center py-40 font-black text-4xl opacity-10">Página Indisponível</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 transition-colors duration-500">
      <Header onNavigate={onNavigate} cartCount={cartCount} />
      <main className="flex-1 px-6 md:px-12 py-16 md:py-28 max-w-7xl mx-auto w-full">
        {renderContent()}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default Institutional;
