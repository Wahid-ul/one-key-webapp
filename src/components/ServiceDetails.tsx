import { useAppSelector } from '../app/hooks'

const serviceInfo: Record<string, string[]> = {
  'Aadhaar Card': [
    'New Aadhaar enrollment',
    'Aadhaar update (Name, DOB, Address)',
    'Mobile number linking',
    'Aadhaar download & print',
  ],
  'PAN Card': [
    'New PAN application',
    'PAN correction',
    'PAN-Aadhaar linking',
    'Duplicate PAN',
  ],
  'Online Services': [
    'Form filling',
    'Government schemes',
    'Online bill payments',
    'Document verification',
  ],
}

const ServiceDetails = () => {
  const selectedService = useAppSelector(
    (state) => state.service.selectedService
  )

  if (!selectedService) {
    return (
      <p className="text-center text-gray-500 mt-6">
        Select a service to see details
      </p>
    )
  }

  return (
    <div className="mt-6 bg-gray-100 p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">{selectedService}</h2>
      <ul className="list-disc ml-6 space-y-2">
        {serviceInfo[selectedService].map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default ServiceDetails
