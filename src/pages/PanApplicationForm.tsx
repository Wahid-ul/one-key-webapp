import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { updateFormData, setCurrentStep, resetForm, setUserId } from '../features/service/panApplicationSlice'

const PanApplicationForm = ({ onBack }: { onBack: () => void }) => {
  const dispatch = useDispatch()
  const { formData, currentStep } = useSelector((state: RootState) => state.panApplication)
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    dispatch(setUserId(userId))
    window.location.hash = userId
    window.scrollTo(0, 0)
  }, [userId, dispatch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    dispatch(updateFormData({ [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      dispatch(updateFormData({ [name]: files[0] }))
    }
  }

  const nextStep = () => dispatch(setCurrentStep(currentStep + 1))
  const prevStep = () => dispatch(setCurrentStep(currentStep - 1))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to a server
    alert(`Application submitted successfully! User ID: ${userId}`)
    dispatch(resetForm())
    onBack()
  }

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3, 4, 5].map(step => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            step <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            {step}
          </div>
          {step < 5 && <div className={`w-12 h-1 ${step < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}></div>}
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">New PAN Application</h1>
          <button
            onClick={onBack}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
          >
            ← Back
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="mb-6">
            <p className="text-sm text-gray-600">User ID: <span className="font-mono text-blue-600">{userId}</span></p>
          </div>

          {renderStepIndicator()}

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Surname *</label>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="transgender">Transgender</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Father's Name *</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">Residence Address</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">House Number *</label>
                      <input
                        type="text"
                        name="houseNumber"
                        value={formData.houseNumber}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Village/Town *</label>
                      <input
                        type="text"
                        name="villageTown"
                        value={formData.villageTown}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Road/Street/Post Office *</label>
                    <input
                      type="text"
                      name="roadStreetPostOffice"
                      value={formData.roadStreetPostOffice}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Area/Locality/Sub-Division *</label>
                      <input
                        type="text"
                        name="areaLocalitySubDivision"
                        value={formData.areaLocalitySubDivision}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City/District *</label>
                      <input
                        type="text"
                        name="cityDistrict"
                        value={formData.cityDistrict}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email ID *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Document Upload</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Card Front *</label>
                    <input
                      type="file"
                      name="aadhaarFront"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Card Back *</label>
                    <input
                      type="file"
                      name="aadhaarBack"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Signature Upload *</label>
                    <input
                      type="file"
                      name="signature"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Photo Upload *</label>
                    <input
                      type="file"
                      name="photo"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Review Your Application</h2>

                <div className="bg-gray-50 p-6 rounded-lg space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div><strong>Full Name:</strong> {formData.firstName} {formData.middleName} {formData.surname}</div>
                      <div><strong>Gender:</strong> {formData.gender}</div>
                      <div><strong>Date of Birth:</strong> {formData.dob}</div>
                      <div><strong>Father's Name:</strong> {formData.fatherName}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Address Details</h3>
                    <div className="text-sm space-y-1">
                      <div><strong>House Number:</strong> {formData.houseNumber}</div>
                      <div><strong>Village/Town:</strong> {formData.villageTown}</div>
                      <div><strong>Road/Street/Post Office:</strong> {formData.roadStreetPostOffice}</div>
                      <div><strong>Area/Locality/Sub-Division:</strong> {formData.areaLocalitySubDivision}</div>
                      <div><strong>City/District:</strong> {formData.cityDistrict}</div>
                      <div><strong>Pincode:</strong> {formData.pincode}</div>
                      <div><strong>Country:</strong> {formData.country}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div><strong>Phone Number:</strong> {formData.phone}</div>
                      <div><strong>Email ID:</strong> {formData.email}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Documents</h3>
                    <div className="text-sm space-y-1">
                      <div><strong>Aadhaar Front:</strong> {formData.aadhaarFront?.name || 'Not uploaded'}</div>
                      <div><strong>Aadhaar Back:</strong> {formData.aadhaarBack?.name || 'Not uploaded'}</div>
                      <div><strong>Signature:</strong> {formData.signature?.name || 'Not uploaded'}</div>
                      <div><strong>Photo:</strong> {formData.photo?.name || 'Not uploaded'}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Payment Details</h3>
                    <div className="text-sm space-y-1">
                      <div><strong>Payment Method:</strong> {formData.paymentMethod || 'Not selected'}</div>
                      <div><strong>Amount:</strong> ₹{formData.amount}</div>
                      {formData.cardNumber && <div><strong>Card Number:</strong> **** **** **** {formData.cardNumber.slice(-4)}</div>}
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Please review all the information carefully. Once submitted, you cannot modify the application.
                    Ensure all documents are clear and valid.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">PAN Application Fee</span>
                    <span className="text-xl font-bold text-blue-600">₹{formData.amount}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method *</label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Payment Method</option>
                      <option value="credit-card">Credit Card</option>
                      <option value="debit-card">Debit Card</option>
                      <option value="net-banking">Net Banking</option>
                      <option value="upi">UPI</option>
                    </select>
                  </div>

                  {(formData.paymentMethod === 'credit-card' || formData.paymentMethod === 'debit-card') && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'net-banking' && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        You will be redirected to your bank's website to complete the payment securely.
                      </p>
                    </div>
                  )}

                  {formData.paymentMethod === 'upi' && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Enter your UPI ID to proceed with the payment.
                      </p>
                      <input
                        type="text"
                        name="upiId"
                        placeholder="yourname@upi"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition"
                >
                  Previous
                </button>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition ml-auto"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition ml-auto"
                >
                  Confirm & Submit Application
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PanApplicationForm