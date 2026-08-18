import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { searchApi } from "../../services/api";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState({ restaurants: [], menuItems: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!initialQuery) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await searchApi.search(initialQuery);
        if (response.success) {
          setResults(response.results);
        }
      } catch (err) {
        setError(err.message || "Failed to load search results");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [initialQuery]);

  const handleSearch = (e) => {
    const newQuery = typeof e === 'string' ? e : e.target.value;
    setSearchQuery(newQuery);
  };

  const submitSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf6] text-slate-800">
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearch} onKeyDown={submitSearch} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-800">
            Search Results for "{initialQuery}"
          </h1>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] border border-slate-200 bg-white p-12 shadow-sm">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#FF5200] border-t-transparent" />
            <p className="text-slate-500">Searching...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] border border-red-200 bg-red-50 p-12 shadow-sm">
            <p className="text-lg font-semibold text-red-600">⚠️ {error}</p>
          </div>
        )}

        {!isLoading && !error && results.restaurants.length === 0 && results.menuItems.length === 0 && initialQuery && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] border border-slate-200 bg-white p-12 shadow-sm">
            <p className="text-2xl">🔍</p>
            <p className="text-lg font-semibold text-slate-600">No results found</p>
            <p className="text-sm text-slate-500">Try a different search term</p>
          </div>
        )}

        {!isLoading && !error && results.restaurants.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 text-2xl font-bold text-slate-800">Restaurants</h2>
            <div className="grid gap-5 lg:grid-cols-3">
              {results.restaurants.map((restaurant) => (
                <Link
                  to={`/restaurants/${restaurant.id}`}
                  key={restaurant.id}
                  className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative">
                    <img
                      src={restaurant.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"}
                      alt={restaurant.name}
                      className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-black text-slate-800">{restaurant.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{restaurant.cuisine}</p>
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                      <span>⭐ {restaurant.rating}</span>
                      <span>{restaurant.delivery_time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {!isLoading && !error && results.menuItems.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-2xl font-bold text-slate-800">Menu Items</h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {results.menuItems.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <img src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"} alt={item.name} className="h-48 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{item.restaurant_name}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xl font-black text-[#FF5200]">${Number(item.price).toFixed(2)}</p>
                      <Link to={`/restaurants/${item.restaurant_id}`} className="rounded-xl bg-orange-50 px-3 py-2 text-sm font-semibold text-[#FF5200]">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default SearchPage;
