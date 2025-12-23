// Mock data for Delhi Tandoori Momo Restaurant

export const restaurantInfo = {
  name: "दिल्ली तंदूरी मोमो",
  englishName: "Delhi Tandoori Momo",
  tagline: "Authentic Delhi-Style Tandoori Momos in Bhagalpur",
  rating: 4.5,
  totalReviews: 104,
  priceRange: "₹1–200 per person",
  phone: "8873652662",
  businessPhone: "079790 16236",
  address: "Zila School Rd, Adampur, Bhagalpur, Bihar – 812001",
  location: "Nagarmal Sheonarain and Sons, Bhagalpur",
  plusCode: "7X2H+44 Bhagalpur, Bihar",
  timings: "Open daily, closes at 10:30 PM",
  services: ["Dine-in", "Takeaway", "Delivery", "Online Ordering"],
  socialMedia: {
    whatsapp: "8873652662",
    instagram: "rishijha390",
    facebook: "#"
  },
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.8!2d87.32!3d25.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE1JzAwLjAiTiA4N8KwMTknMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
};

export const menuCategories = [
  {
    id: 1,
    name: "Tandoori Momos",
    description: "Grilled to perfection with smoky tandoori flavor",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9",
    items: [
      {
        id: 101,
        name: "Veg Tandoori Momos",
        description: "Crispy grilled momos with mixed vegetables",
        price: 80,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9"
      },
      {
        id: 102,
        name: "Chicken Tandoori Momos",
        description: "Juicy chicken momos with tandoori spices",
        price: 120,
        isVeg: false,
        image: "https://images.unsplash.com/photo-1694923450868-b432a8ee52aa"
      },
      {
        id: 103,
        name: "Paneer Tandoori Momos",
        description: "Cottage cheese filled momos with tandoori coating",
        price: 100,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1738608084602-f9543952188e"
      }
    ]
  },
  {
    id: 2,
    name: "Afghani Momos",
    description: "Creamy white sauce with rich flavors",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb",
    items: [
      {
        id: 201,
        name: "Veg Afghani Momos",
        description: "Momos tossed in creamy afghani sauce",
        price: 90,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb"
      },
      {
        id: 202,
        name: "Chicken Afghani Momos",
        description: "Tender chicken momos in white creamy sauce",
        price: 130,
        isVeg: false,
        image: "https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg"
      }
    ]
  },
  {
    id: 3,
    name: "Chilli Momos",
    description: "Spicy and tangy Indo-Chinese style",
    image: "https://images.pexels.com/photos/3911228/pexels-photo-3911228.jpeg",
    items: [
      {
        id: 301,
        name: "Veg Chilli Momos",
        description: "Spicy momos with bell peppers and onions",
        price: 85,
        isVeg: true,
        image: "https://images.pexels.com/photos/3911228/pexels-photo-3911228.jpeg"
      },
      {
        id: 302,
        name: "Chicken Chilli Momos",
        description: "Fiery chicken momos in spicy sauce",
        price: 125,
        isVeg: false,
        image: "https://images.unsplash.com/photo-1589047133481-02b4a5327d89"
      },
      {
        id: 303,
        name: "Paneer Chilli Momos",
        description: "Cottage cheese momos with spicy gravy",
        price: 95,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e"
      }
    ]
  },
  {
    id: 4,
    name: "Steamed Momos",
    description: "Light, healthy, and delicious",
    image: "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e",
    items: [
      {
        id: 401,
        name: "Veg Steamed Momos",
        description: "Classic steamed momos with vegetables",
        price: 60,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e"
      },
      {
        id: 402,
        name: "Chicken Steamed Momos",
        description: "Traditional chicken momos steamed to perfection",
        price: 100,
        isVeg: false,
        image: "https://images.unsplash.com/photo-1694923450868-b432a8ee52aa"
      },
      {
        id: 403,
        name: "Mixed Steamed Momos",
        description: "Combination of veg and chicken momos",
        price: 110,
        isVeg: false,
        image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9"
      }
    ]
  }
];

export const reviews = [
  {
    id: 1,
    name: "Rahul Kumar",
    rating: 5,
    date: "2 weeks ago",
    review: "Amazing taste! The tandoori momos are absolutely delicious. Crunchy coating with flavorful filling. Best momos in Bhagalpur!",
    avatar: "RK"
  },
  {
    id: 2,
    name: "Priya Singh",
    rating: 4,
    date: "1 month ago",
    review: "Great value for money. The spicy fillings are perfect. Staff is very attentive and service is quick. Highly recommended!",
    avatar: "PS"
  },
  {
    id: 3,
    name: "Amit Sharma",
    rating: 5,
    date: "3 weeks ago",
    review: "Authentic Delhi-style taste in Bhagalpur. The afghani momos are creamy and delicious. Will definitely come back!",
    avatar: "AS"
  },
  {
    id: 4,
    name: "Sneha Verma",
    rating: 4,
    date: "1 week ago",
    review: "Loved the chilli momos! Spicy and tangy just the way I like it. Good hygiene and friendly staff.",
    avatar: "SV"
  }
];

export const gallery = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9",
    title: "Tandoori Momos Platter",
    category: "food"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1694923450868-b432a8ee52aa",
    title: "Fresh Momos with Sauce",
    category: "food"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1738608084602-f9543952188e",
    title: "Crispy Fried Momos",
    category: "food"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb",
    title: "Variety Platter",
    category: "food"
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg",
    title: "Special Momos",
    category: "food"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1667388969250-1c7220bf3f37",
    title: "Restaurant Interior",
    category: "ambiance"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1729394405518-eaf2a0203aa7",
    title: "Dining Area",
    category: "ambiance"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1538333581680-29dd4752ddf2",
    title: "Cozy Seating",
    category: "ambiance"
  }
];

export const features = [
  {
    id: 1,
    title: "High Rating",
    description: "4.5⭐ rating with 104+ satisfied customers",
    icon: "star"
  },
  {
    id: 2,
    title: "Affordable Pricing",
    description: "₹1–200 per person, great value for money",
    icon: "dollar-sign"
  },
  {
    id: 3,
    title: "Quality Food",
    description: "Fresh ingredients, authentic Delhi taste",
    icon: "chef-hat"
  },
  {
    id: 4,
    title: "Fast Service",
    description: "Quick preparation, dine-in, takeaway, delivery",
    icon: "zap"
  }
];