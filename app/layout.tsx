import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { APP_NAME } from '@/lib/config'

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Build and share your professional portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  )
}
