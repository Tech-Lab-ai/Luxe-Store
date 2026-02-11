
import React, { useState } from 'react';

interface Props {
  onBack: () => void;
}

const StyleGuide: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'foundations' | 'components'>('components');

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 p-6 flex flex-col gap-8 hidden md:flex shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <span className="material-icons-round text-white">grid_view</span>
          </div>
          <span className="font-bold text-lg">UI System</span>
        </div>

        <nav className="flex-1 space-y-8">
          <div>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Navigation States</p>
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => setActiveTab('components')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'components' ? 'bg-brand-primary/10 text-brand-primary' : 'text-neutral-500 hover:bg-neutral-50'}`}
                >
                  <span className="material-icons-round text-lg">dashboard</span> Dashboard (Active)
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-500 hover:bg-neutral-50">
                  <span className="material-icons-round text-lg">shopping_cart</span> Checkout Flow
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-500 hover:bg-neutral-50">
                  <span className="material-icons-round text-lg">analytics</span> Analytics
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Component Docs</p>
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => setActiveTab('foundations')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'foundations' ? 'bg-brand-primary/10 text-brand-primary' : 'text-neutral-500 hover:bg-neutral-50'}`}
                >
                  <span className="material-icons-round text-lg">layers</span> Foundations
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-500 hover:bg-neutral-50">
                  <span className="material-icons-round text-lg">view_quilt</span> Cards & Layouts
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-500 hover:bg-neutral-50">
                  <span className="material-icons-round text-lg">badge</span> Badges & Icons
                </button>
              </li>
            </ul>
          </div>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-neutral-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
             <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop" className="w-10 h-10 rounded-full object-cover" />
             <div>
               <p className="text-sm font-bold">Admin Panel</p>
               <p className="text-[10px] text-neutral-400 italic">v1.0.4 - Release</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-16">
        <div className="max-w-6xl mx-auto">
          
          <header className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl font-extrabold mb-2">UI Kit: Components & Cards</h1>
              <p className="text-neutral-500 body-base">Universal white-label design system for modern checkout applications.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 transition-all">Export Assets</button>
              <button className="px-5 py-2.5 bg-brand-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-primary/20 hover:opacity-90 transition-all">Copy Styles</button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Components Stack */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Status Badges & Chips */}
              <section className="bg-white dark:bg-zinc-900 rounded-xl p-8 border border-neutral-100 dark:border-zinc-800 shadow-sm">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-6">Status Badges & Chips</p>
                <div className="flex flex-wrap gap-6">
                  <div className="text-center space-y-2">
                    <span className="px-4 py-1.5 bg-brand-pending/10 text-brand-pending text-[10px] font-black uppercase tracking-wider rounded-full">Pending</span>
                    <p className="text-[10px] text-neutral-400">Default Pending</p>
                  </div>
                  <div className="text-center space-y-2">
                    <span className="px-4 py-1.5 bg-brand-success/10 text-brand-success text-[10px] font-black uppercase tracking-wider rounded-full">Paid</span>
                    <p className="text-[10px] text-neutral-400">Success State</p>
                  </div>
                  <div className="text-center space-y-2">
                    <span className="px-4 py-1.5 bg-brand-shipped/10 text-brand-shipped text-[10px] font-black uppercase tracking-wider rounded-full">Shipped</span>
                    <p className="text-[10px] text-neutral-400">Processing</p>
                  </div>
                  <div className="text-center space-y-2">
                    <span className="px-4 py-1.5 bg-brand-error/10 text-brand-error text-[10px] font-black uppercase tracking-wider rounded-full">Cancelled</span>
                    <p className="text-[10px] text-neutral-400">Error State</p>
                  </div>
                </div>
              </section>

              {/* Stepper */}
              <section className="bg-white dark:bg-zinc-900 rounded-xl p-8 border border-neutral-100 dark:border-zinc-800 shadow-sm">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-6">Checkout Stepper</p>
                <div className="relative flex items-center justify-between max-w-xl mx-auto">
                  {/* Progress Line */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-neutral-100 dark:bg-zinc-800"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-0.5 bg-brand-primary"></div>
                  
                  {/* Step 1 */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white">
                       <span className="material-icons-round text-sm">check</span>
                    </div>
                    <span className="text-[10px] font-bold text-neutral-900 dark:text-white">Customer Info</span>
                  </div>
                  {/* Step 2 */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold text-xs">
                       2
                    </div>
                    <span className="text-[10px] font-bold text-neutral-900 dark:text-white">Shipping</span>
                  </div>
                  {/* Step 3 */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 bg-white dark:bg-zinc-900 border-2 border-neutral-100 dark:border-zinc-800 rounded-full flex items-center justify-center text-neutral-300 font-bold text-xs">
                       3
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400">Payment</span>
                  </div>
                  {/* Step 4 */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 bg-white dark:bg-zinc-900 border-2 border-neutral-100 dark:border-zinc-800 rounded-full flex items-center justify-center text-neutral-300 font-bold text-xs">
                       4
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400">Review</span>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Quantity Selector */}
                <section className="bg-white dark:bg-zinc-900 rounded-xl p-8 border border-neutral-100 dark:border-zinc-800 shadow-sm">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-6">Quantity Selector</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-neutral-50 dark:bg-zinc-800/50 rounded-xl p-1 border border-neutral-100 dark:border-zinc-800">
                       <button className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-brand-primary transition-colors"><span className="material-icons-round text-sm">remove</span></button>
                       <span className="w-10 text-center font-bold text-sm">01</span>
                       <button className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-brand-primary transition-colors"><span className="material-icons-round text-sm">add</span></button>
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-tight">Adjust product<br/>units</p>
                  </div>
                </section>

                {/* Iconography */}
                <section className="bg-white dark:bg-zinc-900 rounded-xl p-8 border border-neutral-100 dark:border-zinc-800 shadow-sm">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-6">Iconography Set</p>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center shadow-sm">
                       <span className="material-icons-round text-xl">shopping_cart</span>
                    </div>
                    <div className="w-10 h-10 bg-white dark:bg-zinc-800 border border-neutral-100 dark:border-zinc-800 text-neutral-400 rounded-xl flex items-center justify-center">
                       <span className="material-icons-round text-xl">credit_card</span>
                    </div>
                    <div className="w-10 h-10 bg-white dark:bg-zinc-900 border border-neutral-100 dark:border-zinc-800 text-neutral-400 rounded-xl flex items-center justify-center">
                       <span className="material-icons-round text-xl">local_shipping</span>
                    </div>
                    <div className="w-10 h-10 bg-white dark:bg-zinc-900 border border-neutral-100 dark:border-zinc-800 text-neutral-400 rounded-xl flex items-center justify-center">
                       <span className="material-icons-round text-xl">person</span>
                    </div>
                  </div>
                </section>
              </div>

              {/* Modal Sandbox */}
              <section className="bg-neutral-50 dark:bg-zinc-950/50 rounded-xl p-12 border border-dashed border-neutral-200 dark:border-zinc-800 flex items-center justify-center relative">
                <span className="absolute top-4 left-4 text-[10px] font-bold text-neutral-300 uppercase tracking-widest">Modal Sandbox</span>
                <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl border border-neutral-100 dark:border-zinc-800 overflow-hidden">
                  <div className="p-6 flex items-center justify-between border-b border-neutral-50 dark:border-zinc-800">
                    <h3 className="font-bold">Remove Item</h3>
                    <button className="text-neutral-400 hover:text-neutral-600 transition-colors"><span className="material-icons-round">close</span></button>
                  </div>
                  <div className="p-8">
                    <p className="text-sm text-neutral-500 leading-relaxed text-center">
                       Are you sure you want to remove the <span className="font-bold text-neutral-900 dark:text-white">Ultra Wireless Headphones</span> from your cart? This action cannot be undone.
                    </p>
                  </div>
                  <div className="p-6 bg-neutral-50/50 dark:bg-zinc-800/20 flex gap-3">
                    <button className="flex-1 py-2.5 rounded-xl text-sm font-bold text-neutral-500 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors">Cancel</button>
                    <button className="flex-1 py-2.5 bg-brand-error text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all">Confirm Removal</button>
                  </div>
                </div>
              </section>

            </div>

            {/* Right Column: Cards & Toast Stack */}
            <div className="space-y-8">
              
              {/* Product Card */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm border border-neutral-100 dark:border-zinc-800 group">
                <div className="aspect-[4/3] bg-[#FFD54F] relative flex items-center justify-center p-8 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800" className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" />
                   <button className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-brand-error shadow-sm"><span className="material-icons-round text-sm">favorite</span></button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">Studio Pro Wireless</h3>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Model: SP-2024 • Audio Pro</p>
                    </div>
                    <span className="text-xl font-extrabold text-brand-primary">$299.00</span>
                  </div>
                  <div className="flex items-center gap-1 mb-6">
                    <span className="material-icons-round text-brand-pending text-xs">star</span>
                    <span className="material-icons-round text-brand-pending text-xs">star</span>
                    <span className="material-icons-round text-brand-pending text-xs">star</span>
                    <span className="material-icons-round text-brand-pending text-xs">star</span>
                    <span className="material-icons-round text-brand-pending text-xs">star_half</span>
                    <span className="text-[10px] text-neutral-400 font-bold ml-1">(1,240 Reviews)</span>
                  </div>
                  <button className="w-full bg-brand-primary text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/10 hover:opacity-95 transition-all">
                    <span className="material-icons-round text-lg">shopping_basket</span> Add to Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl p-8 border border-neutral-100 dark:border-zinc-800 shadow-sm space-y-8">
                <h3 className="font-bold text-lg">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Subtotal (3 items)</span>
                    <span className="font-bold">$845.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Shipping</span>
                    <span className="font-bold text-brand-success">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Estimated Tax</span>
                    <span className="font-bold">$42.25</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input className="flex-1 bg-neutral-50 dark:bg-zinc-800 border-none rounded-xl px-4 py-2.5 text-sm" placeholder="Promo code" />
                  <button className="px-4 py-2.5 bg-neutral-100 dark:bg-zinc-700 text-neutral-900 dark:text-white rounded-xl text-xs font-bold hover:bg-neutral-200 transition-colors">Apply</button>
                </div>
                <div className="pt-6 border-t border-neutral-50 dark:border-zinc-800 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Total Amount</p>
                    <h2 className="text-3xl font-black">$887.25</h2>
                  </div>
                  <span className="material-icons-round text-neutral-300">lock</span>
                </div>
              </div>

              {/* Shipping Card */}
              <div className="bg-brand-primary/5 border-2 border-brand-primary rounded-xl p-6 shadow-sm relative">
                <div className="absolute top-4 right-4 w-5 h-5 bg-brand-primary text-white rounded-full flex items-center justify-center">
                  <span className="material-icons-round text-xs">check</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-icons-round text-brand-primary">home</span>
                  <span className="text-sm font-bold">Default Shipping</span>
                </div>
                <p className="font-bold text-sm mb-1">James R. Bennett</p>
                <div className="text-xs text-neutral-500 leading-relaxed">
                  4730 Davis Lane<br/>San Francisco, CA 94107<br/>United States
                </div>
                <button className="mt-4 text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:underline">Edit Address</button>
              </div>

              {/* Success Toast */}
              <div className="bg-neutral-900 text-white rounded-xl p-4 flex items-center justify-between shadow-2xl border border-white/5 animate-toast">
                 <div className="flex items-center gap-3">
                   <span className="material-icons-round text-brand-success">check_circle</span>
                   <span className="text-xs font-medium">Payment method added successfully!</span>
                 </div>
              </div>

            </div>

          </div>

          <footer className="mt-32 pt-12 border-t border-neutral-100 dark:border-zinc-800 text-center text-neutral-300 text-[10px] font-medium tracking-tight">
             © 2024 Design System Consortium. Standard Enterprise-Grade Web Layout v2.4.0
          </footer>

        </div>
      </main>
    </div>
  );
};

export default StyleGuide;
