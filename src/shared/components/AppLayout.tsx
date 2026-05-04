import { Sidebar } from './Sidebar'

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-slate-900">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">{children}</main>
    </div>
  )
}
