import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Box, Button, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
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
  const role = sessionStorage.getItem('role') || 'accountA'

  const { handleSubmit, control, watch, reset } = useForm({
    defaultValues: {
      status: '', summary: '', reference: '', confidence: '', impact: '',
      incidentOccurred: '', compromise: '', exfiltration: '', discovery: '', containment: '',
      targeted: '', industry: '', country: '', companySize: '',
      actions: [], actionNotes: '', actors: [], actorNotes: '', totalDamage: '',
      assetHosting: [], assetVariety: [], discoveryInternal: [], discoveryExternal: [], discoveryPartner: [],
      visibility: 'private', sharedWith: []
    }
  })

  useEffect(() => {
    if (index !== undefined && stored[index]) {
      reset(stored[index])
    }
  }, [index, reset])

  const onSubmit = (data) => {
    const entry = {
      ...data,
      visibility: data.visibility || 'private',
      owner: role,
      sharedWith: data.sharedWith || []
    }

    if (index !== undefined) {
      stored[parseInt(index)] = entry
    } else {
      stored.push(entry)
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

        <FormControl fullWidth margin="normal">
          <InputLabel id="visibility-label">Visibility</InputLabel>
          <Controller
            name="visibility"
            control={control}
            render={({ field }) => (
              <Select {...field} labelId="visibility-label" label="Visibility">
                <MenuItem value="private">Private</MenuItem>
                <MenuItem value="shared">Shared with another account</MenuItem>
                <MenuItem value="public">Public</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        {watch('visibility') === 'shared' && (
          <FormControl fullWidth margin="normal">
            <InputLabel id="share-with-label">Share with</InputLabel>
            <Controller
              name="sharedWith"
              control={control}
              render={({ field }) => (
                <Select {...field} multiple labelId="share-with-label" label="Share with">
                  <MenuItem value="accountA">Account A</MenuItem>
                  <MenuItem value="accountB">Account B</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        )}

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" type="submit">
            Save Incident
          </Button>
        </Box>
      </Box>
    </Box>
  )
}