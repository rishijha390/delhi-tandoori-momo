import React, { useState, useEffect } from 'react';
import { Star, Quote, Loader2 } from 'lucide-react';
import { reviewAPI } from '../services/api';
import { Avatar, AvatarFallback } from './ui/avatar';

const ReviewsIntegrated = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewAPI.getReviews(10);

      // 🛡️ HARD GUARD — THIS IS THE FIX
      if (Array.isArray(data)) {
        setReviews(data);
      } else if (Array.isArray(data?.reviews)) {
        setReviews(data.reviews);
      } else {
        setReviews([]); // fallback
      }
    } catch (error) {
      console.error('Failed to load reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

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

        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-500">
            No reviews yet. Be the first to leave one!
          </p>
        ) : (
          <>
            {/* Reviews Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={review.id || index}
                  className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 shadow-md card-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4">
                    <Quote className="w-8 h-8 text-red-600 opacity-50" />
                  </div>

                  {/* Rating */}
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (review.rating || 0)
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {review.review || 'Great food and service!'}
                  </p>

                  {/* Reviewer Info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <Avatar className="w-10 h-10 bg-red-600">
                      <AvatarFallback className="bg-red-600 text-white font-semibold">
                        {review.avatar || review.name?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {review.name || 'Anonymous'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {review.date || ''}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
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
          </>
        )}
      </div>
    </section>
  );
};

export default ReviewsIntegrated;
