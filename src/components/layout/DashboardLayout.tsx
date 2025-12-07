import { ReactNode, useState, useCallback } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleOpenSidebar = useCallback(() => {
    console.log('Opening sidebar')
    setSidebarOpen(true)
  }, [])

  const handleCloseSidebar = useCallback(() => {
    console.log('Closing sidebar')
    setSidebarOpen(false)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={handleOpenSidebar} />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-3 sm:p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

