const timeline = [
  "PLACED",
  "CONFIRMED",
  "PREPARING",
  "READY_FOR_PICKUP",
  "PICKED_UP",
  "ON_THE_WAY",
  "DELIVERED",
];

function OrderTrackingPage() {
  const activeIndex = 4;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Order tracking</p>
            <h1 className="mt-2 text-3xl font-black text-slate-800">Order #10498</h1>
          </div>
          <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">ON THE WAY</div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="space-y-6">
              {timeline.map((status, index) => {
                const isActive = index <= activeIndex;
                return (
                  <div key={status} className="flex items-center gap-4">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${isActive ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-500"}`}>
                      {isActive ? "✓" : index + 1}
                    </div>
                    <div className="flex-1 border-b border-slate-100 pb-4">
                      <p className={`font-semibold ${isActive ? "text-slate-800" : "text-slate-400"}`}>{status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-bold text-slate-800">Order details</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p><span className="font-semibold text-slate-700">Restaurant:</span> Saffron Bites</p>
              <p><span className="font-semibold text-slate-700">Items:</span> 2 meals</p>
              <p><span className="font-semibold text-slate-700">Total:</span> $26.90</p>
              <p><span className="font-semibold text-slate-700">Delivery address:</span> Gulshan, Dhaka</p>
              <p><span className="font-semibold text-slate-700">Rider:</span> Driver #12</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default OrderTrackingPage;
