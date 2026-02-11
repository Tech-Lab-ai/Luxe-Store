
import { Product, Addon, CategoryMetadata } from './types';

export const PRIMARY_COLOR = "#5B13EC";
export const SUCCESS_COLOR = "#10B981";
export const ERROR_COLOR = "#EF4444";
export const PENDING_COLOR = "#F59E0B";
export const SHIPPED_COLOR = "#6366F1";

export const CATEGORIES: CategoryMetadata[] = [
  { 
    name: 'Celulares', 
    icon: 'smartphone', 
    slug: 'celulares',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=100&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1600',
    description: 'Do Titânio à Inteligência Artificial. Encontre o dispositivo que redefine seu potencial tecnológico.',
    accentColor: 'bg-blue-600'
  },
  { 
    name: 'Laptops', 
    icon: 'laptop_mac', 
    slug: 'laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=100&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600',
    description: 'Workstations de alta performance e ultraportáteis para criativos e profissionais exigentes.',
    accentColor: 'bg-zinc-800'
  },
  { 
    name: 'Notebooks', 
    icon: 'laptop', 
    slug: 'notebooks',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=100&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1600',
    description: 'Equipamentos versáteis projetados para acompanhar seu ritmo, do home office ao café.',
    accentColor: 'bg-slate-700'
  },
  { 
    name: 'Watch', 
    icon: 'watch', 
    slug: 'watch',
    image: 'https://images.unsplash.com/photo-1544117518-30df578096a4?q=80&w=100&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1434493907317-a46b53b81846?q=80&w=1600',
    description: 'Relógios de aventura robustos e elegantes, unindo o melhor da relojoaria com sensores de ponta.',
    accentColor: 'bg-orange-600'
  },
  { 
    name: 'Smartwatches', 
    icon: 'watch_later', 
    slug: 'smartwatches',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=100&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600',
    description: 'Elegância clássica com monitoramento de saúde de última geração para o seu dia a dia.',
    accentColor: 'bg-emerald-600'
  },
  { 
    name: 'Headphones', 
    icon: 'headphones', 
    slug: 'headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=100&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1600',
    description: 'Som imersivo com cancelamento de ruído líder de mercado e áudio de alta fidelidade.',
    accentColor: 'bg-indigo-600'
  },
  { 
    name: 'Áudio', 
    icon: 'speaker', 
    slug: 'audio',
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=100&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1583394838336-acd977730f90?q=80&w=1600',
    description: 'Sistemas de som icônicos e design vintage para transformar sua experiência auditiva em casa.',
    accentColor: 'bg-amber-600'
  },
  { 
    name: 'Games', 
    icon: 'videogame_asset', 
    slug: 'games',
    image: 'https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?q=80&w=100&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1606813907291-d86ebb9c74ad?q=80&w=1600',
    description: 'Performance de próxima geração com Ray Tracing e cores vibrantes para gamers profissionais.',
    accentColor: 'bg-red-600'
  },
  { 
    name: 'Câmeras', 
    icon: 'photo_camera', 
    slug: 'cameras',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=100&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=1600',
    description: 'Ópticas de precisão e sensores avançados para traduzir sua visão em realidade profissional.',
    accentColor: 'bg-stone-800'
  },
];

