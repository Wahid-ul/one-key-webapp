import { useState } from 'react'

const PanCard = ({ onBack, onNavigate }: { onBack: () => void; onNavigate: (page: string) => void }) => {
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactService, setContactService] = useState('')
  const handleContactClick = (service: string) => {
    setContactService(service)
    setShowContactModal(true)
  }

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
            <h3 className="text-xl font-semibold mb-3 text-blue-600">FIRM PAN</h3>
            <p className="text-gray-600 mb-4">Apply for a new PAN card for firms and companies.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full" onClick={() => handleContactClick('FIRM PAN')}>
                Apply Now
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">PAN 49AA (NRI)</h3>
            <p className="text-gray-600 mb-4">Apply for a new PAN card for Non-Resident Indians.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full" onClick={() => handleContactClick('PAN 49AA (NRI)')}>
                Apply Now
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

        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Contact Us - {contactService}</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  For {contactService} applications, please contact our support team directly.
                </p>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Contact Information:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="font-medium w-16">Phone:</span>
                      <span>+91 1800-XXX-XXXX</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-16">Email:</span>
                      <span>support@onekeynow.com</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-16">Hours:</span>
                      <span>Mon-Fri, 9 AM - 6 PM IST</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> {contactService} applications require additional documentation and verification.
                    Our team will guide you through the complete process.
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PanCard