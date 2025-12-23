import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { restaurantInfo } from '../mock';
import CheckoutIntegrated from './CheckoutIntegrated';

const CartIntegrated = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, isCartOpen, setIsCartOpen } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isCartOpen) return null;

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let message = `*New Order from ${restaurantInfo.englishName}*%0A%0A`;
    
    cart.forEach((item) => {
      message += `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}%0A`;
    });
    
    message += `%0A*Total: ₹${getCartTotal()}*%0A%0APlease confirm my order.`;
    
    const whatsappUrl = `https://wa.me/91${restaurantInfo.socialMedia.whatsapp}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (showCheckout) {
    return <CheckoutIntegrated onBack={() => setShowCheckout(false)} onClose={() => setIsCartOpen(false)} />;
  }

  return (
    <div className="fixed inset-0 z-50 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full md:w-[450px] bg-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="bg-gradient-warm text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Your Cart</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add some delicious momos!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-red-600 font-bold text-lg">₹{item.price}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-gray-900 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-red-600">₹{getCartTotal()}</span>
            </div>

            {/* Checkout Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6 text-lg"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </Button>
              
              <Button
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Order via WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartIntegrated;