import { Link } from "react-router-dom";

const orders = [
  { id: "#10498", restaurant: "Saffron Bites", total: "$26.90", status: "Delivered", date: "Aug 10, 2026" },
  { id: "#10455", restaurant: "Green Bowl", total: "$18.50", status: "Preparing", date: "Aug 08, 2026" },
];

function OrdersPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Order history</p>
            <h1 className="text-3xl font-black text-slate-800">Previous orders</h1>
          </div>
          <Link to="/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700">Back home</Link>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-bold text-slate-800">{order.restaurant}</p>
                <p className="text-sm text-slate-500">{order.id} • {order.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">{order.status}</span>
                <span className="font-bold text-slate-800">{order.total}</span>
                <Link to={`/orders/${order.id.replace('#', '')}`} className="rounded-xl bg-orange-500 px-4 py-2 font-semibold text-white">View details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
