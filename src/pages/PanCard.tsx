import { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const PanCard = ({
  onBack,
  onNavigate,
}: {
  onBack: () => void
  onNavigate: (page: string) => void
}) => {
  const [open, setOpen] = useState(false)
  const [service, setService] = useState('')

  const handleOpen = (serviceName: string) => {
    setService(serviceName)
    setOpen(true)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8', py: 8 }}>
      {/* FULL WIDTH CONTAINER – NO GAP */}
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4, md: 5 } }}>

        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 5,
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            PAN Card Services
          </Typography>

          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
          >
            Back to Dashboard
          </Button>
        </Box>

        {/* Service Cards */}
        <Grid container spacing={4} justifyContent="center">

          {[
            {
              title: 'New PAN Application',
              desc: 'Apply for a new PAN card for individuals.',
              action: () => onNavigate('pan-form'),
            },
            {
              title: 'PAN Correction',
              desc: 'Correct name, DOB, photo, or signature.',
              action: () => onNavigate('pan-correction'),
            },
            {
              title: 'PAN Status Check',
              desc: 'Track the status of your PAN application.',
              action: () => onNavigate('pan-status'),
            },
            {
              title: 'PAN–Aadhaar Link',
              desc: 'Link your PAN with Aadhaar to avoid penalties.',
              action: () => handleOpen('PAN–Aadhaar Link'),
            },
            {
              title: 'Firm / Company PAN',
              desc: 'Apply PAN for firms, LLPs & companies.',
              action: () => handleOpen('Firm / Company PAN'),
            },
            {
              title: 'PAN 49AA (NRI)',
              desc: 'Apply PAN for Non-Resident Indians.',
              action: () => handleOpen('PAN 49AA (NRI)'),
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color="primary"
                    gutterBottom
                  >
                    {item.title}
                  </Typography>

                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    {item.desc}
                  </Typography>

                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={item.action}
                    >
                      Proceed
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Info Section */}
        <Card sx={{ mt: 8, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight={600} mb={2}>
              Important Information
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>
              • Ensure all documents are valid and clearly visible.<br />
              • PAN processing may take <strong>15–30 working days</strong>.<br />
              • Corrections may require physical verification.<br />
              • For urgent cases, contact NSDL or UTIITSL support.
            </Typography>
          </CardContent>
        </Card>
      </Container>

      {/* CONTACT MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>
          Contact Support – {service}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', right: 16, top: 16 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography color="text.secondary" mb={3}>
            This service requires additional verification. Please contact our
            support team for assistance.
          </Typography>

          <Card sx={{ bgcolor: '#f5faff', mb: 2 }}>
            <CardContent>
              <Typography fontWeight={600} mb={1}>
                Contact Details
              </Typography>
              <Typography>📞 +91 1800-XXX-XXXX</Typography>
              <Typography>📧 support@onekeynow.com</Typography>
              <Typography>⏰ Mon–Fri, 9 AM – 6 PM</Typography>
            </CardContent>
          </Card>

          <Typography variant="body2" color="warning.main">
            Note: Additional documents may be required depending on applicant
            type.
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default PanCard
