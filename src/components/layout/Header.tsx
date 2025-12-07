import { Bell, Search, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      {/* Search */}
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search leads, properties, conversations..."
            className="pl-10 border-slate-300 focus:border-primary"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative hover:bg-slate-100">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Button>
        
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-2 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-full premium-gradient text-white shadow-md">
            <User className="h-5 w-5" />
          </div>
          <div className="text-sm">
            <div className="font-semibold text-slate-900">Broker Admin</div>
            <div className="text-xs text-slate-500">admin@rentflow.in</div>
          </div>
        </div>
      </div>
    </header>
  )
}

