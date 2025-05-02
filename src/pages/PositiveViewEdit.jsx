import { useState, useEffect } from 'react'
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Stack
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function PositiveViewEdit() {
  const [stories, setStories] = useState([])
  const [role, setRole] = useState('viewer')
  const navigate = useNavigate()

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem('successStories')) || []
    const currentRole = sessionStorage.getItem('role') || 'viewer'
    const filtered = stored.filter((story) => {
      if (currentRole === 'viewer') return story.visibility === 'public'
      if (story.owner === currentRole) return true
      if (story.visibility === 'shared' && (story.sharedWith || []).includes(currentRole)) return true
      return story.visibility === 'public'
    })
    setRole(currentRole)
    setStories(filtered)
  }, [])

  const handleEdit = (index) => {
    navigate(`/positive-edit/${index}`)
  }

  const handleDelete = (index) => {
    const all = JSON.parse(sessionStorage.getItem('successStories')) || []
    const visible = stories
    const realIndex = all.findIndex((item) => item.summary === visible[index].summary && item.owner === visible[index].owner)
    if (realIndex !== -1) {
      all.splice(realIndex, 1)
      sessionStorage.setItem('successStories', JSON.stringify(all))
      setStories((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const handleDownloadOne = (story, index) => {
    const json = JSON.stringify(story, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `success_story_${index + 1}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📗 Event Log ({role})
      </Typography>

      {stories.length === 0 ? (
        <Typography>No stories available for this view.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Summary</TableCell>
                <TableCell>Visibility</TableCell>
                <TableCell>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stories.map((story, index) => (
                <TableRow key={index}>
                  <TableCell>{story.date}</TableCell>
                  <TableCell>{story.summary}</TableCell>
                  <TableCell>{story.visibility}</TableCell>
                  <TableCell>
                    <Stack spacing={1} direction="row">
                      {(story.owner === role) && (
                        <Button variant="outlined" size="small" onClick={() => handleEdit(index)}>
                          Edit
                        </Button>
                      )}
                      {(story.owner === role) && (
                        <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(index)}>
                          Delete
                        </Button>
                      )}
                      <Button variant="outlined" size="small" onClick={() => handleDownloadOne(story, index)}>
                        ⬇️ JSON
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
