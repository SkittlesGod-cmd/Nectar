import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ShoppingCart, Trash2, Plus, Minus, ChevronLeft, ChevronRight, Sparkles, Truck, Shield, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppContext } from '@/App';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartCount } = useAppContext();
  const [appliedCode, setAppliedCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal - discount + shipping + tax;

  const validCodes: Record<string, { discount: number; type: 'percent' | 'fixed'; label: string }> = {
    'WELCOME15': { discount: 15, type: 'percent', label: '15% off your first order' },
    'NECTAR10': { discount: 10, type: 'percent', label: '10% off any order' },
    'FREESHIP': { discount: 9.99, type: 'fixed', label: 'Free shipping' },
    'SUBSCRIBE20': { discount: 20, type: 'percent', label: '20% off subscription' },
  };

  const applyPromo = (code: string) => {
    const promo = validCodes[code.toUpperCase()];
    if (promo) {
      if (promo.type === 'percent') {
        setDiscount(Math.round(subtotal * promo.discount / 100 * 100) / 100);
      } else {
        setDiscount(promo.discount);
      }
      setAppliedCode(code.toUpperCase());
      setShowPromo(false);
    }
  };

  const removePromo = () => {
    setAppliedCode('');
    setDiscount(0);
  };

  const isEmpty = cartItems.length === 0;

  if (isEmpty) {
    return (
      <div className="relative min-h-[100dvh] w-full overflow-hidden text-foreground bg-[#0C0C0C] font-sans selection:bg-primary selection:text-black">
        <div
          className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
        <div className="relative z-10 flex flex-col w-full">
          <Navbar />
          <main className="flex-1 pt-24 pb-16 px-6">
            <div className="container mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8"
                >
                  <ShoppingCart className="w-12 h-12 text-white/40" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Your cart is empty
                </h2>
                <p className="text-white/60 text-lg max-w-md mb-10">
                  Looks like you haven't picked any flavors yet. Our yuzu, berry, and cucumber mint are waiting for you.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-[#0C0C0C] font-bold uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                  Browse Flavors
                </Link>
              </motion.div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden text-foreground bg-[#0C0C0C] font-sans selection:bg-primary selection:text-black">
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 flex flex-col w-full">
        <Navbar />

        <main className="flex-1 pt-24 pb-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
              >
                <ChevronLeft className="w-5 h-5" />
                Continue Shopping
              </Link>
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                    Your Cart
                  </h1>
                  <p className="text-white/60 mt-2">
                    {cartCount} item{cartCount !== 1 ? 's' : ''} • Ready to refresh
                  </p>
                </div>
                {cartCount > 0 && (
                  <button
                    onClick={clearCart}
                    className="px-4 py-2 text-white/60 hover:text-red-400 transition-colors font-medium uppercase tracking-wider text-sm flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Cart
                  </button>
                )}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 space-y-4"
              >
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, x: -30, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: 'auto' }}
                      exit={{ opacity: 0, x: 30, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/30 transition-all"
                    >
                      <Link href={`/shop/${item.id}`} className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link href={`/shop/${item.id}`} className="font-bold text-white hover:text-primary transition-colors block mb-1">
                              {item.name}
                            </Link>
                            <span className="text-primary font-bold text-lg">${item.price.toFixed(2)}</span>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all flex-shrink-0"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-5 h-5" />
                            </button>
                            <span className="text-white font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-white/60 hover:text-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                          <span className="text-white font-bold text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>

                {/* Promo Code */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-white">Promo Code</h3>
                  </div>
                  {appliedCode ? (
                    <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <div>
                          <p className="text-green-400 font-bold">{appliedCode}</p>
                          <p className="text-white/60 text-sm">{validCodes[appliedCode]?.label || 'Discount applied'}</p>
                        </div>
                      </div>
                      <button
                        onClick={removePromo}
                        className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        value={showPromo ? appliedCode : ''}
                        onChange={(e) => setAppliedCode(e.target.value.toUpperCase())}
                        onKeyDown={(e) => e.key === 'Enter' && applyPromo(appliedCode)}
                        onFocus={() => setShowPromo(true)}
                        onBlur={() => setTimeout(() => setShowPromo(false), 200)}
                        className="flex-1 bg-white/5 border border-white/10 focus:border-primary focus:outline-none text-white placeholder-white/40 px-4 py-3 rounded-xl transition-colors"
                      />
                      <button
                        onClick={() => applyPromo(appliedCode)}
                        disabled={!appliedCode}
                        className="px-6 py-3 bg-primary text-[#0C0C0C] font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {!appliedCode && (
                    <p className="text-white/50 text-sm mt-4">
                      Try: <span className="text-primary font-medium cursor-pointer hover:underline" onClick={() => { setAppliedCode('WELCOME15'); applyPromo('WELCOME15'); }}>WELCOME15</span>{' '}
                      | <span className="text-primary font-medium cursor-pointer hover:underline" onClick={() => { setAppliedCode('FREESHIP'); applyPromo('FREESHIP'); }}>FREESHIP</span>{' '}
                      | <span className="text-primary font-medium cursor-pointer hover:underline" onClick={() => { setAppliedCode('NECTAR10'); applyPromo('NECTAR10'); }}>NECTAR10</span>
                    </p>
                  )}
                </motion.div>
              </motion.div>

              {/* Order Summary */}
              <motion.aside
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-28 bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    <SummaryRow label="Subtotal" value={`${cartCount} item${cartCount !== 1 ? 's' : ''}`} amount={subtotal} />
                    <SummaryRow label="Discount" value={appliedCode ? appliedCode : '—'} amount={-discount} isDiscount />
                    <SummaryRow label="Shipping" value={shipping === 0 ? 'Free' : 'Standard'} amount={shipping} isFree={shipping === 0} />
                    <SummaryRow label="Estimated Tax" value="8%" amount={tax} />
                  </div>

                  <div className="border-t border-white/10 pt-6 mb-6">
                    <SummaryRow label="Total" value={`${cartCount} item${cartCount !== 1 ? 's' : ''}`} amount={total} isTotal />
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full py-4 bg-primary text-[#0C0C0C] font-bold uppercase tracking-wider rounded-xl text-center block hover:bg-primary/90 transition-colors mb-4"
                  >
                    Proceed to Checkout
                    <ChevronRight className="w-4 h-4 inline ml-2" />
                  </Link>

                  <button className="w-full py-3 border border-white/10 text-white font-medium rounded-xl hover:border-primary/50 hover:bg-white/5 transition-colors">
                    Or continue shopping
                  </button>
                </div>

                {/* Trust Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-6 grid grid-cols-3 gap-4"
                >
                  <TrustBadge icon={Truck} label="Free Shipping" desc="Orders $50+" />
                  <TrustBadge icon={Shield} label="Secure Checkout" desc="SSL Encrypted" />
                  <TrustBadge icon={RotateCcw} label="Easy Returns" desc="30 Days" />
                </motion.div>
              </motion.aside>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
  amount: number;
  isDiscount?: boolean;
  isFree?: boolean;
  isTotal?: boolean;
}

function SummaryRow({ label, value, amount, isDiscount, isFree, isTotal }: SummaryRowProps) {
  return (
    <div className={`flex items-center justify-between ${isTotal ? 'text-xl' : ''}`}>
      <div className="flex items-baseline gap-2">
        <span className={isTotal ? 'font-bold text-white' : 'text-white/70'}>{label}</span>
        <span className={`text-sm ${isDiscount ? 'text-green-400' : isFree ? 'text-primary' : 'text-white/50'}`}>
          {value}
        </span>
      </div>
      <span className={`font-bold ${isTotal ? 'text-white' : isDiscount ? 'text-green-400' : isFree ? 'text-primary' : 'text-white'}`}>
        {isDiscount ? '-' : ''}${Math.abs(amount).toFixed(2)}
      </span>
    </div>
  );
}

interface TrustBadgeProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
}

function TrustBadge({ icon: Icon, label, desc }: TrustBadgeProps) {
  return (
    <div className="text-center p-4 bg-white/5 border border-white/10 rounded-xl hover:border-primary/30 transition-colors">
      <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
      <p className="font-bold text-white text-sm">{label}</p>
      <p className="text-white/50 text-xs">{desc}</p>
    </div>
  );
}