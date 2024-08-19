import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MobileRecharge from './views/pages/recharge/mobileRecharge'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MobileRecharge />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
