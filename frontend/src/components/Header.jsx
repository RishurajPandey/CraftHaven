import React from 'react';
import { ShoppingCart, User, Menu, X, Sun, Moon } from 'lucide-react';

function Header({
  darkMode,
  toggleDarkMode,
  cartItems,
  user,
  logout,
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenAuth,
  onOpenRegister,
  scrollToSection,
}) {
  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-orange-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenRegister}
              className="w-12 h-12 bg-gradient-to-r from-orange-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-xl">CH</span>
            </button>
            <div>
              <h1 onClick={() => onOpenAuth('login')} className="cursor-pointer text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                CraftHaven
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Local Artisan Marketplace</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Home</button>
            <button onClick={() => scrollToSection('shop')} className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Shop</button>
            <button onClick={() => scrollToSection('artisans')} className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Artisans</button>
            <button onClick={() => scrollToSection('workshops')} className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Workshops</button>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">About</button>
            <button onClick={onOpenRegister} className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Register</button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                  {cartItems.length}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 dark:text-gray-300 font-medium">{user.name}</span>
                <button onClick={logout} className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200">Logout</button>
              </div>
            ) : (
              <button onClick={() => onOpenAuth('login')} className="p-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                <User className="w-6 h-6" />
              </button>
            )}

            <button
              className="md:hidden p-2 text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="px-4 py-3 space-y-2">
            <button onClick={() => { setMobileMenuOpen(false); scrollToSection('home'); }} className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors">Home</button>
            <button onClick={() => { setMobileMenuOpen(false); scrollToSection('shop'); }} className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors">Shop</button>
            <button onClick={() => { setMobileMenuOpen(false); scrollToSection('artisans'); }} className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors">Artisans</button>
            <button onClick={() => { setMobileMenuOpen(false); scrollToSection('workshops'); }} className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors">Workshops</button>
            <button onClick={() => { setMobileMenuOpen(false); scrollToSection('about'); }} className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors">About</button>
            <button onClick={() => { setMobileMenuOpen(false); onOpenRegister(); }} className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors">Register</button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
