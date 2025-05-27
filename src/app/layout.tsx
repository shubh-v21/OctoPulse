import { type Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import SessionProvider from '@/components/SessionProvider'
import { getAuthSession } from '@/lib/auth'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'OctoSpark',
  description: "Analyze any GitHub developer's profile with OctoSpark — a developer metrics platform that evaluates contributions, repositories, activity, and impact using the GitHub GraphQL API. Ideal for recruiters, developers, and tech teams.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getAuthSession()

  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-950 via-gray-900 to-black min-h-screen`}>
        <SessionProvider session={session}>
          {/* Animated background elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-4 -right-4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl"></div>
          </div>
          
          <main className="relative z-10">
            {children}
          </main>
          
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}