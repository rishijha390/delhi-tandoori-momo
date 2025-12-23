import React from 'react';
import { Star, Quote } from 'lucide-react';
import { reviews } from '../mock';
import { Avatar, AvatarFallback } from './ui/avatar';

const Reviews = () => {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Customer <span className="text-red-600">Reviews</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-warm mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our happy customers are saying about their experience
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 shadow-md card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-red-600 opacity-50" />
              </div>

              {/* Rating */}
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">{review.review}</p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <Avatar className="w-10 h-10 bg-red-600">
                  <AvatarFallback className="bg-red-600 text-white font-semibold">
                    {review.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Want to share your experience?</p>
          <a
            href="https://www.google.com/search?q=delhi+tandoori+momo+bhagalpur"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-white border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
          >
            Write a Review
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;