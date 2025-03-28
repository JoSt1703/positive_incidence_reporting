import { useState, useEffect } from 'react'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incidents.map((incident, index) => (
                <TableRow key={index}>
                  <TableCell>{incident.status}</TableCell>
                  <TableCell>{incident.summary}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={() => handleEdit(index)}>
                      Edit
                    </Button>
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