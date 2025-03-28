import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    TextField,
    Checkbox,
    ListItemText,
    FormControl,
    InputLabel,
    MenuItem,
    Select
  } from '@mui/material'
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
  import { Controller } from 'react-hook-form'
  
  const hostingOptions = [
    'Cloud - The asset is hosted in the cloud',
    'On-Premises - The asset is hosted on physical infrastructure in the organization',
    'Hybrid - The asset uses both cloud and on-premises hosting',
    'Unknown - It is unclear how the asset is hosted'
  ]
  
  const varietyOptions = [
    'Application - Software or application services',
    'Data - Databases, files, etc.',
    'Network - Network infrastructure',
    'Hardware - Physical devices (servers, workstations)',
    'Service - Third-party services or APIs',
    'Other - Specify if not listed'
  ]
  
  export default function AssetSection({ control, watch }) {
    const hosting = watch('assetHosting') || []
    const variety = watch('assetVariety') || []
  
    return (
        <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Asset</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Specify the assets involved in the incident.
          </Typography>
  
          <Controller
            name="totalDamage"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Estimated Total Damage (USD)"
                type="number"
                fullWidth
                margin="normal"
              />
            )}
          />
  
          <FormControl fullWidth margin="normal">
            <InputLabel>Asset Hosting</InputLabel>
            <Controller
              name="assetHosting"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Asset Hosting"
                  multiple
                  value={field.value || []}
                  onChange={(e) => field.onChange(e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {hostingOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={hosting.includes(option)} />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
  
          <FormControl fullWidth margin="normal">
            <InputLabel>Asset Variety</InputLabel>
            <Controller
              name="assetVariety"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Asset Variety"
                  multiple
                  value={field.value || []}
                  onChange={(e) => field.onChange(e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {varietyOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={variety.includes(option)} />
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