
import React, { useState } from 'react';
import { AppView, CartItem, Product, Article } from './types';
import Storefront from './components/Storefront';
import Customizer from './components/Customizer';
import Cart from './components/Cart';
import Identification from './components/Identification';
import Fulfillment from './components/Fulfillment';
import Payment from './components/Payment';
import Success from './components/Success';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import Auth from './components/Auth';
import CustomerPanel from './components/CustomerPanel';
import Institutional from './components/Institutional';
import FaqPage from './components/FaqPage'; 
import OrderFlow from './components/OrderFlow';
import EmailTemplate from './components/EmailTemplate';
import CategoryPage from './components/CategoryPage';
import ChatWidget from './components/ChatWidget';
import { CATEGORIES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.STOREFRONT);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPreviewingEmail, setIsPreviewingEmail] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navigate = (view: AppView) => {
    window.scrollTo(0, 0);
    setCurrentView(view);
  };

  const handleCategorySelect = (categoryNameOrSlug: string) => {
    if (!categoryNameOrSlug) return;
    const found = CATEGORIES.find(c => 
      c.name.toLowerCase() === categoryNameOrSlug.toLowerCase() || 
      c.slug.toLowerCase() === categoryNameOrSlug.toLowerCase()
    );
    setSelectedCategory(found ? found.name : categoryNameOrSlug);
    navigate(AppView.CATEGORY);
  };

  const addToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
    showToast("Adicionado ao carrinho!");
    navigate(AppView.CART);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const renderView = () => {
    switch (currentView) {
      case AppView.STOREFRONT: 
        return <Storefront 
          onSelectProduct={(p) => { setSelectedProduct(p); navigate(AppView.CUSTOMIZER); }} 
          onNavigate={navigate} 
          onSelectCategory={handleCategorySelect}
          cartCount={cartItems.length} 
        />;
      
      case AppView.CATEGORY:
        return <CategoryPage
          category={selectedCategory || ''}
          onSelectProduct={(p) => { setSelectedProduct(p); navigate(AppView.CUSTOMIZER); }}
          onNavigate={navigate}
          onSelectCategory={handleCategorySelect}
          cartCount={cartItems.length}
        />;

      case AppView.FAQ:
        return <FaqPage onNavigate={navigate} cartCount={cartItems.length} />;

      case AppView.ABOUT:
      case AppView.BLOG:
      case AppView.BLOG_ARTICLE:
      case AppView.POLICIES:
      case AppView.TERMS: 
        return <Institutional 
          view={currentView} 
          article={selectedArticle}
          onSelectArticle={(art) => { setSelectedArticle(art); navigate(AppView.BLOG_ARTICLE); }}
          onBack={() => navigate(AppView.STOREFRONT)} 
          onNavigate={navigate} 
          cartCount={cartItems.length}
        />;
      
      case AppView.LOGIN:
      case AppView.SIGNUP:
      case AppView.RECOVER_PASSWORD: 
        return <Auth view={currentView} onBack={() => navigate(AppView.STOREFRONT)} onNavigate={navigate} />;

      case AppView.ADMIN_LOGIN:
        return <AdminLogin onBack={() => navigate(AppView.STOREFRONT)} onLoginSuccess={() => navigate(AppView.ADMIN_DASHBOARD)} />;
      
      case AppView.CUSTOMIZER: 
        if (!selectedProduct) { navigate(AppView.STOREFRONT); return null; }
        return <Customizer product={selectedProduct} onNext={addToCart} onNavigate={navigate} cartCount={cartItems.length} />;
      
      case AppView.CART: 
        return <Cart 
          items={cartItems} 
          total={cartTotal} 
          onNext={() => navigate(AppView.CHECKOUT_ID)} 
          onBack={() => navigate(AppView.STOREFRONT)} 
          onRemove={(idx) => setCartItems(prev => prev.filter((_, i) => i !== idx))} 
          onApplyCoupon={() => showToast("Cupom ativado!")}
        />;
      
      case AppView.CHECKOUT_ID: 
        return <Identification cartTotal={cartTotal} onNext={() => navigate(AppView.CHECKOUT_FULFILLMENT)} onBack={() => navigate(AppView.CART)} />;
      
      case AppView.CHECKOUT_FULFILLMENT: 
        return <Fulfillment cartTotal={cartTotal} onNext={() => navigate(AppView.CHECKOUT_PAYMENT)} onBack={() => navigate(AppView.CHECKOUT_ID)} />;
      
      case AppView.CHECKOUT_PAYMENT: 
        return <Payment cartTotal={cartTotal} onNext={() => navigate(AppView.CHECKOUT_PROCESSING)} onBack={() => navigate(AppView.CHECKOUT_FULFILLMENT)} />;
      
      case AppView.CHECKOUT_PROCESSING: 
        return <OrderFlow view={currentView} onNext={() => navigate(AppView.ORDER_SUCCESS)} />;
      
      case AppView.ORDER_SUCCESS: 
        return <Success cartItem={cartItems[0] || null} onNewOrder={() => { setCartItems([]); navigate(AppView.STOREFRONT); }} onTrack={() => navigate(AppView.ORDER_TRACKING)} onCopyPix={() => showToast("Copiado!")} />;
      
      case AppView.ORDER_DENIED:
      case AppView.ORDER_TRACKING:
      case AppView.ORDER_MAP:
      case AppView.ORDER_NPS: 
        return <OrderFlow view={currentView} onBack={() => navigate(AppView.STOREFRONT)} onNavigate={navigate} onNpsSubmit={() => navigate(AppView.STOREFRONT)} />;
      
      case AppView.CUSTOMER_DASHBOARD: 
        return <CustomerPanel onBack={() => navigate(AppView.STOREFRONT)} onNavigate={navigate} onSaveProfile={() => showToast("Perfil salvo!")} />;
      
      case AppView.ADMIN_DASHBOARD: 
        return <AdminDashboard onBack={() => navigate(AppView.STOREFRONT)} onAction={() => {}} />;
      
      default: 
        return <Storefront onSelectProduct={(p) => { setSelectedProduct(p); navigate(AppView.CUSTOMIZER); }} onNavigate={navigate} onSelectCategory={handleCategorySelect} cartCount={cartItems.length} />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-zinc-950 text-white' : 'bg-white text-slate-900'} transition-colors duration-300 font-sans relative`}>
      {renderView()}
      <ChatWidget />
      
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[300] animate-toast">
          <div className="bg-neutral-900 text-white border border-white/10 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
            <span className="material-icons-round text-brand-success">check_circle</span>
            <span className="text-xs font-black uppercase tracking-widest">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-[150]">
        <button className="bg-white dark:bg-zinc-800 p-3.5 rounded-2xl shadow-2xl text-zinc-500 border border-slate-100 dark:border-zinc-700 hover:scale-110 transition-all" onClick={toggleDarkMode}>
          <span className="material-icons-round text-xl">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
        </button>
        <button className="bg-white dark:bg-zinc-800 p-3.5 rounded-2xl shadow-2xl text-brand-primary border border-slate-100 dark:border-zinc-700 hover:scale-110 transition-all" onClick={() => setIsPreviewingEmail(true)}>
          <span className="material-icons-round text-xl">alternate_email</span>
        </button>
      </div>

      {isPreviewingEmail && (
        <EmailTemplate order={{ id: '84920', customer: 'Ricardo Souza', total: 450.00, status: 'Pago', date: '15 Out 2023' }} onClose={() => setIsPreviewingEmail(false)} />
      )}
    </div>
  );
};

export default App;
