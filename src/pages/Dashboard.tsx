import ServiceCard from '../components/ServiceCard'
import { useAppSelector } from '../app/hooks'

const Dashboard = () => {
  const selectedService = useAppSelector(
    (state) => state.service.selectedService
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      

      {/* Cards */}
      <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <ServiceCard title="Aadhaar Card" />
        <ServiceCard title="PAN Card" />
        <ServiceCard title="Online Services" />
      </div>

      {/* Details */}
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
        {!selectedService && (
          <p className="text-center text-gray-500">
            Select a service to view details
          </p>
        )}

        {selectedService === 'Aadhaar Card' && (
          <ul className="list-disc pl-6 space-y-2">
            <li>Aadhaar enrollment assistance</li>
            <li>Update name, address, mobile</li>
            <li>Download Aadhaar PDF</li>
          </ul>
        )}

        {selectedService === 'PAN Card' && (
          <ul className="list-disc pl-6 space-y-2">
            <li>New PAN card application</li>
            <li>PAN correction services</li>
            <li>Link PAN with Aadhaar</li>
          </ul>
        )}

        {selectedService === 'Online Services' && (
          <ul className="list-disc pl-6 space-y-2">
            <li>Government online forms</li>
            <li>Bill payments</li>
            <li>Certificate applications</li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard
