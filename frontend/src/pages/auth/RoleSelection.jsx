import { useState } from "react";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    id: "CUSTOMER",
    icon: "🍔",
    title: "Customer",
    description: "Discover restaurants and order your favorite food.",
    path: "/onboarding/customer",
  },
  {
    id: "RESTAURANT_OWNER",
    icon: "🏪",
    title: "Restaurant Owner",
    description: "Manage your restaurant, menu and incoming orders.",
    path: "/onboarding/owner",
  },
  {
    id: "DELIVERY_RIDER",
    icon: "🛵",
    title: "Delivery Rider",
    description: "Deliver orders and earn with FoodFlow.",
    path: "/onboarding/rider",
  },
];

function RoleSelection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("CUSTOMER");

  const handleContinue = () => {
    const selected = roles.find((role) => role.id === selectedRole);
    if (selected) navigate(selected.path);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tight text-orange-500">FoodFlow</h1>
          <h2 className="text-3xl font-bold text-slate-800 mt-6">How will you use FoodFlow?</h2>
          <p className="text-slate-500 mt-2">Choose your role to personalize your FoodFlow experience.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => setSelectedRole(role.id)}
              className={`text-left bg-white rounded-3xl p-6 border-2 transition-all duration-200 hover:-translate-y-1 ${
                selectedRole === role.id
                  ? "border-orange-500 bg-orange-50 shadow-lg"
                  : "border-slate-100 shadow-sm hover:border-orange-300"
              }`}
            >
              <div className="text-5xl mb-5">{role.icon}</div>

              <h3 className={`text-xl font-bold ${selectedRole === role.id ? "text-orange-600" : "text-slate-800"}`}>
                {role.title}
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">{role.description}</p>

              <div className="mt-5">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full border-2 ${selectedRole === role.id ? "border-orange-500 bg-orange-500 text-white" : "border-slate-300"}`}>
                  {selectedRole === role.id && "✓"}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleContinue}
            className="px-10 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-200 transition"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;