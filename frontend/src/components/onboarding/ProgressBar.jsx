function ProgressBar({ currentStep, steps }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 mb-8">

      {/* Step Indicators */}
      <div className="flex items-center">

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <div
              key={stepNumber}
              className="flex items-center flex-1"
            >

              {/* Circle */}
              <div
                className={`w-9 h-9 rounded-full flex items-center
                justify-center text-sm font-bold shrink-0 transition ${
                  isCompleted || isActive
                    ? "bg-orange-500 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 rounded-full transition ${
                    isCompleted
                      ? "bg-orange-500"
                      : "bg-slate-200"
                  }`}
                />
              )}

            </div>
          );
        })}

      </div>

      {/* Text */}
      <p className="text-sm text-slate-500 mt-3 text-center">
        Step {currentStep} of {steps.length}:{" "}
        <span className="font-semibold text-slate-700">
          {steps[currentStep - 1]}
        </span>
      </p>

    </div>
  );
}

export default ProgressBar;