import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ClipboardCheck, Coffee, Package, Bike, CheckCircle2 } from 'lucide-react';
import { api } from '../lib/api';
import type { Order } from '../context/AppContext';
import { motion } from 'motion/react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const STEPS = [
  {key: 'preparing', label: 'Preparing', icon: Coffee},
  {key: 'delivering', label: 'On the way', icon: Bike},
  {key: 'arrived', label: 'Arrived', icon: Package},
  {key: 'completed', label: 'Delivered', icon: CheckCircle2},
] as const;

function statusToStep(status?: string) {
  switch (status) {
    case 'preparing':
      return 0;
    case 'delivering':
      return 1;
    case 'arrived':
      return 2;
    case 'completed':
      return 3;
    default:
      return 0;
  }
}

function statusLabel(status?: string) {
  const step = STEPS[statusToStep(status)];
  return step?.label ?? 'Preparing';
}

export const OrderTracking: React.FC = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentStep = statusToStep(order?.status);

  useEffect(() => {
    if (!orderId) {
      setError('Order not found');
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const data = await api.orders.get(orderId);
        setOrder(data);
        setError('');
      } catch {
        setError('Could not load this order.');
      } finally {
        setLoading(false);
      }
    };

    load();
    const id = setInterval(load, 4000);
    return () => clearInterval(id);
  }, [orderId]);

  return (
    <div className="flex flex-col min-h-screen bg-[#e5e3df] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={[-33.9249, 18.4241]}
          zoom={13}
          zoomControl={false}
          dragging={false}
          touchZoom={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          className="w-full h-full opacity-60"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
        </MapContainer>
        <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur px-3 py-2 rounded-xl text-xs text-gray-600 shadow-sm z-10">
          Map is approximate — live driver tracking is not available yet.
        </div>
      </div>

      <div className="relative z-10 px-4 pt-12 flex items-center justify-between pointer-events-none">
        <button
          type="button"
          onClick={() => navigate('/home', { replace: true })}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-md pointer-events-auto hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          type="button"
          onClick={() => navigate('/help')}
          className="bg-white px-4 py-2.5 rounded-full shadow-md pointer-events-auto font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          Help
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-20px_40px_rgba(0,0,0,0.1)] z-20 flex flex-col overflow-hidden">
        <div className="w-full h-1.5 bg-gray-100">
          <motion.div
            className="h-full bg-orange-500"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="p-6">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

          {loading ? (
            <p className="text-center text-gray-500 py-8">Loading order...</p>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-gray-700 mb-4">{error}</p>
              <button
                type="button"
                onClick={() => navigate('/my-order')}
                className="text-orange-500 font-medium"
              >
                View my orders
              </button>
            </div>
          ) : (
            <>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-1 text-center">{statusLabel(order?.status)}</h2>
                <p className="text-gray-500 font-medium text-center mb-6 capitalize">
                  Order status: {order?.status ?? 'preparing'}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const done = index <= currentStep;
                  return (
                    <div key={step.key} className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          done ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span className={`font-medium ${done ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <ClipboardCheck size={20} className="text-gray-900" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Order from Street Chef</p>
                    <p className="text-sm text-gray-500">Order #{order?.id}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/my-order')}
                  className="text-gray-900 font-medium bg-gray-100 px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  My orders
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
