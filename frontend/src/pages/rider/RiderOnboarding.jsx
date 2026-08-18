import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import OnboardingHeader from "../../components/onboarding/OnboardingHeader";
import ProgressBar from "../../components/onboarding/ProgressBar";
import FooterNav from "../../components/onboarding/FooterNav";

const steps = [
  "Vehicle & Delivery Zone",
  "Documents & Verification",
  "Equipment & Payout",
];

const vehicles = [
  {
    id: "BICYCLE",
    icon: "🚲",
    title: "Bicycle",
  },
  {
    id: "SCOOTER",
    icon: "🛵",
    title: "Scooter / Moped",
  },
  {
    id: "MOTORCYCLE",
    icon: "🏍️",
    title: "Motorcycle",
  },
  {
    id: "CAR",
    icon: "🚗",
    title: "Car",
  },
];

const zones = [
  "Dhaka",
  "Mirpur",
  "Dhanmondi",
  "Uttara",
  "Gulshan",
  "Mohammadpur",
];

function RiderOnboarding() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const [vehicle, setVehicle] = useState("");

  const [selectedZones, setSelectedZones] = useState([]);

  const [documents, setDocuments] = useState({
    governmentId: null,
    drivingLicense: null,
    insurance: null,
  });

  const [equipment, setEquipment] = useState({
    deliveryBag: false,
    smartphone: false,
  });

  const [payout, setPayout] = useState({
    bankName: "",
    accountNumber: "",
  });

  const toggleZone = (zone) => {
    setSelectedZones((prev) =>
      prev.includes(zone)
        ? prev.filter((item) => item !== zone)
        : [...prev, zone]
    );
  };

  const handleDocumentChange = (field, file) => {
    if (!file) return;

    setDocuments((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    console.log({
      vehicle,
      selectedZones,
      documents,
      equipment,
      payout,
    });

    navigate("/rider/dashboard");
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      <OnboardingHeader />

      <main className="flex-1 px-4 py-6">

        <ProgressBar
          currentStep={currentStep}
          steps={steps}
        />

        <div className="max-w-2xl mx-auto">

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-10">

            <AnimatePresence mode="wait">

              {/* STEP 1 */}
              {currentStep === 1 && (
                <motion.div
                  key="rider-step1"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-2xl font-bold text-slate-800">
                    How will you deliver? 🛵
                  </h2>

                  <p className="text-slate-500 mt-2 mb-7">
                    Choose your vehicle and preferred delivery areas.
                  </p>

                  {/* Vehicles */}
                  <h3 className="font-semibold text-slate-800 mb-4">
                    Select Vehicle
                  </h3>

                  <div className="grid grid-cols-2 gap-4">

                    {vehicles.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setVehicle(item.id)}
                        className={`p-5 rounded-2xl border-2 text-center
                        transition hover:-translate-y-1 ${
                          vehicle === item.id
                            ? "border-orange-500 bg-orange-50"
                            : "border-slate-200 hover:border-orange-300"
                        }`}
                      >
                        <div className="text-4xl">
                          {item.icon}
                        </div>

                        <p
                          className={`font-semibold mt-3 ${
                            vehicle === item.id
                              ? "text-orange-600"
                              : "text-slate-700"
                          }`}
                        >
                          {item.title}
                        </p>

                        <div
                          className={`w-5 h-5 rounded-full border-2 mx-auto mt-3 ${
                            vehicle === item.id
                              ? "border-orange-500 bg-orange-500"
                              : "border-slate-300"
                          }`}
                        />
                      </button>
                    ))}

                  </div>

                  {/* Zones */}
                  <h3 className="font-semibold text-slate-800 mt-8 mb-4">
                    Preferred Delivery Zones
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {zones.map((zone) => (
                      <button
                        key={zone}
                        type="button"
                        onClick={() => toggleZone(zone)}
                        className={`px-4 py-2 rounded-full border text-sm transition ${
                          selectedZones.includes(zone)
                            ? "border-orange-500 bg-orange-50 text-orange-600"
                            : "border-slate-200 text-slate-600 hover:border-orange-300"
                        }`}
                      >
                        {zone}
                      </button>
                    ))}

                  </div>

                </motion.div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <motion.div
                  key="rider-step2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-2xl font-bold text-slate-800">
                    Verify your identity 🔐
                  </h2>

                  <p className="text-slate-500 mt-2 mb-7">
                    Upload the required documents for verification.
                  </p>

                  <div className="space-y-4">

                    {/* Government ID */}
                    <label className="block border-2 border-dashed
                      border-slate-200 rounded-2xl p-5 cursor-pointer
                      hover:border-orange-400 transition"
                    >
                      <div className="flex items-center justify-between">

                        <div>
                          <p className="font-semibold text-slate-700">
                            Government Photo ID / Passport
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            JPG, PNG or PDF
                          </p>
                        </div>

                        <span className="text-2xl">
                          🪪
                        </span>

                      </div>

                      <input
                        type="file"
                        accept="image/*,.pdf"
                        hidden
                        onChange={(e) =>
                          handleDocumentChange(
                            "governmentId",
                            e.target.files[0]
                          )
                        }
                      />
                    </label>

                    {/* Driver License */}
                    <label className="block border-2 border-dashed
                      border-slate-200 rounded-2xl p-5 cursor-pointer
                      hover:border-orange-400 transition"
                    >
                      <div className="flex items-center justify-between">

                        <div>
                          <p className="font-semibold text-slate-700">
                            Driver's License
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            Required for scooter/car
                          </p>
                        </div>

                        <span className="text-2xl">
                          🚘
                        </span>

                      </div>

                      <input
                        type="file"
                        accept="image/*,.pdf"
                        hidden
                        onChange={(e) =>
                          handleDocumentChange(
                            "drivingLicense",
                            e.target.files[0]
                          )
                        }
                      />
                    </label>

                    {/* Insurance */}
                    <label className="block border-2 border-dashed
                      border-slate-200 rounded-2xl p-5 cursor-pointer
                      hover:border-orange-400 transition"
                    >
                      <div className="flex items-center justify-between">

                        <div>
                          <p className="font-semibold text-slate-700">
                            Vehicle Insurance / Registration
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            Upload your document
                          </p>
                        </div>

                        <span className="text-2xl">
                          📄
                        </span>

                      </div>

                      <input
                        type="file"
                        accept="image/*,.pdf"
                        hidden
                        onChange={(e) =>
                          handleDocumentChange(
                            "insurance",
                            e.target.files[0]
                          )
                        }
                      />
                    </label>

                  </div>

                  {/* Security */}
                  <div className="mt-6 p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
                    <p className="font-semibold text-indigo-700">
                      🔒 Your documents are secure
                    </p>

                    <p className="text-sm text-indigo-600 mt-1">
                      Your documents will be securely sent to
                      FoodFlow Admin for review.
                    </p>
                  </div>

                </motion.div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <motion.div
                  key="rider-step3"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-2xl font-bold text-slate-800">
                    Almost ready to deliver! 🚀
                  </h2>

                  <p className="text-slate-500 mt-2 mb-7">
                    Confirm your equipment and payout details.
                  </p>

                  {/* Equipment */}
                  <h3 className="font-semibold text-slate-800 mb-4">
                    Equipment Checklist
                  </h3>

                  <div className="space-y-4">

                    <label className="flex items-start gap-3 p-4
                      rounded-2xl border border-slate-200
                      cursor-pointer hover:border-orange-300"
                    >
                      <input
                        type="checkbox"
                        checked={equipment.deliveryBag}
                        onChange={(e) =>
                          setEquipment({
                            ...equipment,
                            deliveryBag: e.target.checked,
                          })
                        }
                        className="mt-1 w-4 h-4 accent-orange-500"
                      />

                      <div>
                        <p className="font-medium text-slate-700">
                          I have a thermal insulated food delivery bag
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          Required for safe food delivery.
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4
                      rounded-2xl border border-slate-200
                      cursor-pointer hover:border-orange-300"
                    >
                      <input
                        type="checkbox"
                        checked={equipment.smartphone}
                        onChange={(e) =>
                          setEquipment({
                            ...equipment,
                            smartphone: e.target.checked,
                          })
                        }
                        className="mt-1 w-4 h-4 accent-orange-500"
                      />

                      <div>
                        <p className="font-medium text-slate-700">
                          I have a smartphone with active mobile data
                        </p>
                      </div>
                    </label>

                  </div>

                  {/* Payout */}
                  <h3 className="font-semibold text-slate-800 mt-8 mb-4">
                    Weekly Earnings Payout
                  </h3>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bank Name
                  </label>

                  <input
                    type="text"
                    value={payout.bankName}
                    onChange={(e) =>
                      setPayout({
                        ...payout,
                        bankName: e.target.value,
                      })
                    }
                    placeholder="Your bank name"
                    className="w-full px-4 py-3 rounded-xl border
                    border-slate-200 outline-none
                    focus:border-orange-500 mb-4"
                  />

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Account Number
                  </label>

                  <input
                    type="text"
                    value={payout.accountNumber}
                    onChange={(e) =>
                      setPayout({
                        ...payout,
                        accountNumber: e.target.value,
                      })
                    }
                    placeholder="Account number"
                    className="w-full px-4 py-3 rounded-xl border
                    border-slate-200 outline-none
                    focus:border-orange-500"
                  />

                </motion.div>
              )}

            </AnimatePresence>

            <FooterNav
              currentStep={currentStep}
              totalSteps={3}
              onBack={handleBack}
              onContinue={handleContinue}
              continueText="Go to Rider Dispatch Center 🛵"
            />

          </div>

        </div>

      </main>

    </div>
  );
}

export default RiderOnboarding;