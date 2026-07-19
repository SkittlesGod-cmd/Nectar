export interface Flavor {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  color: string;
  price: string;
  image: string;
  alt: string;
  badge?: 'new' | 'limited' | 'bestseller';
  ingredients: string[];
  nutrition: {
    calories: number;
    sugar: number;
    caffeine: number;
  };
  isReleased: boolean;
  releaseDate?: string;
}

export const releasedFlavors: Flavor[] = [
  {
    id: 'yuzu',
    name: 'Yuzu Citrus',
    description: 'A bright, aromatic Japanese citrus that balances tart yuzu with a hint of honey. Refreshing, sophisticated, and unlike anything you\'ve tasted.',
    shortDescription: 'Bright Japanese citrus with honey notes',
    color: '#F2C94C',
    price: '$2.99',
    priceValue: 2.99,
    image: '/yuzu-citrus.jpg',
    alt: 'Yuzu citrus fruits on a tree',
    badge: 'bestseller',
    ingredients: ['Carbonated water', 'Yuzu juice (12%)', 'Organic cane sugar', 'Natural flavors', 'Citric acid'],
    nutrition: { calories: 45, sugar: 11, caffeine: 0 },
    isReleased: true,
  },
  {
    id: 'berry',
    name: 'Wild Berry',
    description: 'A deep, jammy blend of foraged blackberries, blueberries, and raspberries. Rich antioxidant profile with a perfectly balanced sweet-tart finish.',
    shortDescription: 'Foraged blackberry, blueberry, raspberry blend',
    color: '#C9184A',
    price: '$2.99',
    priceValue: 2.99,
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&q=90&fit=crop',
    alt: 'Collection of wild berries – blackberries, blueberries, raspberries',
    badge: 'new',
    ingredients: ['Carbonated water', 'Mixed berry juice concentrate (15%)', 'Organic cane sugar', 'Natural flavors', 'Citric acid'],
    nutrition: { calories: 50, sugar: 12, caffeine: 0 },
    isReleased: true,
  },
  {
    id: 'cucumber',
    name: 'Cucumber Mint',
    description: 'Crisp English cucumber meets cool garden mint. The ultimate palate cleanser—light, herbaceous, and impossibly refreshing.',
    shortDescription: 'English cucumber with cool garden mint',
    color: '#2DC653',
    price: '$2.99',
    priceValue: 2.99,
    image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&q=90&fit=crop',
    alt: 'Fresh cucumber and mint leaves in sparkling water',
    ingredients: ['Carbonated water', 'Cucumber essence (8%)', 'Mint extract', 'Organic cane sugar', 'Natural flavors', 'Citric acid'],
    nutrition: { calories: 35, sugar: 8, caffeine: 0 },
    isReleased: true,
  },
];

export const upcomingFlavors: Flavor[] = [
  {
    id: 'pink-grapefruit',
    name: 'Pink Grapefruit',
    description: 'Vibrant Ruby Red grapefruit essence with a clean, crisp finish. Bright citrus oils dance on the palate—tart, tangy, and effortlessly refreshing.',
    shortDescription: 'Ruby Red grapefruit with bright citrus oils',
    color: '#E94E77',
    price: '$3.49',
    priceValue: 3.49,
    image: 'https://images.unsplash.com/photo-1613534785904-a078a77c59f5?w=800&q=90&fit=crop',
    alt: 'Pink grapefruit halves and slices with sparkling water',
    badge: 'limited',
    ingredients: ['Carbonated water', 'Pink grapefruit essence (12%)', 'Organic cane sugar', 'Natural flavors', 'Citric acid'],
    nutrition: { calories: 45, sugar: 11, caffeine: 0 },
    isReleased: false,
    releaseDate: '2026-01-15',
  },
  {
    id: 'blackberry-lavender',
    name: 'Blackberry Lavender',
    description: 'Wild Pacific Northwest blackberries meet fragrant French lavender. Deep, jammy fruit balanced by delicate floral notes—sophisticated and unexpected.',
    shortDescription: 'Wild blackberries with French lavender',
    color: '#6B4E8C',
    price: '$3.49',
    priceValue: 3.49,
    image: 'https://images.unsplash.com/photo-1581639218041-14148c7c76a0?w=800&q=90&fit=crop',
    alt: 'Fresh blackberries with lavender sprigs and sparkling water',
    badge: 'limited',
    ingredients: ['Carbonated water', 'Blackberry juice concentrate (13%)', 'Lavender extract', 'Organic cane sugar', 'Natural flavors', 'Citric acid'],
    nutrition: { calories: 50, sugar: 12, caffeine: 0 },
    isReleased: false,
    releaseDate: '2026-02-01',
  },
  {
    id: 'watermelon-mint',
    name: 'Watermelon Mint',
    description: 'Juicy seedless watermelon paired with cool garden mint. The taste of summer in a can—sweet, crisp, and impossibly refreshing.',
    shortDescription: 'Seedless watermelon with cool garden mint',
    color: '#FF6B6B',
    price: '$3.49',
    priceValue: 3.49,
    image: 'https://images.unsplash.com/photo-1597848212624-4b4757e9a35b?w=800&q=90&fit=crop',
    alt: 'Watermelon slices with fresh mint leaves and sparkling water',
    badge: 'limited',
    ingredients: ['Carbonated water', 'Watermelon essence (11%)', 'Mint extract', 'Organic cane sugar', 'Natural flavors', 'Citric acid'],
    nutrition: { calories: 40, sugar: 10, caffeine: 0 },
    isReleased: false,
    releaseDate: '2026-03-01',
  },
];

export const allFlavors = [...releasedFlavors, ...upcomingFlavors];

export function getFlavorById(id: string): Flavor | undefined {
  return allFlavors.find(f => f.id === id);
}