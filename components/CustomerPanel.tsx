
import React, { useState } from 'react';
import { AppView, Product } from '../types';

interface Props {
  onBack: () => void;
  onNavigate: (view: AppView) => void;
  onSaveProfile: () => void;
}

type Tab = 'dashboard' | 'pedidos' | 'rastreamento' | 'dados' | 'enderecos' | 'seguranca' | 'ajuda';

const CustomerPanel: React.FC<Props> = ({ onBack, onNavigate, onSaveProfile }) => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orderFilter, setOrderFilter] = useState('Todos');
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  // Mock User Data
  const [userData, setUserData] = useState({
    name: 'Alexandre Silva',
    email: 'alexandre.silva@email.com',
    phone: '(11) 98765-4321',
    document: '123.456.789-00',
    bio: ''
  });

  // Mock Addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: 'Residencial',
      isPrimary: true,
      icon: 'home',
      name: 'Alexandre Silva',
      street: 'Rua das Flores, 123 - Apto 42',
      neighborhood: 'Jardim Paulistano',
      city: 'São Paulo - SP',
      zip: '01415-000',
      country: 'Brasil'
    },
    {
      id: 2,
      label: 'Trabalho',
      isPrimary: false,
      icon: 'business',
      name: 'CheckoutHub Tecnologia',
      street: 'Av. Brigadeiro Faria Lima, 3477 - 10º Andar',
      neighborhood: 'Itaim Bibi',
      city: 'São Paulo - SP',
      zip: '04538-133',
      country: 'Brasil'
    },
    {
      id: 3,
      label: 'Casa de Praia',
      isPrimary: false,
      icon: 'beach_access',
      name: 'Alexandre Silva',
      street: 'Av. Beira Mar, 1000 - Casa 15',
      neighborhood: 'Riviera de São Lourenço',
      city: 'Bertioga - SP',
      zip: '11250-000',
      country: 'Brasil'
    }
  ]);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'pedidos', label: 'Meus Pedidos', icon: 'local_mall' },
    { id: 'rastreamento', label: 'Rastreamento', icon: 'local_shipping' },
    { id: 'dados', label: 'Meus Dados', icon: 'person' },
    { id: 'enderecos', label: 'Endereços', icon: 'location_on' },
    { id: 'seguranca', label: 'Segurança', icon: 'verified_user' },
  ];

  const quickAccessCards = [
    { id: 'pedidos', title: 'Meus Pedidos', desc: 'Veja o histórico completo e gerencie suas compras anteriores de forma simples.', icon: 'description', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { id: 'rastreamento', title: 'Rastreamento', desc: 'Acompanhe em tempo real onde estão seus pacotes em trânsito e data estimada.', icon: 'track_changes', color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
    { id: 'dados', title: 'Meus Dados', desc: 'Atualize seu perfil, e-mail, telefone e preferências de contato.', icon: 'person_add_alt', color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
    { id: 'enderecos', title: 'Endereços', desc: 'Gerencie seus locais de entrega e faturamento favoritos para checkout rápido.', icon: 'map', color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
    { id: 'seguranca', title: 'Segurança', desc: 'Altere sua senha e configure autenticação em duas etapas para sua proteção.', icon: 'security', color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
    { id: 'ajuda', title: 'Central de Ajuda', desc: 'Precisa de suporte? Encontre respostas rápidas ou fale com nossos especialistas.', icon: 'help_outline', color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
  ];

  const mockOrders = [
    { id: 'CH-89421', date: '12 de Outubro, 2023', product: 'Fone Wireless Premium Pro + 1 item', price: 549.90, status: 'PAGO', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200' },
    { id: 'CH-89310', date: '05 de Outubro, 2023', product: 'Smartwatch Series X White', price: 849.00, status: 'ENVIADO', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200' },
    { id: 'CH-88201', date: '28 de Setembro, 2023', product: 'Nike Zoom Velocity Red', price: 329.90, status: 'ENTREGUE', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200' },
    { id: 'CH-87552', date: '15 de Agosto, 2023', product: 'Câmera Instantânea Retro', price: 1150.00, status: 'PROCESSANDO', image: 'https://images.unsplash.com/photo-1526170315870-ef6876f84b92?q=80&w=200' },
  ];

  const recommendedProducts = [
    { name: 'Fone Wireless Premium', price: 499.90, oldPrice: 599.00, category: 'Eletrônicos', badge: '-15%', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400' },
    { name: 'Smartwatch Series X', price: 849.00, category: 'Acessórios', badge: 'NOVO', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400' },
    { name: 'Nike Zoom Velocity', price: 329.90, category: 'Calçados', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400' },
    { name: 'Câmera Instantânea Retro', price: 1150.00, category: 'Fotografia', image: 'https://images.unsplash.com/photo-1526170315870-ef6876f84b92?q=80&w=400' },
  ];

  const renderDashboard = () => (
    <>
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
        <div className="animate-toast">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
            Bem-vindo de volta, Alexandre! 👋
          </h1>
          <p className="text-slate-500 font-medium max-w-lg">
            Aqui está o resumo da sua conta e seus pedidos recentes. Tudo o que você precisa em um só lugar.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 sm:flex-none bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800 flex items-center gap-4 min-w-[180px]">
            <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center">
              <span className="material-icons-round">shopping_bag</span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ativos</p>
              <p className="text-lg font-black dark:text-white">2 Pedidos</p>
            </div>
          </div>
          <div className="flex-1 sm:flex-none bg-brand-primary p-4 rounded-3xl shadow-xl shadow-brand-primary/20 flex items-center gap-4 min-w-[180px] text-white">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="material-icons-round">confirmation_number</span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Disponíveis</p>
              <p className="text-lg font-black">5 Cupons</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {quickAccessCards.map((card) => (
          <div 
            key={card.id} 
            onClick={() => setActiveTab(card.id as Tab)}
            className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] shadow-sm border border-slate-50 dark:border-zinc-800 hover:shadow-xl hover:translate-y-[-4px] transition-all cursor-pointer group"
          >
            <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <span className="material-icons-round text-2xl">{card.icon}</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{card.title}</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Para Você</h2>
            <p className="text-sm text-slate-400 font-medium mt-1">Sugestões exclusivas baseadas no seu perfil</p>
          </div>
          <button onClick={() => onNavigate(AppView.STOREFRONT)} className="text-brand-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:underline">
            Ver catálogo completo <span className="material-icons-round text-sm">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((prod, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 rounded-[32px] overflow-hidden shadow-sm border border-slate-50 dark:border-zinc-800 group cursor-pointer hover:shadow-xl transition-all flex flex-col">
              <div className="aspect-square relative overflow-hidden bg-slate-50 dark:bg-zinc-800 flex items-center justify-center p-6">
                <img src={prod.image} alt={prod.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                {prod.badge && (
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white ${prod.badge === 'NOVO' ? 'bg-brand-success' : 'bg-brand-error'}`}>
                    {prod.badge}
                  </span>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{prod.category}</p>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4 line-clamp-1">{prod.name}</h4>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    {prod.oldPrice && <span className="text-[10px] text-slate-400 line-through">R$ {prod.oldPrice.toFixed(2)}</span>}
                    <span className="text-lg font-black text-brand-primary">R$ {prod.price.toFixed(2)}</span>
                  </div>
                  <button className="w-10 h-10 bg-brand-primary/5 text-brand-primary rounded-xl flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
                    <span className="material-icons-round text-xl">shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  const renderPedidos = () => (
    <div className="animate-toast space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Meus Pedidos</h1>
          <p className="text-slate-500 font-medium">Acompanhe e gerencie todo o seu histórico de compras.</p>
        </div>
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
            <span className="material-icons-round text-lg">search</span>
          </span>
          <input 
            className="w-full bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-brand-primary/20 shadow-sm"
            placeholder="Buscar por pedido ou produto..."
          />
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
        {['Todos', 'Pagos', 'Em Processamento', 'Enviados', 'Entregues'].map((f) => (
          <button
            key={f}
            onClick={() => setOrderFilter(f)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${orderFilter === f ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-white dark:bg-zinc-900 text-slate-400 border border-slate-100 dark:border-zinc-800 hover:border-brand-primary/20'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-[32px] border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-center gap-6 group">
            <div className="w-20 h-20 bg-slate-50 dark:bg-zinc-800 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center p-3 border border-slate-100 dark:border-zinc-700">
              <img src={order.image} alt={order.product} className="max-w-full max-h-full object-contain mix-blend-multiply opacity-80" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Pedido #{order.id}</span>
                <span className="text-[10px] text-slate-300">•</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.date}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{order.product}</h3>
              <p className="text-sm font-black text-slate-900 dark:text-white">Total: R$ {order.price.toFixed(2)}</p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4 shrink-0">
              <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                order.status === 'PAGO' ? 'bg-emerald-100 text-emerald-600' : 
                order.status === 'ENVIADO' ? 'bg-blue-100 text-blue-600' : 
                order.status === 'ENTREGUE' ? 'bg-slate-100 text-slate-600' : 
                'bg-orange-100 text-orange-600'
              }`}>
                {order.status === 'ENVIADO' && <span className="material-icons-round text-[10px] mr-1">local_shipping</span>}
                {order.status === 'ENTREGUE' && <span className="material-icons-round text-[10px] mr-1">check</span>}
                {order.status === 'PROCESSANDO' && <span className="material-icons-round text-[10px] mr-1">history</span>}
                {order.status}
              </span>
              
              <div className="flex gap-2">
                <button className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">Detalhes</button>
                {order.status === 'ENTREGUE' ? (
                  <button className="px-6 py-2.5 border-2 border-brand-primary text-brand-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all">Comprar Novamente</button>
                ) : (
                  <button 
                    onClick={() => setActiveTab('rastreamento')}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg transition-all ${
                    order.status === 'PROCESSANDO' ? 'bg-violet-500 shadow-violet-500/20' : 'bg-brand-primary shadow-brand-primary/20'
                  }`}>
                    {order.status === 'PROCESSANDO' ? 'Ver Status' : 'Rastrear'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-200 dark:border-zinc-800">
        <p className="text-xs text-slate-400 font-medium">Mostrando <span className="font-black text-slate-900 dark:text-white">4</span> de <span className="font-black text-slate-900 dark:text-white">12</span> pedidos</p>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl border border-slate-100 dark:border-zinc-800 text-slate-300 hover:text-brand-primary transition-colors flex items-center justify-center">
            <span className="material-icons-round">chevron_left</span>
          </button>
          <button className="w-10 h-10 rounded-xl bg-brand-primary text-white font-black text-xs shadow-lg shadow-brand-primary/20">1</button>
          <button className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 text-slate-500 font-bold text-xs hover:border-brand-primary/20 transition-all">2</button>
          <button className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 text-slate-500 font-bold text-xs hover:border-brand-primary/20 transition-all">3</button>
          <button className="w-10 h-10 rounded-xl border border-slate-100 dark:border-zinc-800 text-slate-300 hover:text-brand-primary transition-colors flex items-center justify-center">
            <span className="material-icons-round">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderRastreamento = () => (
    <div className="animate-toast space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Acompanhe seu Pedido</h1>
          <p className="text-slate-500 font-medium">Pedido #CH-99420-BR • Realizado em 12 Out, 2023</p>
        </div>
        <span className="bg-emerald-100 text-emerald-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 self-start md:self-center">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Em Trânsito
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 p-10 rounded-[48px] border border-slate-100 dark:border-zinc-800 shadow-sm relative overflow-hidden">
            <h3 className="text-xl font-black tracking-tight mb-12">Progresso da Entrega</h3>
            
            <div className="space-y-12">
              {[
                { title: 'Pedido Realizado', desc: 'Seu pedido foi recebido e processado com sucesso.', time: '12 Out, 09:42', status: 'done', icon: 'check' },
                { title: 'Em Preparação', desc: 'Estamos separando e embalando seus itens cuidadosamente.', time: '12 Out, 14:15', status: 'done', icon: 'inventory_2' },
                { title: 'Saiu para Entrega', desc: 'O entregador já está a caminho do seu endereço.', prediction: 'Previsão: Hoje até as 18:00', status: 'active', icon: 'local_shipping' },
                { title: 'Entregue', desc: 'Aguardando confirmação de recebimento.', status: 'pending', icon: 'home' }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-8 relative group">
                  {idx < 3 && (
                    <div className={`absolute left-7 top-14 w-1 h-14 ${step.status === 'done' ? 'bg-brand-primary' : 'bg-slate-100 dark:bg-zinc-800'}`}></div>
                  )}
                  
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 z-10 shadow-lg ${
                    step.status === 'done' ? 'bg-brand-primary text-white shadow-brand-primary/20' : 
                    step.status === 'active' ? 'bg-white border-2 border-brand-primary text-brand-primary' : 
                    'bg-slate-50 dark:bg-zinc-800 text-slate-300'
                  }`}>
                    <span className="material-icons-round text-2xl">{step.icon}</span>
                  </div>
                  
                  <div className={`flex flex-col ${step.status === 'pending' ? 'opacity-40' : ''}`}>
                    <h4 className="text-lg font-black tracking-tight text-slate-900 dark:text-white leading-none mb-2">{step.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm mb-1">{step.desc}</p>
                    {step.time && <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{step.time}</span>}
                    {step.prediction && <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{step.prediction}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-10 rounded-[48px] border border-slate-100 dark:border-zinc-800 shadow-sm flex items-center gap-8">
            <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-800 text-slate-400 rounded-3xl flex items-center justify-center shrink-0">
               <span className="material-icons-round text-3xl">map</span>
            </div>
            <div>
              <h4 className="text-lg font-black tracking-tight text-slate-900 dark:text-white leading-none mb-2">Endereço de Entrega</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Av. Paulista, 1234 • São Paulo, SP • 01310-100</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 p-10 rounded-[48px] border border-slate-100 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xl font-black tracking-tight mb-8">Resumo do Pedido</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-800 rounded-2xl p-2 shrink-0 flex items-center justify-center border border-slate-100 dark:border-zinc-700">
                  <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=100" className="max-w-full max-h-full object-contain mix-blend-multiply opacity-80" alt="Produto" />
                </div>
                <div className="flex flex-col justify-center">
                   <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Fone Wireless Premiu...</h5>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantidade: 1</p>
                   <p className="text-sm font-black text-brand-primary">R$ 499,90</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-800 rounded-2xl p-2 shrink-0 flex items-center justify-center border border-slate-100 dark:border-zinc-700">
                  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=100" className="max-w-full max-h-full object-contain mix-blend-multiply opacity-80" alt="Produto" />
                </div>
                <div className="flex flex-col justify-center">
                   <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Smartwatch Series X...</h5>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantidade: 1</p>
                   <p className="text-sm font-black text-brand-primary">R$ 849,00</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-zinc-800">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-400">Subtotal</span>
                <span className="text-slate-900 dark:text-white font-bold">R$ 1.348,90</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-400">Frete</span>
                <span className="text-brand-success font-black uppercase text-[10px] tracking-widest">Grátis</span>
              </div>
              <div className="pt-4 flex justify-between items-end">
                <span className="text-xl font-black text-slate-900 dark:text-white">Total</span>
                <span className="text-2xl font-black text-brand-primary">R$ 1.348,90</span>
              </div>
            </div>
          </div>

          <div className="bg-brand-primary/5 dark:bg-zinc-900 p-10 rounded-[48px] border border-brand-primary/10 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xl font-black tracking-tight mb-4">Algum problema?</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida sobre sua entrega.</p>
            
            <div className="space-y-4">
              <button className="w-full bg-brand-primary text-white py-5 rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                <span className="material-icons-round text-lg">headset_mic</span>
                Falar com Suporte
              </button>
              <button className="w-full bg-white dark:bg-zinc-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-zinc-700 py-5 rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors">
                <span className="material-icons-round text-lg">help_outline</span>
                Perguntas Frequentes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDados = () => (
    <div className="animate-toast space-y-10 pb-20">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Meus Dados</h1>
        <p className="text-slate-500 font-medium">Gerencie suas informações pessoais e mantenha seus dados atualizados.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="p-8 md:p-12 border-b border-slate-50 dark:border-zinc-800 flex flex-col md:flex-row items-center gap-8">
           <div className="relative group">
              <div className="w-32 h-32 rounded-[40px] overflow-hidden border-4 border-slate-50 dark:border-zinc-800 shadow-xl">
                 <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-primary text-white rounded-2xl shadow-lg shadow-brand-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                <span className="material-icons-round text-xl">photo_camera</span>
              </button>
           </div>
           <div className="text-center md:text-left space-y-3">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">{userData.name}</h2>
              <p className="text-slate-400 font-medium">{userData.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                 <span className="bg-brand-success/10 text-brand-success px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-brand-success/10">Conta Verificada</span>
                 <span className="bg-brand-primary/10 text-brand-primary px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-brand-primary/10">Premium</span>
              </div>
           </div>
        </div>

        {/* Form Grid */}
        <div className="p-8 md:p-12 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Nome Completo</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-slate-300">
                    <span className="material-icons-round text-xl">person_outline</span>
                  </span>
                  <input 
                    type="text" 
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    className="w-full bg-[#F8F9FD] dark:bg-zinc-800/50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">E-mail</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-slate-300">
                    <span className="material-icons-round text-xl">alternate_email</span>
                  </span>
                  <input 
                    type="email" 
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className="w-full bg-[#F8F9FD] dark:bg-zinc-800/50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">WhatsApp / Celular</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-slate-300">
                    <span className="material-icons-round text-xl">call</span>
                  </span>
                  <input 
                    type="text" 
                    value={userData.phone}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                    className="w-full bg-[#F8F9FD] dark:bg-zinc-800/50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Documento (CPF/CNPJ)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-slate-300">
                    <span className="material-icons-round text-xl">badge</span>
                  </span>
                  <input 
                    type="text" 
                    value={userData.document}
                    onChange={(e) => setUserData({...userData, document: e.target.value})}
                    className="w-full bg-[#F8F9FD] dark:bg-zinc-800/50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Bio (Opcional)</label>
                <textarea 
                  placeholder="Conte-nos um pouco sobre você..."
                  className="w-full bg-[#F8F9FD] dark:bg-zinc-800/50 border-none rounded-3xl py-6 px-8 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all min-h-[140px] resize-none"
                />
              </div>
           </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 md:p-12 border-t border-slate-50 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
           <div className="flex items-center gap-3 text-slate-400">
              <span className="material-icons-round text-lg">info</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Última atualização em 12 de Outubro de 2023</span>
           </div>
           <div className="flex items-center gap-4 w-full md:w-auto">
              <button onClick={() => setActiveTab('dashboard')} className="flex-1 md:flex-none px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">Cancelar</button>
              <button onClick={onSaveProfile} className="flex-1 md:flex-none px-12 py-4 bg-brand-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Salvar Alterações</button>
           </div>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-slate-100 dark:border-zinc-800 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 animate-toast shadow-sm">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-3xl flex items-center justify-center shrink-0">
               <span className="material-icons-round text-2xl">delete_forever</span>
            </div>
            <div>
               <h4 className="text-xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Excluir conta</h4>
               <p className="text-sm text-slate-400 font-medium">Esta ação é permanente e removerá todos os seus dados.</p>
            </div>
         </div>
         <button className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline">Excluir Conta</button>
      </div>
    </div>
  );

  const renderEnderecos = () => (
    <div className="animate-toast space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Meus Endereços</h1>
          <p className="text-slate-500 font-medium">Gerencie seus endereços de entrega e cobrança para facilitar o seu checkout.</p>
        </div>
        <button className="w-full md:w-auto bg-brand-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all">
          <span className="material-icons-round">add_location_alt</span>
          Adicionar Novo Endereço
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.map((addr) => (
          <div key={addr.id} className={`bg-white dark:bg-zinc-900 rounded-[40px] border p-8 flex flex-col transition-all shadow-sm ${addr.isPrimary ? 'border-brand-primary ring-4 ring-brand-primary/5' : 'border-slate-100 dark:border-zinc-800'}`}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${addr.isPrimary ? 'bg-brand-primary text-white' : 'bg-slate-50 dark:bg-zinc-800 text-slate-400'}`}>
                  <span className="material-icons-round text-2xl">{addr.icon}</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-black text-slate-900 dark:text-white leading-tight">{addr.label}</h3>
                  {addr.isPrimary && <span className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-primary mt-1">PRINCIPAL</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-brand-primary transition-colors">
                  <span className="material-icons-round text-lg">edit</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 transition-colors">
                  <span className="material-icons-round text-lg">delete_outline</span>
                </button>
              </div>
            </div>

            <div className="space-y-1 flex-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white">{addr.name}</p>
              <p className="text-sm text-slate-500 font-medium">{addr.street}</p>
              <p className="text-sm text-slate-500 font-medium">{addr.neighborhood}</p>
              <p className="text-sm text-slate-500 font-medium">{addr.city}, {addr.zip}</p>
              <p className="text-sm text-slate-500 font-medium">{addr.country}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 dark:border-zinc-800">
              {addr.isPrimary ? (
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="material-icons-round text-sm">info</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Endereço de entrega padrão</span>
                </div>
              ) : (
                <button className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline">Definir como principal</button>
              )}
            </div>
          </div>
        ))}

        <div className="bg-slate-50/50 dark:bg-zinc-900/30 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-[40px] flex flex-col items-center justify-center p-8 min-h-[300px] group cursor-pointer hover:border-brand-primary transition-all">
          <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-3xl flex items-center justify-center text-slate-300 group-hover:text-brand-primary group-hover:scale-110 transition-all mb-6 shadow-sm">
            <span className="material-icons-round text-4xl">add</span>
          </div>
          <h3 className="font-black text-slate-900 dark:text-white mb-2">Novo Endereço</h3>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Adicione um novo local de entrega</p>
        </div>
      </div>

      <div className="bg-brand-primary/5 dark:bg-zinc-900 rounded-[40px] border border-brand-primary/10 dark:border-zinc-800 p-8 md:p-12 flex items-center gap-8 animate-toast shadow-sm">
        <div className="w-16 h-16 bg-white dark:bg-zinc-800 text-brand-primary rounded-3xl flex items-center justify-center shrink-0 shadow-sm ring-1 ring-brand-primary/10">
          <span className="material-icons-round text-2xl">help_outline</span>
        </div>
        <div>
          <h4 className="text-xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Por que salvar endereços?</h4>
          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-2xl">
            Endereços salvos agilizam o processo de compra, permitindo que você selecione o destino da entrega com apenas um clique durante o checkout. Você pode adicionar quantos endereços desejar e definir um como principal.
          </p>
        </div>
      </div>
    </div>
  );

  const renderSeguranca = () => (
    <div className="animate-toast space-y-10 pb-20">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center">
          <span className="material-icons-round text-2xl">verified_user</span>
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1">Segurança</h1>
          <p className="text-slate-500 font-medium">Gerencie sua senha e proteja o acesso à sua conta.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Change Password Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="p-8 md:p-10 border-b border-slate-50 dark:border-zinc-800 flex items-center gap-4">
             <div className="w-10 h-10 bg-slate-50 dark:bg-zinc-800 text-slate-400 rounded-xl flex items-center justify-center">
               <span className="material-icons-round text-xl">lock</span>
             </div>
             <h3 className="text-xl font-black tracking-tight">Trocar Senha</h3>
          </div>
          <div className="p-8 md:p-10 space-y-8">
             <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Senha Atual</label>
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="Digite sua senha atual"
                    className="w-full bg-[#F8F9FD] dark:bg-zinc-800/50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all"
                  />
                  <button className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-300 hover:text-brand-primary">
                    <span className="material-icons-round text-lg">visibility</span>
                  </button>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Nova Senha</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      placeholder="Pelo menos 8 caracteres"
                      className="w-full bg-[#F8F9FD] dark:bg-zinc-800/50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all"
                    />
                    <button className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-300 hover:text-brand-primary">
                      <span className="material-icons-round text-lg">visibility</span>
                    </button>
                  </div>
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Confirmar Nova Senha</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      placeholder="Repita a nova senha"
                      className="w-full bg-[#F8F9FD] dark:bg-zinc-800/50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all"
                    />
                    <button className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-300 hover:text-brand-primary">
                      <span className="material-icons-round text-lg">visibility</span>
                    </button>
                  </div>
               </div>
             </div>

             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
                <div className="flex items-center gap-2 text-slate-400">
                   <span className="material-icons-round text-sm">info</span>
                   <span className="text-[10px] font-black uppercase tracking-widest">Sua senha deve conter letras, números e símbolos.</span>
                </div>
                <button className="bg-brand-primary text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">Atualizar Senha</button>
             </div>
          </div>
        </div>

        {/* 2FA Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm p-8 md:p-10">
           <div className="flex items-start justify-between mb-10">
              <div className="flex gap-6">
                 <div className="w-14 h-14 bg-brand-success/10 text-brand-success rounded-2xl flex items-center justify-center shrink-0">
                    <span className="material-icons-round text-2xl">verified</span>
                 </div>
                 <div className="max-w-xl">
                    <h3 className="text-xl font-black tracking-tight mb-2">Autenticação em duas etapas (2FA)</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      Adicione uma camada extra de segurança à sua conta. Sempre que você entrar, solicitaremos um código de verificação.
                    </p>
                 </div>
              </div>
              <button 
                onClick={() => setIsTwoFactorEnabled(!isTwoFactorEnabled)}
                className={`w-14 h-8 rounded-full relative transition-colors duration-300 focus:outline-none ${isTwoFactorEnabled ? 'bg-brand-primary' : 'bg-slate-200 dark:bg-zinc-800'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isTwoFactorEnabled ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
              <div className="bg-[#F8F9FD] dark:bg-zinc-800/50 p-8 rounded-3xl border border-slate-100 dark:border-zinc-800 flex items-center gap-6 group cursor-pointer hover:border-brand-primary transition-all">
                 <div className="w-12 h-12 bg-white dark:bg-zinc-800 text-slate-400 rounded-2xl flex items-center justify-center shadow-sm">
                    <span className="material-icons-round text-2xl">smartphone</span>
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Aplicativo Autenticador</h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Google Authenticator, Authy, etc.</p>
                 </div>
              </div>
              <div className="bg-[#F8F9FD] dark:bg-zinc-800/50 p-8 rounded-3xl border border-slate-100 dark:border-zinc-800 flex items-center gap-6 group cursor-pointer hover:border-brand-primary transition-all">
                 <div className="w-12 h-12 bg-white dark:bg-zinc-800 text-slate-400 rounded-2xl flex items-center justify-center shadow-sm">
                    <span className="material-icons-round text-2xl">chat_bubble_outline</span>
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Mensagem de Texto (SMS)</h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Envio de código para seu celular.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Connected Devices Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="p-8 md:p-10 border-b border-slate-50 dark:border-zinc-800 flex items-center justify-between">
             <div className="flex flex-col">
                <h3 className="text-xl font-black tracking-tight mb-1">Dispositivos Conectados</h3>
                <p className="text-xs text-slate-400 font-medium">Sessões ativas que acessaram sua conta recentemente.</p>
             </div>
             <button className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline">Sair de todas as sessões</button>
          </div>
          <div className="p-4 md:p-8 space-y-2">
             <div className="flex items-center justify-between p-6 rounded-[28px] hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 bg-slate-100 dark:bg-zinc-800 text-slate-400 rounded-2xl flex items-center justify-center shrink-0">
                      <span className="material-icons-round text-2xl">laptop</span>
                   </div>
                   <div>
                      <div className="flex items-center gap-3">
                         <h4 className="font-bold text-slate-900 dark:text-white">Chrome no Windows</h4>
                         <span className="bg-brand-success/10 text-brand-success px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">Este dispositivo</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">São Paulo, Brasil • IP: 187.23.45.12</p>
                   </div>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Ativo agora</span>
             </div>

             <div className="flex items-center justify-between p-6 rounded-[28px] hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 bg-slate-100 dark:bg-zinc-800 text-slate-400 rounded-2xl flex items-center justify-center shrink-0">
                      <span className="material-icons-round text-2xl">smartphone</span>
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">iPhone 14 Pro - App Hub</h4>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">Rio de Janeiro, Brasil • 14 de Outubro, 10:45</p>
                   </div>
                </div>
                <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors">Revogar Acesso</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-50 dark:bg-zinc-950 flex animate-toast overflow-hidden font-inter">
      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[210] lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar - Fixa */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-72 bg-white dark:bg-zinc-900 border-r border-slate-100 dark:border-zinc-800 z-[220] flex flex-col h-full shrink-0 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
            <span className="material-icons-round">bolt</span>
          </div>
          <span className="font-black text-xl tracking-tighter">CheckoutHub</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as Tab); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${activeTab === item.id ? 'bg-brand-primary/10 text-brand-primary' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800/50'}`}
            >
              <span className="material-icons-round text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 dark:border-zinc-800 shrink-0">
          <button onClick={() => onNavigate(AppView.STOREFRONT)} className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-slate-500 hover:text-brand-error transition-colors">
            <span className="material-icons-round">logout</span>
            Sair da conta
          </button>
        </div>
      </aside>

      {/* Main Content Area - Rolável */}
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#F8F9FD] dark:bg-zinc-950 relative">
        <header className="sticky top-0 z-20 h-20 flex items-center justify-between px-8 lg:px-12 bg-[#F8F9FD]/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-slate-100/50 dark:border-zinc-800/50">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-400">
              <span className="material-icons-round">menu</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400">
              <button onClick={() => setActiveTab('dashboard')} className="hover:text-brand-primary transition-colors">Home</button>
              <span className="material-icons-round text-sm">chevron_right</span>
              <button onClick={() => setActiveTab('dashboard')} className="hover:text-brand-primary transition-colors">Minha Conta</button>
              {activeTab !== 'dashboard' && (
                <>
                  <span className="material-icons-round text-sm">chevron_right</span>
                  <span className="text-slate-900 dark:text-white font-bold capitalize">
                    {activeTab === 'pedidos' ? 'Meus Pedidos' : 
                     activeTab === 'rastreamento' ? 'Rastreamento' : 
                     activeTab === 'dados' ? 'Meus Dados' : 
                     activeTab === 'enderecos' ? 'Endereços' : 
                     activeTab === 'seguranca' ? 'Segurança' : activeTab}
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative w-10 h-10 flex items-center justify-center text-slate-400 hover:text-brand-primary transition-colors">
              <span className="material-icons-round">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-error rounded-full border-2 border-[#F8F9FD] dark:border-zinc-950"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-zinc-800">
              <div className="text-right hidden xs:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Alexandre Silva</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Membro Premium</p>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-md">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 lg:p-12 max-w-[1400px] mx-auto">
          {activeTab === 'dashboard' ? renderDashboard() : 
           activeTab === 'pedidos' ? renderPedidos() : 
           activeTab === 'rastreamento' ? renderRastreamento() :
           activeTab === 'dados' ? renderDados() : 
           activeTab === 'enderecos' ? renderEnderecos() :
           activeTab === 'seguranca' ? renderSeguranca() : (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-slate-50 dark:bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                 <span className="material-icons-round text-5xl">construction</span>
              </div>
              <h2 className="text-2xl font-black mb-4">Em Desenvolvimento</h2>
              <p className="text-slate-500 max-w-sm mx-auto">Estamos trabalhando para trazer a melhor experiência para você. Em breve este recurso estará disponível.</p>
              <button onClick={() => setActiveTab('dashboard')} className="mt-8 text-xs font-black uppercase tracking-widest text-brand-primary hover:underline">Voltar para a Home</button>
            </div>
          )}

          <footer className="pt-20 pb-10 border-t border-slate-200 dark:border-zinc-800 text-center">
            <p className="text-xs text-slate-400 font-medium mb-4">
              © 2024 CheckoutHub Universal. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <button className="hover:text-brand-primary transition-colors">Termos de Uso</button>
              <button className="hover:text-brand-primary transition-colors">Política de Privacidade</button>
              <button className="hover:text-brand-primary transition-colors">Cookies</button>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default CustomerPanel;
