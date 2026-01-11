import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Tailwind blue-600
    },
    secondary: {
      main: '#10b981', // green-500
    },
  },
  shape: {
    borderRadius: 12,
  },
})

export default theme
