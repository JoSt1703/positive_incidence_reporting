import { useState, useEffect } from 'react'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function NegativeViewEdit() {
  const [incidents, setIncidents] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('incidents')) || []
    setIncidents(stored)
  }, [])

  const handleEdit = (index) => {
    navigate(`/edit/${index}`)
  }

  const handleDelete = (index) => {
    const updated = [...incidents]
    updated.splice(index, 1)
    setIncidents(updated)
    localStorage.setItem('incidents', JSON.stringify(updated))
  }

  const handleDownloadOne = (incident, index) => {
    const json = JSON.stringify(incident, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `incident_${index + 1}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
      📕 Incident Log
      </Typography>

      {incidents.length === 0 ? (
        <Typography>No incidents saved yet.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Summary</TableCell>
                <TableCell>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incidents.map((incident, index) => (
                <TableRow key={index}>
                  <TableCell>{incident.status}</TableCell>
                  <TableCell>{incident.summary}</TableCell>
                  <TableCell>
                    <Stack spacing={1} direction="row">
                      <Button variant="outlined" size="small" onClick={() => handleEdit(index)}>
                        Edit
                      </Button>
                      <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(index)}>
                        Delete
                      </Button>
                      <Button variant="outlined" size="small" onClick={() => handleDownloadOne(incident, index)}>
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