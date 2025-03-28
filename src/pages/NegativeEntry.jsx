import { useForm } from 'react-hook-form'
import { Box, Button, Typography } from '@mui/material'
import IncidentDetails from '../components/IncidentDetails'
import TimelineSection from '../components/TimelineSection'

export default function NegativeEntry() {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      status: '',
      summary: '',
      reference: '',
      confidence: '',
      impact: '',
      incidentOccurred: null,
      compromise: null,
      exfiltration: null,
      discovery: null,
      containment: null
    }
  })

  const onSubmit = (data) => {
    console.log('Submitted data:', data)
    // Later: Save to localStorage or export
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        🛑 Save a New Security Incident
      </Typography>
      <Typography variant="body1" gutterBottom>
        This form is used to enter a new cybersecurity incident, such as breaches, compromises, or similar events.
        Enter as much information as you can — every entry can be updated later in the Incident Log page.
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 4 }}>
        <IncidentDetails control={control} watch={watch} />
        <TimelineSection control={control} watch={watch} />

        {/* Future Sections: Timeline, Victim, etc. */}

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" type="submit">
            Save Incident
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
