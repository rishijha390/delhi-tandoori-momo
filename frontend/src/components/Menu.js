import React, { useState } from 'react';
import { Plus, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { menuCategories } from '../mock';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const Menu = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-red-600">Menu</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-warm mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our delicious varieties of momos, made fresh daily with authentic spices
          </p>
        </div>

        {/* Menu Tabs */}
        <Tabs defaultValue="1" className="animate-fade-in">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-12 bg-transparent h-auto">
            {menuCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id.toString()}
                onClick={() => setActiveCategory(category.id)}
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white bg-white border-2 border-gray-200 hover:border-red-300 py-3 px-4 text-base font-semibold rounded-lg transition-all"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuCategories.map((category) => (
            <TabsContent key={category.id} value={category.id.toString()} className="mt-8">
              {/* Category Description */}
              <div className="text-center mb-8">
                <p className="text-lg text-gray-600 font-medium">{category.description}</p>
              </div>

              {/* Menu Items Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl overflow-hidden shadow-lg card-hover animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden image-hover-zoom">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.isVeg && (
                        <div className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-md">
                          <Leaf className="w-5 h-5 text-green-600" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                        ₹{item.price}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-xl text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                      
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-gradient-warm text-white hover:opacity-90 font-semibold"
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

export default Menu;