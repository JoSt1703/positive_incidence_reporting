import { useState, useEffect } from 'react'
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Stack
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const EXAMPLE_STORIES = [
  {
    date: '2024-08-01',
    summary: 'Rolled out company-wide MFA enforcement.',
    detailed_info: 'Implemented MFA with hardware tokens.',
    industry: 'Technology',
    visibility: 'public',
    owner: 'accountA'
  },
  {
    date: '2024-06-15',
    summary: 'Phishing workshop success.',
    detailed_info: '85% follow-up training completed.',
    industry: 'Finance',
    visibility: 'public',
    owner: 'accountB'
  }
]

export default function PositiveViewEdit() {
  const [stories, setStories] = useState([])
  const [role, setRole] = useState('viewer')
  const navigate = useNavigate()

  useEffect(() => {
    const load = () => {
      const all = JSON.parse(sessionStorage.getItem('successStories')) || []
      const currentRole = sessionStorage.getItem('role') || 'viewer'
      const filtered = all.filter((story) => {
        if (currentRole === 'viewer') return story.visibility === 'public'
        if (story.owner === currentRole) return true
        if (story.visibility === 'shared' && (story.sharedWith || []).includes(currentRole)) return true
        return story.visibility === 'public'
      })
      setStories(filtered)
      setRole(currentRole)
    }

    load()
    window.addEventListener('storage', load)
    return () => window.removeEventListener('storage', load)
  }, [])

  const isViewer = role === 'viewer'

  const handleEdit = (index) => {
    navigate(`/positive-edit/${index}`)
  }

  const handleDelete = (index) => {
    const all = JSON.parse(sessionStorage.getItem('successStories')) || []
    const realIndex = all.findIndex(
      (item) => item.summary === stories[index].summary && item.owner === stories[index].owner
    )
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
        📗 Story Log ({role})
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
                      {!isViewer && story.owner === role && (
                        <>
                          <Button variant="outlined" size="small" onClick={() => handleEdit(index)}>
                            Edit
                          </Button>
                          <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(index)}>
                            Delete
                          </Button>
                        </>
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
