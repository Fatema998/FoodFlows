function OwnerOrders() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-800">Orders</h1>
        <p className="mt-2 text-slate-500">Pending, in-progress, and completed orders.</p>
        <div className="mt-6 space-y-4">
          {[
            { id: '#1024', customer: 'Nadia', status: 'Preparing', total: '$42.00' },
            { id: '#1025', customer: 'Ahsan', status: 'Ready', total: '$28.50' },
            { id: '#1026', customer: 'Sara', status: 'Delivered', total: '$36.95' },
          ].map((order) => (
            <div key={order.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
              <div>
                <p className="font-bold text-slate-800">{order.id}</p>
                <p className="text-sm text-slate-500">{order.customer}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">{order.status}</span>
                <span className="font-bold text-slate-800">{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OwnerOrders;
