import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, FileText, ShoppingCart, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Layout: React.FC = () => {
  const { cart } = useAppContext();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-20 px-4 z-50 pb-4">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-900'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Home size={24} className={isActive ? 'fill-orange-500' : ''} />
              <span className="text-xs font-medium">Home</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-900'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative">
                <ShoppingCart size={24} className={isActive ? 'fill-orange-500' : ''} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">Cart</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/my-order"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-900'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <FileText size={24} className={isActive ? 'fill-orange-500' : ''} />
              <span className="text-xs font-medium">My Order</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-900'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <User size={24} className={isActive ? 'fill-orange-500' : ''} />
              <span className="text-xs font-medium">Profile</span>
            </>
          )}
        </NavLink>
      </nav>
    </div>
  );
};
