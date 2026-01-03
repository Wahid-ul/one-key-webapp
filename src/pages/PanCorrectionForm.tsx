import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { updateFormData, setCurrentStep, resetForm, setUserId } from '../features/service/panCorrectionSlice'

const PanCorrectionForm = ({ onBack }: { onBack: () => void }) => {
  const dispatch = useDispatch()
  const { formData, currentStep } = useSelector((state: RootState) => state.panCorrection)
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

  const handleRadioChange = (name: string, value: string) => {
    dispatch(updateFormData({ [name]: value }))
  }

  const nextStep = () => dispatch(setCurrentStep(currentStep + 1))
  const prevStep = () => dispatch(setCurrentStep(currentStep - 1))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to a server
    alert(`Correction request submitted successfully! User ID: ${userId}`)
    dispatch(resetForm())
    onBack()
  }

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3, 4, 5, 6].map(step => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            step <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            {step}
          </div>
          {step < 6 && <div className={`w-12 h-1 ${step < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}></div>}
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">PAN Card Correction</h1>
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
                <h2 className="text-2xl font-semibold mb-4">PAN Card Details</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PAN Card Number *</label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      placeholder="AAAAA0000A"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm PAN Card Number *</label>
                    <input
                      type="text"
                      name="confirmPanNumber"
                      value={formData.confirmPanNumber}
                      onChange={handleInputChange}
                      placeholder="AAAAA0000A"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Correction Details</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Name Change</h3>
                    <div className="flex space-x-6 mb-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="nameChange"
                          value="yes"
                          checked={formData.nameChange === 'yes'}
                          onChange={() => handleRadioChange('nameChange', 'yes')}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="nameChange"
                          value="no"
                          checked={formData.nameChange === 'no'}
                          onChange={() => handleRadioChange('nameChange', 'no')}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    {formData.nameChange === 'yes' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Surname *</label>
                          <input
                            type="text"
                            name="newSurname"
                            value={formData.newSurname}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Middle Name</label>
                          <input
                            type="text"
                            name="newMiddleName"
                            value={formData.newMiddleName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New First Name *</label>
                          <input
                            type="text"
                            name="newFirstName"
                            value={formData.newFirstName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {formData.nameChange === 'no' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Existing Surname *</label>
                          <input
                            type="text"
                            name="existingSurname"
                            value={formData.existingSurname}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Existing Middle Name</label>
                          <input
                            type="text"
                            name="existingMiddleName"
                            value={formData.existingMiddleName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Existing First Name *</label>
                          <input
                            type="text"
                            name="existingFirstName"
                            value={formData.existingFirstName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Father's Name Change</h3>
                    <div className="flex space-x-6 mb-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="fatherNameChange"
                          value="yes"
                          checked={formData.fatherNameChange === 'yes'}
                          onChange={() => handleRadioChange('fatherNameChange', 'yes')}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="fatherNameChange"
                          value="no"
                          checked={formData.fatherNameChange === 'no'}
                          onChange={() => handleRadioChange('fatherNameChange', 'no')}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    {formData.fatherNameChange === 'yes' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Father's Surname *</label>
                          <input
                            type="text"
                            name="newFatherSurname"
                            value={formData.newFatherSurname}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Father's Middle Name</label>
                          <input
                            type="text"
                            name="newFatherMiddleName"
                            value={formData.newFatherMiddleName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Father's First Name *</label>
                          <input
                            type="text"
                            name="newFatherFirstName"
                            value={formData.newFatherFirstName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {formData.fatherNameChange === 'no' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Existing Father's Surname *</label>
                          <input
                            type="text"
                            name="existingFatherSurname"
                            value={formData.existingFatherSurname}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Existing Father's Middle Name</label>
                          <input
                            type="text"
                            name="existingFatherMiddleName"
                            value={formData.existingFatherMiddleName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Existing Father's First Name *</label>
                          <input
                            type="text"
                            name="existingFatherFirstName"
                            value={formData.existingFatherFirstName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Date of Birth Change</h3>
                    <div className="flex space-x-6 mb-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="dobChange"
                          value="yes"
                          checked={formData.dobChange === 'yes'}
                          onChange={() => handleRadioChange('dobChange', 'yes')}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="dobChange"
                          value="no"
                          checked={formData.dobChange === 'no'}
                          onChange={() => handleRadioChange('dobChange', 'no')}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    {formData.dobChange === 'yes' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Date of Birth *</label>
                        <input
                          type="date"
                          name="newDob"
                          value={formData.newDob}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    )}

                    {formData.dobChange === 'no' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Existing Date of Birth *</label>
                        <input
                          type="date"
                          name="existingDob"
                          value={formData.existingDob}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Gender Change</h3>
                    <div className="flex space-x-6 mb-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="genderChange"
                          value="yes"
                          checked={formData.genderChange === 'yes'}
                          onChange={() => handleRadioChange('genderChange', 'yes')}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="genderChange"
                          value="no"
                          checked={formData.genderChange === 'no'}
                          onChange={() => handleRadioChange('genderChange', 'no')}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    {formData.genderChange === 'yes' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Gender *</label>
                        <select
                          name="newGender"
                          value={formData.newGender}
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
                    )}

                    {formData.genderChange === 'no' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Existing Gender *</label>
                        <select
                          name="existingGender"
                          value={formData.existingGender}
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
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Address Details</h2>

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

            {currentStep === 4 && (
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PAN Card Upload *</label>
                    <input
                      type="file"
                      name="panCard"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Review Your Correction Request</h2>

                <div className="bg-gray-50 p-6 rounded-lg space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">PAN Details</h3>
                    <div className="text-sm">
                      <div><strong>PAN Number:</strong> {formData.panNumber}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Name Changes</h3>
                    <div className="text-sm space-y-1">
                      <div><strong>Name Change:</strong> {formData.nameChange === 'yes' ? 'Yes' : 'No'}</div>
                      {formData.nameChange === 'yes' ? (
                        <div><strong>New Name:</strong> {formData.newFirstName} {formData.newMiddleName} {formData.newSurname}</div>
                      ) : (
                        <div><strong>Existing Name:</strong> {formData.existingFirstName} {formData.existingMiddleName} {formData.existingSurname}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Father's Name Changes</h3>
                    <div className="text-sm space-y-1">
                      <div><strong>Father's Name Change:</strong> {formData.fatherNameChange === 'yes' ? 'Yes' : 'No'}</div>
                      {formData.fatherNameChange === 'yes' ? (
                        <div><strong>New Father's Name:</strong> {formData.newFatherFirstName} {formData.newFatherMiddleName} {formData.newFatherSurname}</div>
                      ) : (
                        <div><strong>Existing Father's Name:</strong> {formData.existingFatherFirstName} {formData.existingFatherMiddleName} {formData.existingFatherSurname}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">DOB & Gender Changes</h3>
                    <div className="text-sm space-y-1">
                      <div><strong>DOB Change:</strong> {formData.dobChange === 'yes' ? 'Yes' : 'No'}</div>
                      <div><strong>DOB:</strong> {formData.dobChange === 'yes' ? formData.newDob : formData.existingDob}</div>
                      <div><strong>Gender Change:</strong> {formData.genderChange === 'yes' ? 'Yes' : 'No'}</div>
                      <div><strong>Gender:</strong> {formData.genderChange === 'yes' ? formData.newGender : formData.existingGender}</div>
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
                      <div><strong>PAN Card:</strong> {formData.panCard?.name || 'Not uploaded'}</div>
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
                    <strong>Important:</strong> Please review all the information carefully. Once submitted, you cannot modify the correction request.
                    Ensure all details are accurate.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">PAN Correction Fee</span>
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

              {currentStep < 6 ? (
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
                  Confirm & Submit Correction Request
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PanCorrectionForm