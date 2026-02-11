
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onCategorySelect?: (category: string) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onCategorySelect, className = "" }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800';
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    if (onCategorySelect) {
      e.stopPropagation();
      onCategorySelect(product.category);
    }
  };

  return (
    <div 
      onClick={() => onSelect(product)}
      className={`group bg-white dark:bg-zinc-900 rounded-[48px] overflow-hidden border border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all hover:translate-y-[-10px] flex flex-col h-full relative cursor-pointer ${className}`}
    >
      {/* Container da Imagem - Aspecto Fixo */}
      <div className={`aspect-square w-full relative flex items-center justify-center overflow-hidden shrink-0 ${product.bgColor || 'bg-slate-50'}`}>
        <div className="w-full h-full p-10 md:p-12 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-1000">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-w-full max-h-full object-contain mix-blend-multiply opacity-90 drop-shadow-2xl" 
            loading="lazy"
            onError={handleImageError}
          />
        </div>
        
        {/* Badges */}
        <button 
          onClick={handleCategoryClick}
          className="absolute top-6 left-6 px-3 py-1 bg-white/90 dark:bg-zinc-800/90 backdrop-blur text-[8px] font-black uppercase tracking-widest text-slate-900 dark:text-white rounded-lg shadow-sm hover:bg-brand-primary hover:text-white transition-colors z-10"
        >
          {product.category}
        </button>

        {product.badge && (
          <span className="absolute top-6 right-6 bg-slate-900 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg z-10 shadow-lg">
            {product.badge}
          </span>
        )}

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Detalhes do Produto - Flex Grow para alinhar o rodapé */}
      <div className="p-8 md:p-10 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <span key={i} className={`material-icons-round text-[14px] ${i <= Math.floor(product.rating) ? 'text-brand-pending' : 'text-slate-200'}`}>
                star
              </span>
            ))}
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
            {product.reviews} reviews
          </span>
        </div>

        {/* Título com altura fixa e line-clamp para alinhamento perfeito na grid */}
        <h3 className="font-black text-xl md:text-2xl mb-4 leading-tight h-14 md:h-16 line-clamp-2 tracking-tight group-hover:text-brand-primary transition-colors">
          {product.name}
        </h3>

        {/* Rodapé do Card - Sempre alinhado na base */}
        <div className="mt-auto pt-8 flex items-center justify-between gap-4 border-t border-slate-50 dark:border-zinc-800">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Preço Sugerido</span>
            <span className="text-2xl md:text-3xl font-black text-brand-primary tracking-tighter leading-none">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          
          <div 
            className="w-14 h-14 md:w-16 md:h-16 bg-slate-900 dark:bg-white text-white dark:text-zinc-900 rounded-3xl flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-2xl shadow-black/10 active:scale-90"
          >
            <span className="material-icons-round text-xl md:text-2xl">add_shopping_cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
