import { useSelector } from 'react-redux'
import { Paper, Typography } from '@mui/material'
import type { RootState } from '../app/store'

const PaymentSuccess = () => {
  const { status, transactionId, amount } = useSelector(
    (state: RootState) => state.payment
  )
  const { userId } = useSelector((state: RootState) => state.panApplication)

  if (status !== 'SUCCESS') return null

  return (
    <Paper sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 4 }}>
      <Typography variant="h4" color="success.main">
        Payment Successful ✅
      </Typography>
      <Typography>Application ID: {userId}</Typography>
      <Typography>Transaction ID: {transactionId}</Typography>
      <Typography>Amount Paid: ₹{amount}</Typography>
    </Paper>
  )
}

export default PaymentSuccess
