import { useForm } from 'react-hook-form'
import { Box, Button, Typography } from '@mui/material'
import IncidentDetails from '../components/IncidentDetails'
import TimelineSection from '../components/TimelineSection'
import VictimSection from '../components/VictimSection'
import ActionSection from '../components/ActionSection'

export default function NegativeEntry() {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      status: '',
      summary: '',
      reference: '',
      confidence: '',
      impact: '',
      incidentOccurred: '',
      compromise: '',
      exfiltration: '',
      discovery: '',
      containment: '',
      targeted: '',
      industry: '',
      country: '',
      companySize: '',
      action: '',
      actionNotes: ''
    }
  })

  const onSubmit = (data) => {
    console.log('Submitted data:', data)
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        🛑 Save a New Security Incident
      </Typography>
      <Typography variant="body1" gutterBottom>
        This form is used to enter a new cybersecurity incident. Enter as much information as you can —
        every entry can be updated later in the Incident Log.
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 4 }}>
        <IncidentDetails control={control} watch={watch} />
        <TimelineSection control={control} />
        <VictimSection control={control} />
        <ActionSection control={control} />

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" type="submit">
            Save Incident
          </Button>
        </Box>
      </Box>
    </Box>
  )
}