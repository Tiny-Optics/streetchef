export type MenuItemDoc = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  rating: number;
  reviews: number;
  prepTime: string;
  options?: {name: string; choices: string[]}[];
};

export const seedMenuItems: MenuItemDoc[] = [
  {
    id: '1',
    name: 'Classic Smash Burger',
    description:
      'Double beef patty, american cheese, caramelized onions, house sauce on a brioche bun.',
    price: 12.99,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    category: 'Burgers',
    popular: true,
    rating: 4.8,
    reviews: 342,
    prepTime: '15-20 min',
    options: [{name: 'Extras', choices: ['Bacon', 'Extra Cheese', 'Jalapenos']}],
  },
  {
    id: '2',
    name: 'Spicy Chicken Sandwich',
    description: 'Crispy fried chicken breast, spicy mayo, pickles, lettuce.',
    price: 11.49,
    image:
      'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&q=80&w=800',
    category: 'Burgers',
    popular: true,
    rating: 4.7,
    reviews: 215,
    prepTime: '15-20 min',
  },
  {
    id: '3',
    name: 'Margherita Pizza',
    description:
      'San Marzano tomato sauce, fresh mozzarella, basil, extra virgin olive oil.',
    price: 14.99,
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800',
    category: 'Pizza',
    rating: 4.9,
    reviews: 189,
    prepTime: '20-25 min',
  },
  {
    id: '4',
    name: 'Pepperoni Pizza',
    description: 'Tomato sauce, mozzarella, double pepperoni, hot honey drizzle.',
    price: 16.99,
    image:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800',
    category: 'Pizza',
    popular: true,
    rating: 4.8,
    reviews: 420,
    prepTime: '20-25 min',
  },
  {
    id: '5',
    name: 'Pad Thai',
    description: 'Rice noodles, egg, peanuts, bean sprouts, tamarind sauce.',
    price: 13.5,
    image:
      'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=800',
    category: 'Asian',
    rating: 4.6,
    reviews: 156,
    prepTime: '15-20 min',
    options: [{name: 'Protein', choices: ['Chicken', 'Shrimp', 'Tofu']}],
  },
  {
    id: '6',
    name: 'Chocolate Lava Cake',
    description:
      'Warm chocolate cake with a gooey center, served with vanilla bean ice cream.',
    price: 7.99,
    image:
      'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800',
    category: 'Desserts',
    rating: 4.9,
    reviews: 89,
    prepTime: '10-15 min',
  },
  {
    id: '7',
    name: 'Sushi Combo Box',
    description:
      'Assorted nigiri and rolls including salmon, tuna, and california roll.',
    price: 24.99,
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
    category: 'Asian',
    popular: true,
    rating: 4.9,
    reviews: 512,
    prepTime: '25-30 min',
  },
  {
    id: '8',
    name: 'Avocado Toast',
    description: 'Sourdough bread, smashed avocado, cherry tomatoes, poached egg.',
    price: 9.5,
    image:
      'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&q=80&w=800',
    category: 'Healthy',
    rating: 4.5,
    reviews: 120,
    prepTime: '10-15 min',
  },
  {
    id: '9',
    name: 'Beef Tacos',
    description:
      'Three soft corn tortillas, seasoned ground beef, pico de gallo, cheese.',
    price: 11.99,
    image:
      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=800',
    category: 'Mexican',
    popular: true,
    rating: 4.7,
    reviews: 280,
    prepTime: '15-20 min',
  },
  {
    id: '10',
    name: 'Iced Caramel Macchiato',
    description: 'Espresso, vanilla syrup, milk, ice, caramel drizzle.',
    price: 5.5,
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800',
    category: 'Drinks',
    rating: 4.8,
    reviews: 450,
    prepTime: '5-10 min',
  },
  {
    id: '11',
    name: 'Caesar Salad',
    description: 'Romaine lettuce, croutons, parmesan cheese, caesar dressing.',
    price: 8.99,
    image:
      'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=800',
    category: 'Healthy',
    rating: 4.4,
    reviews: 95,
    prepTime: '10-15 min',
  },
  {
    id: '12',
    name: 'Chicken Tikka Masala',
    description: 'Roasted marinated chicken chunks in a spiced curry sauce.',
    price: 15.99,
    image:
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800',
    category: 'Asian',
    popular: true,
    rating: 4.9,
    reviews: 620,
    prepTime: '25-35 min',
  },
];
