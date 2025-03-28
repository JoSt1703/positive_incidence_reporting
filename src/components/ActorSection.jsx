import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Checkbox,
    ListItemText
  } from '@mui/material'
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
  import { Controller } from 'react-hook-form'
  
  const actorOptions = ['External', 'Internal', 'Partner', 'Unknown']
  
  export default function ActorSection({ control, watch }) {
    const selected = watch('actors') || []
  
    return (
    <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Actor</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Identify the actors responsible for this incident.
          </Typography>
  
          <FormControl fullWidth margin="normal">
            <InputLabel>Actors Involved</InputLabel>
            <Controller
              name="actors"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Actors Involved"
                  multiple
                  value={field.value || []}
                  onChange={(e) => field.onChange(e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {actorOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={selected.includes(option)} />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </AccordionDetails>
      </Accordion>
    )
  }
  