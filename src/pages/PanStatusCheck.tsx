import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { updateFormData, setLoading, setError, setApplicationStatus, setApplicationDetails, updateTrackingStep } from '../features/service/panStatusSlice'

const PanStatusCheck = ({ onBack }: { onBack: () => void }) => {
  const dispatch = useDispatch()
  const { formData, isLoading, error } = useSelector((state: RootState) => state.panStatus)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch(updateFormData({ [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setLoading(true))
    dispatch(setError(null))

    // Simulate API call
    setTimeout(() => {
      // Mock response - in real app, this would be an API call
      const mockResponse = {
        found: Math.random() > 0.3, // 70% chance of finding application
        status: ['processing', 'approved', 'rejected'][Math.floor(Math.random() * 3)] as 'processing' | 'approved' | 'rejected',
        applicationNumber: 'PAN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        submittedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        estimatedCompletion: new Date(Date.now() + Math.random() * 15 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        currentStep: Math.floor(Math.random() * 5) + 1
      }

      if (mockResponse.found) {
        dispatch(setApplicationStatus(mockResponse.status))
        dispatch(setApplicationDetails({
          applicationNumber: mockResponse.applicationNumber,
          submittedDate: mockResponse.submittedDate,
          estimatedCompletion: mockResponse.estimatedCompletion,
          currentStatus: mockResponse.status
        }))

        // Update tracking steps based on current step
        const steps = ['step1', 'step2', 'step3', 'step4', 'step5'] as const
        steps.forEach((step, index) => {
          if (index < mockResponse.currentStep - 1) {
            dispatch(updateTrackingStep({ step, status: 'completed' }))
          } else if (index === mockResponse.currentStep - 1) {
            dispatch(updateTrackingStep({ step, status: 'in-progress' }))
          } else {
            dispatch(updateTrackingStep({ step, status: 'pending' }))
          }
        })
      } else {
        dispatch(setApplicationStatus('not-found'))
      }

      dispatch(setLoading(false))
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'in-progress': return 'bg-blue-500'
      case 'pending': return 'bg-gray-300'
      default: return 'bg-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✓'
      case 'in-progress': return '⟳'
      case 'pending': return '○'
      default: return '○'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">PAN Application Status Check</h1>
          <button
            onClick={onBack}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
          >
            ← Back
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Your Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg transition font-medium"
              >
                {isLoading ? 'Checking Status...' : 'Check Application Status'}
              </button>
            </form>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {formData.applicationStatus !== 'not-found' && formData.applicationDetails && (
            <div className="space-y-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Application Found</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Application Number:</strong> {formData.applicationDetails.applicationNumber}</div>
                  <div><strong>Submitted Date:</strong> {formData.applicationDetails.submittedDate}</div>
                  <div><strong>Current Status:</strong>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      formData.applicationStatus === 'approved' ? 'bg-green-100 text-green-800' :
                      formData.applicationStatus === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {formData.applicationStatus.charAt(0).toUpperCase() + formData.applicationStatus.slice(1)}
                    </span>
                  </div>
                  <div><strong>Estimated Completion:</strong> {formData.applicationDetails.estimatedCompletion}</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Application Progress</h3>
                <div className="space-y-4">
                  {Object.entries(formData.trackingSteps).map(([stepKey, step], index) => (
                    <div key={stepKey} className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getStatusColor(step.status)}`}>
                        {getStatusIcon(step.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-800">Step {index + 1}: {step.description}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            step.status === 'completed' ? 'bg-green-100 text-green-800' :
                            step.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {step.status === 'completed' ? 'Completed' :
                             step.status === 'in-progress' ? 'In Progress' :
                             'Pending'}
                          </span>
                        </div>
                        {index < Object.keys(formData.trackingSteps).length - 1 && (
                          <div className={`w-full h-0.5 mt-2 ${step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {formData.applicationStatus === 'approved' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 Congratulations!</h3>
                  <p className="text-green-700">Your PAN card has been approved and is being dispatched. You will receive it within 3-5 business days.</p>
                </div>
              )}

              {formData.applicationStatus === 'rejected' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Application Rejected</h3>
                  <p className="text-red-700">Your PAN application has been rejected. Please contact our support team for more details.</p>
                </div>
              )}
            </div>
          )}

          {formData.applicationStatus === 'not-found' && !isLoading && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Application Found</h3>
              <p className="text-yellow-700">We couldn't find any PAN application with the provided email and phone number. Please check your details and try again, or contact our support team.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PanStatusCheck