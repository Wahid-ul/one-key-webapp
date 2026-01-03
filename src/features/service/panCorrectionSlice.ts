import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface PanCorrectionData {
  panNumber: string
  confirmPanNumber: string
  nameChange: string // 'yes' or 'no'
  newSurname: string
  newMiddleName: string
  newFirstName: string
  existingSurname: string
  existingMiddleName: string
  existingFirstName: string
  fatherNameChange: string // 'yes' or 'no'
  newFatherSurname: string
  newFatherMiddleName: string
  newFatherFirstName: string
  existingFatherSurname: string
  existingFatherMiddleName: string
  existingFatherFirstName: string
  dobChange: string // 'yes' or 'no'
  newDob: string
  existingDob: string
  genderChange: string // 'yes' or 'no'
  newGender: string
  existingGender: string
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
  panCard: File | null
  paymentMethod: string
  cardNumber: string
  expiryDate: string
  cvv: string
  amount: string
  userId: string
}

interface PanCorrectionState {
  formData: PanCorrectionData
  currentStep: number
}

const initialState: PanCorrectionState = {
  formData: {
    panNumber: '',
    confirmPanNumber: '',
    nameChange: '',
    newSurname: '',
    newMiddleName: '',
    newFirstName: '',
    existingSurname: '',
    existingMiddleName: '',
    existingFirstName: '',
    fatherNameChange: '',
    newFatherSurname: '',
    newFatherMiddleName: '',
    newFatherFirstName: '',
    existingFatherSurname: '',
    existingFatherMiddleName: '',
    existingFatherFirstName: '',
    dobChange: '',
    newDob: '',
    existingDob: '',
    genderChange: '',
    newGender: '',
    existingGender: '',
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
    panCard: null,
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: '149', // PAN correction fee
    userId: ''
  },
  currentStep: 1
}

const panCorrectionSlice = createSlice({
  name: 'panCorrection',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<PanCorrectionData>>) => {
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

export const { updateFormData, setCurrentStep, resetForm, setUserId } = panCorrectionSlice.actions
export default panCorrectionSlice.reducer