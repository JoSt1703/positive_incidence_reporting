import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    TextField,
    Box
  } from '@mui/material'
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
  import { Controller } from 'react-hook-form'
  
  export default function TimelineSection({ control }) {
    const fields = [
      { name: 'incidentOccurred', label: 'When did the incident initially occur?' },
      { name: 'compromise', label: 'When did the first compromise happen?' },
      { name: 'exfiltration', label: 'When was the first known data exfiltration?' },
      { name: 'discovery', label: 'When was the incident discovered by the organization?' },
      { name: 'containment', label: 'When was the incident contained?' }
    ]
  
    return (
      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Timeline</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {fields.map(({ name, label }) => (
            <Box key={name} sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {label}
              </Typography>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="datetime-local"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ step: 60 }}
                  />
                )}
              />
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    )
  }
  