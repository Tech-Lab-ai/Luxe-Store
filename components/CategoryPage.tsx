
import React, { useState, useMemo } from 'react';
import { CATEGORIES, MOCK_PRODUCTS } from '../constants';
import { Product, AppView } from '../types';
import Header from './Header';
import Footer from './Footer';
import ProductCard from './ProductCard';

interface Props {
  category: string;
  onSelectProduct: (product: Product) => void;
  onNavigate: (view: AppView) => void;
  onSelectCategory: (category: string) => void;
  cartCount: number;
}

const CategoryPage: React.FC<Props> = ({ category, onSelectProduct, onNavigate, onSelectCategory, cartCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Normalização para busca robusta
  const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const metadata = useMemo(() => {
    const target = normalize(category);
    return CATEGORIES.find(c => normalize(c.name) === target || normalize(c.slug) === target) || CATEGORIES[0];
  }, [category]);

  const filteredProducts = useMemo(() => {
    const target = normalize(category);
    return MOCK_PRODUCTS.filter(p => 
      normalize(p.category) === target &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [category, searchQuery]);

  return (
    <div className="flex flex-col w-full overflow-x-hidden min-h-screen bg-white dark:bg-zinc-950">
      <Header onNavigate={onNavigate} cartCount={cartCount} onSelectCategory={onSelectCategory} />

      <section className="px-4 md:px-8 py-10 max-w-7xl mx-auto w-full">
        <div className={`relative h-[300px] md:h-[450px] ${metadata.accentColor || 'bg-zinc-900'} rounded-[48px] overflow-hidden flex items-center px-12 md:px-20 group shadow-2xl animate-fade-in`}>
          <div className="absolute inset-0">
            <img 
              src={metadata.bannerImage} 
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[7s]" 
              alt={metadata.name} 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-xl animate-toast">
            <span className="inline-block px-4 py-1.5 bg-brand-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Coleção Oficial</span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
              {metadata.name}<span className="text-brand-primary">.</span>
            </h1>
            <p className="text-zinc-300 font-medium text-lg max-w-md leading-relaxed opacity-90">{metadata.description}</p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 py-8 max-w-7xl mx-auto w-full sticky top-[136px] z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-zinc-900">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
             <button onClick={() => onNavigate(AppView.STOREFRONT)} className="hover:text-brand-primary">Início</button>
             <span className="material-icons-round text-sm">chevron_right</span>
             <span className="text-slate-900 dark:text-white font-black">{metadata.name}</span>
          </div>

          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400"><span className="material-icons-round text-lg">search</span></span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Buscar em ${metadata.name}...`}
              className="w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20 transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-6">
             <div className="text-right shrink-0">
                <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest leading-none mb-1">Encontrados</p>
                <span className="text-xl font-black text-slate-900 dark:text-white leading-none">{filteredProducts.length.toString().padStart(2, '0')}</span>
             </div>
             <div className="h-8 w-px bg-slate-100 dark:bg-zinc-800"></div>
             <select className="bg-transparent border-none text-xs font-bold text-slate-900 dark:text-white focus:ring-0 cursor-pointer p-0">
                <option>Mais Relevantes</option>
                <option>Menor Preço</option>
             </select>
          </div>
        </div>
      </section>

      <main className="flex-1 px-4 md:px-8 py-16 max-w-7xl mx-auto w-full">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10 animate-toast">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} onSelect={onSelectProduct} onCategorySelect={onSelectCategory} />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center bg-slate-50/50 dark:bg-zinc-900/30 rounded-[80px] border-2 border-dashed border-slate-100 dark:border-zinc-800 mx-2">
             <div className="w-24 h-24 bg-white dark:bg-zinc-800 rounded-3xl flex items-center justify-center mx-auto mb-10 text-slate-200 shadow-sm"><span className="material-icons-round text-6xl">{metadata.icon}</span></div>
             <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase">Nenhum item disponível</h3>
             <p className="text-slate-400 max-w-md mx-auto font-medium text-lg leading-relaxed">Sua busca não retornou resultados nesta categoria. Explore nossas outras coleções premium.</p>
             <button onClick={() => onNavigate(AppView.STOREFRONT)} className="mt-10 px-12 py-5 bg-brand-primary text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl hover:scale-105 transition-all">Ver Loja Completa</button>
          </div>
        )}
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default CategoryPage;
