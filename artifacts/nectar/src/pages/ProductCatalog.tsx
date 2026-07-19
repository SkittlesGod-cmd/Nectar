import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ShoppingCart, Sparkles, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { allFlavors, Flavor } from '@/data/flavors';
import { useAppContext } from '@/App';

const flavorColors: Record<string, string> = {
  yuzu: 'rgba(242, 201, 76, 0.12)',
  berry: 'rgba(201, 24, 74, 0.12)',
  cucumber: 'rgba(45, 198, 83, 0.12)',
  'blood-orange': 'rgba(255, 87, 34, 0.12)',
  matcha: 'rgba(143, 188, 143, 0.12)',
  hibiscus: 'rgba(232, 62, 140, 0.12)',
};

export default function ProductCatalog() {
  const { activeFlavor, setActiveFlavor, cartItems, addToCart } = useAppContext();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'released' | 'upcoming'>('all');

  const bgColor = activeFlavor && flavorColors[activeFlavor] ? flavorColors[activeFlavor] : 'transparent';

  const filteredFlavors = allFlavors.filter(f => {
    if (filter === 'released') return f.isReleased;
    if (filter === 'upcoming') return !f.isReleased;
    return true;
  });

  const releasedFlavors = filteredFlavors.filter(f => f.isReleased);
  const upcomingFlavors = filteredFlavors.filter(f => !f.isReleased);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium uppercase tracking-wider mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                Our Collection
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
                Discover Our
                <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-green-400 bg-clip-text text-transparent">
                  Flavors
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
                Crafted with real fruit, botanicals, and a obsession for balance.
                Three signature flavors available now, with more coming soon.
              </p>
            </motion.div>

            {/* View Mode & Filter Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12"
            >
              <div className="flex items-center gap-2">
                <label htmlFor="filter" className="text-sm font-medium text-white/60 mr-2">Filter:</label>
                <select
                  id="filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as typeof filter)}
                  className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="all">All Flavors</option>
                  <option value="released">Available Now</option>
                  <option value="upcoming">Coming Soon</option>
                </select>
              </div>

              <div className="flex items-center gap-4 ml-auto">
                <span className="text-sm text-white/50 hidden sm:block">
                  View as:
                </span>
                <div className="flex bg-white/5 border border-white/10 rounded-lg p-1" role="radiogroup">
                  <button
                    role="radio"
                    aria-checked={viewMode === 'grid'}
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'grid'
                        ? 'bg-primary text-[#0C0C0C]'
                        : 'text-white/60 hover:text-white'
                    }`}
                    aria-label="Grid view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    role="radio"
                    aria-checked={viewMode === 'list'}
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'list'
                        ? 'bg-primary text-[#0C0C0C]'
                        : 'text-white/60 hover:text-white'
                    }`}
                    aria-label="List view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Released Flavors */}
            {releasedFlavors.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                id="available"
                className="mb-20"
              >
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-primary rounded-full" />
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                      Available Now
                    </h2>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {releasedFlavors.length} flavor{releasedFlavors.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {releasedFlavors.map((flavor, index) => (
                      <FlavorCard
                        key={flavor.id}
                        flavor={flavor}
                        index={index}
                        onAddToCart={addToCart}
                        inCart={cartItems.some(item => item.id === flavor.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {releasedFlavors.map((flavor, index) => (
                      <FlavorListItem
                        key={flavor.id}
                        flavor={flavor}
                        index={index}
                        onAddToCart={addToCart}
                        inCart={cartItems.some(item => item.id === flavor.id)}
                      />
                    ))}
                  </div>
                )}
              </motion.section>
            )}

            {/* Upcoming Flavors */}
            {upcomingFlavors.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                id="upcoming"
                className="mb-20"
              >
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-primary rounded-full" />
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                      Coming Soon
                    </h2>
                  </div>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/60 text-sm font-medium rounded-full">
                    {upcomingFlavors.length} flavor{upcomingFlavors.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingFlavors.map((flavor, index) => (
                    <UpcomingFlavorCard
                      key={flavor.id}
                      flavor={flavor}
                      index={index}
                    />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-center mt-12"
                >
                  <p className="text-white/60 mb-4 max-w-xl mx-auto">
                    Want first access? Join our newsletter for exclusive early drops and subscriber-only flavors.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-[#0C0C0C] font-bold uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Notify Me <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.section>
            )}

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(242,201,76,0.1) 0%, rgba(201,24,74,0.1) 50%, rgba(45,198,83,0.1) 100%)' }}
            >
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium uppercase tracking-wider mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Subscribe & Save
                </div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                  Get 15% off + free shipping on recurring orders
                </h3>
                <p className="text-white/60 text-lg mb-8">
                  Choose your frequency, pause anytime. Never run out of your favorite flavor.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0C0C0C] font-bold uppercase tracking-wider rounded-lg hover:bg-white/90 transition-colors"
                >
                  Start Subscription <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

interface FlavorCardProps {
  flavor: Flavor;
  index: number;
  onAddToCart: (item: { id: string; name: string; price: number; image: string }) => void;
  inCart: boolean;
}

function FlavorCard({ flavor, index, onAddToCart, inCart }: FlavorCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/30"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/shop/${flavor.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br"
            style={{ background: `linear-gradient(135deg, ${flavor.color} 0%, ${flavor.color}CC 100%)` }}
          />
          <img
            src={flavor.image}
            alt={flavor.alt}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
            loading="lazy"
          />
          <AnimatePresence mode="wait">
            {flavor.badge && (
              <motion.span
                key={flavor.badge}
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                  flavor.badge === 'new' ? 'bg-primary text-[#0C0C0C]' :
                  flavor.badge === 'limited' ? 'bg-pink-500 text-white' :
                  'bg-white/20 text-white backdrop-blur-sm'
                }`}
              >
                {flavor.badge}
              </motion.span>
            )}
          </AnimatePresence>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label="Quick view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
              {flavor.name}
            </h3>
            <span className="text-2xl font-bold text-primary">{flavor.price}</span>
          </div>
          <p className="text-white/60 text-sm mb-4 line-clamp-2">{flavor.shortDescription}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {flavor.ingredients.slice(0, 3).map((ing, i) => (
              <span key={i} className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/10">
                {ing}
              </span>
            ))}
            {flavor.ingredients.length > 3 && (
              <span className="px-2 py-1 bg-white/5 text-white/40 text-xs rounded-full border border-white/10">
                +{flavor.ingredients.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-6 pb-6">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart({ id: flavor.id, name: flavor.name, price: flavor.priceValue, image: flavor.image });
          }}
          disabled={inCart}
          className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider transition-all ${
            inCart
              ? 'bg-green-500 text-white cursor-default'
              : 'bg-primary text-[#0C0C0C] hover:bg-primary/90'
          }`}
        >
          {inCart ? (
            <>
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 inline mr-2" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}

interface FlavorListItemProps {
  flavor: Flavor;
  index: number;
  onAddToCart: (item: { id: string; name: string; price: number; image: string }) => void;
  inCart: boolean;
}

function FlavorListItem({ flavor, index, onAddToCart, inCart }: FlavorListItemProps) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-primary/30 transition-all"
    >
      <Link href={`/shop/${flavor.id}`} className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br"
          style={{ background: `linear-gradient(135deg, ${flavor.color} 0%, ${flavor.color}CC 100%)` }}
        />
        <img
          src={flavor.image}
          alt={flavor.alt}
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
              {flavor.name}
            </h3>
            <p className="text-white/60 text-sm mt-1">{flavor.shortDescription}</p>
          </div>
          <span className="text-2xl font-bold text-primary flex-shrink-0">{flavor.price}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {flavor.ingredients.slice(0, 4).map((ing, i) => (
            <span key={i} className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/10">
              {ing}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-shrink-0">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart({ id: flavor.id, name: flavor.name, price: flavor.priceValue, image: flavor.image });
          }}
          disabled={inCart}
          className={`px-6 py-2.5 rounded-lg font-bold uppercase tracking-wider text-sm transition-all ${
            inCart
              ? 'bg-green-500 text-white cursor-default'
              : 'bg-primary text-[#0C0C0C] hover:bg-primary/90'
          }`}
        >
          {inCart ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </motion.article>
  );
}

interface UpcomingFlavorCardProps {
  flavor: Flavor;
  index: number;
}

function UpcomingFlavorCard({ flavor, index }: UpcomingFlavorCardProps) {
  const [hovered, setHovered] = useState(false);
  const releaseDate = flavor.releaseDate ? new Date(flavor.releaseDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'TBA';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/30"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br"
          style={{ background: `linear-gradient(135deg, ${flavor.color} 0%, ${flavor.color}CC 100%)` }}
        />
        <img
          src={flavor.image}
          alt={flavor.alt}
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 ease-out filter grayscale"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-4">
              <Clock className="w-8 h-8 text-white/80" />
            </div>
            <p className="text-white font-medium uppercase tracking-wider text-sm mb-1">Releasing</p>
            <p className="text-2xl font-bold text-white">{releaseDate}</p>
          </motion.div>
        </div>
        <AnimatePresence mode="wait">
          {flavor.badge && (
            <motion.span
              key={flavor.badge}
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                flavor.badge === 'limited' ? 'bg-pink-500 text-white' :
                'bg-white/20 text-white backdrop-blur-sm'
              }`}
            >
              {flavor.badge}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white">{flavor.name}</h3>
          <span className="text-xl font-bold text-white/50">{flavor.price}</span>
        </div>
        <p className="text-white/60 text-sm mb-4">{flavor.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {flavor.ingredients.slice(0, 3).map((ing, i) => (
            <span key={i} className="px-2 py-1 bg-white/5 text-white/50 text-xs rounded-full border border-white/10">
              {ing}
            </span>
          ))}
        </div>
        <button className="w-full py-3 rounded-xl font-bold uppercase tracking-wider bg-white/5 text-white/50 border border-white/10 cursor-not-allowed">
          <span className="flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Coming Soon
          </span>
        </button>
      </div>
    </motion.article>
  );
}