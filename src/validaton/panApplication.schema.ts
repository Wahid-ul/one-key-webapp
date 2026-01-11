import { z } from 'zod'


// this step is validation of document uploads
const fileSchema = z
  .any()
  .refine((file) => file instanceof File, 'File is required')
  .refine((file) => file?.size <= 2 * 1024 * 1024, 'Max file size is 2MB')
  .refine(
    (file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file?.type),
    'Only JPG/PNG images allowed'
  )

export const personalDetailsSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  middleName: z.string().optional(),
  surname: z.string().min(2, 'Surname is required'),

  fatherFirstName: z.string().min(2, "Father's first name is required"),
  fatherMiddleName: z.string().optional(),
  fatherLastName: z.string().min(2, "Father's last name is required"),

  dob: z.string().min(1, 'Date of birth is required'),

  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
})

export const addressSchema = z.object({
  houseNumber: z.string().min(1, 'House number required'),
  villageTown: z.string().min(2, 'Village/Town required'),
  roadStreetPostOffice: z.string().min(2, 'Road/Street/Post Office required'),
  pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode'),
  areaLocalitySubDivision: z.string().min(2, 'Area/Locality required'),
  cityDistrict: z.string().min(2, 'City/District required'),
  country: z.string().min(2, 'Country required'),
})

export const documentSchema = z.object({
  aadhaarFront: fileSchema.refine(
    (file) => file.name.toLowerCase().includes('front'),
    'Aadhaar front image must be front side'
  ),

  aadhaarBack: fileSchema.refine(
    (file) => file.name.toLowerCase().includes('back'),
    'Aadhaar back image must be back side'
  ),

  signature: fileSchema,
  photo: fileSchema,
})
