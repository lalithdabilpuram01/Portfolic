'use client'

import { useSyncExternalStore } from 'react'
import { Megaphone, X } from 'lucide-react'

// Per-message dismissal: a new announcement (different text) shows again even
// if the user dismissed the previous one.
function keyFor(message: string) {
  let hash = 0
  for (let i = 0; i < message.length; i++) {
    hash = (hash * 31 + message.charCodeAt(i)) | 0
  }
  return `announcement-dismissed:${hash}`
}

const DISMISS_EVENT = 'announcement-dismiss'

function subscribe(callback: () => void) {
  window.addEventListener(DISMISS_EVENT, callback)
  return () => window.removeEventListener(DISMISS_EVENT, callback)
}

export default function AnnouncementBanner({ message }: { message: string }) {
  const storageKey = keyFor(message)
  // useSyncExternalStore reads client-only state (localStorage) without a
  // hydration mismatch: it renders the server snapshot (hidden) first, then
  // syncs to the real value after hydration.
  const dismissed = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(storageKey) === '1',
    () => true,
  )

  if (dismissed) return null

  return (
    <div className="flex items-start gap-3 px-4 py-3 border-b border-indigo-500/20 bg-indigo-500/10">
      <Megaphone size={18} className="text-indigo-300 shrink-0 mt-0.5" />
      <p className="flex-1 text-sm text-indigo-100 whitespace-pre-wrap">{message}</p>
      <button
        onClick={() => {
          localStorage.setItem(storageKey, '1')
          window.dispatchEvent(new Event(DISMISS_EVENT))
        }}
        aria-label="Dismiss announcement"
        className="shrink-0 text-indigo-300/70 hover:text-indigo-100 transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  )
}
