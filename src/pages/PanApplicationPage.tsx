import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import PanApplicationForm from './PanApplicationForm'
import PaymentSuccess from './PaymentSuccess'

const PanApplicationPage = ({ onBack }: { onBack: () => void }) => {
  const paymentStatus = useSelector((state: RootState) => state.payment.status)

  return (
    <>
      {paymentStatus === 'SUCCESS' ? (
        <PaymentSuccess />
      ) : (
        <PanApplicationForm onBack={onBack} />
      )}
    </>
  )
}

export default PanApplicationPage
