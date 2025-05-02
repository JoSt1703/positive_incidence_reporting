import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Button, Stack } from '@mui/material'

const formatRole = (id) => {
  switch (id) {
    case 'accountA': return 'Account A'
    case 'accountB': return 'Account B'
    case 'accountC': return 'Account C'
    case 'viewer': return 'Global Viewer'
    default: return id
  }
}

export default function NegativeReadOnly() {
  const { index } = useParams()
  const navigate = useNavigate()

  const stored = JSON.parse(sessionStorage.getItem('incidents')) || []
  const incident = stored[parseInt(index)]

  if (!incident) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Typography variant="h5" color="error">Incident not found.</Typography>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📘 View Incident
      </Typography>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Summary</Typography>
        <Typography paragraph>{incident.summary}</Typography>

        <Typography variant="h6" gutterBottom>Status</Typography>
        <Typography paragraph>{incident.status || '—'}</Typography>

        <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
          <Typography>Occurred: {incident.incidentOccurred || '—'}</Typography>
          <Typography>Visibility: {incident.visibility || '—'}</Typography>
        </Stack>

        <Typography sx={{ mt: 2 }}>
          Posted by: {formatRole(incident.owner)}
        </Typography>
      </Paper>

      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>← Back</Button>
      </Box>
    </Box>
  )
}
