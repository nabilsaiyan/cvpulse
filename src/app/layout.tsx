import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cvpulse.vercel.app'),
  title: {
    default: `${APP_NAME} — Know exactly why you're not getting interviews`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: ['CV analyzer', 'resume analyzer', 'ATS score', 'keyword gap', 'job application', 'AI'],
  openGraph: {
    title: `${APP_NAME} — AI-Powered CV Analyzer`,
    description: APP_DESCRIPTION,
    type: 'website',
    siteName: APP_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} — AI-Powered CV Analyzer`,
    description: APP_DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0c1424',
              color: '#f1f5f9',
              border: '1px solid rgba(59,130,246,0.2)',
              fontSize: '14px',
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#0c1424' },
            },
            success: {
              iconTheme: { primary: '#22c55e', secondary: '#0c1424' },
            },
          }}
        />
      </body>
    </html>
  )
}
