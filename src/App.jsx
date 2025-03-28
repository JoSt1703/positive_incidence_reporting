import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import PositiveEntry from './pages/PositiveEntry'
import NegativeEntry from './pages/NegativeEntry'
import PositiveViewEdit from './pages/PositiveViewEdit'
import NegativeViewEdit from './pages/NegativeViewEdit'

export default function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <nav style={{
        width: '220px',
        background: '#f0f0f0',
        padding: '2rem 1rem',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>My Journal</h2>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/positive-entry">🛡️ Positive Event Reporting</Link></li>
          <li><Link to="/negative-entry">🛑 Negative Incidence Reporting</Link></li>
          <li><Link to="/positive-view">📗 Positive Event Log</Link></li>
          <li><Link to="/negative-view">📕 Negative Incidence Log</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/positive-entry" element={<PositiveEntry />} />
          <Route path="/negative-entry" element={<NegativeEntry />} />
          <Route path="/positive-view" element={<PositiveViewEdit />} />
          <Route path="/negative-view" element={<NegativeViewEdit />} />
        </Routes>
      </main>
    </div>
  )
}
