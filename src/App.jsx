import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Box, Drawer, List, ListItem, ListItemText, Typography, useMediaQuery, useTheme, IconButton, AppBar, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Home from './pages/Home'
import NegativeEntry from './pages/NegativeEntry'
import NegativeViewEdit from './pages/NegativeViewEdit'
import PositiveEntry from './pages/PositiveEntry'
import PositiveViewEdit from './pages/PositiveViewEdit'

const drawerWidth = 240

const navItems = [
  { path: '/', label: '🏠 Home' },
  { path: '/positive-entry', label: '🛡️ Event Reporting' },
  { path: '/negative-entry', label: '🛑 Incidence Reporting' },
  { path: '/positive-view', label: '📗 Event Log' },
  { path: '/negative-view', label: '📕 Incidence Log' }
]

export default function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawerContent = (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap>
          Menu
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.path}
            component={Link}
            to={item.path}
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
          p: { xs: 2, sm: 3 },
          ml: { xs: 0, sm: `${drawerWidth}px` },
          width: '100%',
          mt: isMobile ? 7 : 0
        }}
      >
        <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/negative-entry" element={<NegativeEntry />} />
            <Route path="/edit/:index" element={<NegativeEntry />} />
            <Route path="/negative-view" element={<NegativeViewEdit />} />
            <Route path="/positive-entry" element={<PositiveEntry />} />
            <Route path="/positive-edit/:index" element={<PositiveEntry />} />
            <Route path="/positive-view" element={<PositiveViewEdit />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  )
}
