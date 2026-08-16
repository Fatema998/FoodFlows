import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/common/Navbar";
import { restaurantApi } from "../../services/api";

const categories = [
  { id: "pizza", name: "Pizza", icon: "🍕", subtitle: "Crispy, cheesy, loaded" },
  { id: "burgers", name: "Burgers", icon: "🍔", subtitle: "Smash & grilled" },
  { id: "sushi", name: "Sushi", icon: "🍣", subtitle: "Fresh & premium" },
  { id: "biryani", name: "Biryani", icon: "🍛", subtitle: "Spiced & rich" },
  { id: "healthy", name: "Healthy", icon: "🥗", subtitle: "Clean & light" },
  { id: "desserts", name: "Desserts", icon: "🍰", subtitle: "Sweet cravings" },
];

const recommended = [
  {
    id: 11,
    name: "Crispy Chicken Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    price: 16.5,
    restaurant: "Saffron Bites",
    time: "15 min",
    rating: 4.8,
  },
  {
    id: 12,
    name: "Spicy Prawn Bowl",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    price: 18.0,
    restaurant: "Green Bowl",
    time: "20 min",
    rating: 4.7,
  },
  {
    id: 13,
    name: "Salmon Crunch Roll",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80",
    price: 21.0,
    restaurant: "Tokyo Feast",
    time: "22 min",
    rating: 4.9,
  },
  {
    id: 14,
    name: "Loaded Fries",
    image:
      "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80",
    price: 9.5,
    restaurant: "Burger Lab",
    time: "12 min",
    rating: 4.6,
  },
];