export const MOCK_PRODUCTS: Product[] = [
  // CELULARES
  { id: 'cel-1', name: 'iPhone 15 Pro Max', price: 9899.00, category: 'Celulares', description: 'Titânio preto, 256GB de armazenamento e a nova porta USB-C.', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800', rating: 4.9, reviews: 120, bgColor: 'bg-zinc-100' },
  { id: 'cel-2', name: 'Samsung Galaxy S24 Ultra', price: 7299.00, category: 'Celulares', description: 'O poder da Inteligência Artificial em suas mãos com o novo Galaxy AI.', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800', rating: 4.8, reviews: 95, bgColor: 'bg-blue-50' },
  
  // LAPTOPS & NOTEBOOKS
  { id: 'lap-1', name: 'MacBook Pro M3 Max', price: 32000.00, category: 'Laptops', description: 'O chip mais avançado já criado pela Apple para computadores profissionais.', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800', rating: 5.0, reviews: 42, bgColor: 'bg-gray-100' },
  { id: 'not-1', name: 'Dell XPS 13 Plus', price: 12500.00, category: 'Notebooks', description: 'Design minimalista, teclado edge-to-edge e tela OLED touch.', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800', rating: 4.7, reviews: 28, bgColor: 'bg-slate-100' },
  { id: 'not-2', name: 'Lenovo ThinkPad X1 Carbon', price: 15900.00, category: 'Notebooks', description: 'O laptop de negócios definitivo, leve e ultra-resistente.', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=800', rating: 4.8, reviews: 15, bgColor: 'bg-zinc-200' },

  // WATCH & SMARTWATCHES
  { id: 'wat-1', name: 'Apple Watch Ultra 2', price: 8499.00, category: 'Watch', description: 'O relógio de aventura mais capaz e robusto da história.', image: 'https://images.unsplash.com/photo-1434493907317-a46b53b81846?q=80&w=800', rating: 4.9, reviews: 67, bgColor: 'bg-orange-50' },
  { id: 'smw-1', name: 'Samsung Galaxy Watch 6', price: 1899.00, category: 'Smartwatches', description: 'Elegância clássica com monitoramento de saúde de última geração.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800', rating: 4.6, reviews: 150, bgColor: 'bg-emerald-50' },
  
  // HEADPHONES & AUDIO
  { id: 'hdp-1', name: 'Sony WH-1000XM5', price: 2599.00, category: 'Headphones', description: 'Líder em cancelamento de ruído com áudio de alta fidelidade.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800', rating: 4.9, reviews: 310, bgColor: 'bg-zinc-800' },
  { id: 'hdp-2', name: 'Bose QuietComfort Ultra', price: 3199.00, category: 'Headphones', description: 'Som imersivo de nível superior com conforto lendário.', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800', rating: 4.9, reviews: 88, bgColor: 'bg-slate-100' },
  { id: 'aud-1', name: 'Marshall Stanmore III', price: 3499.00, category: 'Áudio', description: 'Som icônico e design vintage para sua casa.', image: 'https://images.unsplash.com/photo-1583394838336-acd977730f90?q=80&w=800', rating: 4.8, reviews: 56, bgColor: 'bg-amber-50' },
  
  // GAMES
  { id: 'gam-1', name: 'PlayStation 5 Pro', price: 6999.00, category: 'Games', description: 'Performance 4K nativa com Ray Tracing avançado.', image: 'https://images.unsplash.com/photo-1606813907291-d86ebb9c74ad?q=80&w=800', rating: 4.9, reviews: 2400, bgColor: 'bg-zinc-100' },
  { id: 'gam-2', name: 'Nintendo Switch OLED', price: 2199.00, category: 'Games', description: 'Cores vibrantes e contraste nítido onde quer que você jogue.', image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=800', rating: 4.8, reviews: 1200, bgColor: 'bg-red-50' },
  
  // CÂMERAS
  { id: 'cam-1', name: 'Fujifilm X100V Premium', price: 15400.00, category: 'Câmeras', description: 'A câmera compacta favorita dos profissionais, agora em edição limitada.', image: 'https://images.unsplash.com/photo-1526170315870-ef6876f84b92?q=80&w=800', rating: 4.9, reviews: 54, bgColor: 'bg-stone-100' },
];

export const ADDONS: Addon[] = [
  { id: '1', name: 'Garantia Estendida 1 Ano', price: 89.00 },
  { id: '2', name: 'Seguro Contra Roubo', price: 120.00 },
  { id: '3', name: 'Película de Proteção Pro', price: 45.00 }
];
