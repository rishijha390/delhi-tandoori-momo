import React, { useState, useEffect } from 'react';
import { Plus, Leaf, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { menuAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const MenuIntegrated = () => {
  const { addToCart } = useCart();

  const [menuCategories, setMenuCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    fetchMenuCategories();
  }, []);

 const fetchMenuCategories = async () => {
  try {
    setLoading(true);

    const response = await menuAPI.getCategories();

    // 🔒 Normalize response safely
    const categories = Array.isArray(response)
      ? response
      : Array.isArray(response?.categories)
      ? response.categories
      : [];

    // Ensure items is always an array
    const safeCategories = categories.map((cat) => ({
      ...cat,
      items: Array.isArray(cat.items) ? cat.items : [],
    }));

    setMenuCategories(safeCategories);

    if (safeCategories.length > 0) {
      setActiveCategory(safeCategories[0].id);
    }

    setError(null);
  } catch (err) {
    console.error(err);
    setError("Menu not available right now");
  } finally {
    setLoading(false);
  }
};


  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <section id="menu" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <section id="menu" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchMenuCategories} className="bg-red-600 hover:bg-red-700">
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  // ================= EMPTY =================
  if (!menuCategories.length) {
    return (
      <section id="menu" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Menu not available right now.</p>
        </div>
      </section>
    );
  }

  // ================= MAIN UI =================
  return (
    <section id="menu" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-red-600">Menu</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-warm mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our delicious varieties of momos, made fresh daily
          </p>
        </div>

        <Tabs value={String(activeCategory)}>
          {/* Category Tabs */}
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-12 bg-transparent h-auto">
            {menuCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={String(category.id)}
                onClick={() => setActiveCategory(category.id)}
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white bg-white border-2 border-gray-200 hover:border-red-300 py-3 px-4 font-semibold rounded-lg"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Category Content */}
          {menuCategories.map((category) => (
            <TabsContent key={category.id} value={String(category.id)}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(category.items) &&
                  category.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl overflow-hidden shadow-lg"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.isVeg && (
                          <div className="absolute top-3 left-3 bg-white rounded-full p-2 shadow">
                            <Leaf className="w-5 h-5 text-green-600" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                          ₹{item.price}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {item.description}
                        </p>

                        <Button
                          onClick={() => handleAddToCart(item)}
                          className="w-full bg-gradient-warm text-white"
                        >
                          <Plus className="w-5 h-5 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default MenuIntegrated;