
import type { FoodItem, Order, DietaryType } from '@/types';

export const foodItemMoods = ['Comfort', 'Healthy', 'Indulgent', 'Quick Bite', 'Celebratory'] as const;
export const dietaryTypes: DietaryType[] = ['Vegetarian', 'Non-Vegetarian'];

export const initialFoodItems: FoodItem[] = [
  { id: '1', name: 'Espressoo', description: 'Strong and bold classic espresso shot, freshly brewed.', price: 2.50, category: 'Coffee', imageUrl: 'https://placehold.co/80x80.png', mood: 'Quick Bite', isFeatured: true, dietaryType: 'Vegetarian' },
  { id: '2', name: 'Caramel Latte', description: 'Espresso with steamed milk, caramel syrup, and a thin layer of foam.', price: 4.00, category: 'Coffee', imageUrl: 'https://placehold.co/80x80.png', mood: 'Indulgent', isFeatured: false, dietaryType: 'Vegetarian' },
  { id: '3', name: 'Almond Croissant', description: 'Buttery croissant filled with almond paste and topped with sliced almonds.', price: 3.75, category: 'Pastries', imageUrl: 'https://placehold.co/80x80.png', mood: 'Comfort', isFeatured: true, dietaryType: 'Vegetarian' },
  { id: '4', name: 'Chocolate Chip Muffin', description: 'Moist and fluffy muffin packed with rich chocolate chips.', price: 3.25, category: 'Pastries', imageUrl: 'https://placehold.co/80x80.png', isFeatured: false, dietaryType: 'Vegetarian' },
  { id: '5', name: 'Avocado Smash Toast', description: 'Creamy smashed avocado on toasted artisan sourdough bread, seasoned to perfection.', price: 8.50, category: 'Breakfast', imageUrl: 'https://placehold.co/80x80.png', mood: 'Healthy', isFeatured: true, dietaryType: 'Vegetarian' },
  { id: '6', name: 'Chicken Caesar Salad', description: 'Grilled chicken, romaine lettuce, croutons, parmesan, and Caesar dressing.', price: 10.50, category: 'Salads', imageUrl: 'https://placehold.co/80x80.png', mood: 'Healthy', dietaryType: 'Non-Vegetarian' },
];

export const initialOrders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'Alice Smith',
    items: [
      { foodItemId: '1', name: 'Espresso', quantity: 2, price: 2.50 },
      { foodItemId: '3', name: 'Almond Croissant', quantity: 1, price: 3.75 },
    ],
    totalPrice: 8.75,
    orderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    status: 'Delivered',
    deliveryAddress: '123 Willow Creek, Anytown, USA',
  },
  {
    id: 'ORD002',
    customerName: 'Robert Johnson',
    items: [
      { foodItemId: '2', name: 'Caramel Latte', quantity: 1, price: 4.00 },
      { foodItemId: '4', name: 'Chocolate Chip Muffin', quantity: 2, price: 3.25 },
    ],
    totalPrice: 10.50,
    orderDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    status: 'Processing',
    deliveryAddress: '456 Oakwood Drive, Anytown, USA',
  },
  {
    id: 'ORD003',
    customerName: 'Carol White',
    items: [
      { foodItemId: '5', name: 'Avocado Smash Toast', quantity: 1, price: 8.50 },
      { foodItemId: '1', name: 'Espresso', quantity: 1, price: 2.50 },
    ],
    totalPrice: 11.00,
    orderDate: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
    status: 'Pending',
    deliveryAddress: '789 Pinecrest Lane, Anytown, USA',
  },
   {
    id: 'ORD004',
    customerName: 'David Brown',
    items: [
      { foodItemId: '6', name: 'Chicken Caesar Salad', quantity: 1, price: 10.50 },
    ],
    totalPrice: 10.50,
    orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Two days ago
    status: 'Shipped',
    deliveryAddress: '321 Birch Street, Anytown, USA',
  },
];

export const orderStatuses: Order['status'][] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
export const foodCategories: string[] = ['Coffee', 'Tea', 'Pastries', 'Sandwiches', 'Salads', 'Breakfast', 'Lunch', 'Desserts', 'Beverages'];
