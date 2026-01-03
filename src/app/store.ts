import { configureStore } from '@reduxjs/toolkit'
import serviceReducer from '../features/service/serviceSlice'
import panApplicationReducer from '../features/service/panApplicationSlice'
import panCorrectionReducer from '../features/service/panCorrectionSlice'
import panStatusReducer from '../features/service/panStatusSlice'

export const store = configureStore({
  reducer: {
    service: serviceReducer,
    panApplication: panApplicationReducer,
    panCorrection: panCorrectionReducer,
    panStatus: panStatusReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
