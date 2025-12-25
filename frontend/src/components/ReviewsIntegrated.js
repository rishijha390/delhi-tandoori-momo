import React, { useEffect, useState } from "react";
import { Star, Quote, Loader2 } from "lucide-react";
import { reviewAPI } from "../services/api";
import { Avatar, AvatarFallback } from "./ui/avatar";

const ReviewsIntegrated = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await reviewAPI.getReviews(10);

      // 🛡️ HARD GUARDS (THIS IS THE FIX)
      if (Array.isArray(data)) {
        setReviews(data);
      } else if (Array.isArray(data?.reviews)) {
        setReviews(data.reviews);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error("Reviews load error:", err);
      setError("Unable to load reviews");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- STATES ---------------- */

  if (loading) {
    return (
      <section id="reviews" className="py-24 flex justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </section>
    );
  }

  if (error) {
    return (
      <section id="reviews" className="py-24 text-center">
        <p className="text-red-600">{error}</p>
      </section>
    );
  }

  if (!reviews.length) {
    return (
      <section id="reviews" className="py-24 text-center text-gray-500">
        <h3 className="text-2xl font-semibold mb-2">Customer Reviews</h3>
        <p>No reviews yet. Be the first to leave one!</p>
      </section>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Customer <span className="text-red-600">Reviews</span>
          </h2>
          <p className="text-gray-600 mt-3">
            See what our customers are saying
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 shadow-md"
            >
              {/* Quote */}
              <Quote className="w-8 h-8 text-red-600 opacity-40 mb-3" />

              {/* Stars */}
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < (review.rating || 0)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm mb-4">
                {review.review || "Great experience!"}
              </p>

              {/* User */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <Avatar className="w-10 h-10 bg-red-600">
                  <AvatarFallback className="bg-red-600 text-white font-semibold">
                    {(review.name || "U")[0]}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-semibold text-sm">
                    {review.name || "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {review.date || ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://www.google.com/search?q=delhi+tandoori+momo+bhagalpur"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50"
          >
            Write a Review
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsIntegrated;
