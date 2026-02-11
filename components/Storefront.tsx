
import React from 'react';
import { CATEGORIES, MOCK_PRODUCTS } from '../constants';
import { Product, AppView } from '../types';
import Header from './Header';
import Footer from './Footer';
import ProductCard from './ProductCard';

interface Props {
  onSelectProduct: (product: Product) => void;
  onNavigate: (view: AppView) => void;
  onSelectCategory: (category: string) => void;
  cartCount: number;
}

const Storefront: React.FC<Props> = ({ onSelectProduct, onNavigate, onSelectCategory, cartCount }) => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden min-h-screen bg-white dark:bg-zinc-950">
      <Header onNavigate={onNavigate} cartCount={cartCount} onSelectCategory={onSelectCategory} />

      {/* Hero */}
      <section className="px-4 md:px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="relative h-[500px] md:h-[640px] w-full bg-[#111] rounded-[48px] overflow-hidden flex items-center px-8 md:px-24 group">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[4s]" alt="Hero Tech" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-2xl text-white animate-toast">
            <h1 className="text-6xl md:text-9xl font-black leading-[0.9] tracking-tighter mb-8">Performance Absoluta<span className="text-brand-primary">.</span></h1>
            <p className="text-lg md:text-2xl text-slate-300 font-medium mb-12 max-w-lg leading-relaxed opacity-80">A nova geração de wearables e notebooks acaba de chegar ao ecossistema MarketStore.</p>
            <div className="flex flex-wrap gap-5">
              <button onClick={() => onSelectCategory('Celulares')} className="px-12 py-5 bg-brand-primary text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-brand-primary/40 hover:scale-105 active:scale-95 transition-all">Ver Celulares</button>
              <button onClick={() => onSelectCategory('Laptops')} className="px-12 py-5 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white/20 transition-all">Ver Laptops</button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Horizontal Carousel */}
      <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black tracking-tight">Categorias Premium</h2>
          <div className="w-20 h-1 bg-brand-primary rounded-full"></div>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-6 custom-scrollbar scroll-smooth">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.slug} 
              onClick={() => onSelectCategory(cat.name)}
              className="flex flex-col items-center justify-center min-w-[140px] md:min-w-[180px] h-[180px] md:h-[220px] bg-slate-50 dark:bg-zinc-900 rounded-[40px] border border-slate-100 dark:border-zinc-800 hover:border-brand-primary hover:shadow-2xl hover:shadow-brand-primary/10 transition-all group shrink-0"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-zinc-800 rounded-[28px] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-icons-round text-3xl md:text-4xl text-slate-300 group-hover:text-brand-primary transition-colors">{cat.icon}</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products - Grid Padronizada */}
      <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-12">
           <h2 className="text-3xl font-black tracking-tight">Lançamentos</h2>
           <button onClick={() => onSelectCategory('Notebooks')} className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline">Ver catálogo full</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {MOCK_PRODUCTS.slice(0, 8).map(prod => (
            <ProductCard 
              key={prod.id} 
              product={prod} 
              onSelect={onSelectProduct} 
              onCategorySelect={onSelectCategory}
            />
          ))}
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default Storefront;
