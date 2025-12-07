import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Dashboard } from '@/pages/Dashboard'
import { Leads } from '@/pages/Leads'
import { Conversations } from '@/pages/Conversations'
import { Properties } from '@/pages/Properties'
import { Reviews } from '@/pages/Reviews'
import { Toaster } from '@/components/ui/toaster'

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/conversations" element={<Conversations />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </DashboardLayout>
      <Toaster />
    </Router>
  )
}

export default App

