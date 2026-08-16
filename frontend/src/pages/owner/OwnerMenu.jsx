function OwnerMenu() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-800">Menu management</h1>
        <p className="mt-2 text-slate-500">Update categories, prices, and availability.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            { name: 'Crispy Chicken Bowl', price: '$16.00', available: true },
            { name: 'Veggie Pizza', price: '$18.50', available: true },
            { name: 'Naga Burger', price: '$14.50', available: false },
          ].map((item) => (
            <div key={item.name} className="rounded-2xl border border-slate-200 p-4">
              <div className="h-32 rounded-2xl bg-gradient-to-br from-orange-100 to-slate-100" />
              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">{item.name}</h3>
                <span className="font-semibold text-orange-500">{item.price}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                <span>{item.available ? 'Available' : 'Unavailable'}</span>
                <button className="font-semibold text-orange-500">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OwnerMenu;
