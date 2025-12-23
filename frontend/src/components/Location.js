import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { restaurantInfo } from '../mock';

const Location = () => {
  return (
    <section id="location" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Visit <span className="text-red-600">Us</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-warm mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find us easily and visit for an amazing dining experience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="animate-slide-in-left">
            <div className="rounded-xl overflow-hidden shadow-xl h-[400px]">
              <iframe
                src={restaurantInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant Location"
              />
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-6 animate-slide-in-right">
            {/* Address */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-700 mb-1">{restaurantInfo.address}</p>
                  <p className="text-gray-600 text-sm">{restaurantInfo.location}</p>
                  <p className="text-gray-500 text-sm mt-2">Plus Code: {restaurantInfo.plusCode}</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Contact</h3>
                  <a
                    href={`tel:${restaurantInfo.phone}`}
                    className="text-red-600 font-semibold text-lg hover:underline"
                  >
                    {restaurantInfo.phone}
                  </a>
                  <p className="text-gray-600 text-sm mt-1">Click to call us</p>
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Opening Hours</h3>
                  <p className="text-gray-700">{restaurantInfo.timings}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {restaurantInfo.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;