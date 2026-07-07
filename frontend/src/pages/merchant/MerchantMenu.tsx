import React, {useState, useEffect, useMemo, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft, Plus, Edit2, Search, Trash2, X, ImagePlus} from 'lucide-react';
import {motion, AnimatePresence} from 'motion/react';
import {api, resolveImageUrl} from '../../lib/api';
import {categories} from '../../data/menu';
import type {MenuItem} from '../../data/menu';

type ItemForm = {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
};

const emptyForm: ItemForm = {
  name: '',
  description: '',
  price: '',
  image: '',
  category: categories[1] ?? 'Burgers',
};

const isAvailable = (item: MenuItem) => item.available !== false;

export const MerchantMenu: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ItemForm>(emptyForm);
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetImageState = () => {
    setPendingImageFile(null);
    setImagePreview(null);
    setShowUrlInput(false);
  };

  useEffect(() => {
    setLoading(true);
    api.merchant
      .menu()
      .then(setMenuItems)
      .catch(() => setMenuItems([]))
      .finally(() => setLoading(false));
  }, []);

  const itemCategories = useMemo(
    () => ['All', ...Array.from(new Set(menuItems.map((i) => i.category)))],
    [menuItems],
  );

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, activeCategory, search]);

  const openCreate = () => {
    setEditingItem(null);
    setForm(emptyForm);
    resetImageState();
    setShowForm(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      description: item.description,
      price: String(item.price),
      image: item.image,
      category: item.category,
    });
    resetImageState();
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setForm(emptyForm);
    resetImageState();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    e.target.value = '';
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(form.price);
    if (!form.name.trim() || Number.isNaN(price) || price < 0) {
      alert('Please enter a name and valid price');
      return;
    }

    setSaving(true);
    try {
      let imageUrl = form.image.trim() || undefined;
      if (pendingImageFile) {
        const uploaded = await api.upload.image(pendingImageFile);
        imageUrl = uploaded.url;
      }

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price,
        image: imageUrl,
        category: form.category,
      };

      if (editingItem) {
        const updated = await api.merchant.updateMenuItem(editingItem.id, payload);
        setMenuItems((prev) => prev.map((m) => (m.id === editingItem.id ? updated : m)));
      } else {
        const created = await api.merchant.createMenuItem(payload);
        setMenuItems((prev) => [...prev, created]);
      }
      closeForm();
    } catch {
      alert('Failed to save item');
    } finally {
      setSaving(false);
    }
  };

  const toggleAvailable = async (item: MenuItem) => {
    try {
      const updated = await api.merchant.updateMenuItem(item.id, {available: !isAvailable(item)});
      setMenuItems((prev) => prev.map((m) => (m.id === item.id ? updated : m)));
    } catch {
      alert('Failed to update item');
    }
  };

  const handleDelete = async (item: MenuItem) => {
    if (!window.confirm(`Delete "${item.name}"?`)) return;
    try {
      await api.merchant.deleteMenuItem(item.id);
      setMenuItems((prev) => prev.filter((m) => m.id !== item.id));
    } catch {
      alert('Failed to delete item');
    }
  };

  return (
    <motion.div layoutScroll className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-20">
        <div className="flex items-center justify-between mb-6">
          <motion.div layout className="flex items-center">
            <button
              type="button"
              onClick={() => navigate('/merchant/dashboard')}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-900 mr-4"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Menu Manager</h1>
          </motion.div>
          <button
            type="button"
            onClick={openCreate}
            className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search menu items"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {itemCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-colors ${
                activeCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-gray-500 text-center py-12">Loading menu...</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            {search.trim() ? 'No items match your search.' : 'No items in this category.'}
          </p>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center"
              >
                <motion.div className="w-20 h-20 rounded-xl overflow-hidden mr-4 shrink-0">
                  <img
                    src={resolveImageUrl(item.image)}
                    alt={item.name}
                    className={`w-full h-full object-cover ${!isAvailable(item) ? 'grayscale opacity-50' : ''}`}
                  />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3
                      className={`font-bold text-gray-900 truncate ${!isAvailable(item) ? 'text-gray-400' : ''}`}
                    >
                      {item.name}
                    </h3>
                    <p className={`font-bold shrink-0 ${!isAvailable(item) ? 'text-gray-400' : 'text-gray-900'}`}>
                      R {item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <button
                      type="button"
                      onClick={() => toggleAvailable(item)}
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        isAvailable(item) ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {isAvailable(item) ? 'Available' : 'Sold Out'}
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(item)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700"
                        aria-label="Edit item"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600"
                        aria-label="Delete item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={closeForm}
              className="fixed inset-0 bg-black/40 z-40"
            />
            <motion.div
              initial={{y: '100%'}}
              animate={{y: 0}}
              exit={{y: '100%'}}
              transition={{type: 'spring', damping: 25, stiffness: 200}}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingItem ? 'Edit Item' : 'Add Item'}
                </h2>
                <button type="button" onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({...f, name: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <motion.div layout>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({...f, description: e.target.value}))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </motion.div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (R)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={(e) => setForm((f) => ({...f, price: e.target.value}))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm((f) => ({...f, category: e.target.value}))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                    >
                      {categories.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      {(imagePreview || form.image) && (
                        <img
                          src={imagePreview ?? resolveImageUrl(form.image)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageSelect}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-orange-200 bg-orange-50 text-orange-700 rounded-xl font-medium hover:bg-orange-100 transition-colors"
                      >
                        <ImagePlus size={18} />
                        Choose from gallery
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowUrlInput((v) => !v)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        {showUrlInput ? 'Hide URL input' : 'Or paste image URL'}
                      </button>
                    </div>
                  </div>
                  {showUrlInput && (
                    <input
                      type="url"
                      value={form.image}
                      onChange={(e) => setForm((f) => ({...f, image: e.target.value}))}
                      placeholder="https://..."
                      className="w-full mt-3 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingItem ? 'Save Changes' : 'Add Item'}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
