import React from 'react';
import { Phone, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { restaurantInfo } from '../mock';

const Hero = () => {
  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-red-100 rounded-full">
              <p className="text-red-600 font-semibold text-sm md:text-base">
                {restaurantInfo.rating} ⭐ ({restaurantInfo.totalReviews} Reviews)
              </p>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              {restaurantInfo.name}
            </h1>
            
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 mb-6">
              {restaurantInfo.englishName}
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              {restaurantInfo.tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={scrollToMenu}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold shadow-lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Order Online
              </Button>
              <a href={`tel:${restaurantInfo.phone}`}>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-6 text-lg font-semibold"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
            
            {/* Info Tags */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              {restaurantInfo.services.slice(0, 3).map((service, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9"
                alt="Delicious Tandoori Momos"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Floating Price Tag */}
              <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg">
                <p className="text-sm text-gray-600 mb-1">Starting from</p>
                <p className="text-2xl font-bold text-red-600">{restaurantInfo.priceRange.split('–')[0]}</p>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-400 rounded-full opacity-20 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-red-400 rounded-full opacity-20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;