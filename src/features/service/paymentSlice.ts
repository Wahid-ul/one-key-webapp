import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from '../../app/axiosClient'

interface PaymentState {
  transactionId: string | null
  amount: number
  status: 'IDLE' | 'PENDING' | 'SUCCESS' | 'FAILED'
  upiId: string
}

const initialState: PaymentState = {
  transactionId: null,
  amount: 0,
  status: 'IDLE',
  upiId: 'awahidul606@oksbi',
}

// Async thunk to check status
export const checkPaymentStatus = createAsyncThunk(
  'payment/checkStatus',
  async (transactionId: string) => {
    const data = await axiosClient.get(`/payments/status/${transactionId}`)
    return data
  }
)
export const startPayment = createAsyncThunk(
  'payment/startPayment',
  async ({ userId, amount }: { userId: string; amount: number }) => {
    const data = await axiosClient.post('/payments/start', { userId, amount })
    return data
  }
)
export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPayment: (state, action) => {
      state.transactionId = action.payload.transactionId
      state.amount = action.payload.amount
      state.status = 'PENDING'
    },
    markPaymentSuccess: (state) => {
      state.status = 'SUCCESS'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkPaymentStatus.fulfilled, (state, action) => {
      if (action.payload.status === 'SUCCESS') {
        state.status = 'SUCCESS'
      }
    })
  },
})

export const { setPayment, markPaymentSuccess } = paymentSlice.actions
export default paymentSlice.reducer
