import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ServiceType =
  | 'Aadhaar Card'
  | 'PAN Card'
  | 'Online Services'
  | null

interface ServiceState {
  selectedService: ServiceType
}

const initialState: ServiceState = {
  selectedService: null,
}

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    selectService: (state, action: PayloadAction<ServiceType>) => {
      state.selectedService = action.payload
    },
  },
})

export const { selectService } = serviceSlice.actions
export default serviceSlice.reducer
