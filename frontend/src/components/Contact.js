import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { restaurantInfo } from '../mock';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    toast.success('Thank you! We will contact you soon.');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const handleWhatsApp = () => {
    const message = `Hi! I would like to know more about ${restaurantInfo.englishName}.`;
    const whatsappUrl = `https://wa.me/91${restaurantInfo.socialMedia.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get in <span className="text-red-600">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-warm mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 animate-slide-in-left">
            <h3 className="font-bold text-2xl text-gray-900 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email (optional)"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message or feedback"
                  required
                  rows={4}
                  className="w-full"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-warm text-white hover:opacity-90 font-semibold py-6"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Quick Contact */}
          <div className="space-y-6 animate-slide-in-right">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="font-bold text-2xl text-gray-900 mb-6">Quick Contact</h3>
              
              {/* WhatsApp Button */}
              <Button
                onClick={handleWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 mb-4"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>

              {/* Call Button */}
              <a href={`tel:${restaurantInfo.phone}`} className="block">
                <Button
                  className="w-full bg-gradient-warm text-white hover:opacity-90 font-semibold py-6"
                >
                  Call {restaurantInfo.phone}
                </Button>
              </a>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8">
              <h4 className="font-bold text-xl text-gray-900 mb-4">Business Hours</h4>
              <p className="text-gray-700 mb-4">{restaurantInfo.timings}</p>
              
              <h4 className="font-bold text-xl text-gray-900 mb-4 mt-6">Our Services</h4>
              <div className="flex flex-wrap gap-2">
                {restaurantInfo.services.map((service, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;