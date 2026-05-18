import React, {createContext, useContext, useState, useEffect, ReactNode, useCallback} from 'react';
import {useSession, signOut} from '../lib/auth-client';
import {api, mapSessionUser} from '../lib/api';

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
  authLoading: boolean;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  paymentMethods: PaymentMethod[];
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => Promise<Order>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  favoriteIds: Set<string>;
  toggleFavorite: (menuItemId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {data: session, isPending: authLoading} = useSession();
  const [user, setUserState] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods] = useState<PaymentMethod[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
  };

  const refreshUserData = useCallback(async () => {
    if (!session?.user) {
      setUserState(null);
      setAddresses([]);
      setOrders([]);
      setFavoriteIds(new Set());
      return;
    }

    setUserState(mapSessionUser(session.user));

    try {
      const [addrs, ords, favs] = await Promise.all([
        api.addresses.list(),
        api.orders.list(),
        api.favorites.list(),
      ]);
      setAddresses(addrs);
      setOrders(ords);
      setFavoriteIds(new Set(favs.map((f) => f.id)));
    } catch {
      // User may not have data yet
    }
  }, [session?.user]);

  useEffect(() => {
    if (authLoading) return;
    refreshUserData();
  }, [authLoading, refreshUserData]);

  const logout = async () => {
    await signOut();
    setUserState(null);
    setAddresses([]);
      setOrders([]);
      setFavoriteIds(new Set());
      setCart([]);
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? {...i, quantity: i.quantity + item.quantity} : i,
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? {...item, quantity} : item)));
  };

  const clearCart = () => setCart([]);

  const addAddress = async (address: Omit<Address, 'id'>) => {
    const created = await api.addresses.create(address);
    setAddresses((prev) => [...prev, created]);
  };

  const addOrder = async (order: Omit<Order, 'id' | 'date'> & {addressId?: string}) => {
    const defaultAddr = addresses.find((a) => a.isDefault) ?? addresses[0];
    const created = await api.orders.create({
      items: order.items,
      total: order.total,
      addressId: order.addressId ?? defaultAddr?.id,
    });
    setOrders((prev) => [created, ...prev]);
    return created;
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    const updated = await api.orders.updateStatus(id, status);
    setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
  };

  const toggleFavorite = async (menuItemId: string) => {
    const isFav = favoriteIds.has(menuItemId);
    if (isFav) {
      await api.favorites.remove(menuItemId);
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        next.delete(menuItemId);
        return next;
      });
    } else {
      await api.favorites.add(menuItemId);
      setFavoriteIds((prev) => new Set(prev).add(menuItemId));
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        authLoading,
        logout,
        refreshUserData,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addresses,
        addAddress,
        paymentMethods,
        orders,
        addOrder,
        updateOrderStatus,
        favoriteIds,
        toggleFavorite,
      }}
    >
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
