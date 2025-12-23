import React from 'react';
import { Star, DollarSign, Clock, Award } from 'lucide-react';
import { restaurantInfo, features } from '../mock';

const About = () => {
  const iconMap = {
    star: Star,
    'dollar-sign': DollarSign,
    'chef-hat': Award,
    zap: Clock
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-red-600">Us</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-warm mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bringing authentic Delhi-style tandoori momos to Bhagalpur with fresh ingredients, 
            passionate service, and unbeatable taste that keeps customers coming back.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative animate-slide-in-left">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1582228096960-7f5d2ec4aa8e"
                alt="Restaurant Interior"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-xl shadow-lg">
              <p className="text-4xl font-bold">{restaurantInfo.rating}</p>
              <p className="text-sm">Rating ⭐</p>
            </div>
          </div>

          {/* Text Content */}
          <div className="animate-slide-in-right">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Why Choose {restaurantInfo.englishName}?
            </h3>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Located in the heart of Bhagalpur, we bring the authentic taste of Delhi's famous 
                tandoori momos to Bihar. Our secret? Fresh ingredients, traditional recipes, and 
                a passion for serving delicious food.
              </p>
              <p>
                Every momo is handcrafted with care, ensuring the perfect blend of flavors in 
                every bite. From the crispy tandoori coating to the juicy fillings, we maintain 
                the highest standards of quality and hygiene.
              </p>
              <p>
                With over {restaurantInfo.totalReviews} satisfied customers and a {restaurantInfo.rating}-star rating, 
                we've become Bhagalpur's favorite destination for momo lovers. Whether you're 
                craving spicy chilli momos or creamy afghani momos, we've got something for everyone.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Star;
            return (
              <div
                key={feature.id}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 text-center card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;