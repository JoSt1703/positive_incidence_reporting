import { useState, useEffect } from 'react'
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Stack, TextField,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function NegativeViewEdit() {
  const [allIncidents, setAllIncidents] = useState([])
  const [filtered, setFiltered] = useState([])
  const [role, setRole] = useState('viewer')
  const navigate = useNavigate()

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [postedBy, setPostedBy] = useState('')
  const isViewer = role === 'viewer'

  const formatRole = (id) => {
    switch (id) {
      case 'accountA': return 'Account A'
      case 'accountB': return 'Account B'
      case 'accountC': return 'Account C'
      case 'viewer': return 'Global Viewer'
      default: return id
    }
  }

  useEffect(() => {
    const load = () => {
      const all = JSON.parse(sessionStorage.getItem('incidents')) || []
      const currentRole = sessionStorage.getItem('role') || 'viewer'

      const visible = all.filter((incident) => {
        if (currentRole === 'viewer') return incident.visibility === 'public'
        if (incident.owner === currentRole) return true
        if (incident.visibility === 'shared' && (incident.sharedWith || []).includes(currentRole)) return true
        return incident.visibility === 'public'
      })

      setAllIncidents(visible)
      setRole(currentRole)
    }

    load()
    window.addEventListener('storage', load)
    return () => window.removeEventListener('storage', load)
  }, [])

  useEffect(() => {
    let filtered = [...allIncidents]

    if (startDate) filtered = filtered.filter(i => i.incidentOccurred >= startDate)
    if (endDate) filtered = filtered.filter(i => i.incidentOccurred <= endDate)
    if (postedBy) filtered = filtered.filter(i => i.owner === postedBy)

    setFiltered(filtered)
  }, [allIncidents, startDate, endDate, postedBy])

  const handleEdit = (index) => {
    navigate(`/edit/${index}`)
  }

  const handleDelete = (index) => {
    const all = JSON.parse(sessionStorage.getItem('incidents')) || []
    const realIndex = all.findIndex(
      (item) => item.summary === filtered[index].summary && item.owner === filtered[index].owner
    )
    if (realIndex !== -1) {
      all.splice(realIndex, 1)
      sessionStorage.setItem('incidents', JSON.stringify(all))
      setFiltered((prev) => prev.filter((_, i) => i !== index))
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
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📕 Incident Log ({formatRole(role)})
      </Typography>

      {/* Filters */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          size="small"
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          size="small"
        />
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel>Posted By</InputLabel>
          <Select value={postedBy} label="Posted By" onChange={(e) => setPostedBy(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="accountA">Account A</MenuItem>
            <MenuItem value="accountB">Account B</MenuItem>
            <MenuItem value="accountC">Account C</MenuItem>
            <MenuItem value="viewer">Global Viewer</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setStartDate('')
            setEndDate('')
            setPostedBy('')
          }}
        >
          Clear Filters
        </Button>
      </Stack>

      {filtered.length === 0 ? (
        <Typography>No incidents match your filters.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Summary</TableCell>
                <TableCell>Posted By</TableCell>
                <TableCell>Visibility</TableCell>
                <TableCell>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((incident, index) => (
                <TableRow key={index}>
                  <TableCell>{incident.status}</TableCell>
                  <TableCell>{incident.summary}</TableCell>
                  <TableCell>{formatRole(incident.owner)}</TableCell>
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
