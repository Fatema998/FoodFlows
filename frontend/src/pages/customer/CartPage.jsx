import { Link } from "react-router-dom";

const cartItems = [
  { id: 1, name: "Spicy Chicken Burger", qty: 2, price: 16.5, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
  { id: 2, name: "Veggie Power Bowl", qty: 1, price: 14.0, image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80" },
  { id: 3, name: "Mango Lime Spritz", qty: 1, price: 5.0, image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80" },
];

function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = 3.5;
  const discount = 5;
  const total = subtotal + deliveryFee - discount;

  return (
    <div className="min-h-screen bg-[#fffaf6] text-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF5200]">Your cart</p>
            <h1 className="mt-2 text-3xl font-black text-slate-800">Cart overview</h1>
          </div>
          <Link to="/" className="text-sm font-semibold text-[#FF5200]">Continue shopping</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="h-20 w-20 rounded-2xl object-cover" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
                    <p className="text-sm text-slate-500">${item.price.toFixed(2)} each</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:justify-end">
                  <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-lg text-slate-700">−</button>
                  <span className="min-w-6 text-center font-semibold text-slate-700">{item.qty}</span>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF5200] text-lg text-white">+</button>
                  <button className="ml-2 text-sm font-semibold text-red-500">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-800">Order summary</h2>
            <div className="mt-5 space-y-3 text-slate-600">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Delivery fee</span><span>${deliveryFee.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-bold text-slate-800"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <Link to="/checkout" className="mt-6 block rounded-2xl bg-[#FF5200] px-4 py-3 text-center font-semibold text-white shadow-lg shadow-orange-200">Checkout</Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
