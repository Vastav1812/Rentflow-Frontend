import { Bell, Search, User, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-3 sm:px-4 md:px-6 shadow-sm">
      {/* Mobile menu + Search */}
      <div className="flex flex-1 items-center gap-2 sm:gap-4">
        {/* Hamburger menu for mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 border-slate-300 focus:border-primary text-sm"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 hidden sm:flex">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Button>
        
        {/* Desktop user menu */}
        <div className="hidden sm:flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
          <div className="flex h-8 w-8 items-center justify-center rounded-full premium-gradient text-white shadow-md">
            <User className="h-4 w-4" />
          </div>
          <div className="text-sm hidden md:block">
            <div className="font-semibold text-slate-900">Broker Admin</div>
            <div className="text-xs text-slate-500">admin@rentflow.in</div>
          </div>
        </div>

        {/* Mobile user icon only */}
        <div className="flex sm:hidden h-9 w-9 items-center justify-center rounded-full premium-gradient text-white shadow-md">
          <User className="h-5 w-5" />
        </div>
      </div>
    </header>
  )
}

