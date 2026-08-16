function RiderDeliveries() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-800">Deliveries</h1>
        <div className="mt-6 space-y-4">
          {[
            { id: '#D102', customer: 'Ayesha', status: 'Accepted', progress: 'Picked Up' },
            { id: '#D103', customer: 'Fahim', status: 'On the way', progress: 'Delivering' },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
              <div>
                <p className="font-bold text-slate-800">{item.id}</p>
                <p className="text-sm text-slate-500">{item.customer}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">{item.status}</span>
                <button className="rounded-xl bg-orange-500 px-3 py-2 text-sm font-semibold text-white">{item.progress}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RiderDeliveries;
