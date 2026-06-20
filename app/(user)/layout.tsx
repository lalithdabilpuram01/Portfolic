import { redirect } from 'next/navigation'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import Sidebar from '@/components/user-dashboard/Sidebar'
import AnnouncementBanner from '@/components/user-dashboard/AnnouncementBanner'
import BfcacheGuard from '@/components/BfcacheGuard'

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, status')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/login')
  if (profile.status === 'pending') redirect('/pending')
  if (profile.status === 'suspended') redirect('/login?error=suspended')

  const { data: settings } = await createServiceClient()
    .from('site_settings')
    .select('announcement_message, announcement_visible')
    .eq('id', 1)
    .single()

  const announcement =
    settings?.announcement_visible && settings.announcement_message?.trim()
      ? settings.announcement_message
      : null

  return (
    <div className="min-h-screen bg-[#050a14] flex">
      <BfcacheGuard />
      <Sidebar username={profile.username} />
      <main className="flex-1 min-w-0">
        {announcement && <AnnouncementBanner message={announcement} />}
        {children}
      </main>
    </div>
  )
}
