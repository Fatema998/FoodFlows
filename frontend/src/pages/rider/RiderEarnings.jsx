function RiderEarnings() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-800">Earnings</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ['Weekly earnings', '$540'],
            ['This month', '$1,850'],
            ['Pending payout', '$220'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-3 text-2xl font-black text-slate-800">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RiderEarnings;
