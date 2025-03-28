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
  
  const discoveryMethods = {
    Internal: [
      'Security Monitoring',
      'User Reporting',
      'Automated Alerts',
      'Self-Detection',
      'Configuration Audit',
      'Audit'
    ],
    External: [
      'External Reporting',
      'Automated Threat Intelligence',
      'Media Reports',
      'Research',
      'Penetration Testing',
      'Incident Response Services',
      'Law Enforcement'
    ],
    Partner: [
      'Partner Notification',
      'Third-Party Reporting'
    ]
  }
  
  export default function DiscoverySection({ control, watch }) {
    const internal = watch('discoveryInternal') || []
    const external = watch('discoveryExternal') || []
    const partner = watch('discoveryPartner') || []
  
    return (
    <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Discovery Method</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Specify how the incident was discovered. Select all that apply.
          </Typography>
  
          {['Internal', 'External', 'Partner'].map((key) => (
            <FormControl key={key} fullWidth margin="normal">
              <InputLabel>{key} Discovery Methods</InputLabel>
              <Controller
                name={`discovery${key}`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label={`${key} Discovery Methods`}
                    multiple
                    value={field.value || []}
                    onChange={(e) => field.onChange(e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {discoveryMethods[key].map((option) => (
                      <MenuItem key={option} value={option}>
                        <Checkbox checked={field.value?.includes(option)} />
                        <ListItemText primary={option} />
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          ))}
        </AccordionDetails>
      </Accordion>
    )
  }
  