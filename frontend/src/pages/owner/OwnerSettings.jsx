function OwnerSettings() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-800">Settings</h1>
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="font-semibold text-slate-800">Business hours</p>
            <p className="mt-1 text-sm text-slate-500">9:00 AM - 11:00 PM</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="font-semibold text-slate-800">Notifications</p>
            <p className="mt-1 text-sm text-slate-500">Order alerts and delivery status updates enabled.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerSettings;
