import { useState, useEffect } from 'react'

const AadhaarCard = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Aadhaar Card Services</h1>
          <button
            onClick={onBack}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service Cards */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">New Enrollment</h3>
            <p className="text-gray-600 mb-4">Apply for a new Aadhaar card with biometric details.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
              Apply Now
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Update Aadhaar</h3>
            <p className="text-gray-600 mb-4">Update name, address, mobile number, or date of birth.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
              Update Now
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Download Aadhaar</h3>
            <p className="text-gray-600 mb-4">Download Aadhaar PDF or retrieve lost details.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
              Download
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Biometric Update</h3>
            <p className="text-gray-600 mb-4">Update fingerprints or iris scan information.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
              Update Biometrics
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Aadhaar Link</h3>
            <p className="text-gray-600 mb-4">Link Aadhaar with bank accounts or mobile.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
              Link Now
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Complaints</h3>
            <p className="text-gray-600 mb-4">File complaints or check status.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
              File Complaint
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Important Information</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Ensure all documents are valid and up-to-date before applying.</li>
            <li>Biometric enrollment requires visiting an authorized center.</li>
            <li>Processing time may vary from 1-90 days depending on the service.</li>
            <li>For urgent services, contact UIDAI helpline at 1947.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AadhaarCard