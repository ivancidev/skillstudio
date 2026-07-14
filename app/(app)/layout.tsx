import { Sidebar } from '@/components/dashboard/sidebar'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-slate">
      <Sidebar />
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen pt-16 lg:pt-0">
        {children}
      </div>
    </div>
  )
}
