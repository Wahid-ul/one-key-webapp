import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import {
  updateFormData,
  setCurrentStep,
  resetForm,
  setUserId,
} from '../features/service/panApplicationSlice'

import { ZodError } from 'zod'


import {
  personalDetailsSchema,
  addressSchema,
  documentSchema
} from '../validaton/panApplication.schema'

import {
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material'

const steps = ['Personal', 'Residence Address', 'Documents', 'Review', 'Payment']

const PanApplicationForm = ({ onBack }: { onBack: () => void }) => {
  const dispatch = useDispatch()
  const { formData, currentStep } = useSelector(
    (state: RootState) => state.panApplication
  )

  const [userId] = useState(`USER-${Date.now().toString().slice(-6)}`)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    dispatch(setUserId(userId))
    window.scrollTo(0, 0)
  }, [dispatch, userId])

  const [documents, setDocuments] = useState<{
    aadhaarFront?: File
    aadhaarBack?: File
    signature?: File
    photo?: File
  }>({})
  // Handle field changes
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    dispatch(updateFormData({ [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setDocuments((prev) => ({ ...prev, [name]: files[0] }))
    }
  }


  // Validate current step
  const validateStep = () => {
    try {
      if (currentStep === 1) personalDetailsSchema.parse(formData)
      if (currentStep === 2) addressSchema.parse(formData)
      if (currentStep === 3) {documentSchema.parse(documents)}

      setErrors({})
      return true
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {}

        err.issues.forEach((issue) => {
          const fieldName = issue.path[0]
          if (fieldName) {
            fieldErrors[fieldName as string] = issue.message
          }
        })

        setErrors(fieldErrors)
      }
      return false
    }

  }

  

  const next = () => {
    if (validateStep()) dispatch(setCurrentStep(currentStep + 1))
  }

  const prev = () => dispatch(setCurrentStep(currentStep - 1))

  const submit = () => {
    alert(`PAN Application Submitted\nUser ID: ${userId}`)
    dispatch(resetForm())
    onBack()
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8', py: 6 }}>
      <Container maxWidth="md">
        {/* Page Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" fontWeight={700}>
            New PAN Application
          </Typography>
          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>
        </Box>

        {/* Stepper */}
        <Stepper activeStep={currentStep - 1} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Form Card */}
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Application ID: <strong>{userId}</strong>
          </Typography>

          {/* STEP 1: PERSONAL */}
          {currentStep === 1 && (
            <Grid container spacing={3}>
              {[
                { label: 'First Name', name: 'firstName' },
                { label: 'Middle Name', name: 'middleName' },
                { label: 'Surname', name: 'surname' },
                { label: "Father's First Name", name: 'fatherFirstName' },
                { label: "Father's Middle Name", name: 'fatherMiddleName' },
                { label: "Father's Last Name", name: 'fatherLastName' },
                { label: 'Date of Birth', name: 'dob', type: 'date' },
                { label: 'Email ID', name: 'email' },
                { label: 'Phone Number', name: 'phone' },
              ].map((field) => (
                <Grid item xs={12} md={field.name.includes('dob') ? 6 : 4} key={field.name}>
                  <TextField
                    fullWidth
                    type={field.type || 'text'}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleTextChange}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]}
                    InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* STEP 2: RESIDENCE */}
          {currentStep === 2 && (
            <Grid container spacing={3}>
              {[
                { label: 'House Number', name: 'houseNumber' },
                { label: 'Village / Town', name: 'villageTown' },
                { label: 'Road / Street / Post Office', name: 'roadStreetPostOffice' },
                { label: 'Pincode', name: 'pincode' },
                { label: 'Area / Locality / Sub-Division', name: 'areaLocalitySubDivision' },
                { label: 'City / District', name: 'cityDistrict' },
                { label: 'Country', name: 'country' },
              ].map((field) => (
                <Grid item xs={12} md={field.name === 'country' ? 12 : 4} key={field.name}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleTextChange}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* STEP 3: DOCUMENTS */}
          {currentStep === 3 && (
            <Grid container spacing={3}>
              {[
                { label: 'Upload Aadhaar Front', name: 'aadhaarFront' },
                { label: 'Upload Aadhaar Back', name: 'aadhaarBack' },
                { label: 'Upload Signature', name: 'signature' },
                { label: 'Upload Photo', name: 'photo' },
              ].map((field) => (
                <Grid item xs={12} md={6} key={field.name}>
                  <Button
                    fullWidth
                    variant="outlined"
                    component="label"
                    color={errors[field.name] ? 'error' : 'primary'}
                  >
                    {field.label}
                    <input
                      hidden
                      type="file"
                      name={field.name}
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>

                  {errors[field.name] && (
                    <Typography color="error" variant="caption">
                      {errors[field.name]}
                    </Typography>
                  )}
                </Grid>
              ))}
            </Grid>
          )}

          {/* STEP 4: REVIEW */}
          {currentStep === 4 && (
            <Box sx={{ lineHeight: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Review Application
              </Typography>
              <Typography><strong>Name:</strong> {formData.firstName} {formData.surname}</Typography>
              <Typography><strong>Email:</strong> {formData.email}</Typography>
              <Typography><strong>Phone:</strong> {formData.phone}</Typography>
              <Typography><strong>Address:</strong> {formData.houseNumber}, {formData.villageTown}, {formData.cityDistrict}, {formData.country}</Typography>
            </Box>
          )}

          {/* STEP 5: PAYMENT */}
          {currentStep === 5 && (
            <>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Payment
              </Typography>
              <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
                Amount Payable: ₹{formData.amount || 107}
              </Typography>
              <Button fullWidth size="large" variant="contained" color="success" onClick={submit}>
                Confirm & Submit Application
              </Button>
            </>
          )}

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
            {currentStep > 1 && (
              <Button variant="outlined" onClick={prev}>
                Previous
              </Button>
            )}
            {currentStep < 5 && (
              <Button variant="contained" onClick={next}>
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default PanApplicationForm
