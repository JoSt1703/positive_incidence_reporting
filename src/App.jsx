import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import PositiveEntry from './pages/PositiveEntry'
import NegativeEntry from './pages/NegativeEntry'
import PositiveViewEdit from './pages/PositiveViewEdit'
import NegativeViewEdit from './pages/NegativeViewEdit'

export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <nav style={{ marginBottom: '2rem' }}>
        <Link to="/">Home</Link> |{' '}
        <Link to="/positive-entry">Positive Entry</Link> |{' '}
        <Link to="/negative-entry">Negative Entry</Link> |{' '}
        <Link to="/positive-view">View Positive</Link> |{' '}
        <Link to="/negative-view">View Negative</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/positive-entry" element={<PositiveEntry />} />
        <Route path="/negative-entry" element={<NegativeEntry />} />
        <Route path="/positive-view" element={<PositiveViewEdit />} />
        <Route path="/negative-view" element={<NegativeViewEdit />} />
      </Routes>
    </div>
  )
}
