import { Link } from "react-router-dom";

const deliveries = [
  { id: "#D102", address: "Gulshan, Dhaka", status: "Available" },
  { id: "#D103", address: "Dhanmondi, Dhaka", status: "Assigned" },
  { id: "#D104", address: "Uttara, Dhaka", status: "Completed" },
];

function RiderDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Rider status</p>
              <h1 className="mt-2 text-3xl font-black text-slate-800">Dispatch center</h1>
            </div>
            <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">Online</div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ['Available deliveries', '12'],
            ['Active delivery', '2'],
            ['Earnings', '$540'],
            ['History', '48'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-3 text-3xl font-black text-slate-800">{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">Available deliveries</h2>
            <div className="mt-4 space-y-3">
              {deliveries.map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <div>
                    <p className="font-semibold text-slate-800">{delivery.id}</p>
                    <p className="text-sm text-slate-500">{delivery.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">{delivery.status}</span>
                    <button className="rounded-xl bg-orange-500 px-3 py-2 text-sm font-semibold text-white">Accept</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800">Quick links</h3>
            <nav className="mt-4 space-y-2">
              {[
                ['/rider/deliveries', 'Deliveries'],
                ['/rider/history', 'History'],
                ['/rider/earnings', 'Earnings'],
                ['/rider/profile', 'Profile'],
              ].map(([to, label]) => (
                <Link key={label} to={to} className="block rounded-2xl bg-slate-50 px-3 py-3 font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600">
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
        </section>
      </div>
    </div>
  );
}

export default RiderDashboard;
