import React from 'react';
import { MapPin, Phone, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { restaurantInfo } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4 text-red-500">
              {restaurantInfo.name}
            </h3>
            <p className="text-gray-400 mb-4">
              {restaurantInfo.tagline}
            </p>
            <div className="flex items-center gap-2 text-yellow-500 mb-2">
              <span className="text-xl font-bold">{restaurantInfo.rating}</span>
              <span>⭐</span>
              <span className="text-gray-400 text-sm">({restaurantInfo.totalReviews} reviews)</span>
            </div>
            <p className="text-gray-400 text-sm">{restaurantInfo.priceRange}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Menu', 'Reviews', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">{restaurantInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  {restaurantInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">{restaurantInfo.timings}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/91${restaurantInfo.socialMedia.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              
              {/* Instagram */}
              <a
                href={`https://instagram.com/${restaurantInfo.socialMedia.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              
              {/* Facebook */}
              <a
                href={restaurantInfo.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            
            <div className="mt-6">
              <h5 className="font-semibold mb-2 text-sm">Our Services</h5>
              <div className="flex flex-wrap gap-2">
                {restaurantInfo.services.map((service, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} {restaurantInfo.englishName}. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-right">
              Made with ❤️ for momo lovers in Bhagalpur
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;