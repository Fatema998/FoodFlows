function OwnerRestaurant() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-800">Restaurant profile</h1>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Restaurant name</label>
            <input defaultValue="Saffron Bites" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Cuisine</label>
            <input defaultValue="Bangladeshi • Grill" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
            <textarea defaultValue="Fresh, flavorful dishes prepared daily for your neighborhood cravings." rows="4" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerRestaurant;
