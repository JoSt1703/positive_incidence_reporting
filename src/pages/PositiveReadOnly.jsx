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

export default function PositiveReadOnly() {
  const { index } = useParams()
  const navigate = useNavigate()

  const stored = JSON.parse(sessionStorage.getItem('successStories')) || []
  const story = stored[parseInt(index)]

  if (!story) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Typography variant="h5" color="error">Story not found.</Typography>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📘 View Story
      </Typography>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Summary</Typography>
        <Typography paragraph>{story.summary}</Typography>

        <Typography variant="h6" gutterBottom>Details</Typography>
        <Typography paragraph>{story.detailed_info}</Typography>

        <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
          <Typography>Date: {story.date || '—'}</Typography>
          <Typography>Category: {story.category || '—'}</Typography>
        </Stack>

        <Stack direction="row" spacing={4} sx={{ mt: 1 }}>
          <Typography>Industry: {story.industry || '—'}</Typography>
          <Typography>Visibility: {story.visibility || '—'}</Typography>
        </Stack>

        <Typography sx={{ mt: 2 }}>
          Posted by: {formatRole(story.owner)}
        </Typography>
      </Paper>

      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>← Back</Button>
      </Box>
    </Box>
  )
}
