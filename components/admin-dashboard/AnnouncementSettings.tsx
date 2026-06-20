'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Megaphone } from 'lucide-react'
import type { SiteSettings } from '@/types/portfolio'
import Toggle from '@/components/user-dashboard/Toggle'

export default function AnnouncementSettings({ initial }: { initial: SiteSettings | null }) {
  const [message, setMessage] = useState(initial?.announcement_message ?? '')
  const [visible, setVisible] = useState(initial?.announcement_visible ?? false)
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)
    const res = await fetch('/api/admin/announcement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ announcement_message: message, announcement_visible: visible }),
    })
    setSaving(false)
    if (!res.ok) {
      toast.error('Failed to save')
      return
    }
    toast.success('Announcement updated')
  }

  return (
    <section className="rounded-2xl p-6 border border-white/5" style={{ background: 'rgba(15,23,42,0.5)' }}>
      <div className="flex items-center gap-2 mb-1">
        <Megaphone size={18} className="text-indigo-400" />
        <h2 className="text-lg font-semibold text-white">Announcement banner</h2>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Broadcast a message to every user&apos;s dashboard. Toggle visibility to show or hide it without losing the text.
      </p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. Scheduled maintenance this Saturday from 2–4pm UTC."
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm resize-none"
          />
        </div>

        <div className="flex items-center justify-between py-1">
          <div>
            <div className="font-medium text-white text-sm">Show on dashboards</div>
            <div className="text-sm text-slate-500">When on, all users see the banner above their dashboard.</div>
          </div>
          <Toggle checked={visible} onChange={setVisible} label="Toggle announcement visibility" />
        </div>

        {message.trim() && (
          <div>
            <div className="text-xs font-medium text-slate-500 mb-2">Preview</div>
            <div className="flex items-start gap-3 rounded-xl px-4 py-3 border border-indigo-500/30 bg-indigo-500/10">
              <Megaphone size={18} className="text-indigo-300 shrink-0 mt-0.5" />
              <p className="text-sm text-indigo-100 whitespace-pre-wrap">{message}</p>
            </div>
          </div>
        )}

        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60 transition-all"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          {saving ? 'Saving…' : 'Save announcement'}
        </button>
      </div>
    </section>
  )
}
