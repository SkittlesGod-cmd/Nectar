import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { ChevronLeft, ShoppingCart, Check, Heart, Share2, Minus, Plus, Truck, RefreshCw, Shield, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { allFlavors, getFlavorById, Flavor } from '@/data/flavors';
import { useAppContext } from '@/App';

export default function ProductDetail() {
  const [params] = useParams();
  const flavor = getFlavorById(params.id);
  const { activeFlavor, setActiveFlavor, addToCart, cartItems } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showMobileImages, setShowMobileImages] = useState(false);

  const inCart = cartItems.find(item => item.id === flavor?.id);
  const cartQuantity = inCart?.quantity || 0;

  useEffect(() => {
    if (flavor) {
      setActiveFlavor(flavor.id);
      document.documentElement.classList.add('dark');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return () => setActiveFlavor(null);
  }, [flavor, setActiveFlavor]);

  if (!flavor) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-[#0C0C0C]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-6"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Flavor Not Found</h1>
          <p className="text-white/60 mb-8">This flavor doesn't exist or hasn't been released yet.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-[#0C0C0C] font-bold rounded-xl hover:bg-primary/90 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </motion.div>
      </div>
    );
  }

  const flavorColors: Record<string, string> = {
    yuzu: 'rgba(242, 201, 76, 0.12)',
    berry: 'rgba(201, 24, 74, 0.12)',
    cucumber: 'rgba(45, 198, 83, 0.12)',
    'blood-orange': 'rgba(255, 87, 34, 0.12)',
    matcha: 'rgba(143, 188, 143, 0.12)',
    hibiscus: 'rgba(232, 62, 140, 0.12)',
  };

  const bgColor = flavorColors[flavor.id] || 'transparent';

  const benefits = [
    { icon: Leaf, title: 'Natural Ingredients', desc: 'No artificial flavors or colors' },
    { icon: RefreshCw, title: 'Sustainably Sourced', desc: 'Ethical farming partnerships' },
    { icon: Shield, title: 'Quality Guaranteed', desc: 'Third-party lab tested' },
    { icon: Truck, title: 'Fast Shipping', desc: 'Free on orders $50+' },
  ];

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden text-foreground bg-[#0C0C0C] font-sans selection:bg-primary selection:text-black">
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ backgroundColor: 'transparent' }}
        animate={{ backgroundColor: bgColor }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 flex flex-col w-full">
        <Navbar />

        <main className="flex-1 pt-24 pb-16 px-6">
          <div className="container mx-auto max-w-7xl">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center gap-2 text-sm text-white/50">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronLeft className="w-3 h-3" />
                  <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronLeft className="w-3 h-3" />
                  <span className="text-white font-medium">{flavor.name}</span>
                </li>
              </ol>
            </motion.nav>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative sticky top-24"
              >
                {/* Main Image */}
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <img
                    src={flavor.image}
                    alt={flavor.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    style={{ transform: 'scale(1.02)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Badge */}
                  {flavor.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        flavor.badge === 'bestseller' ? 'bg-yellow-400 text-black' :
                        flavor.badge === 'new' ? 'bg-pink-500 text-white' :
                        'bg-orange-500 text-white'
                      }`}>
                        {flavor.badge === 'bestseller' ? 'Best Seller' :
                         flavor.badge === 'new' ? 'New' : 'Limited'}
                      </span>
                    </div>
                  )}

                  {!flavor.isReleased && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white/60 backdrop-blur-sm border border-white/10">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-3 mt-4 overflow-x-auto pb-4 hidden md:flex">
                  {[
                    flavor.image,
                    `https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&q=90&fit=crop`,
                    `https://images.unsplash.com/photo-1580476064213-73e8b4d4e891?w=400&q=90&fit=crop`,
                  ].map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === i ? 'border-primary' : 'border-white/10 hover:border-white/30'
                      }`}
                      aria-label={`View image ${i + 1}`}
                      aria-current={selectedImage === i ? 'true' : 'false'}
                    >
                      <img src={img} alt={`${flavor.alt} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Mobile Image Swiper */}
                <div className="md:hidden mt-4">
                  <button
                    onClick={() => setShowMobileImages(!showMobileImages)}
                    className="w-full py-2 text-white/60 hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    {showMobileImages ? 'Hide' : 'View'} Gallery ({3} images)
                  </button>
                  {showMobileImages && (
                    <div className="flex gap-3 mt-4 overflow-x-auto pb-4">
                      {[
                        flavor.image,
                        `https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&q=90&fit=crop`,
                        `https://images.unsplash.com/photo-1580476064213-73e8b4d4e891?w=400&q=90&fit=crop`,
                      ].map((img, i) => (
                        <div key={i} className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden border-2 border-white/10">
                          <img src={img} alt={`${flavor.alt} ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-2 mb-4">
                  {flavor.badge && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      flavor.badge === 'bestseller' ? 'bg-yellow-400 text-black' :
                      flavor.badge === 'new' ? 'bg-pink-500 text-white' :
                      'bg-orange-500 text-white'
                    }`}>
                      {flavor.badge === 'bestseller' ? 'Best Seller' :
                       flavor.badge === 'new' ? 'New Release' : 'Limited Edition'}
                    </span>
                  )}
                  {!flavor.isReleased && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white/60 border border-white/10">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
                  {flavor.name}
                </h1>

                <p className="text-lg md:text-xl text-white/70 mb-6 leading-relaxed">
                  {flavor.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-4xl md:text-5xl font-bold text-white">{flavor.price}</span>
                  <span className="text-white/50">/ can</span>
                  {flavor.priceValue && flavor.priceValue > 2.99 && (
                    <span className="text-sm text-white/40 line-through ml-2">$2.99</span>
                  )}
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-xl font-bold text-white w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  <motion.button
                    onClick={() => flavor.isReleased ? addToCart({
                      id: flavor.id,
                      name: flavor.name,
                      price: flavor.priceValue || 2.99,
                      image: flavor.image,
                    }) : null}
                    disabled={!flavor.isReleased}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all ${
                      flavor.isReleased
                        ? 'bg-primary text-[#0C0C0C] hover:bg-primary/90'
                        : 'bg-white/5 text-white/50 border border-white/10 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {flavor.isReleased 
                      ? (cartQuantity > 0 ? (
                          <>
                            <Check className="w-5 h-5" />
                            Added ({cartQuantity})
                          </>
                        ) : 'Add to Cart')
                      : 'Notify Me'}
                  </motion.button>
                </div>

                {/* Wishlist & Share */}
                <div className="flex gap-3 mb-10 pb-8 border-b border-white/10">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                    <Heart className="w-5 h-5" />
                    Save
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all"
                    >
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <benefit.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{benefit.title}</h4>
                        <p className="text-sm text-white/50">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Product Details Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16"
            >
              <ProductDetailsTabs flavor={flavor} />
            </motion.div>

            {/* Related Flavors */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-20"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h2 className="text-3xl font-bold text-white">You Might Also Like</h2>
                </div>
                <Link
                  href="/shop"
                  className="text-primary hover:text-yellow-300 font-bold uppercase tracking-wider text-sm flex items-center gap-1"
                >
                  View All <ChevronLeft className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {allFlavors
                  .filter(f => f.id !== flavor.id && f.isReleased)
                  .slice(0, 3)
                  .map((relatedFlavor, i) => (
                    <motion.article
                      key={relatedFlavor.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                      className="group relative overflow-hidden border border-white/10 rounded-2xl bg-white/5 hover:border-primary/50 transition-all"
                    >
                      <Link href={`/shop/${relatedFlavor.id}`} className="block">
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={relatedFlavor.image}
                            alt={relatedFlavor.alt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-white mb-1">{relatedFlavor.name}</h3>
                          <p className="text-white/60 text-sm mb-3">{relatedFlavor.shortDescription}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-primary font-bold text-lg">{relatedFlavor.price}</span>
                            <span className="text-white/40 text-sm">/ can</span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
              </div>
            </motion.section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

function ProductDetailsTabs({ flavor }: { flavor: Flavor }) {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'nutrition' | 'story'>('ingredients');

  const tabs = [
    { id: 'ingredients', label: 'Ingredients', icon: Leaf },
    { id: 'nutrition', label: 'Nutrition', icon: Shield },
    { id: 'story', label: 'Our Process', icon: RefreshCw },
  ] as const;

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
      {/* Tab Buttons */}
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-bold uppercase tracking-wider text-sm transition-all relative ${
              activeTab === tab.id
                ? 'text-primary'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="p-8"
        >
          {activeTab === 'ingredients' && (
            <IngredientsPanel flavor={flavor} />
          )}
          {activeTab === 'nutrition' && (
            <NutritionPanel flavor={flavor} />
          )}
          {activeTab === 'story' && (
            <StoryPanel flavor={flavor} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function IngredientsPanel({ flavor }: { flavor: Flavor }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-4">What's Inside</h3>
        <p className="text-white/60 mb-6">
          We believe in transparency. Every ingredient serves a purpose—no fillers, no artificial flavors, no compromises.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {flavor.ingredients.map((ingredient, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-white">{ingredient}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-white/10">
        <h3 className="text-lg font-bold text-white mb-4">Free From</h3>
        <div className="flex flex-wrap gap-2">
          {['Artificial Sweeteners', 'Artificial Colors', 'Preservatives', 'High Fructose Corn Syrup', 'GMOs', 'Gluten'].map((item, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-white/70"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function NutritionPanel({ flavor }: { flavor: Flavor }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 md:gap-8">
        <NutritionCard label="Calories" value={flavor.nutrition.calories} unit="per can" color="#F2C94C" />
        <NutritionCard label="Sugar" value={flavor.nutrition.sugar} unit="g per can" color="#C9184A" />
        <NutritionCard label="Caffeine" value={flavor.nutrition.caffeine} unit="mg per can" color="#2DC653" />
      </div>

      <div className="pt-6 border-t border-white/10">
        <h3 className="text-lg font-bold text-white mb-4">Compared to Average Soda</h3>
        <div className="space-y-4">
          <ComparisonBar label="Sugar" value={flavor.nutrition.sugar} max={39} unit="g" color="#C9184A" />
          <ComparisonBar label="Calories" value={flavor.nutrition.calories} max={150} unit="kcal" color="#F2C94C" />
          <ComparisonBar label="Caffeine" value={flavor.nutrition.caffeine} max={50} unit="mg" color="#2DC653" />
        </div>
      </div>
    </div>
  );
}

function NutritionCard({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  return (
    <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
      <div className="text-4xl md:text-5xl font-bold text-white mb-1" style={{ color }}>
        {value}
      </div>
      <div className="text-white/50 text-sm mb-1">{unit}</div>
      <div className="text-white/70 font-medium">{label}</div>
    </div>
  );
}

function ComparisonBar({ label, value, max, unit, color }: { label: string; value: number; max: number; unit: string; color: string }) {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-white/70">{label}</span>
        <span className="text-white font-medium">{value}{unit} vs {max}{unit} avg</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function StoryPanel({ flavor }: { flavor: Flavor }) {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <p className="text-white/70 leading-relaxed text-lg">
          Every NECTAR flavor begins with a question: <span className="text-white font-medium">What does this fruit taste like at its absolute peak?</span>
        </p>
        <p className="text-white/70 leading-relaxed text-lg mt-4">
          We travel to the source—Japanese yuzu orchards in Kochi, wild berry patches in the Pacific Northwest, English cucumber greenhouses in Kent. We taste hundreds of varieties, measuring brix levels, aromatic compounds, and acidity profiles until we find the one.
        </p>
        <p className="text-white/70 leading-relaxed text-lg mt-4">
          Then we strip it down. No masking agents. No "natural flavors" that aren't. Just the fruit, a touch of organic cane sugar for balance, and carbonation to lift the aromatics to your nose before the first sip.
        </p>
        <p className="text-white/70 leading-relaxed text-lg mt-4">
          The result? A sparkling water that tastes like the fruit itself—brighter, cleaner, more alive than anything on the shelf.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
        {[
          { title: 'Sourced', desc: 'Direct from growers', icon: Leaf },
          { title: 'Pressed', desc: 'Cold-pressed within 24hrs', icon: RefreshCw },
          { title: 'Bottled', desc: 'Small batches, fresh weekly', icon: Shield },
        ].map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
          >
            <div className="mx-auto mb-3 p-3 bg-primary/20 rounded-xl w-fit">
              <step.icon className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold text-white mb-1">{step.title}</h4>
            <p className="text-white/60 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}