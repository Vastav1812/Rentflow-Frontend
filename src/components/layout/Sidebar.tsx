import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Building2,
  ClipboardCheck,
  PlayCircle,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { DemoModal } from '@/components/demo/DemoModal'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Conversations', href: '/conversations', icon: MessageSquare },
  { name: 'Properties', href: '/properties', icon: Building2 },
  { name: 'Review Queue', href: '/reviews', icon: ClipboardCheck },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()
  const [demoOpen, setDemoOpen] = useState(false)

  // Close sidebar on route change (mobile)
  useEffect(() => {
    onClose()
  }, [location.pathname, onClose])

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 shadow-premium-lg transition-transform duration-300 lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-700 px-4 sm:px-6 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">RentFlow</div>
              <div className="text-xs text-blue-300">Premium CRM</div>
            </div>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Demo Button */}
        <div className="border-t border-slate-700 p-4 bg-slate-900/30">
          <button
            onClick={() => setDemoOpen(true)}
            className="flex w-full items-center justify-center gap-3 rounded-lg gold-gradient px-4 py-3.5 text-sm font-bold text-slate-900 transition-all hover:scale-105 hover:shadow-xl shine-effect"
          >
            <PlayCircle className="h-5 w-5" />
            Launch Demo
          </button>
          <div className="mt-3 text-center text-xs text-slate-400">
            Impress your clients
          </div>
        </div>
      </div>

      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </>
  )
}

