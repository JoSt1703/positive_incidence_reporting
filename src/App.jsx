import { useEffect, useState } from 'react'
import {
  Routes, Route, Link, useLocation
} from 'react-router-dom'
import {
  Box, Drawer, List, ListItem, ListItemText, Typography,
  useMediaQuery, useTheme, IconButton, AppBar, Toolbar,
  MenuItem, Select, FormControl, InputLabel
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import Home from './pages/Home'
import NegativeEntry from './pages/NegativeEntry'
import NegativeViewEdit from './pages/NegativeViewEdit'
import PositiveEntry from './pages/PositiveEntry'
import PositiveViewEdit from './pages/PositiveViewEdit'
import PositiveReadOnly from './pages/PositiveReadOnly'
import NegativeReadOnly from './pages/NegativeReadOnly'

const drawerWidth = 240

const navItems = [
  { path: '/', label: '🏠 Home' },
  { path: '/positive-entry', label: '🛡️ Stroy Reporting' },
  { path: '/positive-view', label: '📗 Story Log' },
  { path: '/negative-entry', label: '🛑 Incidence Reporting' },
  { path: '/negative-view', label: '📕 Incidence Log' }
]

export default function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [role, setRole] = useState(() => sessionStorage.getItem('role') || 'viewer')
  const location = useLocation()

  // Allow switching roles only on log/home pages
  const allowRoleSwitch =
    location.pathname === '/' ||
    location.pathname === '/positive-view' ||
    location.pathname === '/negative-view'

    useEffect(() => {
      // Set default role if needed
      if (!sessionStorage.getItem('role')) {
        sessionStorage.setItem('role', 'viewer')
      }
    
      // Only seed data if none exists
      if (!sessionStorage.getItem('successStories')) {
        sessionStorage.setItem('successStories', JSON.stringify([
          {
            date: '2024-03-01',
            summary: 'Developed incident response plan',
            detailed_info: `
          After a formal gap assessment and audit of current security practices, a dedicated incident response working group was established. The team, comprising security engineers, legal advisors, IT operations, communications, and vendor management, developed a comprehensive Incident Response Plan (IRP) tailored to organizational needs and aligned with NIST SP 800-61 Revision 2 and ISO/IEC 27035 standards.
          
          The IRP includes:
          - Defined incident categories and severity levels
          - Trigger conditions for invoking the plan
          - Roles and responsibilities (RACI) across business units
          - Technical playbooks for containment, eradication, and recovery
          - Communication templates for internal, legal, and third-party disclosures
          - Integration with third-party vendors’ incident processes via contractual clauses and SLAs
          
          In parallel, a table-top exercise was conducted simulating a supply chain compromise, involving legal, SOC, DevOps, and the CISO. Lessons learned were documented and applied directly to improve decision flows and notification timing in the IRP.
          
          The final plan was approved by the board and integrated into the enterprise GRC system. It is reviewed quarterly and version-controlled using the organization’s internal policy lifecycle tooling. As of April 2024, it is embedded in vendor onboarding assessments to ensure alignment with third-party risk posture and compliance expectations (e.g., GDPR, HIPAA, and ISO 27001 controls).
            `.trim(),
            industry: 'Finance',
            category: 'Vendor Risk Management',
            visibility: 'private',
            sharedWith: [],
            owner: 'accountA'
          },
          {
            date: '2024-03-15',
            summary: 'Intrusion detection fine-tuning',
            detailed_info: `
          As part of an ongoing effort to improve SOC efficiency and reduce alert fatigue, our security engineering team undertook a major refinement of our IDS infrastructure in Q1 2024. The stack is built around Suricata 6.x as the inline network-based IDS, with event enrichment handled by Zeek (formerly Bro) and downstream correlation in our Elastic-based SIEM.
          
          Key improvements included:
          - Migrated Suricata rules to a modular layout using "threshold.config" and YAML-based rule tuning
          - Disabled >400 high-noise Emerging Threats (ET Open) signatures known for triggering on benign SaaS traffic (e.g., Slack, Dropbox, Office365)
          - Created custom signatures for Lateral Movement and Command-and-Control (C2) protocols using PCRE and protocol-specific inspection
          - Introduced host- and VLAN-specific suppressions using BPF filters to reduce low-risk internal noise
          - Leveraged Zeek scripting to fingerprint unexpected TLS certificate anomalies and file downloads
          - Correlated DNS, HTTP, and TLS logs with endpoint data to provide SOC with richer context
          
          The team also built a test harness using pcap replay (tcpreplay + Scapy) to simulate historical alerts and validate rule accuracy before deployment. All changes were versioned in Git and promoted via CI/CD into our Suricata Ansible roles.
          
          Post-deployment telemetry over 30 days showed:
          - 62% reduction in false positives
          - 45% faster SOC triage times for high-severity alerts
          - >95% match retention on verified attack simulations (via Atomic Red Team and in-house payloads)
          
          This work has been included in our internal IDS tuning playbook and shared with third-party MSSP partners for alignment.
            `.trim(),
            industry: 'Technology',
            category: 'Technical Achievement',
            visibility: 'private',
            sharedWith: [],
            owner: 'accountA'
          },
          {
            date: '2024-04-05',
            summary: 'Phishing simulation campaign',
            detailed_info: 'Simulated phishing emails led to a 45% decrease in real-world clicks.',
            industry: 'Education',
            category: 'Awareness Training',
            visibility: 'public',
            sharedWith: [],
            owner: 'accountB'
          },
          {
            date: '2024-04-12',
            summary: 'SOC upgraded with AI tooling',
            detailed_info: 'Integrated AI-based alert correlation platform into SOC workflow.',
            industry: 'Healthcare',
            category: 'Innovation in Security Tools',
            visibility: 'shared',
            sharedWith: ['accountC'],
            owner: 'accountB'
          },
          {
            date: '2024-04-20',
            summary: 'Backup systems tested successfully',
            detailed_info: 'Annual DR test passed with <5 min RTO.',
            industry: 'Finance',
            category: 'Resilience and Continuity',
            visibility: 'public',
            sharedWith: [],
            owner: 'accountC'
          },
          {
            date: '2024-04-25',
            summary: 'Security awareness posters launched',
            detailed_info: 'Internal campaign with physical + digital messaging.',
            industry: 'Retail',
            category: 'Employee Security Awareness',
            visibility: 'public',
            sharedWith: [],
            owner: 'accountC'
          },
          {
            date: '2024-04-30',
            summary: 'Zero-trust access adopted',
            detailed_info: 'Identity-based network segmentation introduced in HQ.',
            industry: 'Tech',
            category: 'Data Protection',
            visibility: 'shared',
            sharedWith: ['accountA'],
            owner: 'accountB'
          },
          {
            date: '2024-05-01',
            summary: 'Threat intel feed integration',
            detailed_info: 'Linked 3 new sources to SIEM for correlation.',
            industry: 'Telecom',
            category: 'Threat Intelligence Utilization',
            visibility: 'public',
            sharedWith: [],
            owner: 'accountA'
          },
          {
            date: '2024-05-02',
            summary: 'API abuse detected and stopped',
            detailed_info: 'Rate limiting + GeoIP blocks used to stop credential stuffing.',
            industry: 'E-commerce',
            category: 'Incident Response Success',
            visibility: 'private',
            sharedWith: [],
            owner: 'accountC'
          },
          {
            date: '2024-05-03',
            summary: 'Policy refresh completed',
            detailed_info: 'Security policies were reviewed, updated, and re-communicated.',
            industry: 'Legal',
            category: 'Management',
            visibility: 'public',
            sharedWith: [],
            owner: 'viewer'
          }
        ]))
      }
    
      if (!sessionStorage.getItem('incidents')) {
        sessionStorage.setItem('incidents', JSON.stringify([
          {
            status: 'Confirmed',
            summary: 'Unauthorized access to test server',
            incidentOccurred: '2024-04-10T09:30',
            visibility: 'public',
            sharedWith: [],
            owner: 'accountA'
          },
          {
            status: 'Suspected',
            summary: 'Credential stuffing attempt on customer portal',
            incidentOccurred: '2024-03-28T18:00',
            visibility: 'public',
            sharedWith: [],
            owner: 'accountB'
          },
          {
            status: 'Confirmed',
            summary: 'Lost laptop with encrypted data',
            incidentOccurred: '2024-04-20T15:45',
            visibility: 'shared',
            sharedWith: ['accountC'],
            owner: 'accountA'
          },
          {
            status: 'Near Miss',
            summary: 'Misconfigured firewall exposed dev system',
            incidentOccurred: '2024-03-10T11:00',
            visibility: 'shared',
            sharedWith: ['accountB'],
            owner: 'accountC'
          },
          {
            status: 'False Positive',
            summary: 'DDoS protection triggered by legitimate spike',
            incidentOccurred: '2024-04-03T02:00',
            visibility: 'public',
            sharedWith: [],
            owner: 'viewer'
          },
          {
            status: 'Confirmed',
            summary: 'Phishing email led to credential compromise',
            incidentOccurred: '2024-04-15T08:10',
            visibility: 'private',
            sharedWith: [],
            owner: 'accountB'
          },
          {
            status: 'Suspected',
            summary: 'VPN used from multiple countries',
            incidentOccurred: '2024-04-08T04:50',
            visibility: 'private',
            sharedWith: [],
            owner: 'accountC'
          },
          {
            status: 'Near Miss',
            summary: 'S3 bucket briefly exposed with no access logged',
            incidentOccurred: '2024-03-22T13:20',
            visibility: 'shared',
            sharedWith: ['accountA'],
            owner: 'accountC'
          },
          {
            status: 'Confirmed',
            summary: 'SQL injection discovered via pentest',
            incidentOccurred: '2024-05-01T12:00',
            visibility: 'public',
            sharedWith: [],
            owner: 'accountA'
          },
          {
            status: 'Confirmed',
            summary: 'Rogue device detected on internal network',
            incidentOccurred: '2024-05-02T06:00',
            visibility: 'shared',
            sharedWith: ['accountB', 'accountC'],
            owner: 'accountA'
          }
        ]))
      }
    }, [])
    

  useEffect(() => {
    sessionStorage.setItem('role', role)
    window.dispatchEvent(new Event('storage'))
  }, [role])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawerContent = (
    <Box>
      {allowRoleSwitch && (
        <Box sx={{ p: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>User Role</InputLabel>
            <Select value={role} label="User Role" onChange={(e) => setRole(e.target.value)}>
              <MenuItem value="accountA">Account A</MenuItem>
              <MenuItem value="accountB">Account B</MenuItem>
              <MenuItem value="accountC">Account C</MenuItem>
              <MenuItem value="viewer">Global Viewer</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      <Box sx={{ p: 2, pt: 0 }}>
        <Typography variant="h6" noWrap>Menu</Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={() => isMobile && setMobileOpen(false)}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ ml: 2 }}>
              Incident Reporting
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 3,
          pt: isMobile ? 8 : 4,
          ...(isMobile
            ? {}
            : {
                ml: `${drawerWidth}px`,
                maxWidth: `calc(100% - ${drawerWidth}px)`
              })
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/negative-entry" element={<NegativeEntry />} />
          <Route path="/edit/:index" element={<NegativeEntry />} />
          <Route path="/negative-view" element={<NegativeViewEdit />} />
          <Route path="/negative-view/:index" element={<NegativeReadOnly />} />
          <Route path="/positive-entry" element={<PositiveEntry />} />
          <Route path="/positive-edit/:index" element={<PositiveEntry />} />
          <Route path="/positive-view" element={<PositiveViewEdit />} />
          <Route path="/positive-view/:index" element={<PositiveReadOnly />} />
        </Routes>
      </Box>
    </Box>
  )
}
