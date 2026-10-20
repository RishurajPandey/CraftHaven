import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Star, Heart, Filter, Award, Truck, Shield, Clock, ChevronRight, Users, TrendingUp, User, ShoppingCart, X, Trash2, Minus, Plus, ArrowLeft, PackageCheck } from 'lucide-react';
import { registerUser, loginUser, submitOrderRequest, API_BASE } from './api';
import Header from './components/Header';
import AuthModal from './components/AuthModal';


const mockProducts = [
  {
    id: 1,
    name: "Handwoven Ceramic Bowl Set",
    price: 85,
    originalPrice: 120,
    image: "https://images.pexels.com/photos/6195121/pexels-photo-6195121.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    artisan: "Sarah Chen",
    category: "Ceramics",
    rating: 4.9,
    reviews: 127,
    location: "Downtown Arts District",
    description: "Beautiful handwoven ceramic bowl set perfect for serving and display",
    tags: ["handmade", "eco-friendly", "dishwasher-safe"],
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Artisan Wooden Cutting Board",
    price: 65,
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    artisan: "Mike Rodriguez",
    category: "Woodwork",
    rating: 4.8,
    reviews: 89,
    location: "Riverside Workshop",
    description: "Premium cutting board crafted from sustainably sourced hardwood",
    tags: ["sustainable", "food-safe", "custom-engraving"],
    inStock: true
  },
  {
    id: 3,
    name: "Luxury Knitted Wool Scarf",
    price: 48,
    originalPrice: 65,
    image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    artisan: "Emma Thompson",
    category: "Textiles",
    rating: 4.7,
    reviews: 156,
    location: "Hillside Studio",
    description: "Luxurious hand-knitted wool scarf with intricate patterns",
    tags: ["merino-wool", "winter-collection", "gift-ready"],
    inStock: true
  },
  {
    id: 4,
    name: "Premium Leather Wallet",
    price: 78,
    image: "https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    artisan: "David Kim",
    category: "Leather",
    rating: 4.9,
    reviews: 203,
    location: "Old Town Leather",
    description: "Handstitched premium leather wallet with RFID protection",
    tags: ["rfid-blocking", "full-grain-leather", "lifetime-warranty"],
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: "Designer Glass Pendant Light",
    price: 145,
    image: "https://images.pexels.com/photos/1598300/pexels-photo-1598300.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    artisan: "Lisa Park",
    category: "Glass",
    rating: 4.8,
    reviews: 67,
    location: "Glass Studio Co-op",
    description: "Handblown glass pendant light with unique artistic design",
    tags: ["led-compatible", "custom-colors", "installation-included"],
    inStock: false
  },
  {
    id: 6,
    name: "Embroidered Silk Cushion",
    price: 52,
    image: "https://images.pexels.com/photos/6969772/pexels-photo-6969772.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    artisan: "Anna Williams",
    category: "Textiles",
    rating: 4.6,
    reviews: 94,
    location: "Craft Corner",
    description: "Exquisite embroidered silk cushion with traditional motifs",
    tags: ["silk", "traditional-craft", "decorative"],
    inStock: true
  }
];

const mockArtisans = [
  {
    id: 1,
    name: "Sarah Chen",
    specialty: "Ceramics & Pottery",
    location: "Downtown Arts District",
    image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    rating: 4.9,
    bio: "Sarah has been creating beautiful ceramic pieces for over 15 years, specializing in functional art that brings beauty to everyday life.",
    workshopDate: "Nov 15, 2024",
    yearsExperience: 15,
    totalSales: 1247,
    verified: true
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    specialty: "Sustainable Woodwork",
    location: "Riverside Workshop",
    image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    rating: 4.8,
    bio: "Mike crafts sustainable wooden furniture and kitchenware using traditional techniques passed down through generations.",
    workshopDate: "Nov 20, 2024",
    yearsExperience: 12,
    totalSales: 892,
    verified: true
  },
  {
    id: 3,
    name: "Emma Thompson",
    specialty: "Luxury Textiles",
    location: "Hillside Studio",
    image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    rating: 4.7,
    bio: "Emma creates beautiful textiles using traditional weaving and knitting techniques with modern design sensibilities.",
    workshopDate: "Nov 18, 2024",
    yearsExperience: 8,
    totalSales: 634,
    verified: true
  }
];

