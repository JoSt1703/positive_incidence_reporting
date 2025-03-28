import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Box, Button, Typography } from '@mui/material'
import IncidentDetails from '../components/IncidentDetails'
import TimelineSection from '../components/TimelineSection'
import VictimSection from '../components/VictimSection'
import ActionSection from '../components/ActionSection'
import ActorSection from '../components/ActorSection'
import AssetSection from '../components/AssetSection'
import DiscoverySection from '../components/DiscoverySection'

export default function NegativeEntry() {
  const { index } = useParams()
  const navigate = useNavigate()
  const stored = JSON.parse(sessionStorage.getItem('incidents')) || []

  const { handleSubmit, control, watch, reset } = useForm({
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
      actions: [],
      actionNotes: '',
      actors: [],
      actorNotes: '',
      totalDamage: '',
      assetHosting: [],
      assetVariety: [],
      discoveryInternal: [],
      discoveryExternal: [],
      discoveryPartner: []
    }
  })

  // Load values into form if editing
  useEffect(() => {
    if (index !== undefined && stored[index]) {
      reset(stored[index])
    }
  }, [index, reset])

  const onSubmit = (data) => {
    if (index !== undefined) {
      stored[parseInt(index)] = data
    } else {
      stored.push(data)
    }
    sessionStorage.setItem('incidents', JSON.stringify(stored))
    navigate('/negative-view')
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
        <ActionSection control={control} watch={watch} />
        <ActorSection control={control} watch={watch} />
        <AssetSection control={control} watch={watch} />
        <DiscoverySection control={control} watch={watch} />

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" type="submit">
            Save Incident
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