function CustomerHome() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch restaurants from backend API on component mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        console.log("🚀 [DEBUG] Fetching restaurants from API...");
        setIsLoading(true);
        setError(null);
        
        console.log("📡 [DEBUG] Calling restaurantApi.getRestaurants()");
        const response = await restaurantApi.getRestaurants();
        console.log("✅ [DEBUG] API response received:", response);
        console.log("📋 [DEBUG] response.success:", response.success);
        console.log("🍽️  [DEBUG] response.restaurants:", response.restaurants);
        console.log("📊 [DEBUG] Restaurant count:", response.restaurants?.length || 0);
        
        if (response.success && response.restaurants) {
          console.log("✔️  [DEBUG] Response structure valid, transforming data...");
          // Transform backend data to match frontend format
          const formattedRestaurants = response.restaurants.map((r) => ({
            id: r.id,
            name: r.name,
            cuisine: r.cuisine,
            rating: parseFloat(r.rating),
            deliveryTime: r.delivery_time,
            fee: r.delivery_fee === "0.00" || r.delivery_fee === 0 ? "Free delivery" : `$${r.delivery_fee}`,
            image: r.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
            tag: "Recommended",
          }));
          console.log("🎯 [DEBUG] Formatted restaurants:", formattedRestaurants);
          console.log("💾 [DEBUG] Setting state with", formattedRestaurants.length, 'restaurants');
          setRestaurants(formattedRestaurants);
        } else {
          console.warn("⚠️  [DEBUG] Response structure invalid - success:", response.success, "restaurants:", response.restaurants);
        }
      } catch (err) {
        console.error("❌ [DEBUG] Error fetching restaurants:", err);
        console.error("📌 [DEBUG] Error message:", err.message);
        console.error("📌 [DEBUG] Full error object:", err);
        setError(err.message || "Failed to load restaurants");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Filter restaurants based on search query
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const query = searchQuery.toLowerCase();
    const matches = (
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.cuisine.toLowerCase().includes(query)
    );
    if (searchQuery) {
      console.log(`🔍 [SEARCH] Query: "${searchQuery}" | Restaurant: "${restaurant.name}" (${restaurant.cuisine}) | Match: ${matches}`);
    }
    return matches;
  });
  
  if (searchQuery) {
    console.log(`📊 [SEARCH SUMMARY] Total restaurants: ${restaurants.length} | Search query: "${searchQuery}" | Filtered results: ${filteredRestaurants.length}`);
  }

  const handleSearch = (e) => {
    const newQuery = typeof e === 'string' ? e : e.target.value;
    console.log(`✍️  [SEARCH INPUT] User typed: "${newQuery}"`);
    setSearchQuery(newQuery);
  };

  return (
    <div className="min-h-screen bg-[#fffaf6] text-slate-800">
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearch} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#111827] via-[#172033] to-[#FF5200] p-6 text-white shadow-[0_25px_80px_rgba(255,82,0,0.22)] sm:p-8 lg:p-10"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-100">
                Food delivery made better
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                Craving something delicious?
              </h1>
              <p className="mt-4 max-w-xl text-base text-slate-200 sm:text-lg">
                Discover local favorites, artisan kitchens, and comfort food delivered fresh to your door in minutes.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <span className="text-lg">🔎</span>
                  <input
                    type="text"
                    placeholder="Search food or restaurants"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full border-0 bg-transparent text-sm text-white placeholder:text-slate-300 focus:outline-none"
                  />
                </div>
                <button 
                  disabled={isLoading}
                  className="rounded-2xl bg-[#FF5200] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/40 transition hover:bg-[#e94a00] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Loading..." : "Find food"}
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-200">
                <div>
                  <p className="text-2xl font-black text-white">12k+</p>
                  <p>happy diners</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">4.9/5</p>
                  <p>average rating</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">25m</p>
                  <p>avg. delivery</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-[#FF5200]/30 blur-2xl" />
              <div className="absolute -right-10 bottom-4 h-28 w-28 rounded-full bg-orange-300/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <img
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80"
                  alt="Dish showcase"
                  className="h-[350px] w-full rounded-[24px] object-cover"
                />
                <div className="mt-4 rounded-2xl bg-white p-4 text-slate-800 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Big deal today</p>
                      <h3 className="mt-1 text-xl font-black">Combo Feast</h3>
                    </div>
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-[#FF5200]">Save 30%</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                    <span>⭐ 4.9</span>
                    <span>🍽 2 items</span>
                    <span>⚡ 18 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-black text-slate-800">Browse by category</h2>
            <Link to="/" className="text-sm font-semibold text-[#FF5200]">See all</Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-3xl">
                  {category.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-800">{category.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{category.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-black text-slate-800">
              {searchQuery ? "Search results" : "Popular restaurants"}
            </h2>
            <Link to="/" className="text-sm font-semibold text-[#FF5200]">
              View all
            </Link>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] border border-slate-200 bg-white p-12 shadow-sm">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#FF5200] border-t-transparent" />
              <p className="text-slate-500">Loading restaurants...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] border border-red-200 bg-red-50 p-12 shadow-sm">
              <p className="text-lg font-semibold text-red-600">⚠️ {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredRestaurants.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] border border-slate-200 bg-white p-12 shadow-sm">
              <p className="text-2xl">🔍</p>
              <p className="text-lg font-semibold text-slate-600">No restaurants found</p>
              <p className="text-sm text-slate-500">
                {searchQuery
                  ? `Try a different search term`
                  : "No restaurants available right now"}
              </p>
            </div>
          )}

          {/* Restaurants Grid */}
          {!isLoading && !error && filteredRestaurants.length > 0 && (
            <div className="grid gap-5 lg:grid-cols-3">
              {filteredRestaurants.map((restaurant) => (
                <Link
                  to={`/restaurants/${restaurant.id}`}
                  key={restaurant.id}
                  className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg shadow-sm">
                      ♡
                    </button>
                    <span className="absolute bottom-4 left-4 rounded-full bg-[#FF5200] px-3 py-1 text-xs font-bold text-white">
                      {restaurant.tag}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-black text-slate-800">
                          {restaurant.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {restaurant.cuisine}
                        </p>
                      </div>
                      <span className="rounded-full bg-orange-50 px-2.5 py-1 text-sm font-bold text-[#FF5200]">
                        ⭐ {restaurant.rating}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                      <span>{restaurant.deliveryTime}</span>
                      <span>{restaurant.fee}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-black text-slate-800">Recommended for you</h2>
            <Link to="/" className="text-sm font-semibold text-[#FF5200]">See menu</Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {recommended.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <img src={item.image} alt={item.name} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{item.restaurant}</p>
                    </div>
                    <button className="text-xl text-slate-300">♡</button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-black text-[#FF5200]">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="rounded-full bg-orange-50 px-2.5 py-1 text-sm font-semibold text-[#FF5200]">
                      ⭐ {item.rating}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <span>{item.time}</span>
                    <button className="rounded-xl bg-[#FF5200] px-3 py-2 font-semibold text-white">Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default CustomerHome;