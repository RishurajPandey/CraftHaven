import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Star, Heart, Filter, Award, Truck, Shield, Clock, ChevronRight, Users, TrendingUp, User } from 'lucide-react';
import { registerUser, loginUser, API_BASE } from './api';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                  <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{stat.number}</div>
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