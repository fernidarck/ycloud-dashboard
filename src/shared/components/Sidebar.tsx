'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageSquare, Calendar, FileText } from 'lucide-react'

const nav = [
  { href: '/chats', label: 'Chats', icon: MessageSquare },
  { href: '/calendario', label: 'Calendario', icon: Calendar },
  { href: '/prompts', label: 'System Prompts', icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col shrink-0">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-lg font-bold">YCloud Dashboard</h1>
        <p className="text-xs text-gray-400">OneControl Guatemala</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              pathname.startsWith(href) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}>
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
