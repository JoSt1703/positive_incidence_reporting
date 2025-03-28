import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Checkbox,
    ListItemText
  } from '@mui/material'
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
  import { Controller } from 'react-hook-form'
  
  const actionOptions = [
    'Hacking',
    'Malware',
    'Social',
    'Misuse',
    'Physical',
    'Error',
    'Environmental'
  ]
  
  export default function ActionSection({ control }) {
    return (
    <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Action</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Select all applicable actions that caused or contributed to this incident.
          </Typography>
  
          {/* Multi-select action types */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Actions Involved</InputLabel>
            <Controller
              name="actions"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Actions Involved"
                  multiple
                  renderValue={(selected) => selected.join(', ')}
                >
                  {actionOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={field.value.includes(option)} />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
  
          {/* Notes */}
          <Controller
            name="actionNotes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Describe what happened (optional)"
                multiline
                rows={3}
                fullWidth
                margin="normal"
              />
            )}
          />
        </AccordionDetails>
      </Accordion>
    )
  }
  