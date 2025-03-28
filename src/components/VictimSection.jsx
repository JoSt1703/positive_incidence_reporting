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
  
  const targetedOptions = ['Targeted', 'Opportunistic', 'Unknown']
  
  const countryOptions = [
    'AD: Andorra', 'AE: United Arab Emirates', 'AF: Afghanistan', 'AG: Antigua and Barbuda',
    'AI: Anguilla', 'AL: Albania', 'AM: Armenia', 'AO: Angola', 'AR: Argentina', 'AS: American Samoa',
    'AT: Austria', 'AU: Australia', 'AW: Aruba', 'AX: Åland Islands', 'AZ: Azerbaijan',
    'BA: Bosnia and Herzegovina', 'BB: Barbados', 'BD: Bangladesh', 'BE: Belgium', 'BF: Burkina Faso',
    'BG: Bulgaria', 'BH: Bahrain', 'BI: Burundi', 'BJ: Benin', 'BL: Saint Barthélemy',
    'BM: Bermuda', 'BN: Brunei', 'BO: Bolivia', 'BQ: Bonaire, Sint Eustatius and Saba', 'BR: Brazil',
    'BS: Bahamas', 'BT: Bhutan', 'BV: Bouvet Island', 'BW: Botswana', 'BY: Belarus', 'BZ: Belize',
    'CA: Canada', 'CC: Cocos (Keeling) Islands', 'CD: Democratic Republic of the Congo',
    'CF: Central African Republic', 'CG: Congo', 'CH: Switzerland', "CI: Côte d'Ivoire",
    'CK: Cook Islands', 'CL: Chile', 'CM: Cameroon', 'CN: China', 'CO: Colombia', 'CR: Costa Rica',
    'CU: Cuba', 'CV: Cape Verde', 'CW: Curaçao', 'CX: Christmas Island', 'CY: Cyprus',
    'CZ: Czech Republic', 'DE: Germany', 'DJ: Djibouti', 'DK: Denmark', 'DM: Dominica',
    'DO: Dominican Republic', 'DZ: Algeria', 'EC: Ecuador', 'EE: Estonia', 'EG: Egypt',
    'EH: Western Sahara', 'ES: Spain', 'ET: Ethiopia', 'FI: Finland', 'FJ: Fiji', 'FM: Micronesia',
    'FO: Faroe Islands', 'FR: France', 'GA: Gabon', 'GB: United Kingdom', 'GD: Grenada',
    'GE: Georgia', 'GF: French Guiana', 'GG: Guernsey', 'GH: Ghana', 'GI: Gibraltar',
    'GL: Greenland', 'GM: Gambia', 'GN: Guinea', 'GP: Guadeloupe', 'GQ: Equatorial Guinea',
    'GR: Greece', 'GT: Guatemala', 'GU: Guam', 'GW: Guinea-Bissau', 'GY: Guyana', 'HK: Hong Kong',
    'HM: Heard Island and McDonald Islands', 'HN: Honduras', 'HR: Croatia', 'HT: Haiti', 'HU: Hungary',
    'ID: Indonesia', 'IE: Ireland', 'IL: Israel', 'IM: Isle of Man', 'IN: India',
    'IO: British Indian Ocean Territory', 'IQ: Iraq', 'IR: Iran', 'IS: Iceland', 'IT: Italy',
    'JE: Jersey', 'JM: Jamaica', 'JO: Jordan', 'JP: Japan', 'KE: Kenya', 'KG: Kyrgyzstan',
    'KH: Cambodia', 'KI: Kiribati', 'KM: Comoros', 'KN: Saint Kitts and Nevis', 'KP: North Korea',
    'KR: South Korea', 'KW: Kuwait', 'KZ: Kazakhstan', 'LA: Laos', 'LB: Lebanon', 'LC: Saint Lucia',
    'LI: Liechtenstein', 'LK: Sri Lanka', 'LR: Liberia', 'LS: Lesotho', 'LT: Lithuania',
    'LU: Luxembourg', 'LV: Latvia', 'LY: Libya', 'MA: Morocco', 'MC: Monaco', 'MD: Moldova',
    'ME: Montenegro', 'MF: Saint Martin', 'MG: Madagascar', 'MH: Marshall Islands', 'MK: North Macedonia',
    'ML: Mali', 'MM: Myanmar', 'MN: Mongolia', 'MO: Macau', 'MP: Northern Mariana Islands',
    'MQ: Martinique', 'MR: Mauritania', 'MS: Montserrat', 'MT: Malta', 'MU: Mauritius',
    'MV: Maldives', 'MW: Malawi', 'MX: Mexico', 'MY: Malaysia', 'MZ: Mozambique', 'NA: Namibia',
    'NC: New Caledonia', 'NE: Niger', 'NF: Norfolk Island', 'NG: Nigeria', 'NI: Nicaragua',
    'NL: Netherlands', 'NO: Norway', 'NP: Nepal', 'NR: Nauru', 'NU: Niue', 'NZ: New Zealand',
    'OM: Oman', 'PA: Panama', 'PE: Peru', 'PG: Papua New Guinea', 'PH: Philippines',
    'PK: Pakistan', 'PL: Poland', 'PM: Saint Pierre and Miquelon', 'PN: Pitcairn Islands',
    'PR: Puerto Rico', 'PT: Portugal', 'PW: Palau', 'PY: Paraguay', 'QA: Qatar', 'RE: Réunion',
    'RO: Romania', 'RS: Serbia', 'RU: Russia', 'RW: Rwanda', 'SA: Saudi Arabia',
    'SB: Solomon Islands', 'SC: Seychelles', 'SD: Sudan', 'SE: Sweden', 'SG: Singapore',
    'SH: Saint Helena', 'SI: Slovenia', 'SJ: Svalbard and Jan Mayen', 'SK: Slovakia',
    'SL: Sierra Leone', 'SM: San Marino', 'SN: Senegal', 'SO: Somalia', 'SR: Suriname',
    'SS: South Sudan', 'ST: São Tomé and Príncipe', 'SV: El Salvador', 'SX: Sint Maarten',
    'SY: Syria', 'SZ: Eswatini', 'TC: Turks and Caicos Islands', 'TD: Chad',
    'TF: French Southern Territories', 'TG: Togo', 'TH: Thailand', 'TJ: Tajikistan', 'TK: Tokelau',
    'TL: Timor-Leste', 'TM: Turkmenistan', 'TN: Tunisia', 'TO: Tonga', 'TR: Turkey',
    'TT: Trinidad and Tobago', 'TV: Tuvalu', 'TZ: Tanzania', 'UA: Ukraine', 'UG: Uganda',
    'UM: United States Minor Outlying Islands', 'US: USA', 'UY: Uruguay', 'UZ: Uzbekistan',
    'VA: Vatican City', 'VE: Venezuela', 'VN: Vietnam', 'VU: Vanuatu', 'WS: Samoa', 'YE: Yemen',
    'ZA: South Africa', 'ZM: Zambia', 'ZW: Zimbabwe'
  ]
  
  const companySizes = [
    '1 to 10', '11 to 100', '101 to 1000', '1001 to 10000',
    '10001 to 25000', '25001 to 500000', '500001 to 1000000'
  ]
  
  export default function VictimSection({ control }) {
    return (
    <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Victim</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Targeted dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Targeted</InputLabel>
            <Controller
              name="targeted"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Targeted">
                  {targetedOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
  
          {/* Industry input */}
          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Industry (e.g., Technology, Healthcare, Finance)"
                fullWidth
                margin="normal"
              />
            )}
          />
  
          {/* Country dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Country</InputLabel>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Country">
                  {countryOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
  
          {/* Company Size dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Company Size</InputLabel>
            <Controller
              name="companySize"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Company Size">
                  {companySizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
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