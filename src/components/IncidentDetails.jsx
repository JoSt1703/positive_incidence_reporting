import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Controller } from 'react-hook-form'

const incidentStatusOptions = [
  { label: 'Confirmed - A verified security incident', value: 'Confirmed' },
  { label: 'False Positive - An event mistakenly flagged as an incident', value: 'False Positive' },
  { label: 'Near Miss - An attack that did not compromise assets', value: 'Near Miss' },
  { label: 'Suspected - A potential but unverified incident', value: 'Suspected' }
]

const confidenceLevels = ['High', 'Medium', 'Low', 'None']
const impactOptions = ['None', 'Insignificant', 'Minor', 'Moderate', 'Significant', 'Severe']

export default function IncidentDetails({ control, watch }) {
  const summaryValue = watch('summary') || ''

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Incident Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl fullWidth margin="normal">
          <InputLabel>Security Incident Status</InputLabel>
          <Controller
            name="status"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} label="Security Incident Status">
                {incidentStatusOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Controller
          name="summary"
          control={control}
          rules={{ required: true, maxLength: 500 }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Summary"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              helperText={`${summaryValue.length}/500 characters`}
              inputProps={{ maxLength: 500 }}
            />
          )}
        />

        <Controller
          name="reference"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Reference (e.g., GitHub issue, news article, or public breach report)"
              fullWidth
              margin="normal"
              type="url"
            />
          )}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Confidence Level (How confident are you in the accuracy of the information provided?)</InputLabel>
          <Controller
            name="confidence"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Confidence Level">
                {confidenceLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Overall Impact</InputLabel>
          <Controller
            name="impact"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Overall Impact">
                {impactOptions.map((impact) => (
                  <MenuItem key={impact} value={impact}>
                    {impact}
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