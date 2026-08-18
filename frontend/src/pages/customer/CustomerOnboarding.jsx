import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import OnboardingHeader from "../../components/onboarding/OnboardingHeader";
import ProgressBar from "../../components/onboarding/ProgressBar";
import FooterNav from "../../components/onboarding/FooterNav";

const steps = ["Delivery Address", "Dietary Preferences", "Payment"];

const dietaryOptions = ["Pizza", "Burgers", "Sushi", "Healthy / Vegan", "Halal", "Gluten-Free", "Spicy", "Desserts"];
const allergenOptions = ["Peanuts", "Dairy", "Shellfish", "Soy", "Eggs"];

function CustomerOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    street: "",
    apartment: "",
    instructions: "",
    addressType: "Home",
    dietary: [],
    allergens: [],
    paymentMethod: "Card",
  });

  const toggleMultiSelect = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleContinue = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      return;
    }
    navigate("/");
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
              <motion.div key="step-1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
                <h2 className="text-2xl font-bold text-slate-800">Set up your delivery address</h2>
                <p className="mt-2 text-slate-500">Tell us where your meals should be delivered.</p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">Street Address</label>
                    <input value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} placeholder="123 Main Street" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Apartment / Suite</label>
                    <input value={form.apartment} onChange={(e) => setForm({ ...form, apartment: e.target.value })} placeholder="Apt 8B" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Address Type</label>
                    <select value={form.addressType} onChange={(e) => setForm({ ...form, addressType: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100">
                      <option>Home</option>
                      <option>Work</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">Delivery Instructions</label>
                    <textarea value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} rows="4" placeholder="Ring bell, leave at the lobby, etc." className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Map / Delivery Area</p>
                      <p className="text-xs text-slate-400">This is a placeholder map for onboarding.</p>
                    </div>
                    <span className="text-2xl">📍</span>
                  </div>
                  <div className="mt-4 h-40 rounded-2xl bg-gradient-to-br from-slate-200 via-white to-orange-100" />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="step-2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
                <h2 className="text-2xl font-bold text-slate-800">Select your tastes</h2>
                <p className="mt-2 text-slate-500">We’ll personalize your recommendations based on your food preferences.</p>

                <div className="mt-7">
                  <p className="mb-3 font-semibold text-slate-700">Favorite cuisines</p>
                  <div className="flex flex-wrap gap-2">
                    {dietaryOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleMultiSelect("dietary", item)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                          form.dietary.includes(item)
                            ? "border-orange-500 bg-orange-500 text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:border-orange-300"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="mb-3 font-semibold text-slate-700">Allergens</p>
                  <div className="flex flex-wrap gap-2">
                    {allergenOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleMultiSelect("allergens", item)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                          form.allergens.includes(item)
                            ? "border-red-500 bg-red-50 text-red-600"
                            : "border-slate-200 bg-white text-slate-600 hover:border-red-300"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="step-3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
                <h2 className="text-2xl font-bold text-slate-800">Choose your payment</h2>
                <p className="mt-2 text-slate-500">Secure and flexible payment options for your first order.</p>

                <div className="mt-7 space-y-3">
                  {[
                    ["Credit/Debit Card", "💳"],
                    ["Mobile Wallet", "📱"],
                    ["Cash on Delivery", "💵"],
                  ].map(([label, icon]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setForm({ ...form, paymentMethod: label })}
                      className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                        form.paymentMethod === label
                          ? "border-orange-500 bg-orange-50"
                          : "border-slate-200 bg-white hover:border-orange-300"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-2xl">{icon}</span>
                        <span className="font-semibold text-slate-700">{label}</span>
                      </span>
                      <span className={`h-5 w-5 rounded-full border-2 ${form.paymentMethod === label ? "border-orange-500 bg-orange-500" : "border-slate-300"}`} />
                    </button>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
                  <p className="text-lg font-bold">🎉 First Order Perk Unlocked!</p>
                  <p className="mt-1 text-sm">$5 off applied to your account.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <FooterNav currentStep={currentStep} totalSteps={3} onBack={handleBack} onContinue={handleContinue} continueText="Start Exploring Restaurants 🚀" />
        </div>
      </main>
    </div>
  );
}

export default CustomerOnboarding;
