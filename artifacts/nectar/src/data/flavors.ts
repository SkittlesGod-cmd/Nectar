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
    id: 'blood-orange',
    name: 'Blood Orange Chili',
    description: 'Sicilian blood orange with a whisper of bird\'s eye chili. Sweet, smoky, with a slow-building warmth that lingers.',
    shortDescription: 'Sicilian blood orange with bird\'s eye chili',
    color: '#FF6B35',
    price: '$3.49',
    priceValue: 3.49,
    image: 'https://images.unsplash.com/photo-1618897996318-5a901fa6ef58?w=800&q=90&fit=crop',
    alt: 'Blood orange slices with chili flakes',
    badge: 'limited',
    ingredients: ['Carbonated water', 'Blood orange juice (14%)', 'Chili extract', 'Organic cane sugar', 'Natural flavors', 'Citric acid'],
    nutrition: { calories: 55, sugar: 13, caffeine: 0 },
    isReleased: false,
    releaseDate: '2025-01-15',
  },
  {
    id: 'hibiscus',
    name: 'Hibiscus Rose',
    description: 'Floral hibiscus petals steeped with Damascus rose water. Tart, perfumed, and elegantly pink—like drinking a sunset.',
    shortDescription: 'Hibiscus petals with Damascus rose water',
    color: '#E83E8C',
    price: '$3.49',
    priceValue: 3.49,
    image: 'https://images.unsplash.com/photo-1581639218041-14148c7c76a0?w=800&q=90&fit=crop',
    alt: 'Dried hibiscus flowers and rose petals',
    ingredients: ['Carbonated water', 'Hibiscus extract (10%)', 'Rose water', 'Organic cane sugar', 'Natural flavors', 'Citric acid'],
    nutrition: { calories: 40, sugar: 10, caffeine: 0 },
    isReleased: false,
    releaseDate: '2025-02-01',
  },
  {
    id: 'matcha',
    name: 'Matcha Lime',
    description: 'Ceremonial-grade Uji matcha brightened with Persian lime. Earthy umami meets citrus zing—energizing without the jitters.',
    shortDescription: 'Uji matcha with Persian lime',
    color: '#8FBC8F',
    price: '$3.99',
    priceValue: 3.99,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616ba?w=800&q=90&fit=crop',
    alt: 'Green matcha powder and fresh lime',
    badge: 'limited',
    ingredients: ['Carbonated water', 'Ceremonial matcha (2%)', 'Lime juice', 'Organic cane sugar', 'Natural flavors', 'Citric acid'],
    nutrition: { calories: 45, sugar: 11, caffeine: 35 },
    isReleased: false,
    releaseDate: '2025-03-01',
  },
];

export const allFlavors = [...releasedFlavors, ...upcomingFlavors];

export function getFlavorById(id: string): Flavor | undefined {
  return allFlavors.find(f => f.id === id);
}