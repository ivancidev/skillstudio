'use client'

import { Logo } from '@/components/ui/logo'
import { LayoutDashboard, Plus, Settings, Menu, X } from 'lucide-react'
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

        <div className="mt-auto">
          <Link
            href="/settings"
            className={twMerge(
              "flex items-center gap-3 px-4 py-3 rounded-lg font-display text-[15px] font-medium transition-colors cursor-pointer",
              pathname === '/settings'
                ? "bg-brand-indigo/10 text-brand-indigo" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            Settings
          </Link>
        </div>
      </aside>
    </>
  )
}
