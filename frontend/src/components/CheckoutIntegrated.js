import React, { useState } from 'react';
import { ArrowLeft, Check, CreditCard, Smartphone, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../services/api';
import { toast } from 'sonner';

const CheckoutIntegrated = ({ onBack, onClose }) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryType: 'delivery'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    try {
      setLoading(true);
      
      // Prepare order data
      const orderData = {
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email || null,
        delivery_address: formData.deliveryType === 'delivery' ? formData.address : null,
        delivery_type: formData.deliveryType,
        items: cart.map(item => ({
          item_id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        payment_method: paymentMethod
      };

      // Create order
      const order = await orderAPI.createOrder(orderData);
      setOrderDetails(order);
      
      toast.success('Order placed successfully!');
      setStep(3);
      
      // Clear cart and close after 3 seconds
      setTimeout(() => {
        clearCart();
        onClose();
      }, 3000);
    } catch (error) {
      toast.error(error.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const deliveryCharge = formData.deliveryType === 'delivery' ? 30 : 0;
  const total = getCartTotal() + deliveryCharge;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {step < 3 && (
            <button
              onClick={step === 1 ? onBack : () => setStep(1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={loading}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <h1 className="text-3xl font-display font-bold text-gray-900">
            {step === 1 ? 'Delivery Details' : step === 2 ? 'Payment' : 'Order Confirmed'}
          </h1>
        </div>

        {/* Step 1: Details Form */}
        {step === 1 && (
          <form onSubmit={handleDetailsSubmit} className="space-y-6 animate-fade-in">
            {/* Delivery Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Order Type *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'delivery' }))}
                  className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                    formData.deliveryType === 'delivery'
                      ? 'border-red-600 bg-red-50 text-red-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Home Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'pickup' }))}
                  className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                    formData.deliveryType === 'pickup'
                      ? 'border-red-600 bg-red-50 text-red-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Self Pickup
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email (optional)"
              />
            </div>

            {formData.deliveryType === 'delivery' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address *
                </label>
                <Textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete delivery address"
                  required
                  rows={3}
                />
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">Order Summary</h3>
              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{getCartTotal()}</span>
                  </div>
                  {formData.deliveryType === 'delivery' && (
                    <div className="flex justify-between text-sm">
                      <span>Delivery Charge</span>
                      <span className="font-semibold">₹{deliveryCharge}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold mt-2">
                    <span>Total</span>
                    <span className="text-red-600">₹{total}</span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-warm text-white hover:opacity-90 font-semibold py-6 text-lg"
            >
              Continue to Payment
            </Button>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            {/* Payment Methods */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Payment Method *
              </label>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`w-full p-4 border-2 rounded-lg flex items-center gap-4 transition-all ${
                    paymentMethod === 'razorpay'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-red-600" />
                  <div className="text-left">
                    <p className="font-semibold">Razorpay</p>
                    <p className="text-sm text-gray-600">Cards, UPI, Wallets (**Mocked**)</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('phonepe')}
                  className={`w-full p-4 border-2 rounded-lg flex items-center gap-4 transition-all ${
                    paymentMethod === 'phonepe'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Smartphone className="w-6 h-6 text-purple-600" />
                  <div className="text-left">
                    <p className="font-semibold">PhonePe</p>
                    <p className="text-sm text-gray-600">UPI Payment (**Mocked**)</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`w-full p-4 border-2 rounded-lg flex items-center gap-4 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    ₹
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Cash on Delivery</p>
                    <p className="text-sm text-gray-600">Pay when you receive</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Payment Summary</h3>
              <div className="flex justify-between text-xl font-bold">
                <span>Amount to Pay:</span>
                <span className="text-red-600">₹{total}</span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Payment gateways are currently **mocked**. Your order will be saved to the database.
              </p>
            </div>

            <Button
              onClick={handlePayment}
              disabled={!paymentMethod || loading}
              className="w-full bg-gradient-warm text-white hover:opacity-90 font-semibold py-6 text-lg disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Place Order - ₹${total}`
              )}
            </Button>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && orderDetails && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
            <p className="text-lg text-gray-600 mb-2">Thank you for your order.</p>
            <p className="text-gray-500">We will contact you shortly to confirm your order.</p>
            
            <div className="mt-8 bg-gray-50 rounded-lg p-6 inline-block">
              <p className="text-sm text-gray-600 mb-2">Order ID</p>
              <p className="text-xl font-bold text-red-600 mb-4">{orderDetails.order_id}</p>
              <p className="text-sm text-gray-600 mb-1">Order Total</p>
              <p className="text-3xl font-bold text-red-600">₹{orderDetails.total}</p>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">Redirecting...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutIntegrated;