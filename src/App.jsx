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

  const isEditPage = /^\/(positive-)?edit\/\d+$/.test(location.pathname)

  useEffect(() => {
    if (!sessionStorage.getItem('role')) {
      sessionStorage.setItem('role', 'viewer')
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
      {/* Role Switcher (hidden on edit pages) */}
      {!isEditPage && (
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
      {/* Top AppBar for mobile */}
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

      {/* Sidebar */}
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

      {/* Main content */}
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
          <Route path="/positive-entry" element={<PositiveEntry />} />
          <Route path="/positive-edit/:index" element={<PositiveEntry />} />
          <Route path="/positive-view" element={<PositiveViewEdit />} />
          <Route path="/positive-view/:index" element={<PositiveReadOnly />} />
          <Route path="/negative-view/:index" element={<NegativeReadOnly />} />
        </Routes>
      </Box>
    </Box>
  )
}
