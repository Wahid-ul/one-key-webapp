import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface PanApplicationData {
  surname: string
  middleName: string
  firstName: string
  gender: string
  dob: string
  fatherName: string
  houseNumber: string
  villageTown: string
  roadStreetPostOffice: string
  pincode: string
  areaLocalitySubDivision: string
  cityDistrict: string
  country: string
  phone: string
  email: string
  aadhaarFront: File | null
  aadhaarBack: File | null
  signature: File | null
  photo: File | null
  userId: string
  paymentMethod: string
  cardNumber: string
  expiryDate: string
  cvv: string
  amount: string
}

interface PanApplicationState {
  formData: PanApplicationData
  currentStep: number
}

const initialState: PanApplicationState = {
  formData: {
    surname: '',
    middleName: '',
    firstName: '',
    gender: '',
    dob: '',
    fatherName: '',
    houseNumber: '',
    villageTown: '',
    roadStreetPostOffice: '',
    pincode: '',
    areaLocalitySubDivision: '',
    cityDistrict: '',
    country: '',
    phone: '',
    email: '',
    aadhaarFront: null,
    aadhaarBack: null,
    signature: null,
    photo: null,
    userId: '',
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: '149' // PAN application fee
  },
  currentStep: 1
}

const panApplicationSlice = createSlice({
  name: 'panApplication',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<PanApplicationData>>) => {
      state.formData = { ...state.formData, ...action.payload }
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    resetForm: (state) => {
      state.formData = initialState.formData
      state.currentStep = 1
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.formData.userId = action.payload
    }
  },
})

export const { updateFormData, setCurrentStep, resetForm, setUserId } = panApplicationSlice.actions
export default panApplicationSlice.reducer