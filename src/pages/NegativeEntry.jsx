import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select
} from '@mui/material'

const incidentStatusOptions = [
  { label: 'Confirmed - A verified security incident', value: 'Confirmed' },
  { label: 'False Positive - An event mistakenly flagged as an incident', value: 'False Positive' },
  { label: 'Near Miss - An attack that did not compromise assets', value: 'Near Miss' },
  { label: 'Suspected - A potential but unverified incident', value: 'Suspected' }
]

const confidenceLevels = ['High', 'Medium', 'Low', 'None']
const impactOptions = ['None', 'Insignificant', 'Minor', 'Moderate', 'Significant', 'Severe']

export default function NegativeEntry() {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      status: '',
      summary: '',
      reference: '',
      confidence: '',
      impact: ''
    }
  })

  const summaryValue = watch('summary')

  const onSubmit = (data) => {
    console.log('Submitted data:', data)
    // Later: Save locally or export to JSON
  }

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom>
        🛑 Save a New Security Incident
      </Typography>
      <Typography variant="body1" gutterBottom>
      This form is used to enter a new cybersecurity incident, such as breaches, compromises, or similar events. It covers several types, including confirmed incidents and near misses. Enter as much information as you can — every entry can be updated later in the Incident Log page.
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 4 }}>
        {/* Incident Status */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Security Incident Status *</InputLabel>
          <Controller
            name="status"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} label="Security Incident Status *">
                {incidentStatusOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {/* Summary */}
        <Controller
          name="summary"
          control={control}
          rules={{ required: true, maxLength: 500 }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Summary *"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              helperText={`${summaryValue.length}/500 characters`}
              inputProps={{ maxLength: 500 }}
            />
          )}
        />

        {/* Reference URL */}
        <Controller
          name="reference"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Reference (URL)"
              fullWidth
              margin="normal"
              type="url"
            />
          )}
        />

        {/* Confidence */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Confidence Level</InputLabel>
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

        {/* Overall Impact */}
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

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" type="submit">
            Save Incident
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
