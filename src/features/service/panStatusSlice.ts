import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface PanStatusData {
  email: string
  phone: string
  trackingSteps: {
    step1: { status: 'completed' | 'in-progress' | 'pending', description: string }
    step2: { status: 'completed' | 'in-progress' | 'pending', description: string }
    step3: { status: 'completed' | 'in-progress' | 'pending', description: string }
    step4: { status: 'completed' | 'in-progress' | 'pending', description: string }
    step5: { status: 'completed' | 'in-progress' | 'pending', description: string }
  }
  applicationStatus: 'processing' | 'approved' | 'rejected' | 'not-found'
  applicationDetails: {
    applicationNumber: string
    submittedDate: string
    estimatedCompletion: string
    currentStatus: string
  } | null
}

interface PanStatusState {
  formData: PanStatusData
  isLoading: boolean
  error: string | null
}

const initialState: PanStatusState = {
  formData: {
    email: '',
    phone: '',
    trackingSteps: {
      step1: { status: 'pending', description: 'Application Received' },
      step2: { status: 'pending', description: 'Document Verification' },
      step3: { status: 'pending', description: 'PAN Card Generation' },
      step4: { status: 'pending', description: 'Quality Check' },
      step5: { status: 'pending', description: 'Dispatch' }
    },
    applicationStatus: 'not-found',
    applicationDetails: null
  },
  isLoading: false,
  error: null
}

const panStatusSlice = createSlice({
  name: 'panStatus',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<PanStatusData>>) => {
      state.formData = { ...state.formData, ...action.payload }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setApplicationStatus: (state, action: PayloadAction<PanStatusData['applicationStatus']>) => {
      state.formData.applicationStatus = action.payload
    },
    setApplicationDetails: (state, action: PayloadAction<PanStatusData['applicationDetails']>) => {
      state.formData.applicationDetails = action.payload
    },
    updateTrackingStep: (state, action: PayloadAction<{ step: keyof PanStatusData['trackingSteps'], status: 'completed' | 'in-progress' | 'pending' }>) => {
      state.formData.trackingSteps[action.payload.step].status = action.payload.status
    },
    resetStatus: (state) => {
      state.formData = initialState.formData
      state.isLoading = false
      state.error = null
    }
  },
})

export const { 
  updateFormData, 
  setLoading, 
  setError, 
  setApplicationStatus, 
  setApplicationDetails, 
  updateTrackingStep, 
  resetStatus 
} = panStatusSlice.actions
export default panStatusSlice.reducer