'use client'

import { useEffect } from 'react'

/**
 * When a page is restored from the browser's back-forward cache (e.g. the user
 * logs out then presses "back"), the rendered HTML is shown without re-running
 * the server-side auth check. Listening for `pageshow` with `event.persisted`
 * lets us detect that restore and force a reload, which re-runs the auth check
 * and redirects unauthenticated users to /login.
 */
export default function BfcacheGuard() {
  useEffect(() => {
    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        window.location.reload()
      }
    }
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  return null
}
