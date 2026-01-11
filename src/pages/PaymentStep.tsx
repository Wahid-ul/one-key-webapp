import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { QRCodeCanvas } from 'qrcode.react'
import type { RootState } from '../app/store'
import { setPayment, checkPaymentStatus } from '../features/service/paymentSlice'
import PaymentSuccess from './PaymentSuccess'
import { Box, Typography } from '@mui/material'

interface PaymentStepProps {
  userId: string
  amount: number
}

const PaymentStep = ({ userId, amount }: PaymentStepProps) => {
  const dispatch = useDispatch()
  const { transactionId, status } = useSelector((state: RootState) => state.payment)
  const upiId = useSelector((state: RootState) => state.payment.upiId)

  // 1️⃣ Start payment on mount
  useEffect(() => {
    const startPayment = async () => {
      const res = await fetch('/api/payments/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, amount }),
      })
      const data = await res.json()
      dispatch(setPayment(data)) // stores transactionId, amount, status=PENDING
    }

    if (!transactionId) startPayment()
  }, [dispatch, transactionId, userId, amount])

  // 2️⃣ Auto poll every 3 seconds to check payment status
  useEffect(() => {
    if (!transactionId || status === 'SUCCESS') return

    const interval = setInterval(() => {
      dispatch(checkPaymentStatus(transactionId))
    }, 3000)

    return () => clearInterval(interval)
  }, [dispatch, transactionId, status])

  // 3️⃣ If payment successful, show PaymentSuccess
  if (status === 'SUCCESS') return <PaymentSuccess />

  // 4️⃣ Show QR code while waiting
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        mt: 5,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        UPI Payment
      </Typography>

      <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
        Amount Payable: ₹{amount}
      </Typography>

      <Typography sx={{ mb: 3 }}>
        Scan using Google Pay / PhonePe / Paytm
      </Typography>

      {transactionId && (
        <QRCodeCanvas
          value={`upi://pay?pa=${upiId}&pn=PAN%20Service&am=${amount}&cu=INR&tn=PAN%20Application&tid=${transactionId}`}
          size={220}
        />
      )}

      <Typography sx={{ mt: 2 }} color="text.secondary">
        Waiting for payment confirmation...
      </Typography>
    </Box>
  )
}

export default PaymentStep
