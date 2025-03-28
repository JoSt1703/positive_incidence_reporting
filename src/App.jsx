import { Routes, Route, Link } from 'react-router-dom'
import { Box, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material'
import Home from './pages/Home'
import NegativeEntry from './pages/NegativeEntry'
import NegativeViewEdit from './pages/NegativeViewEdit'

const drawerWidth = 240
const adjustedMargin = drawerWidth - 150

const navItems = [
  { path: '/', label: '🏠 Home' },
  { path: '/positive-entry', label: '🛡️ Event Reporting' },
  { path: '/negative-entry', label: '🛑 Incidence Reporting' },
  { path: '/positive-view', label: '📗 Event Log' },
  { path: '/negative-view', label: '📕 Incidence Log' }
]

export default function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
        }}
      >
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
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${adjustedMargin}px`,
          display: 'flex',
          justifyContent: 'flex-start'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 800 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/negative-entry" element={<NegativeEntry />} />
            <Route path="/negative-view" element={<NegativeViewEdit />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  )
}
