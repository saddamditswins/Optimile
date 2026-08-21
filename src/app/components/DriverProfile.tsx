export function DriverProfile() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Driver Info Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xl">
              JD
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">John Driver</h2>
              <p className="text-gray-500">Driver ID: DR-4782</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="font-medium text-green-600">On Shift</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shift Start</span>
              <span className="font-medium text-gray-900">8:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Vehicle</span>
              <span className="font-medium text-gray-900">VAN-234</span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="font-medium text-gray-900">john.driver@optimile.com</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Phone</div>
              <div className="font-medium text-gray-900">(555) 123-4567</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}