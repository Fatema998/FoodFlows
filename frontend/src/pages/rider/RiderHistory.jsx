function RiderHistory() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-800">Delivery history</h1>
        <div className="mt-6 space-y-4">
          {[
            { id: '#D099', address: 'Gulshan', amount: '$18.00' },
            { id: '#D098', address: 'Mirpur', amount: '$22.50' },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
              <div>
                <p className="font-bold text-slate-800">{item.id}</p>
                <p className="text-sm text-slate-500">{item.address}</p>
              </div>
              <span className="font-bold text-slate-800">{item.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RiderHistory;
