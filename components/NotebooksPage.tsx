
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product, AppView } from '../types';
import Header from './Header';
import Footer from './Footer';
import ProductCard from './ProductCard';

interface Props {
  onSelectProduct: (product: Product) => void;
  onNavigate: (view: AppView) => void;
  cartCount: number;
}

const NotebooksPage: React.FC<Props> = ({ onSelectProduct, onNavigate, cartCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const notebooks = MOCK_PRODUCTS.filter(p => 
    p.category === 'Notebooks' && 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <Header onNavigate={onNavigate} cartCount={cartCount} onSelectCategory={(cat) => {
      }} />

      {/* Hero da Categoria */}
      <section className="px-4 md:px-8 py-10 max-w-7xl mx-auto w-full">
        <div className="relative h-[300px] md:h-[450px] bg-zinc-900 rounded-[48px] overflow-hidden flex items-center px-12 md:px-20 group">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1600" 
              className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-[5s]" 
              alt="Notebooks Banner" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-xl">
            <span className="inline-block px-4 py-1.5 bg-brand-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Equilíbrio & Mobilidade</span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">Versatilidade<br/>em Foco<span className="text-brand-primary">.</span></h1>
            <p className="text-zinc-400 font-medium text-lg max-w-md leading-relaxed">
              Equipamentos projetados para acompanhar seu ritmo. Do home office ao café, leve a inovação com você.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros e Busca */}
      <section className="px-4 md:px-8 py-8 max-w-7xl mx-auto w-full sticky top-[136px] z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-zinc-900">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
             <button onClick={() => onNavigate(AppView.STOREFRONT)} className="hover:text-brand-primary transition-colors">Início</button>
             <span className="material-icons-round text-sm">chevron_right</span>
             <span className="text-slate-900 dark:text-white">Notebooks</span>
          </div>

          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
              <span className="material-icons-round text-lg">search</span>
            </span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por marca ou modelo..."
              className="w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20 transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filtrar:</span>
             <select className="bg-transparent border-none text-xs font-bold text-slate-900 dark:text-white focus:ring-0 cursor-pointer">
                <option>Mais Populares</option>
                <option>Preço Crescente</option>
                <option>Preço Decrescente</option>
                <option>Melhores Avaliados</option>
             </select>
          </div>
        </div>
      </section>

      {/* Grid de Produtos Padronizada */}
      <main className="flex-1 px-4 md:px-8 py-16 max-w-7xl mx-auto w-full animate-toast">
        {notebooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {notebooks.map((prod) => (
              <ProductCard 
                key={prod.id} 
                product={prod} 
                onSelect={(p) => {
                  onSelectProduct(p);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center bg-slate-50/30 dark:bg-zinc-900/20 rounded-[64px] border-2 border-dashed border-slate-100 dark:border-zinc-800">
            <div className="w-24 h-24 bg-white dark:bg-zinc-800 rounded-[32px] flex items-center justify-center mx-auto mb-10 text-slate-200 shadow-sm">
               <span className="material-icons-round text-6xl">laptop</span>
            </div>
            <h2 className="text-3xl font-black mb-4 tracking-tight">Ops! Nenhum notebook encontrado.</h2>
            <p className="text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
              Não encontramos resultados para sua busca atual. Tente remover filtros ou usar termos mais abrangentes.
            </p>
            <button 
              onClick={() => setSearchQuery('')} 
              className="mt-10 px-8 py-4 bg-brand-primary text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              Limpar Busca
            </button>
          </div>
        )}
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default NotebooksPage;
