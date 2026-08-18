import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import OnboardingHeader from "../../components/onboarding/OnboardingHeader";
import ProgressBar from "../../components/onboarding/ProgressBar";
import FooterNav from "../../components/onboarding/FooterNav";

const steps = ["Restaurant Profile", "Menu Setup", "Payout"];

function OwnerOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    restaurantName: "",
    cuisine: "",
    preparationTime: "",
    operatingHours: {
      mon: "9:00 AM - 10:00 PM",
      tue: "9:00 AM - 10:00 PM",
      wed: "9:00 AM - 10:00 PM",
      thu: "9:00 AM - 10:00 PM",
      fri: "9:00 AM - 10:00 PM",
      sat: "10:00 AM - 11:00 PM",
      sun: "10:00 AM - 8:00 PM",
    },
    menuCategory: "Bestsellers",
    foodName: "",
    description: "",
    price: "",
    spicy: false,
    vegetarian: false,
    topSeller: false,
    bankName: "",
    routing: "",
    accountNumber: "",
  });

  const handleContinue = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      return;
    }
    navigate("/owner/dashboard");
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <OnboardingHeader />
      <main className="mx-auto max-w-4xl px-4 pb-10 pt-6">
        <ProgressBar currentStep={currentStep} steps={steps} />

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl md:p-10">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="owner-step-1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
                <h2 className="text-2xl font-bold text-slate-800">Restaurant profile</h2>
                <p className="mt-2 text-slate-500">Set up the essentials for your store.</p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Restaurant name</label>
                    <input value={form.restaurantName} onChange={(e) => setForm({ ...form, restaurantName: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" placeholder="Saffron Bites" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Cuisine categories</label>
                    <input value={form.cuisine} onChange={(e) => setForm({ ...form, cuisine: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" placeholder="Bangladeshi, Italian" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Preparation time</label>
                    <input value={form.preparationTime} onChange={(e) => setForm({ ...form, preparationTime: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" placeholder="20-30 mins" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Cover image upload</label>
                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">📷 Upload cover image</div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">Logo upload</label>
                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">🏷️ Upload logo</div>
                  </div>
                </div>

                <div className="mt-7">
                  <p className="mb-3 font-semibold text-slate-700">Operating hours</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {Object.entries(form.operatingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2">
                        <span className="w-14 text-sm font-medium uppercase text-slate-600">{day}</span>
                        <input value={hours} onChange={(e) => setForm({ ...form, operatingHours: { ...form.operatingHours, [day]: e.target.value } })} className="w-full bg-transparent text-sm outline-none" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="owner-step-2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
                <h2 className="text-2xl font-bold text-slate-800">Menu setup</h2>
                <p className="mt-2 text-slate-500">Create your flagship dishes and categories.</p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Menu category</label>
                    <input value={form.menuCategory} onChange={(e) => setForm({ ...form, menuCategory: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Food item name</label>
                    <input value={form.foodName} onChange={(e) => setForm({ ...form, foodName: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" placeholder="Crispy Chicken Bowl" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="3" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" placeholder="Deliciously seasoned with herb rice and signature sauce." />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Price</label>
                    <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" placeholder="$18.50" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Food image</label>
                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">🍽️ Upload food image</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    ["spicy", "Spicy"],
                    ["vegetarian", "Vegetarian"],
                    ["topSeller", "Top Seller"],
                  ].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
                      <input type="checkbox" checked={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.checked })} className="accent-orange-500" />
                      {label}
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="owner-step-3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
                <h2 className="text-2xl font-bold text-slate-800">Payout details</h2>
                <p className="mt-2 text-slate-500">Set your payment information for weekly settlements.</p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Account holder name</label>
                    <input value={form.bankName} onChange={(e) => setForm({ ...form, bankName: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Routing / BSB</label>
                    <input value={form.routing} onChange={(e) => setForm({ ...form, routing: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" placeholder="123456" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">Account number</label>
                    <input value={form.accountNumber} onChange={(e) => setForm({ ...form, accountNumber: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" placeholder="987654321" />
                  </div>
                </div>

                <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-700">
                  <p className="font-bold">Your store is currently in PREPARATION mode.</p>
                  <p className="mt-1 text-sm">Once verified by Admin, your menu will go live.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <FooterNav currentStep={currentStep} totalSteps={3} onBack={handleBack} onContinue={handleContinue} continueText="Open Owner Dashboard 🏪" />
        </div>
      </main>
    </div>
  );
}

export default OwnerOnboarding;
