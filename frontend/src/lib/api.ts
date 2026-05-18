import type {User, Address, Order, CartItem} from '../context/AppContext';
import type {MenuItem} from '../data/menu';

const API_BASE = import.meta.env.VITE_API_URL ?? '';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as {error?: string}).error ?? `Request failed: ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export type NotificationSettings = {
  notifications: boolean;
  sound: boolean;
  vibrate: boolean;
  specialOffers: boolean;
  payments: boolean;
  cashback: boolean;
  appUpdates: boolean;
};

export type SecuritySettings = {
  rememberPassword: boolean;
  faceId: boolean;
  biometricId: boolean;
};

export type DriverOrderOffer = {
  id: string;
  restaurant: string;
  pickup: string;
  dropoff: string;
  distance: string;
  time: string;
  earnings: number;
  rating: number;
  status: string;
  total: number;
  items: string;
  createdAt: string;
};

export type DriverEarnings = {
  todayEarnings: number;
  weekEarnings: number;
  tripCount: number;
  trips: {id: string; date: string; amount: number; distance: string}[];
};

export type MerchantOrder = {
  id: string;
  date: string;
  status: string;
  total: number;
  items: string;
  customer: string;
};

export const api = {
  menu: {
    list: (q?: string) =>
      request<MenuItem[]>(q ? `/api/menu?q=${encodeURIComponent(q)}` : '/api/menu'),
    get: (id: string) => request<MenuItem>(`/api/menu/${id}`),
  },
  profile: {
    get: () => request<User>('/api/profile'),
    update: (data: Partial<User> & {dateOfBirth?: string; gender?: string}) =>
      request<User>('/api/profile', {method: 'PATCH', body: JSON.stringify(data)}),
  },
  addresses: {
    list: () => request<Address[]>('/api/addresses'),
    create: (data: Omit<Address, 'id'>) =>
      request<Address>('/api/addresses', {method: 'POST', body: JSON.stringify(data)}),
    update: (id: string, data: Partial<Address>) =>
      request<Address>(`/api/addresses/${id}`, {method: 'PATCH', body: JSON.stringify(data)}),
    delete: (id: string) => request<{ok: boolean}>(`/api/addresses/${id}`, {method: 'DELETE'}),
  },
  orders: {
    list: () => request<Order[]>('/api/orders'),
    get: (id: string) => request<Order>(`/api/orders/${id}`),
    create: (data: {items: CartItem[]; total: number; addressId?: string}) =>
      request<Order>('/api/orders', {method: 'POST', body: JSON.stringify(data)}),
    updateStatus: (id: string, status: Order['status']) =>
      request<Order>(`/api/orders/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({status}),
      }),
  },
  favorites: {
    list: () => request<MenuItem[]>('/api/favorites'),
    add: (menuItemId: string) =>
      request<{ok: boolean}>('/api/favorites/' + menuItemId, {method: 'POST'}),
    remove: (menuItemId: string) =>
      request<{ok: boolean}>('/api/favorites/' + menuItemId, {method: 'DELETE'}),
  },
  settings: {
    get: () =>
      request<{notifications: NotificationSettings; security: SecuritySettings}>('/api/settings'),
    update: (data: {
      notifications?: Partial<NotificationSettings>;
      security?: Partial<SecuritySettings>;
    }) =>
      request<{notifications: NotificationSettings; security: SecuritySettings}>('/api/settings', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
  },
  content: {
    help: () => request<{id: number; question: string; answer: string}[]>('/api/content/help'),
    legal: () =>
      request<{
        title: string;
        effectiveDate: string;
        sections: {title: string; body: string}[];
      }>('/api/content/legal'),
  },
  merchant: {
    dashboard: () =>
      request<{
        todaySales: number;
        orderCount: number;
        activeOrders: {id: string; items: string; time: string; status: string; total?: number}[];
      }>('/api/merchant/dashboard'),
    menu: (q?: string) =>
      request<MenuItem[]>(
        q ? `/api/merchant/menu?q=${encodeURIComponent(q)}` : '/api/merchant/menu',
      ),
    createMenuItem: (data: {
      name: string;
      description?: string;
      price: number;
      image?: string;
      category: string;
      available?: boolean;
      prepTime?: string;
    }) =>
      request<MenuItem>('/api/merchant/menu', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateMenuItem: (
      id: string,
      data: {
        price?: number;
        name?: string;
        description?: string;
        available?: boolean;
        image?: string;
        category?: string;
      },
    ) =>
      request<MenuItem>(`/api/merchant/menu/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    deleteMenuItem: (id: string) =>
      request<void>(`/api/merchant/menu/${id}`, {method: 'DELETE'}),
  },
  driver: {
    available: () => request<DriverOrderOffer[]>('/api/driver/available'),
    active: () => request<DriverOrderOffer | null>('/api/driver/active'),
    accept: (orderId: string) =>
      request<DriverOrderOffer>(`/api/driver/orders/${orderId}/accept`, {method: 'POST'}),
    updateStatus: (orderId: string, status: string) =>
      request<DriverOrderOffer>(`/api/driver/orders/${orderId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({status}),
      }),
    earnings: () => request<DriverEarnings>('/api/driver/earnings'),
  },
  paymentDisabled: () => request<{error: string; message: string}>('/api/payment'),
};

export function mapSessionUser(
  sessionUser: {
    id: string;
    name: string;
    email?: string | null;
    image?: string | null;
    role?: string;
    phone?: string;
  },
): User {
  return {
    id: sessionUser.id,
    name: sessionUser.name,
    email: sessionUser.email ?? '',
    phone: sessionUser.phone ?? '',
    avatar: sessionUser.image ?? undefined,
    role: (sessionUser.role as User['role']) ?? 'customer',
  };
}

export function formatMerchantOrder(order: Order): MerchantOrder {
  const itemsSummary = order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ');
  const statusLabel =
    order.status === 'preparing'
      ? 'Preparing'
      : order.status === 'delivering'
        ? 'Ready for Pickup'
        : order.status === 'completed'
          ? 'Delivered'
          : order.status === 'arrived'
            ? 'Arrived'
            : 'New';

  return {
    id: order.id,
    date: order.date,
    status: statusLabel,
    total: order.total,
    items: itemsSummary,
    customer: 'Customer',
  };
}
