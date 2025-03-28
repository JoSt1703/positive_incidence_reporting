// /pages/PositiveViewEdit.jsx
import { useState, useEffect } from 'react'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const EXAMPLE_STORIES = [
  {
    date: '2024-08-01',
    summary: 'Rolled out company-wide MFA enforcement.',
    detailed_info: 'Successfully implemented multi-factor authentication across all departments using hardware tokens.',
    industry: 'Technology'
  },
  {
    date: '2024-06-15',
    summary: 'Conducted phishing workshop with high engagement.',
    detailed_info: 'Led a live phishing simulation workshop. 85% of employees completed follow-up training.',
    industry: 'Finance'
  },
  {
    date: '2024-07-10',
    summary: 'Completed pen test with minimal findings.',
    detailed_info: 'External firm found only low-priority misconfigurations during penetration testing.',
    industry: 'Healthcare'
  }
]

export default function PositiveViewEdit() {
  const [stories, setStories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('successStories'))
    if (!stored || stored.length === 0) {
      localStorage.setItem('successStories', JSON.stringify(EXAMPLE_STORIES))
      setStories(EXAMPLE_STORIES)
    } else {
      setStories(stored)
    }
  }, [])

  const handleEdit = (index) => {
    navigate(`/positive-edit/${index}`)
  }

  const handleDelete = (index) => {
    const updated = [...stories]
    updated.splice(index, 1)
    setStories(updated)
    localStorage.setItem('successStories', JSON.stringify(updated))
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
        📗 Event Log
      </Typography>

      {stories.length === 0 ? (
        <Typography>No stories submitted yet.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Summary</TableCell>
                <TableCell>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stories.map((story, index) => (
                <TableRow key={index}>
                  <TableCell>{story.date}</TableCell>
                  <TableCell>{story.summary}</TableCell>
                  <TableCell>
                    <Stack spacing={1} direction="row">
                      <Button variant="outlined" size="small" onClick={() => handleEdit(index)}>
                        Edit
                      </Button>
                      <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(index)}>
                        Delete
                      </Button>
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
