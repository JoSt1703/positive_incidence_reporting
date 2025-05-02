import { useState, useEffect } from 'react'
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Stack, TextField,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  'Awareness Training', 'Technical Achievement', 'Management', 'Culture',
  'Incident Response Success', 'Compliance Achievement', 'Innovation in Security Tools',
  'Vendor Risk Management', 'Threat Intelligence Utilization', 'Data Protection',
  'Resilience and Continuity', 'Employee Security Awareness', 'Integration Success',
  'Regulatory Advocacy'
]

const formatRole = (id) => {
  switch (id) {
    case 'accountA': return 'Account A'
    case 'accountB': return 'Account B'
    case 'accountC': return 'Account C'
    case 'viewer': return 'Global Viewer'
    default: return id
  }
}

export default function PositiveViewEdit() {
  const [allStories, setAllStories] = useState([])
  const [filtered, setFiltered] = useState([])
  const [role, setRole] = useState('viewer')
  const navigate = useNavigate()

  // Filters
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [category, setCategory] = useState('')
  const [postedBy, setPostedBy] = useState('')
  const isViewer = role === 'viewer'

  useEffect(() => {
    const load = () => {
      const all = JSON.parse(sessionStorage.getItem('successStories')) || []
      const currentRole = sessionStorage.getItem('role') || 'viewer'
      const visible = all.filter((story) => {
        if (currentRole === 'viewer') return story.visibility === 'public'
        if (story.owner === currentRole) return true
        if (story.visibility === 'shared' && (story.sharedWith || []).includes(currentRole)) return true
        return story.visibility === 'public'
      })
      setRole(currentRole)
      setAllStories(visible)
    }

    load()
    window.addEventListener('storage', load)
    return () => window.removeEventListener('storage', load)
  }, [])

  useEffect(() => {
    let filtered = [...allStories]

    if (startDate) filtered = filtered.filter(story => story.date >= startDate)
    if (endDate) filtered = filtered.filter(story => story.date <= endDate)
    if (category) filtered = filtered.filter(story => story.category === category)
    if (postedBy) filtered = filtered.filter(story => story.owner === postedBy)

    setFiltered(filtered)
  }, [allStories, startDate, endDate, category, postedBy])

  const handleEdit = (index) => {
    navigate(`/positive-edit/${index}`)
  }

  const handleDelete = (index) => {
    const all = JSON.parse(sessionStorage.getItem('successStories')) || []
    const realIndex = all.findIndex(
      (item) => item.summary === filtered[index].summary && item.owner === filtered[index].owner
    )
    if (realIndex !== -1) {
      all.splice(realIndex, 1)
      sessionStorage.setItem('successStories', JSON.stringify(all))
      setFiltered((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const handleView = (index) => {
    navigate(`/positive-view/${index}`)
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
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📗 Story Log ({formatRole(role)})
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
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            {CATEGORIES.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 160 }} size="small">
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
            setCategory('')
            setPostedBy('')
          }}
        >
          Clear Filters
        </Button>
      </Stack>

      {filtered.length === 0 ? (
        <Typography>No stories match your filters.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Summary</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Posted By</TableCell>
                <TableCell>Visibility</TableCell>
                <TableCell>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((story, index) => (
                <TableRow key={index}>
                  <TableCell>{story.date}</TableCell>
                  <TableCell>{story.summary}</TableCell>
                  <TableCell>{story.category || '—'}</TableCell>
                  <TableCell>{formatRole(story.owner)}</TableCell>
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
                      {(story.owner !== role) && (
                        <Button variant="outlined" size="small" onClick={() => handleView(index)}>
                          View
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
