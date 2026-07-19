import { useState, createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Home from '@/pages/Home';
import ProductCatalog from '@/pages/ProductCatalog';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Contact from '@/pages/Contact';

const queryClient = new QueryClient();

// Create App Context for cart and flavor
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface AppContextType {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  activeFlavor: string | null;
  setActiveFlavor: React.Dispatch<React.SetStateAction<string | null>>;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={ProductCatalog} />
      <Route path="/shop/:id" component={ProductDetail} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [activeFlavor, setActiveFlavor] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartCount(prev => prev + 1);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item) setCartCount(c => c - item.quantity);
      return prev.filter(i => i.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item) {
        setCartCount(c => c - item.quantity + quantity);
        return prev.map(i => i.id === id ? { ...i, quantity } : i);
      }
      return prev;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContext.Provider value={{ 
          cartCount, setCartCount, 
          activeFlavor, setActiveFlavor,
          cartItems, setCartItems,
          addToCart, removeFromCart, updateQuantity, clearCart
        }}>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
        </AppContext.Provider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