function App() {
  const statsRef = useRef(null);
  const [startCount, setStartCount] = useState(false);
  const [countProgress, setCountProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startCount) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCountProgress(1);
      return;
    }

    const duration = 1500;
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCountProgress(1 - (1 - progress) ** 3);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [startCount]);

  const getCount = (number) => {
    const values = {
      "500+": 500,
      "10K+": 10000,
      "25K+": 25000,
      "50+": 50
    };

    return Math.round((values[number] || 0) * countProgress);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartView, setCartView] = useState('cart');
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [error, setError] = useState('');

  const categories = ['All', 'Ceramics', 'Woodwork', 'Textiles', 'Leather', 'Glass'];
  const cartEntries = Array.from(new Set(cartItems))
    .map((productId) => ({
      product: mockProducts.find((item) => item.id === productId),
      quantity: cartItems.filter((id) => id === productId).length
    }))
    .filter((entry) => entry.product);
  const cartSubtotal = cartEntries.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0
  );

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFooterLink = (event, sectionId) => {
    event.preventDefault();
    scrollToSection(sectionId);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${API_BASE}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((r) => r.json())
        .then((data) => {
          if (data && data.success) setUser(data.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoadingAuth(true);
    setError('');

    try {
      if (authMode === 'login') {
        const res = await loginUser({ email: authForm.email, password: authForm.password });
        if (res && res.success && res.data && res.data.token) {
          localStorage.setItem('token', res.data.token);
          setUser(res.data);
          setShowAuth(false);
        } else {
          setError(res.message || 'Login failed');
        }
      } else {
        const res = await registerUser({ name: authForm.name, email: authForm.email, password: authForm.password });
        if (res && res.success && res.data && res.data.token) {
          localStorage.setItem('token', res.data.token);
          setUser(res.data);
          setShowAuth(false);
        } else {
          setError(res.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoadingAuth(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.artisan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredProducts = mockProducts.filter(product => product.featured);


  const addToCart = (productId) => {
    setCartItems(prev => [...prev, productId]);
  };

  const setCartQuantity = (productId, quantity) => {
    setCartItems((items) => [
      ...items.filter((id) => id !== productId),
      ...Array(Math.max(0, quantity)).fill(productId)
    ]);
  };

  const openCart = () => {
    setCartView('cart');
    setOrderError('');
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
    setOrderError('');
  };

  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    setOrderSubmitting(true);
    setOrderError('');

    try {
      const result = await submitOrderRequest({
        ...checkoutForm,
        items: cartEntries.map(({ product, quantity }) => ({
          productId: product.id,
          name: product.name,
          artisan: product.artisan,
          price: product.price,
          quantity
        }))
      });
      setSubmittedOrder(result.data);
      setCartItems([]);
      setCartView('confirmation');
    } catch (requestError) {
      setOrderError(requestError.message || 'Unable to submit your order request. Please try again.');
    } finally {
      setOrderSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isCartOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsCartOpen(false);
        setOrderError('');
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen]);

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const openRegister = () => {
    openAuth('register');
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          cartItems={cartItems}
          onOpenCart={openCart}
          user={user}
          logout={logout}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onOpenAuth={openAuth}
          onOpenRegister={openRegister}
          scrollToSection={scrollToSection}
        />

        <AuthModal
          isOpen={showAuth}
          authMode={authMode}
          authForm={authForm}
          setAuthForm={setAuthForm}
          error={error}
          loadingAuth={loadingAuth}
          onSubmit={handleAuthSubmit}
          onClose={() => setShowAuth(false)}
          onSwitchMode={switchAuthMode}
        />

        {isCartOpen && (
          <div
            className="fixed inset-0 z-[60] overflow-y-auto bg-orange-50 dark:bg-gray-950"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-page-title"
          >
            <div className="min-h-screen">
              <header className="border-b border-orange-100 bg-white/95 dark:border-gray-800 dark:bg-gray-900/95">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                  <div className="flex items-center gap-3">
                    {cartView === 'checkout' && (
                      <button
                        type="button"
                        onClick={() => {
                          setCartView('cart');
                          setOrderError('');
                        }}
                        aria-label="Back to cart"
                        className="rounded-full p-2 text-gray-600 hover:bg-orange-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                    )}
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">CraftHaven</p>
                      <h1 id="cart-page-title" className="text-2xl font-bold text-gray-900 dark:text-white">
                        {cartView === 'confirmation' ? 'Request received' : cartView === 'checkout' ? 'Delivery details' : 'Your cart'}
                      </h1>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={closeCart}
                    aria-label="Close cart"
                    className="rounded-full p-3 text-gray-600 transition hover:bg-orange-50 hover:text-orange-600 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </header>

              <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                {cartView === 'confirmation' ? (
                  <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl dark:bg-gray-900 sm:p-12">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                      <PackageCheck className="h-8 w-8" />
                    </div>
                    <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">Thanks, we received your request.</h2>
                    <p className="mb-6 text-gray-600 dark:text-gray-300">
                      Your request has been saved. No payment has been taken; availability, delivery, and payment must be confirmed separately.
                    </p>
                    {submittedOrder?.id && (
                      <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
                        Request reference: {submittedOrder.id}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={closeCart}
                      className="rounded-xl bg-gradient-to-r from-orange-500 to-green-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl"
                    >
                      Continue browsing
                    </button>
                  </section>
                ) : cartView === 'checkout' ? (
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <section className="rounded-3xl bg-white p-6 shadow-lg dark:bg-gray-900 sm:p-8">
                      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Where should we deliver?</h2>
                      <p className="mb-8 text-gray-600 dark:text-gray-400">Share your contact and delivery details. This saves an order request; availability and payment must be confirmed separately.</p>
                      <form onSubmit={handleOrderSubmit} className="space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full name
                            <input
                              required
                              autoComplete="name"
                              value={checkoutForm.name}
                              onChange={(event) => setCheckoutForm({ ...checkoutForm, name: event.target.value })}
                              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                          </label>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                            <input
                              required
                              type="email"
                              autoComplete="email"
                              value={checkoutForm.email}
                              onChange={(event) => setCheckoutForm({ ...checkoutForm, email: event.target.value })}
                              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                          </label>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone
                          <input
                            required
                            type="tel"
                            autoComplete="tel"
                            value={checkoutForm.phone}
                            onChange={(event) => setCheckoutForm({ ...checkoutForm, phone: event.target.value })}
                            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                          />
                        </label>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Delivery address
                          <textarea
                            required
                            autoComplete="street-address"
                            rows="3"
                            value={checkoutForm.address}
                            onChange={(event) => setCheckoutForm({ ...checkoutForm, address: event.target.value })}
                            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                          />
                        </label>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Notes for the artisan (optional)
                          <textarea
                            rows="2"
                            maxLength="1000"
                            value={checkoutForm.notes}
                            onChange={(event) => setCheckoutForm({ ...checkoutForm, notes: event.target.value })}
                            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                          />
                        </label>
                        {orderError && (
                          <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">{orderError}</p>
                        )}
                        <button
                          type="submit"
                          disabled={orderSubmitting || cartEntries.length === 0}
                          className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-green-600 px-6 py-4 font-bold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {orderSubmitting ? 'Sending request...' : 'Send order request'}
                        </button>
                        <p className="text-center text-xs text-gray-500 dark:text-gray-400">This is an order request, not a payment. The order, delivery, and payment details must be confirmed separately.</p>
                      </form>
                    </section>
                    <aside className="h-fit rounded-3xl bg-white p-6 shadow-lg dark:bg-gray-900">
                      <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">Order summary</h2>
                      <div className="space-y-4">
                        {cartEntries.map(({ product, quantity }) => (
                          <div key={product.id} className="flex justify-between gap-4 text-sm">
                            <span className="text-gray-600 dark:text-gray-300">{product.name} × {quantity}</span>
                            <span className="font-semibold text-gray-900 dark:text-white">${(product.price * quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex justify-between border-t border-gray-200 pt-5 font-bold text-gray-900 dark:border-gray-700 dark:text-white">
                        <span>Estimated total</span>
                        <span>${cartSubtotal.toFixed(2)}</span>
                      </div>
                      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Delivery cost and payment will be confirmed by the artisan.</p>
                    </aside>
                  </div>
                ) : cartEntries.length === 0 ? (
                  <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl dark:bg-gray-900 sm:p-12">
                    <ShoppingCart className="mx-auto mb-5 h-12 w-12 text-orange-500" />
                    <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
                    <p className="mb-8 text-gray-600 dark:text-gray-400">Find something handcrafted and special from our local artisans.</p>
                    <button
                      type="button"
                      onClick={() => {
                        closeCart();
                        scrollToSection('shop');
                      }}
                      className="rounded-xl bg-gradient-to-r from-orange-500 to-green-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl"
                    >
                      Browse crafts
                    </button>
                  </section>
                ) : (
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <section className="space-y-4">
                      {cartEntries.map(({ product, quantity }) => (
                        <article key={product.id} className="flex flex-col gap-5 rounded-3xl bg-white p-4 shadow-lg dark:bg-gray-900 sm:flex-row sm:items-center sm:p-6">
                          <img src={product.image} alt={product.name} className="h-36 w-full rounded-2xl object-cover sm:h-32 sm:w-36" />
                          <div className="min-w-0 flex-1">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{product.name}</h2>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Handcrafted by {product.artisan}</p>
                            <p className="mt-3 font-bold text-orange-600 dark:text-orange-400">${product.price.toFixed(2)} each</p>
                          </div>
                          <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-1 dark:border-gray-700">
                              <button
                                type="button"
                                onClick={() => setCartQuantity(product.id, quantity - 1)}
                                aria-label={`Decrease ${product.name} quantity`}
                                className="rounded-lg p-2 text-gray-600 hover:bg-orange-50 dark:text-gray-300 dark:hover:bg-gray-800"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span aria-live="polite" className="min-w-6 text-center font-semibold text-gray-900 dark:text-white">{quantity}</span>
                              <button
                                type="button"
                                onClick={() => setCartQuantity(product.id, quantity + 1)}
                                aria-label={`Increase ${product.name} quantity`}
                                className="rounded-lg p-2 text-gray-600 hover:bg-orange-50 dark:text-gray-300 dark:hover:bg-gray-800"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => setCartQuantity(product.id, 0)}
                              className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </button>
                          </div>
                        </article>
                      ))}
                    </section>
                    <aside className="h-fit rounded-3xl bg-white p-6 shadow-lg dark:bg-gray-900">
                      <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">Order summary</h2>
                      <div className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>Items ({cartItems.length})</span>
                        <span>${cartSubtotal.toFixed(2)}</span>
                      </div>
                      <div className="mt-5 flex justify-between border-t border-gray-200 pt-5 text-lg font-bold text-gray-900 dark:border-gray-700 dark:text-white">
                        <span>Subtotal</span>
                        <span>${cartSubtotal.toFixed(2)}</span>
                      </div>
                      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Delivery and payment details will be confirmed by the artisan.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setOrderError('');
                          setCartView('checkout');
                        }}
                        className="mt-6 w-full rounded-xl bg-gradient-to-r from-orange-500 to-green-600 px-6 py-4 font-bold text-white shadow-lg transition hover:shadow-xl"
                      >
                        Continue to checkout
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          closeCart();
                          scrollToSection('shop');
                        }}
                        className="mt-3 w-full rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-orange-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        Continue shopping
                      </button>
                    </aside>
                  </div>
                )}
              </main>
            </div>
          </div>
        )}

        <div id="home" className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-green-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Award className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Supporting Local Artisans Since 2020</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Discover Local <span className="text-orange-200">Artisan</span> Treasures
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto leading-relaxed">
                Connect with skilled craftspeople in your community and bring home unique, handcrafted pieces
              </p>

              <div className="max-w-3xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search for crafts, artisans, or workshops..."
                    className="w-full pl-16 pr-6 py-5 rounded-2xl text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-2xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-green-500 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all">
                    Search
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Free Local Delivery</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Authenticity Guaranteed</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  <span>500+ Local Artisans</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 py-16 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { number: "500+", label: "Local Artisans", icon: Users },
                { number: "10K+", label: "Happy Customers", icon: Heart },
                { number: "25K+", label: "Products Sold", icon: TrendingUp },
                { number: "50+", label: "Craft Categories", icon: Award }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-green-500 rounded-xl mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {stat.number.includes("K")
                      ? getCount(stat.number) === 0
                        ? '0'
                        : `${Math.floor(getCount(stat.number) / 1000)}K+`
                      : getCount(stat.number) === 0
                        ? '0'
                        : `${getCount(stat.number)}+`}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Featured Crafts</h3>
            <p className="text-xl text-gray-600 dark:text-gray-400">Handpicked treasures from our most talented artisans</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredProducts.map(product => (
              <div key={product.id} className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-500 dark:text-gray-400'}`} />
                  </button>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-2xl font-bold text-gray-800 dark:text-white">{product.name}</h4>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 mr-1" />
                      <span className="text-gray-600 dark:text-gray-400 font-medium">{product.rating}</span>
                      <span className="text-gray-500 dark:text-gray-500 text-sm ml-1">({product.reviews})</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">by {product.artisan}</p>
                  <div className="flex items-center mb-4">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-500 dark:text-gray-400">{product.location}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.tags.map(tag => (
                      <span key={tag} className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="artisans" className="bg-gradient-to-r from-orange-50 to-green-50 dark:from-gray-800 dark:to-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">Featured Artisan Spotlight</h3>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-orange-200 dark:border-gray-700">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <img
                    src={mockArtisans[0].image}
                    alt={mockArtisans[0].name}
                    className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-orange-200 dark:border-gray-600">
                    <div className="flex items-center space-x-2">
                      <Award className="w-6 h-6 text-orange-500" />
                      <div>
                        <div className="text-sm font-medium text-gray-800 dark:text-white">Verified Artisan</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{mockArtisans[0].yearsExperience} years experience</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    <h4 className="text-3xl font-bold text-gray-800 dark:text-white mr-3">{mockArtisans[0].name}</h4>
                    {mockArtisans[0].verified && (
                      <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                        Verified
                      </div>
                    )}
                  </div>
                  <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">{mockArtisans[0].specialty}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-orange-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-400">{mockArtisans[0].location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-400">{mockArtisans[0].rating} rating</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-400">{mockArtisans[0].totalSales} sales</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-400">{mockArtisans[0].yearsExperience} years</span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed">{mockArtisans[0].bio}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center">
                      <span>View Portfolio</span>
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                    <div className="flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-6 py-3 rounded-xl">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>Workshop: {mockArtisans[0].workshopDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-wrap items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Browse All Crafts</h3>
              <p className="text-gray-600 dark:text-gray-400">Discover unique handmade items from local artisans</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-xl text-sm font-medium transition-all transform hover:scale-105 ${selectedCategory === category
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-full font-medium">Out of Stock</span>
                    </div>
                  )}
                  {product.originalPrice && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Sale
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-500 dark:text-gray-400'}`} />
                  </button>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-white line-clamp-2">{product.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">by {product.artisan}</p>
                  <div className="flex items-center mb-3">
                    <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{product.location}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">{product.rating}</span>
                      <span className="text-gray-500 dark:text-gray-500 text-xs ml-1">({product.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-orange-600 dark:text-orange-400">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className={`px-4 py-2 rounded-xl transition-all transform hover:scale-105 ${product.inStock
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Sold Out'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="workshops" className="bg-white dark:bg-gray-900 py-20 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Upcoming Local Events</h3>
              <p className="text-xl text-gray-600 dark:text-gray-400">Join workshops and connect with artisans in your community</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Advanced Pottery Workshop",
                  date: "Nov 15, 2024",
                  time: "2:00 PM - 5:00 PM",
                  location: "Downtown Arts District",
                  instructor: "Sarah Chen",
                  price: "Free",
                  spots: "8 spots left",
                  image: "https://images.pexels.com/photos/6195121/pexels-photo-6195121.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                },
                {
                  title: "Sustainable Woodworking",
                  date: "Nov 20, 2024",
                  time: "10:00 AM - 2:00 PM",
                  location: "Riverside Workshop",
                  instructor: "Mike Rodriguez",
                  price: "$45",
                  spots: "5 spots left",
                  image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                },
                {
                  title: "Traditional Textile Weaving",
                  date: "Nov 18, 2024",
                  time: "1:00 PM - 4:00 PM",
                  location: "Hillside Studio",
                  instructor: "Emma Thompson",
                  price: "$35",
                  spots: "12 spots left",
                  image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                }
              ].map((event, index) => (
                <div key={index} className="bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-200 dark:border-gray-600">
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{event.title}</h4>
                    <div className="space-y-3 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-3 text-orange-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-3 text-orange-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-3 text-orange-500" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-5 h-5 mr-3 text-orange-500" />
                        <span>with {event.instructor}</span>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">{event.price}</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{event.spots}</p>
                      </div>
                      <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div id="about" className="bg-gradient-to-r from-orange-600 to-green-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Stay Connected with Local Artisans</h3>
            <p className="text-xl text-orange-100 mb-8">Get updates on new products, workshops, and community events</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-orange-300"
              />
              <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-green-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">CH</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold">CraftHaven</h4>
                    <p className="text-gray-400 text-sm">Local Artisan Marketplace</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Connecting local artisans with their community, fostering creativity, and supporting sustainable craftsmanship since 2020.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                    <span className="text-sm font-bold">f</span>
                  </div>
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                    <span className="text-sm font-bold">t</span>
                  </div>
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                    <span className="text-sm font-bold">i</span>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-bold mb-6 text-lg">Shop</h5>
                <ul className="space-y-3 text-gray-400">
                  <li><button type="button" onClick={(event) => handleFooterLink(event, 'shop')} className="hover:text-orange-400 transition-colors">Browse Crafts</button></li>
                  <li><button type="button" onClick={(event) => handleFooterLink(event, 'artisans')} className="hover:text-orange-400 transition-colors">Find Artisans</button></li>
                  <li><button type="button" onClick={(event) => handleFooterLink(event, 'about')} className="hover:text-orange-400 transition-colors">Gift Cards</button></li>
                  <li><button type="button" onClick={(event) => handleFooterLink(event, 'about')} className="hover:text-orange-400 transition-colors">Custom Orders</button></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-6 text-lg">Community</h5>
                <ul className="space-y-3 text-gray-400">
                  <li><button type="button" onClick={(event) => handleFooterLink(event, 'workshops')} className="hover:text-orange-400 transition-colors">Workshops</button></li>
                  <li><button type="button" onClick={(event) => handleFooterLink(event, 'workshops')} className="hover:text-orange-400 transition-colors">Events</button></li>
                  <li><button type="button" onClick={(event) => handleFooterLink(event, 'artisans')} className="hover:text-orange-400 transition-colors">Artisan Stories</button></li>
                  <li><button type="button" onClick={(event) => handleFooterLink(event, 'about')} className="hover:text-orange-400 transition-colors">Blog</button></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-6 text-lg">Support</h5>
                <ul className="space-y-3 text-gray-400">
                  <li><button type="button" onClick={(event) => handleFooterLink(event, 'about')} className="hover:text-orange-400 transition-colors">Help Center</button></li>
                  <li><button type="button" onClick={(event) => handleFooterLink(event, 'about')} className="hover:text-orange-400 transition-colors">Contact Us</button></li>
                  <li><button type="button" onClick={(event) => handleFooterLink(event, 'about')} className="hover:text-orange-400 transition-colors">Shipping Info</button></li>
                  <li><button type="button" onClick={(event) => handleFooterLink(event, 'about')} className="hover:text-orange-400 transition-colors">Returns</button></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 CraftHaven. Supporting local artisans and their communities.</p>
              <div className="flex space-x-6 text-gray-400 text-sm">
                <button type="button" onClick={(event) => handleFooterLink(event, 'about')} className="hover:text-orange-400 transition-colors">Privacy Policy</button>
                <button type="button" onClick={(event) => handleFooterLink(event, 'about')} className="hover:text-orange-400 transition-colors">Terms of Service</button>
                <button type="button" onClick={(event) => handleFooterLink(event, 'about')} className="hover:text-orange-400 transition-colors">Cookie Policy</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;