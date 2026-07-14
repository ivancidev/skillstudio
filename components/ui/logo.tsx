import Link from 'next/link'

export const LogoMark = () => {
  return (
    <div className="w-9 h-9 bg-brand-slate rounded-[9px] grid grid-cols-2 gap-1 p-2 shrink-0 select-none">
      <div className="w-2.5 h-2.5 bg-brand-indigo rounded-[2px]" />
      <div className="w-2.5 h-2.5 bg-slate-600/40 rounded-[2px]" />
      <div className="w-2.5 h-2.5 bg-slate-600/40 rounded-[2px]" />
      <div className="w-2.5 h-2.5 bg-brand-indigo rounded-[2px]" />
    </div>
  )
}

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <LogoMark />
      <span className="font-display font-bold text-[20px] tracking-tight select-none">
        <span className="text-brand-slate">skill</span>
        <span className="text-brand-indigo">studio</span>
      </span>
    </Link>
  )
}
