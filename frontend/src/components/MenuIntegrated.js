import React, { useEffect, useState } from "react";
import { Plus, Leaf, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { menuAPI } from "../services/api";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

const MenuIntegrated = () => {
  const { addToCart } = useCart();

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await menuAPI.getCategories();

      if (!Array.isArray(data)) {
        throw new Error("Invalid menu data");
      }

      setCategories(data);

      if (data.length > 0) {
        setActiveCategory(String(data[0].id));
      }
    } catch (err) {
      console.error("Menu load error:", err);
      setError("Menu not available right now");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  /* ------------------ STATES ------------------ */

  if (loading) {
    return (
      <section id="menu" className="py-24 flex justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </section>
    );
  }

  if (error) {
    return (
      <section id="menu" className="py-24 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchMenu} className="bg-red-600 hover:bg-red-700">
          Retry
        </Button>
      </section>
    );
  }

  if (!categories.length) {
    return (
      <section id="menu" className="py-24 text-center text-gray-500">
        Menu not available right now
      </section>
    );
  }

  /* ------------------ UI ------------------ */

  return (
    <section
      id="menu"
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-orange-50"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Our <span className="text-red-600">Menu</span>
          </h2>
          <p className="text-gray-600 mt-3">
            Explore our delicious momos
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={String(cat.id)}
                className="bg-white border data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={String(cat.id)}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(cat.items) && cat.items.length > 0 ? (
                  cat.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {/* Image */}
                      <div className="relative h-48">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.isVeg && (
                          <div className="absolute top-3 left-3 bg-white p-1 rounded">
                            <Leaf className="text-green-600 w-5 h-5" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full">
                          ₹{item.price}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-semibold text-lg">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {item.description}
                        </p>

                        <Button
                          onClick={() => handleAddToCart(item)}
                          className="w-full bg-red-600 hover:bg-red-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    No items available in this category
                  </p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default MenuIntegrated;
