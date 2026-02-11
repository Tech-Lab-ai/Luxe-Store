
import React, { useState } from 'react';
import { AppView, Product } from '../types';

interface Props {
  onBack: () => void;
  onAction: () => void;
}

type AdminSection = 
  | 'dashboard' | 'pedidos' | 'etiquetas' | 'feedbacks' | 'suporte'
  | 'produtos' | 'categorias' | 'cupons' 
  | 'editor' | 'blog' 
  | 'integracoes' | 'juridico' | 'branding';

const AdminDashboard: React.FC<Props> = ({ onBack, onAction }) => {
  const [activeSub, setActiveSub] = useState<AdminSection>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>(['#8829', '#8831']);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['tech']);
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent');

  // Site Editor States
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [editorSettings, setEditorSettings] = useState({
    logo: 'logo_dark.png',
    primaryColor: '#5B13EC',
    font: 'Inter',
    darkMode: true,
    showFooterLogo: false
  });

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleOrderSelection = (id: string) => {
    setSelectedOrders(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const NavItem = ({ id, icon, label, badge }: { id: AdminSection, icon: string, label: string, badge?: string }) => {
    const isActive = activeSub === id;
    return (
      <button 
        onClick={() => { setActiveSub(id); setIsSidebarOpen(false); }} 
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-medium transition-all ${isActive ? 'bg-brand-primary/10 text-brand-primary' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800/50'}`}
      >
        <div className="flex items-center gap-3">
          <span className="material-icons-round text-xl">{icon}</span>
          <span className={isActive ? 'font-bold' : ''}>{label}</span>
        </div>
        {badge && (
          <span className="bg-brand-primary text-white text-[10px] font-bold h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-full">
            {badge}
          </span>
        )}
      </button>
    );
  };

  const NavGroup = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="mb-6">
      <p className="px-4 text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">{title}</p>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );

  const renderSiteEditor = () => (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50 dark:bg-zinc-950 overflow-hidden animate-toast">
      {/* Top Save Indicator Bar */}
      <div className="h-14 bg-white dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800 px-8 flex items-center justify-between shrink-0 z-20">
         <div className="flex items-center gap-4">
            <h2 className="text-sm font-black text-slate-900 dark:text-white">Editor do Site</h2>
            <div className="h-4 w-px bg-slate-100 dark:bg-zinc-800"></div>
            <div className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-brand-success rounded-full"></span>
               <span className="text-[10px] font-medium text-slate-400 italic">Alterações salvas automaticamente</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Descartar</button>
            <button className="px-6 py-2 bg-brand-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">Publicar Site</button>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Control Panel */}
        <aside className="w-80 border-r border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-y-auto custom-scrollbar shrink-0">
          <div className="p-8 space-y-12">
            {/* Branding Section */}
            <section className="space-y-6">
               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">Branding & Logo</p>
               <div className="border-2 border-dashed border-slate-100 dark:border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-brand-primary/30 transition-colors">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-slate-300 mb-4 shadow-inner group-hover:scale-110 transition-transform">
                     <span className="material-icons-round">upload_file</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Carregar Logotipo</h4>
                  <p className="text-[10px] text-slate-400 mt-1">PNG, JPG ou SVG (Máx. 2MB)</p>
               </div>
               <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl flex items-center justify-between border border-slate-100 dark:border-zinc-700">
                  <div className="flex items-center gap-3">
                     <span className="material-icons-round text-slate-300">image</span>
                     <span className="text-[11px] font-bold truncate max-w-[120px]">{editorSettings.logo}</span>
                  </div>
                  <button className="text-slate-300 hover:text-red-500"><span className="material-icons-round text-lg">delete_outline</span></button>
               </div>
            </section>

            {/* Colors Section */}
            <section className="space-y-6">
               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">Cor Principal</p>
               <div className="flex gap-4">
                  {['#5B13EC', '#0EA5E9', '#10B981', '#F43F5E', '#F59E0B', '#1E293B'].map(color => (
                    <button 
                      key={color} 
                      onClick={() => setEditorSettings({...editorSettings, primaryColor: color})}
                      className={`w-8 h-8 rounded-full shadow-sm transition-all hover:scale-125 ${editorSettings.primaryColor === color ? 'ring-4 ring-offset-4 ring-brand-primary/20 dark:ring-offset-zinc-900' : ''}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
               </div>
               <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100 dark:border-zinc-700">
                  <div className="w-6 h-6 rounded-lg shadow-sm" style={{ backgroundColor: editorSettings.primaryColor }}></div>
                  <input 
                    className="flex-1 bg-transparent border-none focus:ring-0 text-xs font-mono font-bold uppercase p-0" 
                    value={editorSettings.primaryColor}
                    onChange={(e) => setEditorSettings({...editorSettings, primaryColor: e.target.value})}
                  />
               </div>
            </section>

            {/* Typography Section */}
            <section className="space-y-6">
               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">Tipografia</p>
               <div className="space-y-3">
                  {['Inter', 'Montserrat', 'Poppins'].map(font => (
                    <button 
                      key={font}
                      onClick={() => setEditorSettings({...editorSettings, font})}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${editorSettings.font === font ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-50 dark:border-zinc-800 hover:border-slate-200'}`}
                    >
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white" style={{ fontFamily: font }}>{font}</h4>
                        <p className="text-[10px] text-slate-400 mt-1">Moderno e Legível</p>
                      </div>
                      {editorSettings.font === font && <span className="material-icons-round text-brand-primary text-sm">check_circle</span>}
                    </button>
                  ))}
               </div>
            </section>

            {/* Layout Toggles */}
            <section className="space-y-6">
               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">Configurações de Layout</p>
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Modo Escuro Habilitado</span>
                     <button 
                       onClick={() => setEditorSettings({...editorSettings, darkMode: !editorSettings.darkMode})}
                       className={`w-10 h-6 rounded-full relative transition-colors ${editorSettings.darkMode ? 'bg-brand-primary' : 'bg-slate-200'}`}
                     >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${editorSettings.darkMode ? 'translate-x-5' : 'translate-x-1'}`}></div>
                     </button>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Exibir Logo no Rodapé</span>
                     <button 
                       onClick={() => setEditorSettings({...editorSettings, showFooterLogo: !editorSettings.showFooterLogo})}
                       className={`w-10 h-6 rounded-full relative transition-colors ${editorSettings.showFooterLogo ? 'bg-brand-primary' : 'bg-slate-200'}`}
                     >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${editorSettings.showFooterLogo ? 'translate-x-5' : 'translate-x-1'}`}></div>
                     </button>
                  </div>
               </div>
            </section>
          </div>
        </aside>

        {/* Main Preview Area */}
        <main className="flex-1 bg-slate-100 dark:bg-zinc-950 p-10 flex flex-col items-center overflow-y-auto custom-scrollbar">
           {/* Device Selector */}
           <div className="bg-white dark:bg-zinc-900 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 flex gap-2 mb-10 shrink-0">
              <button 
                onClick={() => setDevicePreview('desktop')}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${devicePreview === 'desktop' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-slate-300 hover:text-slate-500'}`}
              >
                <span className="material-icons-round">desktop_windows</span>
              </button>
              <button 
                onClick={() => setDevicePreview('tablet')}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${devicePreview === 'tablet' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-slate-300 hover:text-slate-500'}`}
              >
                <span className="material-icons-round">tablet_mac</span>
              </button>
              <button 
                onClick={() => setDevicePreview('mobile')}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${devicePreview === 'mobile' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-slate-300 hover:text-slate-500'}`}
              >
                <span className="material-icons-round">smartphone</span>
              </button>
              <div className="w-px h-6 bg-slate-100 dark:bg-zinc-800 my-auto mx-2"></div>
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-zinc-800/50 rounded-xl">
                 <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Preview URL</span>
                 <code className="text-[10px] font-bold text-slate-500 truncate max-w-[200px]">checkout-test-v7.white-label.io</code>
                 <span className="material-icons-round text-slate-300 text-sm cursor-pointer hover:text-brand-primary">open_in_new</span>
              </div>
           </div>

           {/* Preview Canvas */}
           <div 
             className={`bg-white dark:bg-zinc-900 shadow-2xl transition-all duration-500 overflow-hidden flex flex-col origin-top ${
               devicePreview === 'desktop' ? 'w-full max-w-5xl rounded-[40px] aspect-video' : 
               devicePreview === 'tablet' ? 'w-[768px] rounded-[48px] h-[1024px]' : 
               'w-[375px] rounded-[56px] h-[812px] border-[10px] border-slate-900 dark:border-zinc-800'
             }`}
             style={{ fontFamily: editorSettings.font }}
           >
              {/* Header do Checkout no Preview */}
              <header className="px-8 py-6 border-b border-slate-50 dark:border-zinc-800 flex items-center justify-between shrink-0">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${editorSettings.primaryColor}15` }}>
                       <span className="material-icons-round text-brand-primary" style={{ color: editorSettings.primaryColor }}>storefront</span>
                    </div>
                    <span className="font-black text-lg tracking-tighter">YourStore</span>
                 </div>
                 <div className="flex items-center gap-6">
                    <div className="hidden md:flex gap-6 text-[9px] font-black uppercase tracking-widest text-slate-400">
                       <span>Shop</span>
                       <span>About</span>
                    </div>
                    <div className="relative">
                       <span className="material-icons-round text-slate-300">shopping_bag</span>
                       <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black text-white" style={{ backgroundColor: editorSettings.primaryColor }}>2</span>
                    </div>
                 </div>
              </header>

              {/* Corpo do Checkout no Preview */}
              <div className="flex-1 overflow-y-auto p-12 flex flex-col md:flex-row gap-12">
                 <div className="flex-1 space-y-10">
                    <div>
                       <h1 className="text-3xl font-black tracking-tight mb-2">Finalizar Compra</h1>
                       <div className="h-1 w-12 rounded-full" style={{ backgroundColor: editorSettings.primaryColor }}></div>
                    </div>
                    
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-2">E-mail</label>
                       <div className="w-full h-14 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border-none flex items-center px-6">
                          <span className="text-slate-300 text-sm font-medium">seu@email.com</span>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-2">Forma de Pagamento</p>
                       <div className="grid grid-cols-3 gap-3">
                          <div className="p-6 border-2 border-brand-primary bg-brand-primary/5 rounded-2xl flex flex-col items-center gap-2" style={{ borderColor: editorSettings.primaryColor, backgroundColor: `${editorSettings.primaryColor}05` }}>
                             <span className="material-icons-round text-brand-primary" style={{ color: editorSettings.primaryColor }}>credit_card</span>
                             <span className="text-[8px] font-black uppercase">Cartão</span>
                          </div>
                          <div className="p-6 border-2 border-slate-50 dark:border-zinc-800 rounded-2xl flex flex-col items-center gap-2 opacity-40">
                             <span className="material-icons-round text-slate-300">pix</span>
                             <span className="text-[8px] font-black uppercase">PIX</span>
                          </div>
                          <div className="p-6 border-2 border-slate-50 dark:border-zinc-800 rounded-2xl flex flex-col items-center gap-2 opacity-40">
                             <span className="material-icons-round text-slate-300">description</span>
                             <span className="text-[8px] font-black uppercase">Boleto</span>
                          </div>
                       </div>
                    </div>

                    <button 
                      className="w-full py-6 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl flex items-center justify-center gap-3"
                      style={{ backgroundColor: editorSettings.primaryColor, boxShadow: `0 20px 40px -10px ${editorSettings.primaryColor}40` }}
                    >
                       Pagar Agora <span className="material-icons-round text-sm">lock</span>
                    </button>
                    <p className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-widest">Pagamento 100% seguro e criptografado</p>
                 </div>

                 {/* Order Summary no Preview */}
                 <div className="w-full md:w-80 space-y-8">
                    <div className="bg-slate-50/50 dark:bg-zinc-800/30 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800">
                       <h3 className="font-bold text-sm mb-8">Resumo do Pedido</h3>
                       <div className="flex gap-4 mb-10">
                          <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center p-2">
                             <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=100" className="w-full h-full object-contain opacity-60" />
                          </div>
                          <div className="flex-1 min-w-0">
                             <h4 className="text-[11px] font-bold truncate">Headphone Wireless Pro</h4>
                             <p className="text-[9px] text-slate-400 font-medium">Qtd: 1 • Cor Space Gray</p>
                             <p className="text-[11px] font-black mt-1">R$ 149,00</p>
                          </div>
                       </div>
                       <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-zinc-700">
                          <div className="flex justify-between text-[10px]"><span className="text-slate-400">Subtotal</span><span className="font-bold">R$ 149,00</span></div>
                          <div className="flex justify-between text-[10px]"><span className="text-slate-400">Frete</span><span className="text-brand-success font-black uppercase">Grátis</span></div>
                          <div className="flex justify-between items-end pt-4">
                             <span className="text-sm font-black">Total</span>
                             <span className="text-xl font-black text-brand-primary" style={{ color: editorSettings.primaryColor }}>R$ 149,00</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Rodapé do Preview */}
              <footer className="p-10 border-t border-slate-50 dark:border-zinc-800 text-center">
                 <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.2em] leading-relaxed">
                    © 2023 YourStore Checkout • Powered by Universal White-Label
                 </p>
              </footer>
           </div>
        </main>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="p-8 space-y-12 max-w-[1400px] mx-auto w-full animate-toast pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-1">Integrações e APIs</h1>
          <p className="text-sm text-slate-500 font-medium">Gerencie seus gateways de pagamento e provedores de logística.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300">
                <span className="material-icons-round text-xl">search</span>
              </span>
              <input 
                className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20"
                placeholder="Buscar integração..."
              />
           </div>
           <button className="flex items-center gap-2 px-8 py-3.5 bg-brand-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all shrink-0">
             <span className="material-icons-round text-lg">add</span> Nova API
           </button>
        </div>
      </div>

      {/* Payment Gateways */}
      <section>
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-xl font-black tracking-tight">Gateways de Pagamento</h2>
           <button className="text-[10px] font-black uppercase text-brand-primary hover:underline">Ver todos</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Stripe', desc: 'Processamento global de pagamentos via cartão de crédito e Apple/Google Pay.', status: 'CONECTADO', statusColor: 'text-emerald-500 bg-emerald-50', env: 'AMBIENTE: PRODUÇÃO', icon: 'payments', iconColor: 'bg-blue-50 text-blue-600', action: 'Configurar' },
            { name: 'Asaas', desc: 'Especialista em automação de cobranças, boletos bancários e PIX para o Brasil.', status: 'CONECTADO', statusColor: 'text-emerald-500 bg-emerald-50', env: 'WEBHOOKS: ATIVOS', icon: 'account_balance_wallet', iconColor: 'bg-indigo-50 text-indigo-600', action: 'Configurar' },
            { name: 'Mercado Pago', desc: 'Pagamentos locais na América Latina com alta taxa de aprovação.', status: 'SETUP REQUIRED', statusColor: 'text-amber-500 bg-amber-50', env: 'INTEGRAÇÃO: V2', icon: 'account_balance', iconColor: 'bg-slate-50 text-slate-400', action: 'Instalar', isNew: true },
          ].map((gateway, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 rounded-[40px] border border-slate-100 dark:border-zinc-800 p-10 flex flex-col shadow-sm hover:shadow-xl transition-all group cursor-pointer">
              <div className="flex items-start justify-between mb-8">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${gateway.iconColor} shadow-sm group-hover:scale-110 transition-transform`}>
                    <span className="material-icons-round text-2xl">{gateway.icon}</span>
                 </div>
                 <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 ${gateway.statusColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${gateway.status === 'CONECTADO' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                    {gateway.status}
                 </span>
              </div>
              <h3 className="text-xl font-black mb-4 tracking-tight">{gateway.name}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10 line-clamp-2">{gateway.desc}</p>
              <div className="mt-auto pt-6 border-t border-slate-50 dark:border-zinc-800 flex items-center justify-between">
                 <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">{gateway.env}</span>
                 <button className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gateway.isNew ? 'bg-slate-900 text-white hover:bg-brand-primary' : 'text-brand-primary hover:bg-brand-primary/5'}`}>
                    {gateway.action}
                 </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shipping Carriers */}
      <section>
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-xl font-black tracking-tight">Transportadoras e Frete</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Correios (SIGEP)', desc: 'Integração oficial para cálculo de frete e emissão de etiquetas SEDEX/PAC.', status: 'CONECTADO', statusColor: 'text-emerald-500 bg-emerald-50', info: 'CONTRATO ATIVO', icon: 'local_shipping', iconColor: 'bg-amber-50 text-amber-600', action: 'Configurar' },
            { name: 'Melhor Envio', desc: 'Plataforma de cotação e intermediação de fretes com múltiplas transportadoras.', status: 'INATIVO', statusColor: 'text-slate-400 bg-slate-100', info: 'TOKEN EXPIRADO', icon: 'auto_awesome_motion', iconColor: 'bg-violet-50 text-violet-600', action: 'Reconectar' },
          ].map((shipping, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 rounded-[40px] border border-slate-100 dark:border-zinc-800 p-10 flex flex-col shadow-sm hover:shadow-xl transition-all group cursor-pointer">
              <div className="flex items-start justify-between mb-8">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${shipping.iconColor} shadow-sm group-hover:scale-110 transition-transform`}>
                    <span className="material-icons-round text-2xl">{shipping.icon}</span>
                 </div>
                 <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${shipping.statusColor}`}>
                    {shipping.status}
                 </span>
              </div>
              <h3 className="text-xl font-black mb-4 tracking-tight">{shipping.name}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10 line-clamp-2">{shipping.desc}</p>
              <div className="mt-auto pt-6 border-t border-slate-50 dark:border-zinc-800 flex items-center justify-between">
                 <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">{shipping.info}</span>
                 <button className="px-6 py-2.5 text-brand-primary hover:bg-brand-primary/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                    {shipping.action}
                 </button>
              </div>
            </div>
          ))}
          <div className="bg-slate-50/50 dark:bg-zinc-900/30 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-[40px] flex flex-col items-center justify-center p-10 min-h-[280px] group cursor-pointer hover:border-brand-primary transition-all">
             <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-3xl flex items-center justify-center text-slate-300 group-hover:text-brand-primary group-hover:scale-110 transition-all mb-6 shadow-sm">
                <span className="material-icons-round text-4xl">add</span>
             </div>
             <h3 className="font-black text-slate-900 dark:text-white mb-2">Adicionar Novo</h3>
             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">BUSCAR NO MARKETPLACE</p>
          </div>
        </div>
      </section>

      {/* Development Banner */}
      <div className="bg-[#0F111A] dark:bg-black rounded-[48px] p-10 md:p-16 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
         <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-black tracking-tight mb-4">Desenvolvimento & Webhooks</h2>
            <p className="text-zinc-400 font-medium text-lg leading-relaxed mb-10">
               Acesse sua chave secreta da API e configure os endpoints para receber notificações em tempo real do nosso checkout em seu servidor.
            </p>
            <div className="flex flex-wrap gap-4">
               <button className="px-10 py-5 bg-white text-slate-900 rounded-[20px] font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all">Ver Documentação</button>
               <button className="px-10 py-5 bg-white/10 border border-white/10 text-white rounded-[20px] font-black uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all">Gerenciar Chaves</button>
            </div>
         </div>
         
         <div className="w-full md:w-auto relative z-10">
            <div className="bg-[#1A1D2D] p-10 rounded-[40px] border border-white/5 min-w-[320px] shadow-inner">
               <div className="flex items-center justify-between mb-10">
                  <span className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">API Status</span>
                  <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase">
                     <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                     Healthy
                  </div>
               </div>
               <div className="space-y-4">
                  <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest ml-1">Public Key:</label>
                  <div className="flex bg-black/40 rounded-2xl p-4 border border-white/5 items-center justify-between">
                     <code className="text-xs font-mono text-zinc-400">pk_live_51Msz...S98h</code>
                     <button className="text-zinc-500 hover:text-white"><span className="material-icons-round text-lg">content_copy</span></button>
                  </div>
               </div>
            </div>
         </div>

         {/* Decorative elements */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>
      </div>
    </div>
  );

  const renderCouponManagement = () => (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto w-full animate-toast flex flex-col lg:flex-row gap-10 pb-20">
      {/* Main Content Area */}
      <div className="flex-1 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Gerenciamento de Cupons</h1>
            <span className="bg-slate-100 dark:bg-zinc-800 text-slate-400 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">12 cupons ativos</span>
          </div>
          <button className="flex lg:hidden items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-brand-primary/20">
            <span className="material-icons-round text-lg">add</span> Novo Cupom
          </button>
        </div>

        {/* Search & Global Filter */}
        <div className="flex flex-col md:flex-row gap-4">
           <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300">
                <span className="material-icons-round text-xl">search</span>
              </span>
              <input 
                className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20"
                placeholder="Buscar por código do cupom..."
              />
           </div>
           <select className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl px-6 py-3.5 text-xs font-bold text-slate-500 focus:ring-0">
              <option>Todos os tipos</option>
              <option>Porcentagem</option>
              <option>Valor Fixo</option>
           </select>
        </div>

        {/* Coupon Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden">
           <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[700px]">
                 <thead>
                    <tr className="bg-slate-50/50 dark:bg-zinc-800/20 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                       <th className="px-10 py-6">Código</th>
                       <th className="px-10 py-6">Desconto</th>
                       <th className="px-10 py-6">Uso / Limite</th>
                       <th className="px-10 py-6">Expiração</th>
                       <th className="px-10 py-6">Status</th>
                       <th className="px-6 py-6"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 dark:divide-zinc-800/50">
                    {[
                      { code: 'BLACKFRIDAY20', disc: '20% OFF', usage: 45, limit: 100, exp: '25 Nov, 2024', status: 'ATIVO', statusColor: 'bg-emerald-50 text-emerald-600' },
                      { code: 'BENVINDO50', disc: 'R$ 50,00', usage: 556, limit: null, exp: 'Sem expiração', status: 'ATIVO', statusColor: 'bg-emerald-50 text-emerald-600' },
                      { code: 'EXPIRED10', disc: '10% OFF', usage: 50, limit: 50, exp: '01 Jan, 2024', status: 'INATIVO', statusColor: 'bg-slate-100 text-slate-400', opacity: 'opacity-50' },
                      { code: 'PROMO_NATAL_{{I}}', disc: '15% OFF', usage: 0, limit: 200, exp: '25 Dez, 2024', status: 'ATIVO', statusColor: 'bg-emerald-50 text-emerald-600' },
                    ].map((cup, i) => (
                      <tr key={i} className={`hover:bg-slate-50/30 dark:hover:bg-zinc-800/10 transition-colors ${cup.opacity || ''}`}>
                         <td className="px-10 py-8">
                            <span className="bg-brand-primary/5 text-brand-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">{cup.code}</span>
                         </td>
                         <td className="px-10 py-8">
                            <span className="font-black text-slate-900 dark:text-white">{cup.disc}</span>
                         </td>
                         <td className="px-10 py-8 min-w-[180px]">
                            <div className="space-y-2">
                               <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                                  <span>{cup.usage}/{cup.limit || '--'}</span>
                                  {cup.limit && <span>{Math.round((cup.usage/cup.limit)*100)}%</span>}
                               </div>
                               <div className="h-1.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                  <div className={`h-full ${cup.status === 'ATIVO' ? 'bg-brand-primary' : 'bg-slate-300'}`} style={{ width: cup.limit ? `${(cup.usage/cup.limit)*100}%` : '40%' }}></div>
                                </div>
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{cup.exp}</span>
                         </td>
                         <td className="px-10 py-8">
                            <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${cup.statusColor}`}>
                               {cup.status}
                            </span>
                         </td>
                         <td className="px-6 py-8">
                            <button className="text-slate-300 hover:text-brand-primary transition-colors">
                               <span className="material-icons-round">more_vert</span>
                            </button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>

      {/* Side Creation Form */}
      <aside className="w-full lg:w-[420px] shrink-0 animate-toast">
         <div className="bg-white dark:bg-zinc-900 rounded-[48px] border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-10 border-b border-slate-50 dark:border-zinc-800">
               <h2 className="text-2xl font-black tracking-tight mb-2">Criar Novo Cupom</h2>
               <p className="text-sm text-slate-400 font-medium">Configure as regras do seu desconto</p>
            </div>
            
            <div className="p-10 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Código do Cupom</label>
                  <input className="w-full bg-[#F8F9FD] dark:bg-zinc-800/50 border-none rounded-2xl p-5 text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-brand-primary/20" placeholder="EX: VERAO2024" />
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Tipo de Desconto</label>
                  <div className="grid grid-cols-2 gap-4">
                     <button 
                       onClick={() => setDiscountType('percent')}
                       className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${discountType === 'percent' ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' : 'border-slate-100 dark:border-zinc-800 text-slate-300'}`}
                     >
                        <span className="material-icons-round text-2xl">percent</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">Porcentagem</span>
                     </button>
                     <button 
                       onClick={() => setDiscountType('fixed')}
                       className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${discountType === 'fixed' ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' : 'border-slate-100 dark:border-zinc-800 text-slate-300'}`}
                     >
                        <span className="material-icons-round text-2xl">payments</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">Valor Fixo</span>
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Valor</label>
                     <div className="relative">
                        <input className="w-full bg-[#F8F9FD] dark:bg-zinc-800/50 border-none rounded-2xl p-5 pr-10 text-sm font-bold text-center" placeholder="0.00" />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 font-bold">{discountType === 'percent' ? '%' : 'R$'}</span>
                     </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Uso Máximo</label>
                     <input className="w-full bg-[#F8F9FD] dark:bg-zinc-800/50 border-none rounded-2xl p-5 text-sm font-bold text-center" placeholder="∞" />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Data de Expiração</label>
                  <div className="relative">
                     <input type="date" className="w-full bg-[#F8F9FD] dark:bg-zinc-800/50 border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 appearance-none" />
                     <span className="absolute right-5 top-1/2 -translate-y-1/2 material-icons-round text-slate-300 pointer-events-none">calendar_today</span>
                  </div>
               </div>

               <div className="space-y-4 pt-4">
                  <label className="flex items-center gap-4 cursor-pointer group">
                     <div className="w-6 h-6 rounded-lg bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                        <span className="material-icons-round text-white text-sm">check</span>
                     </div>
                     <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase leading-relaxed tracking-tight group-hover:text-brand-primary transition-colors">Aplicar apenas em produtos selecionados</span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer group opacity-40 hover:opacity-100 transition-opacity">
                     <div className="w-6 h-6 rounded-lg border-2 border-slate-200 bg-white dark:bg-zinc-800"></div>
                     <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase leading-relaxed tracking-tight">Acumulativo com outras promoções</span>
                  </label>
               </div>
            </div>

            <div className="p-10 bg-slate-50/50 dark:bg-zinc-950/20 border-t border-slate-50 dark:border-zinc-800">
               <button className="w-full py-6 bg-brand-primary text-white rounded-[32px] font-black uppercase tracking-[0.25em] text-[10px] shadow-2xl shadow-brand-primary/40 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Gerar Cupom <span className="material-icons-round text-lg">auto_fix_high</span>
               </button>
            </div>
         </div>
      </aside>
    </div>
  );

  const renderCategoryManagement = () => (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto w-full animate-toast flex flex-col lg:flex-row gap-12 pb-20">
      {/* Main Column */}
      <div className="flex-1 space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-1">Gestão de Categorias</h1>
            <p className="text-sm text-slate-500 font-medium">Organize a hierarquia de produtos do seu checkout.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Expandir Tudo</button>
            <button className="flex items-center gap-2 px-8 py-3.5 bg-brand-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
               <span className="material-icons-round text-lg">add</span> Nova Categoria
            </button>
          </div>
        </div>

        {/* Filters bar */}
        <div className="flex items-center gap-6">
           <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300">
                <span className="material-icons-round text-xl">search</span>
              </span>
              <input 
                className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20"
                placeholder="Buscar categorias ou sub-categorias..."
              />
           </div>
           <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase text-slate-400">Status:</span>
              <select className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs font-bold focus:ring-0">
                 <option>Todos</option>
                 <option>Ativos</option>
                 <option>Ocultos</option>
              </select>
           </div>
        </div>

        {/* Categories List */}
        <div className="space-y-4">
          {[
            { id: 'tech', name: 'Eletrônicos & Tech', subs: 12, prods: 145, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=100', expanded: true },
            { id: 'moda', name: 'Moda & Vestuário', subs: 8, prods: 312, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100' },
            { id: 'casa', name: 'Casa & Decoração', subs: 5, prods: 89, icon: 'home' }
          ].map((cat) => (
            <div key={cat.id} className="space-y-4">
               {/* Main Category Card */}
               <div className={`bg-white dark:bg-zinc-900 rounded-[32px] border transition-all ${expandedCategories.includes(cat.id) ? 'border-brand-primary/30 shadow-xl shadow-brand-primary/5' : 'border-slate-100 dark:border-zinc-800 shadow-sm'}`}>
                  <div className="p-6 md:p-8 flex items-center justify-between">
                     <div className="flex items-center gap-6">
                        <button onClick={() => toggleCategory(cat.id)} className={`w-8 h-8 flex items-center justify-center text-slate-300 hover:text-brand-primary transition-all ${expandedCategories.includes(cat.id) ? 'rotate-0' : '-rotate-90'}`}>
                           <span className="material-icons-round">expand_more</span>
                        </button>
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-zinc-900 overflow-hidden flex items-center justify-center border border-slate-100 dark:border-zinc-700">
                           {cat.img ? <img src={cat.img} className="w-full h-full object-cover" /> : <span className="material-icons-round text-3xl text-slate-400">{cat.icon}</span>}
                        </div>
                        <div>
                           <h3 className="font-black text-xl text-slate-900 dark:text-white leading-tight mb-1">{cat.name}</h3>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat.subs} SUB-CATEGORIAS • {cat.prods} PRODUTOS</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                           <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">VISIBILIDADE</span>
                           <button className="w-12 h-6 bg-brand-success rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></button>
                        </div>
                        <div className="h-10 w-px bg-slate-100 dark:bg-zinc-800"></div>
                        <div className="flex gap-2">
                           <button className="w-10 h-10 rounded-xl text-slate-300 hover:text-brand-primary transition-colors flex items-center justify-center"><span className="material-icons-round">edit</span></button>
                           <button className="w-10 h-10 rounded-xl text-slate-300 hover:text-red-500 transition-colors flex items-center justify-center"><span className="material-icons-round">delete_outline</span></button>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Expanded Sub-categories */}
               {expandedCategories.includes(cat.id) && (
                 <div className="pl-24 space-y-3 animate-toast">
                    <div className="bg-white dark:bg-zinc-900 rounded-[28px] border border-slate-50 dark:border-zinc-800 p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-all group">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-zinc-800 flex items-center justify-center"><span className="material-icons-round text-orange-400">smartphone</span></div>
                          <div>
                             <h4 className="font-bold text-slate-900 dark:text-white text-base">Smartphones</h4>
                             <p className="text-xs text-slate-400 font-medium">42 Produtos</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <span className="bg-brand-success/10 text-brand-success px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">ATIVO</span>
                          <button className="w-10 h-10 text-slate-300 hover:text-brand-primary transition-colors"><span className="material-icons-round">more_vert</span></button>
                       </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-[28px] border border-slate-50 dark:border-zinc-800 p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-all group">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center"><span className="material-icons-round text-slate-400">laptop</span></div>
                          <div>
                             <h4 className="font-bold text-slate-900 dark:text-white text-base">Laptops & Notebooks</h4>
                             <p className="text-xs text-slate-400 font-medium">28 Produtos</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <span className="bg-slate-100 text-slate-400 px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">OCULTO</span>
                          <button className="w-10 h-10 text-slate-300 hover:text-brand-primary transition-colors"><span className="material-icons-round">more_vert</span></button>
                       </div>
                    </div>

                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline ml-6 py-4">
                       <span className="material-icons-round text-base">add</span> Adicionar Sub-categoria
                    </button>
                 </div>
               )}
            </div>
          ))}
        </div>

        {/* Drag & Drop Hint */}
        <div className="bg-slate-50/50 dark:bg-zinc-900/50 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-[48px] p-20 flex flex-col items-center justify-center text-center group">
           <div className="w-20 h-20 bg-white dark:bg-zinc-800 rounded-3xl flex items-center justify-center text-slate-200 shadow-inner group-hover:scale-110 transition-transform mb-8">
              <span className="material-icons-round text-5xl">account_tree</span>
           </div>
           <h3 className="text-2xl font-black tracking-tight mb-2">Estrutura de Menu</h3>
           <p className="text-slate-400 font-medium max-w-sm">Você pode arrastar as categorias para reordenar a exibição no checkout do cliente.</p>
        </div>
      </div>

      {/* Right Sidebar - Summary */}
      <aside className="w-full lg:w-80 space-y-10 shrink-0">
         <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm">
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-10">RESUMO GERAL</h4>
            <div className="space-y-10">
               <div className="bg-brand-primary/5 p-6 rounded-[32px] border border-brand-primary/5">
                  <div className="flex justify-between items-start mb-2">
                     <span className="text-[10px] font-black uppercase text-brand-primary tracking-widest">TOTAL CATEGORIAS</span>
                     <span className="material-icons-round text-brand-primary text-lg">category</span>
                  </div>
                  <p className="text-4xl font-black text-brand-primary">24</p>
               </div>
               <div className="p-6 rounded-[32px] border border-slate-100 dark:border-zinc-800">
                  <div className="flex justify-between items-start mb-2">
                     <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">PRODUTOS LISTADOS</span>
                     <span className="material-icons-round text-slate-300 text-lg">inventory_2</span>
                  </div>
                  <p className="text-4xl font-black text-slate-900 dark:text-white leading-none">1,482</p>
               </div>
            </div>
         </div>

         <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">AÇÕES RÁPIDAS</h4>
            <div className="space-y-3">
               {[
                 { label: 'Importar Categorias (.csv)', icon: 'file_upload' },
                 { label: 'Exportar Estrutura', icon: 'file_download' },
                 { label: 'Ocultar Vazias', icon: 'visibility_off' },
               ].map((action, i) => (
                 <button key={i} className="w-full flex items-center gap-4 px-6 py-4 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-[24px] text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm">
                    <span className="material-icons-round text-lg text-slate-400">{action.icon}</span>
                    {action.label}
                 </button>
               ))}
            </div>
         </div>

         <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 p-8 rounded-[40px] flex gap-4 animate-pulse">
            <span className="material-icons-round text-amber-500">warning_amber</span>
            <div>
               <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Sincronização Ativa</h5>
               <p className="text-[10px] text-amber-700/80 font-medium leading-relaxed uppercase">Alterações na hierarquia refletem instantaneamente no storefront.</p>
            </div>
         </div>

         <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">ATIVIDADES RECENTES</h4>
            <div className="space-y-6 pl-4 border-l-2 border-slate-100 dark:border-zinc-800">
               <div className="relative">
                  <div className="absolute -left-5 top-0 w-2.5 h-2.5 bg-brand-primary rounded-full ring-4 ring-white dark:ring-zinc-950"></div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Categoria 'Smartphones' editada</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-widest">Há 5 minutos por Alex</p>
               </div>
               <div className="relative">
                  <div className="absolute -left-5 top-0 w-2.5 h-2.5 bg-slate-200 dark:bg-zinc-800 rounded-full ring-4 ring-white dark:ring-zinc-950"></div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Nova sub-categoria 'Áudio'</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-widest">Ontem às 14:20</p>
               </div>
            </div>
         </div>
      </aside>
    </div>
  );

  const renderProductCatalog = () => (
    <div className="p-8 space-y-8 max-w-[1400px] mx-auto w-full animate-toast pb-20">
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-1">Catálogo de Produtos</h1>
          <p className="text-sm text-slate-500 font-medium">Gerencie seu inventário e precificação de checkout.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300">
                <span className="material-icons-round text-xl">search</span>
              </span>
              <input 
                className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20"
                placeholder="Buscar produtos..."
              />
           </div>
           <button className="flex items-center gap-2 px-8 py-3.5 bg-brand-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all shrink-0">
             <span className="material-icons-round text-lg">add</span> Adicionar Produto
           </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-slate-100 dark:border-zinc-900 pb-8">
         <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-primary transition-all">
               <span className="material-icons-round text-lg">filter_list</span> Filtros
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-primary transition-all">
               <span className="material-icons-round text-lg">sort</span> Ordenar por
            </button>
         </div>
         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Exibindo <span className="text-slate-900 dark:text-white">48 de 124</span> produtos</p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { category: 'ELETRÔNICOS', name: 'Smartwatch Pro Series 5...', price: 'R$ 1.249,00', stock: '42 un', status: 'ATIVO', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400', statusColor: 'bg-emerald-50 text-emerald-600' },
          { category: 'ACESSÓRIOS', name: 'Mochila Nomad Tech 20L', price: 'R$ 389,90', stock: '8 un', status: 'ATIVO', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400', statusColor: 'bg-emerald-50 text-emerald-600' },
          { category: 'LIFESTYLE', name: 'Kit Essential Minimalist', price: 'R$ 159,00', stock: '0 un', status: 'RASCUNHO', statusColor: 'bg-slate-100 text-slate-400' },
          { category: 'CATEGORIA', name: 'Nome do Produto em...', price: 'R$ 0,00', stock: '--', status: 'ATIVO', statusColor: 'bg-emerald-50 text-emerald-600' },
        ].map((prod, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all cursor-pointer">
             <div className="aspect-square bg-slate-50 dark:bg-zinc-800 flex items-center justify-center relative p-10 overflow-hidden shrink-0">
                {prod.img ? (
                  <img src={prod.img} className="max-w-full max-h-full object-contain mix-blend-multiply opacity-90 group-hover:scale-110 transition-transform duration-700" alt="" />
                ) : (
                  <span className="material-icons-round text-slate-200 text-6xl">image</span>
                )}
                <span className={`absolute top-6 right-6 px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${prod.statusColor}`}>
                  {prod.status}
                </span>
             </div>
             <div className="p-8 flex flex-col flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{prod.category}</p>
                <h3 className="font-black text-slate-900 dark:text-white text-lg tracking-tight mb-8 line-clamp-1">{prod.name}</h3>
                <div className="mt-auto pt-6 border-t border-slate-50 dark:border-zinc-800 flex justify-between items-end">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Preço</p>
                      <p className="font-black text-brand-primary text-lg leading-none">{prod.price}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Estoque</p>
                      <p className="font-bold text-slate-900 dark:text-white text-sm leading-none">{prod.stock}</p>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 pt-12">
         <button className="w-12 h-12 rounded-2xl border border-slate-100 dark:border-zinc-800 text-slate-300 hover:text-brand-primary transition-all flex items-center justify-center">
           <span className="material-icons-round">chevron_left</span>
         </button>
         <button className="w-12 h-12 rounded-2xl bg-brand-primary text-white font-black shadow-lg shadow-brand-primary/20">1</button>
         <button className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 text-slate-400 font-bold hover:border-brand-primary/20 transition-all">2</button>
         <button className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 text-slate-400 font-bold hover:border-brand-primary/20 transition-all">3</button>
         <span className="px-2 text-slate-300">...</span>
         <button className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 text-slate-400 font-bold hover:border-brand-primary/20 transition-all">12</button>
         <button className="w-12 h-12 rounded-2xl border border-slate-100 dark:border-zinc-800 text-slate-300 hover:text-brand-primary transition-all flex items-center justify-center">
           <span className="material-icons-round">chevron_right</span>
         </button>
      </div>
    </div>
  );

  const renderOrdersManagement = () => (
    <div className="p-8 space-y-8 max-w-[1400px] mx-auto w-full animate-toast">
      {/* Header Gestão */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-1">Gestão de Pedidos</h1>
          <p className="text-sm text-slate-500 font-medium">Visualize e gerencie as vendas recentes do seu checkout.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all">
            <span className="material-icons-round text-lg">ios_share</span> Exportar
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
            <span className="material-icons-round text-lg">add</span> Novo Pedido
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Hoje', value: 'R$ 12.450,00', trend: '+12.5%', trendType: 'up' },
          { label: 'Pedidos Ativos', value: '84', sub: 'Meta: 100' },
          { label: 'Taxa de Conversão', value: '3.2%', trend: '-0.4%', trendType: 'down' },
          { label: 'Ticket Médio', value: 'R$ 148,20', trend: '+2.1%', trendType: 'up' }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white dark:bg-zinc-900 p-8 rounded-[32px] border border-slate-100 dark:border-zinc-800 shadow-sm">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{kpi.value}</h3>
                {kpi.sub && <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{kpi.sub}</p>}
              </div>
              {kpi.trend && (
                <div className={`flex items-center gap-1 text-[10px] font-black ${kpi.trendType === 'up' ? 'text-brand-success' : 'text-brand-error'}`}>
                   {kpi.trend} <span className="material-icons-round text-sm">{kpi.trendType === 'up' ? 'trending_up' : 'trending_down'}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Container */}
      <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        {/* Filters Bar */}
        <div className="p-6 md:p-8 border-b border-slate-50 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300">
              <span className="material-icons-round text-xl">search</span>
            </span>
            <input 
              className="w-full bg-[#F8F9FD] dark:bg-zinc-800/50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20"
              placeholder="Filtrar por nome, email ou ID do pedido..."
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative flex-1 md:flex-none">
                <select className="appearance-none w-full md:w-56 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-4 pl-6 pr-12 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-brand-primary/20 cursor-pointer">
                   <option>Todos os Status</option>
                   <option>Pago</option>
                   <option>Pendente</option>
                   <option>Cancelado</option>
                </select>
                <span className="absolute right-5 top-1/2 -translate-y-1/2 material-icons-round text-slate-300 pointer-events-none">expand_more</span>
             </div>
             <button className="w-14 h-14 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-brand-primary transition-all">
                <span className="material-icons-round">tune</span>
             </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-zinc-800/20 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <th className="px-8 py-6">ID Pedido</th>
                <th className="px-8 py-6">Cliente</th>
                <th className="px-8 py-6">Data</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Total</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-zinc-800/50">
              {[
                { id: '#ORD-9982', customer: 'Marcus Thompson', email: 'm.thompson@example.com', date: 'Hoje, 14:20', status: 'PAGO', total: 'R$ 459,90', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' },
                { id: '#ORD-9981', customer: 'Sarah Jenkins', email: 's.jenkins@domain.com', date: 'Hoje, 12:45', status: 'PENDENTE', total: 'R$ 120,00', initials: 'SJ' },
                { id: '#ORD-9980', customer: 'David Chen', email: 'd.chen@web.com', date: 'Hoje, 10:12', status: 'PAGO', total: 'R$ 2.450,00', initials: 'DC' },
                { id: '#ORD-9979', customer: 'Maria Lopes', email: 'maria.l@email.com', date: 'Ontem, 23:55', status: 'CANCELADO', total: 'R$ 89,90', initials: 'ML' },
                { id: '#ORD-9978', customer: 'João Pedro', email: 'jp@provider.com', date: 'Ontem, 22:10', status: 'PAGO', total: 'R$ 315,40', initials: 'JP' },
              ].map((order, i) => (
                <tr key={i} className="hover:bg-slate-50/30 dark:hover:bg-zinc-800/10 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="font-black text-brand-primary text-sm tracking-tight">{order.id}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-zinc-700">
                          {order.img ? (
                            <img src={order.img} className="w-full h-full object-cover" alt={order.customer} />
                          ) : (
                            <span className="text-[10px] font-black text-slate-400">{order.initials}</span>
                          )}
                       </div>
                       <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm leading-none mb-1">{order.customer}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{order.email}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{order.date}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      order.status === 'PAGO' ? 'bg-brand-success/10 text-brand-success' : 
                      order.status === 'PENDENTE' ? 'bg-brand-pending/10 text-brand-pending' : 
                      'bg-brand-error/10 text-brand-error'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-black text-slate-900 dark:text-white text-sm">{order.total}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-300 hover:text-brand-primary hover:bg-white dark:hover:bg-zinc-800 transition-all shadow-none hover:shadow-sm">
                      <span className="material-icons-round">more_horiz</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-8 border-t border-slate-50 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-400 font-medium">Mostrando <span className="font-black text-slate-900 dark:text-white">1-12</span> de <span className="font-black text-slate-900 dark:text-white">245</span> pedidos</p>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-brand-primary transition-colors">
              <span className="material-icons-round">chevron_left</span>
            </button>
            <button className="w-10 h-10 rounded-xl bg-brand-primary text-white font-black text-xs shadow-lg shadow-brand-primary/20">1</button>
            <button className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 text-slate-500 font-bold text-xs hover:border-brand-primary/20 transition-all">2</button>
            <button className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 text-slate-500 font-bold text-xs hover:border-brand-primary/20 transition-all">3</button>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-brand-primary transition-colors">
              <span className="material-icons-round">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderShippingLabels = () => (
    <div className="p-8 space-y-8 max-w-[1400px] mx-auto w-full animate-toast">
      {/* Labels Header Actions */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
           <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedOrders.length === 4 ? 'bg-brand-primary border-brand-primary' : 'border-slate-200'}`}>
                 {selectedOrders.length === 4 && <span className="material-icons-round text-white text-sm font-black">check</span>}
              </div>
              <input type="checkbox" className="hidden" onChange={() => setSelectedOrders(selectedOrders.length === 4 ? [] : ['#8829', '#8830', '#8831', '#8832'])} checked={selectedOrders.length === 4} />
              <span className="text-xs font-black uppercase text-slate-500 group-hover:text-brand-primary transition-colors">Selecionar Todos</span>
           </label>
           <div className="h-10 w-px bg-slate-100 dark:bg-zinc-800"></div>
           <p className="text-xs font-bold text-slate-900 dark:text-white"><span className="text-brand-primary font-black">12</span> pedidos prontos para envio</p>
        </div>

        <div className="flex items-center gap-4">
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2">Gerar Etiquetas:</span>
           <button className="bg-[#FFCD00] hover:scale-105 active:scale-95 transition-all text-slate-900 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-yellow-400/20">
              <span className="material-icons-round text-lg">local_post_office</span> Correios
           </button>
           <button className="bg-[#F60] hover:scale-105 active:scale-95 transition-all text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-orange-600/20">
              <span className="material-icons-round text-lg">local_shipping</span> Jadlog
           </button>
           <button className="bg-[#00D781] hover:scale-105 active:scale-95 transition-all text-slate-900 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-500/20">
              <span className="material-icons-round text-lg">bolt</span> Loggi
           </button>
        </div>
      </div>

      {/* Grid of Shipping Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { id: '#8829', status: 'AGUARDANDO COLETA', total: 'R$ 1.240,00', method: 'Cartão de Crédito', date: '12 Out 2023, 10:12', customer: 'Marcus Thompson', location: 'London, United Kingdom', phone: '+44 20 7123 4567', items: '3 Itens', weight: '1,2 kg', suggestion: { carrier: 'LOGGI', price: 'R$ 14,90', color: 'bg-emerald-50 text-emerald-600' }, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' },
          { id: '#8830', status: 'AGUARDANDO COLETA', total: 'R$ 459,90', method: 'Pix', date: '12 Out 2023, 11:45', customer: 'Sarah Jenkins', location: 'São Paulo, Brasil', phone: '(11) 98577-5655', items: '1 Item', weight: '0,5 kg', suggestion: { carrier: 'CORREIOS', price: 'R$ 22,10', color: 'bg-yellow-50 text-yellow-700' }, initials: 'SJ' },
          { id: '#8831', status: 'AGUARDANDO COLETA', total: 'R$ 89,00', method: 'Cartão de Crédito', date: '12 Out 2023, 12:05', customer: 'David Chen', location: 'Vancouver, Canada', phone: '+1 604 555 0123', items: '2 Itens', weight: '0,8 kg', suggestion: { carrier: 'JADLOG', price: 'R$ 18,30', color: 'bg-orange-50 text-orange-600' }, initials: 'DC' },
          { id: '#8832', status: 'AGUARDANDO COLETA', total: 'R$ 2.100,00', method: 'Pix', date: '12 Out 2023, 14:30', customer: 'Ana Beatriz Santos', location: 'Rio de Janeiro, Brasil', phone: '(21) 97766-5544', items: '5 Itens', weight: '3,5 kg', suggestion: { carrier: 'LOGGI', price: 'R$ 28,50', color: 'bg-emerald-50 text-emerald-600' }, initials: 'AS' },
        ].map((order, i) => (
          <div key={i} className={`bg-white dark:bg-zinc-900 rounded-[40px] border p-8 shadow-sm transition-all hover:shadow-xl relative overflow-hidden group ${selectedOrders.includes(order.id) ? 'border-brand-primary ring-4 ring-brand-primary/5' : 'border-slate-100 dark:border-zinc-800'}`}>
             <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                   <div 
                     onClick={() => toggleOrderSelection(order.id)}
                     className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${selectedOrders.includes(order.id) ? 'bg-brand-primary border-brand-primary' : 'border-slate-200'}`}
                   >
                      {selectedOrders.includes(order.id) && <span className="material-icons-round text-white text-sm font-black">check</span>}
                   </div>
                   <div>
                      <div className="flex items-center gap-3">
                         <h3 className="font-black text-lg text-slate-900 dark:text-white leading-none">Pedido {order.id}</h3>
                         <span className="bg-brand-primary/5 text-brand-primary px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">{order.status}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Processado em: {order.date}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="font-black text-lg text-slate-900 dark:text-white leading-none">{order.total}</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{order.method}</p>
                </div>
             </div>

             <div className="flex items-center gap-6 mb-8 p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-3xl">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-200 dark:bg-zinc-700 flex items-center justify-center shrink-0 shadow-sm">
                   {order.img ? (
                     <img src={order.img} className="w-full h-full object-cover" alt={order.customer} />
                   ) : (
                     <span className="material-icons-round text-slate-400 text-3xl">person</span>
                   )}
                </div>
                <div className="min-w-0 flex-1">
                   <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1 truncate">{order.customer}</h4>
                   <p className="text-[10px] text-slate-400 font-medium truncate mb-1">{order.location} • {order.phone}</p>
                </div>
             </div>

             <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-zinc-800">
                <div className="flex items-center gap-8">
                   <div className="flex items-center gap-2 text-slate-400">
                      <span className="material-icons-round text-xl">inventory_2</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{order.items}</span>
                   </div>
                   <div className="flex items-center gap-2 text-slate-400">
                      <span className="material-icons-round text-xl">monitor_weight</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{order.weight}</span>
                   </div>
                </div>
                <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border border-transparent transition-all group-hover:border-current ${order.suggestion.color}`}>
                   <span className="text-[9px] font-black uppercase tracking-widest opacity-60">SUGESTÃO:</span>
                   <span className="text-[10px] font-black uppercase tracking-widest">{order.suggestion.carrier} - {order.suggestion.price}</span>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFeedbackAnalytics = () => (
    <div className="p-8 space-y-8 max-w-[1400px] mx-auto w-full animate-toast">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-1">Feedback & NPS Analytics</h1>
          <p className="text-sm text-slate-500 font-medium">Monitor store satisfaction and customer reviews</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select className="appearance-none bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-6 py-3 pr-12 text-xs font-bold text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-brand-primary/20 cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Yesterday</option>
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 material-icons-round text-slate-400 pointer-events-none">calendar_today</span>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
             <span className="material-icons-round text-lg">file_download</span> Export Report
          </button>
        </div>
      </div>

      {/* Primary Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* NPS Card */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[32px] border border-slate-100 dark:border-zinc-800 shadow-sm relative overflow-hidden">
           <div className="flex justify-between items-start mb-6">
             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Net Promoter Score</p>
             <span className="bg-brand-success/10 text-brand-success px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">+4.2% vs prev. month</span>
           </div>
           <div className="flex items-end gap-4 mb-8">
              <h3 className="text-7xl font-black text-brand-primary tracking-tighter leading-none">72</h3>
              <div className="flex-1 h-3 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                 <div className="h-full bg-brand-error" style={{ width: '12%' }}></div>
                 <div className="h-full bg-brand-pending" style={{ width: '4%' }}></div>
                 <div className="h-full bg-brand-success" style={{ width: '84%' }}></div>
              </div>
           </div>
           <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
              <span className="text-brand-error">Detractors (12%)</span>
              <span className="text-brand-success">Promoters (84%)</span>
           </div>
        </div>

        {/* Response Rate Card */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[32px] border border-slate-100 dark:border-zinc-800 shadow-sm">
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">Response Rate</p>
           <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">24.8%</h3>
           <div className="w-full h-3 bg-slate-100 dark:bg-zinc-800 rounded-full mb-4 overflow-hidden">
              <div className="h-full bg-brand-primary" style={{ width: '24.8%' }}></div>
           </div>
           <p className="text-xs font-bold text-slate-400">1,240 of 5,000 customers responded</p>
        </div>

        {/* Avg Rating Card */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[32px] border border-slate-100 dark:border-zinc-800 shadow-sm">
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">Avg. Star Rating</p>
           <div className="flex items-center gap-4 mb-4">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">4.8</h3>
              <div className="flex gap-1 text-brand-pending">
                 {[1,2,3,4].map(i => <span key={i} className="material-icons-round">star</span>)}
                 <span className="material-icons-round">star_half</span>
              </div>
           </div>
           <div className="flex items-end gap-1.5 h-12 mb-4">
              {[0.4, 0.6, 0.5, 0.8, 0.9, 0.7, 0.85].map((h, i) => (
                <div key={i} className={`flex-1 rounded-t-md ${i === 4 ? 'bg-brand-primary' : 'bg-brand-primary/20'}`} style={{ height: `${h * 100}%` }}></div>
              ))}
           </div>
           <p className="text-xs font-bold text-slate-400">Trend based on 432 reviews</p>
        </div>
      </div>

      {/* Detailed Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-10 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-12">
             <h3 className="font-black text-xl tracking-tight">NPS Trend Over Time</h3>
             <div className="flex gap-6">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-brand-primary rounded-full"></div><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current</span></div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-slate-200 dark:bg-zinc-800 rounded-full"></div><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Previous</span></div>
             </div>
          </div>
          <div className="h-64 flex items-end gap-8 md:gap-12 px-4 relative">
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                {[1,2,3,4].map(i => <div key={i} className="w-full border-t border-slate-400"></div>)}
             </div>
             {[
               { day: 'Mon', curr: 0.6, prev: 0.4 },
               { day: 'Tue', curr: 0.5, prev: 0.3 },
               { day: 'Wed', curr: 0.7, prev: 0.5 },
               { day: 'Thu', curr: 0.3, prev: 0.45 },
               { day: 'Fri', curr: 0.8, prev: 0.6 },
               { day: 'Sat', curr: 0.1, prev: 0.2 },
               { day: 'Sun', curr: 0.4, prev: 0.55 }
             ].map((data, idx) => (
               <div key={idx} className="flex-1 flex flex-col items-center gap-3 group">
                  <div className="w-full flex items-end gap-1.5 h-full relative">
                     <div className="flex-1 bg-slate-100 dark:bg-zinc-800 rounded-t-xl transition-all group-hover:bg-slate-200" style={{ height: `${data.prev * 100}%` }}></div>
                     <div className="flex-1 bg-brand-primary rounded-t-xl transition-all group-hover:scale-y-105" style={{ height: `${data.curr * 100}%` }}></div>
                     {idx === 2 && (
                       <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 px-4 py-2 rounded-xl shadow-xl border border-slate-100 dark:border-zinc-700 text-[10px] font-black text-brand-primary animate-bounce">
                          +15%
                       </div>
                     )}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase">{data.day}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Sentiment Keywords */}
        <div className="bg-white dark:bg-zinc-900 p-10 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col">
           <h3 className="font-black text-xl tracking-tight mb-10">Top Mentioned Keywords</h3>
           <div className="space-y-8 flex-1">
              {[
                { label: 'Checkout Speed', sentiment: 'Positive', color: 'bg-brand-success', width: '92%' },
                { label: 'Mobile Layout', sentiment: 'Positive', color: 'bg-brand-success', width: '88%' },
                { label: 'Payment Security', sentiment: 'Neutral', color: 'bg-brand-pending', width: '45%' },
                { label: 'Shipping Costs', sentiment: 'Negative', color: 'bg-brand-error', width: '15%' }
              ].map((kw, i) => (
                <div key={i} className="space-y-3">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-900 dark:text-white">{kw.label}</span>
                      <span className={kw.sentiment === 'Positive' ? 'text-brand-success' : kw.sentiment === 'Neutral' ? 'text-brand-pending' : 'text-brand-error'}>{kw.sentiment}</span>
                   </div>
                   <div className="h-2 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className={`h-full ${kw.color}`} style={{ width: kw.width }}></div>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-10 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-brand-primary transition-all">View All Sentiment Data</button>
        </div>
      </div>

      {/* Reviews Table/List */}
      <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-8 md:p-10 border-b border-slate-50 dark:border-zinc-800 flex items-center justify-between">
           <h3 className="font-black text-xl tracking-tight">Recent Customer Reviews</h3>
           <div className="relative">
              <select className="appearance-none bg-slate-50 dark:bg-zinc-800 border-none rounded-xl px-6 py-3 pr-12 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-brand-primary/20">
                 <option>All Ratings</option>
                 <option>5 Stars Only</option>
                 <option>Promoters</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 material-icons-round text-slate-400 text-sm pointer-events-none">expand_more</span>
           </div>
        </div>
        <div className="divide-y divide-slate-50 dark:divide-zinc-800/50">
           {[
             { name: 'Marcus Thompson', rating: 4.0, time: '12 mins ago', nps: 'PROMOTER', order: '#8829', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100', text: 'The checkout process was incredibly fast and smooth on my iPhone. The UI is clean and I felt safe entering my credit card details. Deducted one star because the shipping options were a bit confusing to select.' },
             { name: 'Sarah Jenkins', rating: 5.0, time: '2 hours ago', nps: 'PROMOTER', order: '#8830', initials: 'SJ', text: 'Amazing experience! Loved the Apple Pay integration, literally checked out in 3 seconds. The confirmation email arrived instantly. Great job.' },
           ].map((rev, i) => (
             <div key={i} className="p-10 hover:bg-slate-50/30 dark:hover:bg-zinc-800/10 transition-colors group">
                <div className="flex items-start justify-between mb-6">
                   <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-zinc-700">
                         {rev.img ? <img src={rev.img} className="w-full h-full object-cover" alt="" /> : <span className="font-black text-slate-400">{rev.initials}</span>}
                      </div>
                      <div>
                         <h4 className="font-black text-slate-900 dark:text-white leading-none mb-2">{rev.name}</h4>
                         <div className="flex items-center gap-2">
                            <div className="flex gap-0.5 text-brand-pending">
                               {[...Array(5)].map((_, starIdx) => (
                                 <span key={starIdx} className={`material-icons-round text-sm ${starIdx + 1 > rev.rating ? 'opacity-20' : ''}`}>star</span>
                               ))}
                            </div>
                            <span className="text-[10px] font-black text-slate-300">{rev.rating.toFixed(1)}</span>
                         </div>
                      </div>
                   </div>
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{rev.time}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-8 max-w-4xl">{rev.text}</p>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <span className="bg-brand-success/10 text-brand-success px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">{rev.nps}</span>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Order {rev.order}</span>
                   </div>
                   <button className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline">
                      <span className="material-icons-round text-sm">reply</span> Reply to review
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  const renderSupportConsole = () => (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] bg-white dark:bg-zinc-950 overflow-hidden animate-toast border-t border-slate-100 dark:border-zinc-900">
      {/* Chats Sidebar */}
      <div className="w-full lg:w-80 border-r border-slate-100 dark:border-zinc-900 flex flex-col bg-slate-50/30 dark:bg-zinc-950">
        <div className="p-6 space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <span className="material-icons-round text-lg">search</span>
            </span>
            <input 
              className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-brand-primary/20"
              placeholder="Search chats..."
            />
          </div>
          <div className="flex p-1 bg-slate-100 dark:bg-zinc-900 rounded-xl">
             <button className="flex-1 py-2 bg-brand-primary text-white rounded-lg text-[10px] font-black uppercase">Active (12)</button>
             <button className="flex-1 py-2 text-slate-400 rounded-lg text-[10px] font-black uppercase">Pending (4)</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {[
            { name: 'Marcus Thompson', msg: "I'm having trouble with my recent checkout...", time: '1m ago', order: '#8829', active: true },
            { name: 'Sarah Jenkins', msg: "When will the summer collection be restocked?", time: '4m ago' },
            { name: 'David Chen', msg: "Payment failed but my card was charged twice.", time: '12m ago' },
            { name: 'Customer User', msg: "Is there a discount code for first time buyers?", time: '22m ago' },
          ].map((chat, i) => (
            <div key={i} className={`p-6 border-b border-slate-50 dark:border-zinc-900 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors ${chat.active ? 'bg-white dark:bg-zinc-900 shadow-sm border-l-4 border-l-brand-primary' : ''}`}>
               <div className="flex justify-between items-start mb-1">
                 <h4 className="font-bold text-sm text-slate-900 dark:text-white">{chat.name}</h4>
                 <span className={`text-[10px] font-black ${chat.time === '1m ago' ? 'text-brand-success' : 'text-slate-300'}`}>{chat.time}</span>
               </div>
               <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-2">{chat.msg}</p>
               {chat.order && <span className="text-[9px] font-black text-slate-300 uppercase">Order {chat.order}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Main Conversation Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-zinc-900">
        <header className="px-8 py-4 border-b border-slate-50 dark:border-zinc-800 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100" className="w-10 h-10 rounded-full object-cover" alt="Avatar" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-brand-success border-2 border-white dark:border-zinc-900 rounded-full"></div>
              </div>
              <div>
                 <h3 className="font-bold text-slate-900 dark:text-white leading-none">Marcus Thompson</h3>
                 <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-widest">London, United Kingdom • 2:45 PM Local</p>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-brand-primary"><span className="material-icons-round">call</span></button>
              <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-brand-primary"><span className="material-icons-round">person_add</span></button>
              <button className="ml-4 px-6 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-primary transition-all">Resolve Chat</button>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#FDFDFD] dark:bg-zinc-950 custom-scrollbar">
           <div className="flex flex-col items-start gap-2">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-1">Marcus Thompson • 10:12 AM</span>
              <div className="max-w-[70%] p-5 bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 rounded-[24px_24px_24px_4px] text-sm leading-relaxed">
                Hi, I'm trying to complete my order but the 'Pay Now' button isn't responding. I've tried refreshing twice.
              </div>
           </div>

           <div className="flex flex-col items-end gap-2">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mr-1">10:14 AM • Alex Rivera</span>
              <div className="max-w-[70%] p-5 bg-brand-primary text-white rounded-[24px_24px_4px_24px] text-sm leading-relaxed shadow-xl shadow-brand-primary/10">
                Hello Marcus! I'm sorry to hear you're having trouble. Let me check your session logs right away. Are you using a mobile device or a desktop?
              </div>
           </div>

           <div className="flex flex-col items-start gap-2">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-1">Marcus Thompson • 10:15 AM</span>
              <div className="max-w-[70%] p-5 bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 rounded-[24px_24px_24px_4px] text-sm leading-relaxed">
                I'm on my iPhone 14, using Safari.
              </div>
           </div>

           {/* Internal Note */}
           <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 p-6 rounded-[24px] flex gap-4 animate-toast">
              <span className="material-icons-round text-amber-500 text-lg">sticky_note_2</span>
              <div>
                 <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Internal Note • You</h5>
                 <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed font-medium">User is on Safari iOS. Known issue with v2.4.1 layout engine. Checking if checkout-service-beta is active for this CID.</p>
              </div>
           </div>
        </div>

        {/* Input Area */}
        <div className="p-8 border-t border-slate-50 dark:border-zinc-800 bg-white dark:bg-zinc-900">
           <div className="flex items-center gap-6 mb-4 text-slate-400">
              <div className="flex items-center gap-1 border-b-2 border-brand-primary pb-2 px-2 text-brand-primary font-bold text-xs">Customer Chat</div>
              <div className="flex items-center gap-1 pb-2 px-2 text-xs font-medium hover:text-slate-600 transition-colors">Internal Notes</div>
           </div>
           <div className="bg-slate-50 dark:bg-zinc-950 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-6 mb-4 border-b border-slate-100 dark:border-zinc-800 pb-4">
                 <div className="flex gap-4">
                    <button className="material-icons-round text-lg text-slate-400 hover:text-brand-primary">format_bold</button>
                    <button className="material-icons-round text-lg text-slate-400 hover:text-brand-primary">format_italic</button>
                    <button className="material-icons-round text-lg text-slate-400 hover:text-brand-primary">link</button>
                 </div>
                 <div className="h-4 w-px bg-slate-200 dark:bg-zinc-800"></div>
                 <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary">
                    <span className="material-icons-round text-base">bolt</span> Quick Replies
                    <span className="material-icons-round text-base">expand_more</span>
                 </button>
              </div>
              <textarea 
                className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium p-0 min-h-[100px] placeholder:text-slate-300"
                placeholder="Type your response here..."
              />
              <div className="flex items-center justify-between mt-4">
                 <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 text-slate-400 flex items-center justify-center hover:bg-slate-100"><span className="material-icons-round text-lg">attach_file</span></button>
                    <button className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 text-slate-400 flex items-center justify-center hover:bg-slate-100"><span className="material-icons-round text-lg">mood</span></button>
                 </div>
                 <button className="bg-brand-primary text-white px-10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all">
                    Send Message <span className="material-icons-round text-base">send</span>
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Right Sidebar - User Detail */}
      <div className="w-full lg:w-80 border-l border-slate-100 dark:border-zinc-900 flex flex-col bg-slate-50/10 dark:bg-zinc-950 p-8 overflow-y-auto custom-scrollbar">
         <div className="flex flex-col items-center text-center mb-10">
            <div className="w-24 h-24 rounded-[32px] overflow-hidden mb-6 shadow-2xl border-4 border-white dark:border-zinc-800">
               <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" alt="Customer" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Marcus Thompson</h3>
            <span className="bg-brand-success/10 text-brand-success px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
               <span className="material-icons-round text-[10px]">verified</span> Loyal Customer
            </span>
         </div>

         <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-violet-50 dark:bg-zinc-900 p-6 rounded-3xl text-center border border-violet-100/50 dark:border-zinc-800">
               <p className="text-[9px] font-black text-violet-400 uppercase tracking-widest mb-1">NPS Score</p>
               <p className="text-2xl font-black text-brand-primary">9.4</p>
            </div>
            <div className="bg-slate-50 dark:bg-zinc-900 p-6 rounded-3xl text-center border border-slate-100 dark:border-zinc-800">
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Lifetime</p>
               <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">$1,240</p>
            </div>
         </div>

         <div className="space-y-8 mb-10">
            <div>
               <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Contact Details</h5>
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
                     <span className="material-icons-round text-slate-300 text-lg">mail</span> m.thompson@example.com
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
                     <span className="material-icons-round text-slate-300 text-lg">smartphone</span> +44 20 7123 4567
                  </div>
               </div>
            </div>

            <div>
               <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Context</h5>
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
                     <span className="material-icons-round text-slate-300 text-lg">laptop</span> Safari 17.0 on iPhone 14
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
                     <span className="material-icons-round text-slate-300 text-lg">public</span> IP: 82.145.210.12
                  </div>
               </div>
            </div>
         </div>

         <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
               <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order History</h5>
               <button className="text-[9px] font-black text-brand-primary uppercase">View All</button>
            </div>
            <div className="space-y-3">
               {[
                 { id: '#8829', status: 'Processing', price: '$149.00', date: 'Oct 12, 2023', color: 'text-brand-primary' },
                 { id: '#7421', status: 'Delivered', price: '$89.00', date: 'Aug 24, 2023', color: 'text-brand-success' }
               ].map((order, idx) => (
                 <div key={idx} className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 p-4 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                       <span className="font-bold text-sm">#{order.id.replace('#','')}</span>
                       <span className="font-black text-sm text-slate-900 dark:text-white">{order.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className={`text-[9px] font-black uppercase tracking-widest ${order.color}`}>{order.status}</span>
                       <span className="text-[9px] font-medium text-slate-400">{order.date}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200] flex bg-slate-50 dark:bg-zinc-950 overflow-hidden animate-toast">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-72 bg-white dark:bg-zinc-900 border-r border-slate-100 dark:border-zinc-800 flex flex-col h-screen shrink-0 z-[220] transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-neutral-50 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
              <span className="material-icons-round text-2xl">rocket_launch</span>
            </div>
            <span className="font-black text-xl tracking-tighter">AdminHub</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400">
            <span className="material-icons-round">menu_open</span>
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <NavGroup title="Principal">
            <NavItem id="dashboard" icon="dashboard" label="Dashboard" />
          </NavGroup>

          <NavGroup title="Vendas">
            <NavItem id="pedidos" icon="local_mall" label="Pedidos" badge="12" />
            <NavItem id="etiquetas" icon="label" label="Etiquetas de Envio" />
            <NavItem id="feedbacks" icon="forum" label="Feedbacks/NPS" />
            <NavItem id="cupons" icon="confirmation_number" label="Cupons" />
          </NavGroup>

          <NavGroup title="Atendimento">
            <NavItem id="suporte" icon="headset_mic" label="Suporte Online" badge="Active" />
          </NavGroup>

          <NavGroup title="Catálogo">
            <NavItem id="produtos" icon="inventory_2" label="Produtos" />
            <NavItem id="categorias" icon="category" label="Categorias" />
          </NavGroup>

          <NavGroup title="Customização">
            <NavItem id="editor" icon="web" label="Editor do Site" />
            <NavItem id="blog" icon="article" label="Blog" />
          </NavGroup>

          <NavGroup title="Configurações">
            <NavItem id="integracoes" icon="hub" label="Integrações API" />
            <NavItem id="juridico" icon="gavel" label="Informações Jurídicas" />
            <NavItem id="branding" icon="payments" label="Branding & Pagamentos" />
          </NavGroup>
        </nav>

        {/* User Profile in Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-zinc-800">
          <div className="flex items-center justify-between bg-slate-50 dark:bg-zinc-800/50 p-3 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-primary/20">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="Avatar" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black">Ricardo Souza</span>
                <span className="text-[10px] text-slate-400 font-medium">Administrador Master</span>
              </div>
            </div>
            <button className="text-slate-400 hover:text-brand-primary" onClick={onBack}>
              <span className="material-icons-round">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50 dark:bg-zinc-950">
        {/* Top Header */}
        <header className="h-20 bg-white dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-400">
              <span className="material-icons-round">menu</span>
            </button>
            <div className="flex items-center gap-2">
               <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white capitalize">
                  {activeSub === 'suporte' ? 'Support Console' : 
                   activeSub === 'pedidos' ? 'Gestão de Pedidos' : 
                   activeSub === 'etiquetas' ? 'Etiquetas de Envio' : 
                   activeSub === 'feedbacks' ? 'Feedback & NPS Analytics' : 
                   activeSub === 'produtos' ? 'Catálogo de Produtos' : 
                   activeSub === 'categorias' ? 'Gestão de Categorias' : 
                   activeSub === 'cupons' ? 'Gerenciamento de Cupons' : 
                   activeSub === 'integracoes' ? 'Integrações e APIs' : 
                   activeSub === 'editor' ? 'Editor Visual' : activeSub}
               </h1>
               {activeSub === 'suporte' && <span className="flex items-center gap-2 bg-brand-primary/10 text-brand-primary text-[8px] font-black uppercase px-2 py-0.5 rounded-full ring-1 ring-brand-primary/20 animate-pulse"><span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span> Agent Online</span>}
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <span className="material-icons-round text-lg">search</span>
              </span>
              <input 
                className="bg-slate-100 dark:bg-zinc-900 border-none rounded-xl py-2 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-brand-primary/20 placeholder:text-slate-400"
                placeholder="Buscar no sistema..."
              />
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-100 dark:border-zinc-800">
               <div className="text-right hidden sm:block">
                  <p className="text-xs font-black leading-none">Alex Rivera</p>
                  <p className="text-[9px] font-medium text-slate-400 mt-1">Senior Specialist</p>
               </div>
               <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100" className="w-9 h-9 rounded-xl object-cover ring-2 ring-brand-primary/10" alt="User" />
            </div>
          </div>
        </header>

        {activeSub === 'suporte' ? renderSupportConsole() : 
         activeSub === 'pedidos' ? renderOrdersManagement() : 
         activeSub === 'etiquetas' ? renderShippingLabels() : 
         activeSub === 'feedbacks' ? renderFeedbackAnalytics() : 
         activeSub === 'produtos' ? renderProductCatalog() : 
         activeSub === 'categorias' ? renderCategoryManagement() : 
         activeSub === 'cupons' ? renderCouponManagement() : 
         activeSub === 'integracoes' ? renderIntegrations() : 
         activeSub === 'editor' ? renderSiteEditor() : (
          <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-br from-brand-primary to-violet-500 rounded-[32px] p-10 text-white relative overflow-hidden shadow-2xl shadow-brand-primary/20">
              <div className="relative z-10 max-w-xl">
                <h2 className="text-4xl font-black tracking-tight mb-4 leading-tight">Bem-vindo de volta, Ricardo!</h2>
                <p className="text-white/80 font-medium text-lg leading-relaxed mb-8">
                  Sua loja teve um crescimento de 12% em relação à semana passada. Confira os novos pedidos e atualizações do blog.
                </p>
                <button className="bg-white text-brand-primary px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors shadow-lg">
                  Ver Relatórios Detalhados
                </button>
              </div>
              <div className="absolute top-0 right-0 h-full w-1/2 opacity-20 hidden lg:block">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <path d="M50,250 L100,200 L150,230 L200,180 L250,210 L300,150" fill="none" stroke="white" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M300,150 L250,150 M300,150 L300,200" fill="none" stroke="white" strokeWidth="20" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* KPI Cards (Dashboard Principal) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                    <span className="material-icons-round">payments</span>
                  </div>
                  <div className="flex items-center gap-1 text-brand-success text-[10px] font-bold">
                    <span className="material-icons-round text-sm">arrow_upward</span> 2.5%
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Vendas Totais</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">R$ 45.230,00</h3>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center">
                    <span className="material-icons-round">shopping_cart</span>
                  </div>
                  <div className="flex items-center gap-1 text-brand-success text-[10px] font-bold">
                    <span className="material-icons-round text-sm">arrow_upward</span> 8.1%
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Novos Pedidos</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">128</h3>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                    <span className="material-icons-round">grade</span>
                  </div>
                  <div className="text-slate-400 text-[10px] font-bold">NPS 8.5</div>
                </div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Feedback Médio</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">4.9 / 5</h3>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                    <span className="material-icons-round">visibility</span>
                  </div>
                  <div className="flex items-center gap-1 text-brand-error text-[10px] font-bold">
                    <span className="material-icons-round text-sm">arrow_downward</span> 0.4%
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Visitas Hoje</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">1,429</h3>
              </div>
            </div>

            {/* Map Chart Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-[32px] border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 dark:border-zinc-800 flex items-center justify-between">
                <h3 className="text-lg font-black tracking-tight uppercase">Origem dos Pedidos</h3>
                <select className="bg-slate-50 dark:bg-zinc-800 border-none rounded-xl text-[10px] font-bold uppercase tracking-widest py-2 pl-4 pr-10 focus:ring-2 focus:ring-brand-primary/20">
                  <option>Últimos 30 dias</option>
                  <option>Últimos 7 dias</option>
                  <option>Hoje</option>
                </select>
              </div>
              <div className="p-8">
                <div className="aspect-[21/9] w-full bg-slate-100 dark:bg-zinc-800 rounded-3xl overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1600" 
                    className="w-full h-full object-cover opacity-50 grayscale contrast-125"
                    alt="Map View"
                  />
                  <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-brand-primary rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                  <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-violet-400 rounded-full border-4 border-white shadow-lg animate-pulse delay-700"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-brand-primary rounded-full border-4 border-white shadow-lg animate-pulse delay-1000"></div>
                  <div className="absolute inset-0 bg-brand-primary/10 pointer-events-none mix-blend-multiply"></div>
                </div>
              </div>
            </div>
          </div>
         )}
      </main>
    </div>
  );
};

export default AdminDashboard;
