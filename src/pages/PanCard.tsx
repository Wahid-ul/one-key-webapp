import { useEffect } from 'react'

const PanCard = ({ onBack, onNavigate }: { onBack: () => void; onNavigate: (page: string) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">PAN Card Services</h1>
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
            <h3 className="text-xl font-semibold mb-3 text-blue-600">New PAN Application</h3>
            <p className="text-gray-600 mb-4">Apply for a new PAN card for individuals and businesses.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full" onClick={() => onNavigate('pan-form')}>
              Apply Now
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">PAN Correction</h3>
            <p className="text-gray-600 mb-4">Correct name, DOB, photo, or signature in PAN records.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full" onClick={() => onNavigate('pan-correction')}>
              Correct Now
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">PAN Status Check</h3>
            <p className="text-gray-600 mb-4">Check the status of your PAN application.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full" onClick={() => onNavigate('pan-status')}>
              Check Status
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">PAN-Aadhaar Link</h3>
            <p className="text-gray-600 mb-4">Link your PAN with Aadhaar to avoid penalties.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
              Link Now
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Duplicate PAN</h3>
            <p className="text-gray-600 mb-4">Apply for duplicate PAN card if lost or damaged.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
              Apply for Duplicate
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">PAN Reissue</h3>
            <p className="text-gray-600 mb-4">Reissue PAN card for changes or updates.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
              Reissue PAN
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Important Information</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Ensure all documents are valid and up-to-date before applying.</li>
            <li>PAN card processing may take 15-30 days.</li>
            <li>Changes in PAN require physical verification in some cases.</li>
            <li>For urgent services, contact NSDL or UTIITSL helpline.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PanCard