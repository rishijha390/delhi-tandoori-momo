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
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      setLoading(true);

      const data = await menuAPI.getCategories();

      if (!Array.isArray(data)) {
        throw new Error("Invalid menu data");
      }

      setCategories(data);
      setActiveCategory(String(data[0]?.id || ""));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Menu not available right now");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-red-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <section id="menu" className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
          Our <span className="text-red-600">Menu</span>
        </h2>

        <Tabs value={activeCategory}>
          <TabsList className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={String(cat.id)}
                onClick={() => setActiveCategory(String(cat.id))}
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={String(cat.id)}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(cat.items) &&
                  cat.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-48 w-full object-cover"
                      />

                      <div className="p-4">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-bold">{item.name}</h3>
                          <span className="font-semibold">₹{item.price}</span>
                        </div>

                        {item.isVeg && (
                          <Leaf className="w-4 h-4 text-green-600 mb-2" />
                        )}

                        <Button
                          className="w-full mt-2"
                          onClick={() => handleAddToCart(item)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
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
