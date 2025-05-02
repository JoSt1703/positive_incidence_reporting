import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import {
  Box, Button, Typography, FormControl,
  InputLabel, MenuItem, Select, Paper
} from '@mui/material'
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

  const lockedRole = sessionStorage.getItem('role') || 'viewer'
  const isViewer = lockedRole === 'viewer'

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
      discoveryPartner: [],
      visibility: 'public',
      sharedWith: []
    }
  })

  useEffect(() => {
    if (index !== undefined && stored[index]) {
      reset(stored[index])
    }
  }, [index, reset])

  const onSubmit = (data) => {
    if (lockedRole === 'viewer' && data.visibility !== 'public') {
      alert('Global Viewer can only submit public incidents.')
      return
    }

    const entry = {
      ...data,
      owner: lockedRole
    }

    if (index !== undefined) {
      stored[parseInt(index)] = entry
    } else {
      stored.push(entry)
    }

    sessionStorage.setItem('incidents', JSON.stringify(stored))
    navigate('/negative-view')
  }

  const visibility = watch('visibility')

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        🛑 Save a New Security Incident
      </Typography>

      <Typography variant="body1" gutterBottom>
        Fill in details of the incident. You may update it later in the Incident Log.
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 4 }}>
        <IncidentDetails control={control} watch={watch} />
        <TimelineSection control={control} />
        <VictimSection control={control} />
        <ActionSection control={control} watch={watch} />
        <ActorSection control={control} watch={watch} />
        <AssetSection control={control} watch={watch} />
        <DiscoverySection control={control} watch={watch} />

        {/* Visibility Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Visibility</InputLabel>
          <Controller
            name="visibility"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Visibility" disabled={isViewer}>
                <MenuItem value="public">Public</MenuItem>
                {!isViewer && <MenuItem value="shared">Shared</MenuItem>}
                {!isViewer && <MenuItem value="private">Private</MenuItem>}
              </Select>
            )}
          />
        </FormControl>

        {/* Shared With */}
        {visibility === 'shared' && !isViewer && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Share with</InputLabel>
            <Controller
              name="sharedWith"
              control={control}
              render={({ field }) => (
                <Select {...field} multiple label="Share with">
                  <MenuItem value="accountA">Account A</MenuItem>
                  <MenuItem value="accountB">Account B</MenuItem>
                  <MenuItem value="accountC">Account C</MenuItem>
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
