'use client'

import { Logo } from '@/components/ui/logo'
import { LayoutDashboard, Plus, Settings, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const Sidebar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Generate',
      href: '/generate',
      icon: Plus,
    },
  ]

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200/50 flex items-center justify-between px-6 z-30">
        <Logo />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-20 flex flex-col p-6 border-b border-slate-200/50 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={twMerge(
                    "flex items-center gap-3 px-4 py-3 rounded-lg font-display text-[15px] font-medium transition-colors cursor-pointer",
                    isActive 
                      ? "bg-brand-indigo/10 text-brand-indigo" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon className={twMerge("w-4 h-4", isActive ? "text-brand-indigo" : "text-slate-400")} />
                  {link.name}
                </Link>
              )
            })}
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className={twMerge(
                "flex items-center gap-3 px-4 py-3 rounded-lg font-display text-[15px] font-medium transition-colors cursor-pointer mt-4 border-t border-slate-100 pt-4",
                pathname === '/settings'
                  ? "bg-brand-indigo/10 text-brand-indigo" 
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <Settings className="w-4 h-4 text-slate-400" />
              Settings
            </Link>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/50 p-6">
        <div className="mb-10">
          <Logo />
        </div>

        <nav className="flex-1 flex flex-col gap-1.5">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={twMerge(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-display text-[15px] font-medium transition-colors cursor-pointer",
                  isActive 
                    ? "bg-brand-indigo/10 text-brand-indigo" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className={twMerge("w-4 h-4", isActive ? "text-brand-indigo" : "text-slate-400")} />
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto space-y-4">
          <Link
            href="/settings"
            className={twMerge(
              "flex items-center gap-3 px-4 py-3 rounded-lg font-display text-[15px] font-medium transition-colors cursor-pointer",
              pathname === '/settings'
                ? "bg-brand-indigo/10 text-brand-indigo" 
                : "text-slate-650 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            Settings
          </Link>

          {/* User profile / Sync Widget */}
          <div className="border-t border-slate-200/50 pt-4 space-y-3">
            {/* Sync status */}
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 rounded-lg px-3 py-2 select-none">
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Local Sandbox</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-450" />
                <span className="font-mono text-[9px] text-slate-500 uppercase font-bold">Offline</span>
              </div>
            </div>

            {/* Profile Detail */}
            <div className="flex items-center gap-3 px-2 py-1 select-none">
              {/* Fake Avatar */}
              <div className="w-8.5 h-8.5 rounded-full bg-brand-slate flex items-center justify-center text-[#F8FAFC] font-display font-semibold text-[13px] border border-slate-700 shrink-0">
                ID
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-display font-semibold text-slate-800 truncate">Ivan Dev</div>
                <div className="text-[10px] font-mono text-slate-450 truncate">demo_account</div>
              </div>
            </div>

            {/* Sign in prompt button */}
            <Button
              variant="secondary"
              className="w-full text-[10px] py-2 px-3 font-mono uppercase tracking-wider font-bold hover:border-brand-indigo/35 hover:text-brand-indigo transition-all cursor-pointer"
            >
              Sign In to Sync
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
