import {useEffect, useState} from 'react';
import {api} from '../lib/api';
import {menuItems as fallbackMenu, type MenuItem} from '../data/menu';

export function useMenu() {
  const [items, setItems] = useState<MenuItem[]>(fallbackMenu);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.menu
      .list()
      .then(setItems)
      .catch(() => setItems(fallbackMenu))
      .finally(() => setLoading(false));
  }, []);

  return {items, loading};
}

export function useMenuItem(id: string | undefined) {
  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    api.menu
      .get(id)
      .then(setItem)
      .catch(() => {
        const fallback = fallbackMenu.find((m) => m.id === id);
        setItem(fallback ?? null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return {item, loading};
}
