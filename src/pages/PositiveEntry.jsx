import { useForm, Controller } from 'react-hook-form'
import {
  Box, Button, TextField, Typography, Alert,
  MenuItem, Select, InputLabel, FormControl
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export default function PositiveEntry() {
  const { index } = useParams()
  const navigate = useNavigate()
  const stored = JSON.parse(sessionStorage.getItem('successStories')) || []

  const role = sessionStorage.getItem('role') || 'viewer'
  const isViewer = role === 'viewer'

  const { handleSubmit, register, reset, watch, control } = useForm({
    defaultValues: {
      date: '',
      summary: '',
      detailed_info: '',
      industry: '',
      category: '',
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
    if (isViewer) {
      alert('Global Viewer cannot create or modify entries.')
      return
    }

    const entry = {
      ...data,
      owner: role
    }

    if (index !== undefined) {
      stored[parseInt(index)] = entry
    } else {
      stored.push(entry)
    }

    sessionStorage.setItem('successStories', JSON.stringify(stored))
    navigate('/positive-view')
  }

  const summary = watch('summary') || ''
  const visibility = watch('visibility')

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        🛡️ Submit a Success Story
      </Typography>
      <Typography gutterBottom>
        This form is used to enter a new positive cybersecurity event. Enter as much information as you can —
        every entry can be updated later in the Event Log.
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        <strong>Examples:</strong> Company-wide MFA implementation, a successful phishing awareness workshop,
        minimal findings in a penetration test, or early threat detection by SOC.
      </Alert>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register('date', { required: true })}
          label="Event Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
        />

        <TextField
          {...register('summary', { required: true, maxLength: 300 })}
          label="Summary (Max 300 characters)"
          multiline
          rows={3}
          fullWidth
          margin="normal"
          helperText={`${summary.length}/300 characters`}
        />

        <TextField
          {...register('detailed_info', { required: true })}
          label="Detailed Information"
          multiline
          rows={5}
          fullWidth
          margin="normal"
        />

        <TextField
          {...register('industry', { required: true })}
          label="Industry (e.g., Technology, Healthcare, Finance)"
          fullWidth
          margin="normal"
        />

        {/* Category Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            {...register('category', { required: true })}
            label="Category"
          >
            <MenuItem value="Awareness Training">Awareness Training</MenuItem>
            <MenuItem value="Technical Achievement">Technical Achievement</MenuItem>
            <MenuItem value="Management">Management</MenuItem>
            <MenuItem value="Culture">Culture</MenuItem>
            <MenuItem value="Incident Response Success">Incident Response Success</MenuItem>
            <MenuItem value="Compliance Achievement">Compliance Achievement</MenuItem>
            <MenuItem value="Innovation in Security Tools">Innovation in Security Tools</MenuItem>
            <MenuItem value="Vendor Risk Management">Vendor Risk Management</MenuItem>
            <MenuItem value="Threat Intelligence Utilization">Threat Intelligence Utilization</MenuItem>
            <MenuItem value="Data Protection">Data Protection</MenuItem>
            <MenuItem value="Resilience and Continuity">Resilience and Continuity</MenuItem>
            <MenuItem value="Employee Security Awareness">Employee Security Awareness</MenuItem>
            <MenuItem value="Integration Success">Integration Success</MenuItem>
            <MenuItem value="Regulatory Advocacy">Regulatory Advocacy</MenuItem>
          </Select>
        </FormControl>

        {/* Visibility */}
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

        {/* SharedWith (only if shared and not viewer) */}
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

        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" disabled={isViewer}>
            Save Story
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
