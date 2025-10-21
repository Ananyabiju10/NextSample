
export type DietaryType = 'Vegetarian' | 'Non-Vegetarian';

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  mood?: string;
  isFeatured?: boolean;
  dietaryType?: DietaryType;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  foodItemId: string;
  name: string; // Name of the food item at the time of order
  quantity: number;
  price: number; // Price per item at the time of order
}

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  totalPrice: number;
  orderDate: string; // ISO string format for date
  status: OrderStatus;
  deliveryAddress: string;
}
