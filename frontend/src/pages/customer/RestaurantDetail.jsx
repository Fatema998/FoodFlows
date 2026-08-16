import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

const restaurantMap = {
  1: {
    id: 1,
    name: "Saffron Bites",
    cuisine: "Bangladeshi • Grill • Healthy",
    rating: 4.9,
    time: "18-25 min",
    fee: "Free delivery",
    heroImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  2: {
    id: 2,
    name: "Green Bowl",
    cuisine: "Healthy • Vegan • Fresh",
    rating: 4.8,
    time: "20-30 min",
    fee: "$2.49",
    heroImage:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  },
  3: {
    id: 3,
    name: "Tokyo Feast",
    cuisine: "Japanese • Sushi • Seafood",
    rating: 4.9,
    time: "25-35 min",
    fee: "$3.99",
    heroImage:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
  },
};

const menuByCategory = {
  Popular: [
    { id: 1, name: "Spicy Chicken Burger", description: "Char-grilled chicken, cheddar, slaw, signature sauce.", price: 16.5, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
    { id: 2, name: "Crispy Fries Deluxe", description: "Golden fries tossed with sea salt and herbs.", price: 7.5, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80" },
    { id: 3, name: "Veggie Power Bowl", description: "Roasted veggies, avocado, quinoa and tahini dressing.", price: 14.0, image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80" },
  ],
  Burgers: [
    { id: 11, name: "Smash Burger", description: "Two patties, melted cheese, caramelized onions.", price: 15.0, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80" },
    { id: 12, name: "BBQ Crunch Burger", description: "Smoky barbecue glaze and crispy onion strings.", price: 17.0, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
  ],
  Bowls: [
    { id: 21, name: "Protein Power Bowl", description: "Brown rice, chicken, greens, rice paper crunch.", price: 18.0, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80" },
    { id: 22, name: "Garden Glow Bowl", description: "Avocado, quinoa, roasted vegetables, hummus.", price: 16.0, image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80" },
  ],
  Drinks: [
    { id: 31, name: "Mango Lime Spritz", description: "Citrus, mango, sparkling water.", price: 5.0, image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80" },
    { id: 32, name: "Fresh Cold Coffee", description: "Slow brewed and chilled for the perfect sip.", price: 6.0, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80" },
  ],
};

const categories = ["Popular", "Burgers", "Bowls", "Drinks"];

function RestaurantDetail() {
  const { id } = useParams();
  const restaurant = restaurantMap[id] || restaurantMap[1];
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  return (
    <div className="min-h-screen bg-[#fffaf6] text-slate-800">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
          <img src={restaurant.heroImage} alt={restaurant.name} className="h-72 w-full object-cover md:h-80" />
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF5200]">Open now</p>
                <h1 className="mt-2 text-3xl font-black text-slate-800 md:text-4xl">{restaurant.name}</h1>
                <p className="mt-2 text-slate-500">{restaurant.cuisine}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-orange-50 px-3 py-1 font-bold text-[#FF5200]">⭐ {restaurant.rating}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">{restaurant.time}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">{restaurant.fee}</span>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.8fr_0.8fr]">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-800">Menu</h2>
              <span className="text-sm text-slate-500">{menuByCategory[selectedCategory].length} items</span>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedCategory === category
                      ? "bg-[#FF5200] text-white shadow-lg shadow-orange-200"
                      : "bg-white text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              {menuByCategory[selectedCategory].map((item) => (
                <div key={item.id} className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm md:flex-row">
                  <img src={item.image} alt={item.name} className="h-36 w-full rounded-2xl object-cover md:w-44" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{item.name}</h3>
                      <p className="mt-2 text-sm text-slate-500">{item.description}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-2xl font-black text-[#FF5200]">${item.price.toFixed(2)}</span>
                      <div className="flex items-center gap-3">
                        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-lg text-slate-700">−</button>
                        <span className="font-semibold text-slate-700">1</span>
                        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF5200] text-lg text-white">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-black text-slate-800">Delivery details</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>📍 Delivery in: Gulshan, Dhanmondi</p>
              <p>🕒 ETA: {restaurant.time}</p>
              <p>💳 Payment: Card, Wallet, COD</p>
              <p>📦 Free item updates at every step</p>
            </div>
            <Link to="/checkout" className="mt-6 block rounded-2xl bg-[#FF5200] px-4 py-3 text-center font-semibold text-white shadow-lg shadow-orange-200">
              Proceed to checkout
            </Link>
            <Link to="/" className="mt-3 block text-center text-sm font-semibold text-slate-600">
              Continue shopping
            </Link>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default RestaurantDetail;
