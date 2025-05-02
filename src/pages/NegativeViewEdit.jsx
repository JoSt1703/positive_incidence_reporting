import { useState, useEffect } from 'react'
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Stack
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function NegativeViewEdit() {
  const [incidents, setIncidents] = useState([])
  const [role, setRole] = useState('viewer')
  const navigate = useNavigate()

  useEffect(() => {
    const load = () => {
      const all = JSON.parse(sessionStorage.getItem('incidents')) || []
      const currentRole = sessionStorage.getItem('role') || 'viewer'

      const filtered = all.filter((incident) => {
        if (currentRole === 'viewer') return incident.visibility === 'public'
        if (incident.owner === currentRole) return true
        if (incident.visibility === 'shared' && (incident.sharedWith || []).includes(currentRole)) return true
        return incident.visibility === 'public'
      })

      setRole(currentRole)
      setIncidents(filtered)
    }

    load()
    window.addEventListener('storage', load)
    return () => window.removeEventListener('storage', load)
  }, [])

  const isViewer = role === 'viewer'

  const handleEdit = (index) => {
    navigate(`/edit/${index}`)
  }

  const handleDelete = (index) => {
    const all = JSON.parse(sessionStorage.getItem('incidents')) || []
    const realIndex = all.findIndex(
      (item) => item.summary === incidents[index].summary && item.owner === incidents[index].owner
    )
    if (realIndex !== -1) {
      all.splice(realIndex, 1)
      sessionStorage.setItem('incidents', JSON.stringify(all))
      setIncidents((prev) => prev.filter((_, i) => i !== index))
    }
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
        📕 Incident Log ({role})
      </Typography>

      {incidents.length === 0 ? (
        <Typography>No incidents available for this view.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Summary</TableCell>
                <TableCell>Visibility</TableCell>
                <TableCell>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incidents.map((incident, index) => (
                <TableRow key={index}>
                  <TableCell>{incident.status}</TableCell>
                  <TableCell>{incident.summary}</TableCell>
                  <TableCell>{incident.visibility}</TableCell>
                  <TableCell>
                    <Stack spacing={1} direction="row">
                      {!isViewer && incident.owner === role && (
                        <>
                          <Button variant="outlined" size="small" onClick={() => handleEdit(index)}>
                            Edit
                          </Button>
                          <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(index)}>
                            Delete
                          </Button>
                        </>
                      )}
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
