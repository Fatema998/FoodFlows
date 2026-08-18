import { Link } from "react-router-dom";

const stats = [
  { title: "Today's orders", value: "128", type: "primary" },
  { title: "Revenue", value: "$2,480", type: "secondary" },
  { title: "Pending", value: "24", type: "warning" },
  { title: "Completed", value: "96", type: "success" },
];

const orders = [
  { id: "#1024", customer: "Nadia", total: "$42.00", status: "Preparing" },
  { id: "#1025", customer: "Ahsan", total: "$28.50", status: "Ready" },
  { id: "#1026", customer: "Sara", total: "$36.95", status: "Delivered" },
];

function OwnerDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <aside className="hidden w-72 shrink-0 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm lg:block">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-orange-500">FoodFlow</h1>
            <p className="mt-2 text-sm text-slate-500">Owner dashboard</p>
          </div>
          <nav className="space-y-2">
            {[
              ["/owner/dashboard", "Overview"],
              ["/owner/orders", "Orders"],
              ["/owner/menu", "Menu"],
              ["/owner/restaurant", "Restaurant"],
              ["/owner/settings", "Settings"],
            ].map(([to, label]) => (
              <Link key={label} to={to} className="block rounded-2xl px-3 py-2 font-medium text-slate-600 transition hover:bg-orange-50 hover:text-orange-600">
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1">
          <header className="mb-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Restaurant status</p>
                <h2 className="mt-2 text-3xl font-black text-slate-800">Saffron Bites</h2>
              </div>
              <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">Open • Live</div>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.title} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">{stat.title}</p>
                <p className="mt-3 text-3xl font-black text-slate-800">{stat.value}</p>
              </div>
            ))}
          </section>

          <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">Today's orders</h3>
              <button className="text-sm font-semibold text-orange-500">View all</button>
            </div>
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <div>
                    <p className="font-semibold text-slate-800">{order.id}</p>
                    <p className="text-sm text-slate-500">{order.customer}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-800">{order.total}</span>
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default OwnerDashboard;