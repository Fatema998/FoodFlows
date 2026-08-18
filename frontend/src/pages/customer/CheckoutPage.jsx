import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    address: "House 18, Road 7, Gulshan 2, Dhaka",
    paymentMethod: "Credit/Debit Card",
    promo: "FOODFLOW10",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};
    if (!form.address.trim()) nextErrors.address = "Delivery address is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    navigate("/orders/10498");
  };

  return (
    <div className="min-h-screen bg-[#fffaf6] px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF5200]">Checkout</p>
          <h1 className="mt-2 text-3xl font-black text-slate-800">Complete your order</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-800">1. Delivery address</h2>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows="4"
                placeholder="Enter your delivery address"
                className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#FF5200] focus:ring-2 focus:ring-orange-100"
              />
              {errors.address && <p className="mt-2 text-sm text-red-500">{errors.address}</p>}
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-800">2. Payment method</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {['Credit/Debit Card', 'Mobile Wallet', 'Cash on Delivery'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setForm({ ...form, paymentMethod: method })}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                      form.paymentMethod === method
                        ? "border-[#FF5200] bg-orange-50 text-[#FF5200]"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-800">3. Promo / discount</h2>
              <div className="mt-4 flex gap-3">
                <input
                  value={form.promo}
                  onChange={(e) => setForm({ ...form, promo: e.target.value })}
                  placeholder="Enter promo code"
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#FF5200] focus:ring-2 focus:ring-orange-100"
                />
                <button className="rounded-xl bg-slate-100 px-4 py-3 font-semibold text-slate-700">Apply</button>
              </div>
            </div>
          </div>

          <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-800">Order summary</h2>
            <div className="mt-5 space-y-3 text-slate-600">
              <div className="flex justify-between"><span>Spicy Chicken Burger</span><span>$33.00</span></div>
              <div className="flex justify-between"><span>Veggie Bowl</span><span>$14.00</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>$3.50</span></div>
              <div className="flex justify-between"><span>Discount</span><span>-$5.00</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-black text-slate-800"><span>Total</span><span>$45.50</span></div>
            </div>
            <button onClick={handlePlaceOrder} className="mt-6 w-full rounded-2xl bg-[#FF5200] px-4 py-3 font-semibold text-white shadow-lg shadow-orange-200">
              Place order
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
