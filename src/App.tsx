import React, { useState } from 'react';
import { ShoppingBag, X, Menu, Shirt, Sparkles, Layers, ArrowRight, Flame, ChevronRight } from 'lucide-react';

// --- DATA STRUCTURES ---
const PRODUCT_REGISTRY = [
  { id: 1, name: 'Cloud-Print Heavyweight Hoodie', price: 3450, category: 'Tops', tag: 'Best Seller', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop' },
  { id: 2, name: 'Cap\'n Vintage Distressed Denim', price: 4200, category: 'Bottoms', tag: 'Limited Drop', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop' },
  { id: 3, name: 'Cumulus Oversized Graphic Tee', price: 1850, category: 'Tops', tag: 'New', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop' },
  { id: 4, name: 'Nimbus Nylon Cargo Trackpants', price: 3800, category: 'Bottoms', tag: 'Popular', img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop' },
  { id: 5, name: 'Signature "Clouds" Work Jacket', price: 5500, category: 'Outerwear', tag: 'Premium', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop' },
  { id: 6, name: 'Stratus Technical Windbreaker', price: 4900, category: 'Outerwear', tag: 'Waterproof', img: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=600&auto=format&fit=crop' },
];

const LOOKBOOK_GALLERY = [
  { id: 'look1', title: 'Overcast Metaphor', season: 'Drop 01/26', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop' },
  { id: 'look2', title: 'Industrial Vapor', season: 'Drop 02/26', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop' },
  { id: 'look3', title: 'Concrete Stratum', season: 'Drop 02/26', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop' },
];

export default function App() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'lookbook' | 'studio'>('home');
  const [shopFilter, setShopFilter] = useState<string>('All');
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // --- CART MUTATIONS ---
  const addToCart = (product: typeof PRODUCT_REGISTRY[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-neutral-800 selection:text-emerald-400">
      
      {/* --- FLOATING HEADER --- */}
      <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900 px-4 lg:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-neutral-800 to-neutral-700 flex items-center justify-center border border-neutral-700 group-hover:border-emerald-500 transition-colors">
              <Shirt className="w-5 h-5 text-neutral-200 group-hover:text-emerald-400 transition-colors" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase sm:block">
              Cap'n <span className="text-emerald-400">Clouds</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-900 p-1 rounded-full border border-neutral-800">
            {(['home', 'shop', 'lookbook', 'studio'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-neutral-800 text-emerald-400 shadow-sm' 
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Action Hub */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors group"
            >
              <ShoppingBag className="w-4 h-4 text-neutral-300 group-hover:text-emerald-400 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 text-neutral-950 rounded-full flex items-center justify-center text-[10px] font-black animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 md:hidden text-neutral-300"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* --- MOBILE NAVIGATION DRAWER --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/95 md:hidden flex flex-col p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="text-lg font-black uppercase tracking-tighter">Navigation</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col gap-4 text-2xl font-bold uppercase tracking-wide">
            {(['home', 'shop', 'lookbook', 'studio'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setIsMobileMenuOpen(false); }}
                className={`text-left py-2 border-b border-neutral-900 flex justify-between items-center ${activeTab === tab ? 'text-emerald-400' : 'text-neutral-400'}`}
              >
                {tab} <ChevronRight className="w-5 h-5 text-neutral-700" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* --- PRIMARY CORE ROUTING LAYOUTS --- */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        
        {/* VIEW 1: HOME PANEL */}
        {activeTab === 'home' && (
          <div className="space-y-16">
            {/* Hero Splash Panel */}
            <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 min-h-[520px] flex flex-col justify-end p-6 sm:p-12 group">
              <div className="absolute inset-0 z-0 opacity-40 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent z-0" />
              
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-700 text-neutral-300 text-xs font-semibold tracking-wider uppercase">
                  <Flame className="w-3.5 h-3.5 text-orange-500" /> Drop 01 // Stratum Active
                </div>
                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none text-neutral-50">
                  CLOTHING FOR <br />THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">UNBOUND</span>
                </h1>
                <p className="text-neutral-400 text-sm sm:text-base max-w-md font-medium">
                  Premium heavyweight infrastructure meets clean minimalist geometry. Engineered in limited drops.
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <button 
                    onClick={() => setActiveTab('shop')}
                    className="px-6 py-3 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-sm tracking-wide uppercase shadow-lg shadow-emerald-500/10 hover:bg-emerald-400 transition-all flex items-center gap-2 group"
                  >
                    Explore Drop <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('lookbook')}
                    className="px-6 py-3 rounded-xl bg-neutral-900 text-neutral-200 border border-neutral-800 font-bold text-sm tracking-wide uppercase hover:bg-neutral-800 transition-all"
                  >
                    View Lookbook
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Layers, t: 'Heavyweight Utility', d: 'Custom custom-milled 450GSM loopback cotton architectures engineered for longevity.' },
                { icon: Sparkles, t: 'Dynamic AI Studio', d: 'Design customized variants, generate test configurations, and render concept drops live.' },
                { icon: Shirt, t: 'Sustainably Crafted', d: 'All collections are limited-run productions minimizing structural industrial textile waistlines.' }
              ].map((f, i) => (
                <div key={i} className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-900 space-y-3 hover:border-neutral-800 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-100 uppercase tracking-tight">{f.t}</h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: SHOP ENGINE PANEL */}
        {activeTab === 'shop' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-900 pb-6">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-50">Product Catalog</h2>
                <p className="text-neutral-400 text-xs sm:text-sm font-medium">Select a category to sort our active tactical streetwear inventory architecture.</p>
              </div>
              
              {/* Category Toggles */}
              <div className="flex flex-wrap gap-2">
                {['All', 'Tops', 'Bottoms', 'Outerwear'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setShopFilter(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                      shopFilter === cat 
                        ? 'bg-neutral-100 text-neutral-950 border-neutral-100' 
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Rendering Core Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCT_REGISTRY.filter(p => shopFilter === 'All' || p.category === shopFilter).map((product) => (
                <div key={product.id} className="group rounded-2xl bg-neutral-900/40 border border-neutral-900 overflow-hidden flex flex-col justify-between hover:border-neutral-800 transition-all">
                  <div className="relative aspect-square bg-neutral-900 overflow-hidden">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[10px] font-black uppercase tracking-wider text-emerald-400">
                      {product.tag}
                    </span>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">{product.category}</span>
                      <h4 className="font-bold text-sm text-neutral-200 uppercase tracking-tight line-clamp-1">{product.name}</h4>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-mono text-sm font-bold text-neutral-100">₱{product.price.toLocaleString()}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-emerald-500 text-neutral-200 hover:text-neutral-950 text-xs font-bold uppercase tracking-wider transition-all"
                      >
                        Add To Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: LOOKBOOK ARCHIVE */}
        {activeTab === 'lookbook' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-50">Lookbook Matrix</h2>
              <p className="text-neutral-400 text-xs sm:text-sm font-medium">Visual manifestations of seasonal silhouettes across concrete spaces.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LOOKBOOK_GALLERY.map((look) => (
                <div key={look.id} className="relative rounded-2xl overflow-hidden aspect-[3/4] group border border-neutral-900">
                  <img src={look.img} alt={look.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent flex flex-col justify-end p-6" />
                  <div className="absolute bottom-6 left-6 z-10 space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase bg-neutral-950/60 px-2 py-0.5 rounded border border-neutral-800">{look.season}</span>
                    <h3 className="text-lg font-black uppercase tracking-tight text-neutral-50">{look.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: CREATIVE STUDIO ENGINE */}
        {activeTab === 'studio' && (
          <div className="space-y-8 max-w-4xl mx-auto text-center py-12">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-neutral-950 mx-auto shadow-xl shadow-emerald-500/10">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black uppercase tracking-tighter sm:text-4xl text-neutral-100">AI Design Lab</h2>
              <p className="text-neutral-400 text-sm max-w-md mx-auto font-medium">
                The core machine-learning playground for generating automated structural garments is undergoing systems compilation.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-900 max-w-md mx-auto space-y-4">
              <div className="flex items-center gap-3 bg-neutral-950 p-3 rounded-xl border border-neutral-900 text-left">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-neutral-400">Compiling core prompt models...</span>
              </div>
              <div className="space-y-1 text-xs text-neutral-500 font-mono text-left bg-neutral-950 p-3 rounded-xl border border-neutral-900 overflow-x-auto">
                <p>&gt; CDN_CONNECT: OK</p>
                <p>&gt; LOCALHOST_VITE_V8: LOADED</p>
                <p>&gt; STATUS: AWATING_ASSET_INJECTION</p>
              </div>
              <button 
                onClick={() => setActiveTab('shop')} 
                className="w-full py-2.5 bg-neutral-800 text-neutral-200 border border-neutral-700 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-700 transition-all"
              >
                Return To Inventory
              </button>
            </div>
          </div>
        )}

      </main>

      {/* --- CART DRAWER OVERLAY SYSTEM --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-neutral-950 h-full border-l border-neutral-900 shadow-2xl flex flex-col justify-between p-6">
            
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-black uppercase tracking-wider">Your Bag ({cartItemCount})</span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items Container */}
              <div className="py-4 overflow-y-auto max-h-[60vh] space-y-3">
                {cart.length === 0 ? (
                  <div className="py-12 text-center text-neutral-500 text-xs uppercase font-bold tracking-wider space-y-2">
                    <p>Your shopping cart drawer is empty</p>
                    <button onClick={() => { setIsCartOpen(false); setActiveTab('shop'); }} className="text-emerald-400 underline lowercase font-medium">browse shop catalog</button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-neutral-900/60 p-3 rounded-xl border border-neutral-900">
                      <div className="space-y-0.5 max-w-[75%]">
                        <h5 className="text-xs font-bold text-neutral-200 uppercase tracking-tight truncate">{item.name}</h5>
                        <p className="text-[11px] font-mono font-medium text-neutral-500">
                          ₱{item.price.toLocaleString()} × {item.quantity}
                        </p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Checkout Matrix Footer */}
            <div className="border-t border-neutral-900 pt-4 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Subtotal:</span>
                <span className="font-mono text-xl font-black text-emerald-400">₱{cartTotal.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-neutral-500 leading-tight"> Shipping computations, taxes, and potential voucher deductions are updated at secure portal gateway execution.</p>
              <button 
                onClick={() => alert(`Order Pipeline Initialized!\nTotal processing value: ₱${cartTotal.toLocaleString()}`)}
                disabled={cart.length === 0}
                className="w-full py-3 rounded-xl bg-emerald-500 disabled:bg-neutral-900 text-neutral-950 disabled:text-neutral-600 font-bold text-xs uppercase tracking-widest shadow-lg transition-all"
              >
                Secure Checkout
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- REAR SITE BRAND FOOTER --- */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-8 px-4 text-center text-neutral-600 font-medium text-xs space-y-4 mt-20">
        <div className="flex justify-center gap-6 text-neutral-500">
          <a href="#instagram" className="hover:text-emerald-400 transition-colors flex items-center gap-1 uppercase tracking-widest text-[10px] font-bold">@capnclouds</a>
        </div>
        <p className="uppercase tracking-widest font-bold text-[10px] text-neutral-700">© 2026 Cap'n Clouds Studio. Built on React & TypeScript.</p>
      </footer>

    </div>
  );
                  }
