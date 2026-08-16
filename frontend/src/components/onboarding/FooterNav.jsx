function FooterNav({
  currentStep,
  totalSteps,
  onBack,
  onContinue,
  continueText = "Continue →",
}) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">

      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        disabled={currentStep === 1}
        className={`px-5 py-3 rounded-xl font-medium transition ${
          currentStep === 1
            ? "text-slate-300 cursor-not-allowed"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        ← Back
      </button>

      {/* Continue */}
      <button
        type="button"
        onClick={onContinue}
        className="px-7 py-3 rounded-xl bg-orange-500
        hover:bg-orange-600 text-white font-semibold
        transition shadow-lg shadow-orange-100"
      >
        {currentStep === totalSteps ? continueText : "Continue →"}
      </button>

    </div>
  );
}

export default FooterNav;