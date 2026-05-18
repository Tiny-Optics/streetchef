import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role?: 'customer' | 'driver' | 'merchant';
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  options?: string[];
};

export type Address = {
  id: string;
  title: string;
  address: string;
  isDefault: boolean;
};

export type PaymentMethod = {
  id: string;
  type: 'card' | 'paypal' | 'applepay';
  last4?: string;
  brand?: string;
  isDefault: boolean;
};

export type Order = {
  id: string;
  date: string;
  status: 'preparing' | 'delivering' | 'arrived' | 'completed';
  total: number;
  items: CartItem[];
};

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  addresses: Address[];
  addAddress: (address: Address) => void;
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: PaymentMethod) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', title: 'Home', address: '12 Long Street, Cape Town, 8001', isDefault: true },
    { id: '2', title: 'Work', address: '1 Sandton Drive, Sandton, Johannesburg, 2196', isDefault: false },
  ]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'card', brand: 'mastercard', last4: '4242', isDefault: true },
    { id: '2', type: 'paypal', isDefault: false },
  ]);
  const [orders, setOrders] = useState<Order[]>([]);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const addAddress = (address: Address) => setAddresses(prev => [...prev, address]);
  const addPaymentMethod = (method: PaymentMethod) => setPaymentMethods(prev => [...prev, method]);
  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);
  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <AppContext.Provider value={{
      user, setUser,
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      addresses, addAddress,
      paymentMethods, addPaymentMethod,
      orders, addOrder, updateOrderStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
