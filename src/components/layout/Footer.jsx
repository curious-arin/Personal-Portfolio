import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-violet-300/[0.12] bg-[#060a12]/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
        <p className="flex flex-wrap items-center justify-center gap-1.5 text-center text-xs text-zinc-400">
          Made with <Heart size={13} className="text-violet-400" fill="currentColor" aria-label="love" /> by <span className="font-semibold text-zinc-200">Arin Sharma</span>
        </p>
      </div>
    </footer>
  )
}
