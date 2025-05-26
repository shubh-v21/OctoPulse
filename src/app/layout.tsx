import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'OctoPulse',
  description: "Analyze any GitHub developer's profile with OctoPulse — a developer metrics platform that evaluates contributions, repositories, activity, and impact using the GitHub GraphQL API. Ideal for recruiters, developers, and tech teams.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#8b5cf6',
          colorBackground: '#111827',
          colorInputBackground: '#1f2937',
          colorInputText: '#f9fafb',
          colorText: '#f9fafb',
          colorTextSecondary: '#9ca3af',
          colorTextOnPrimaryBackground: '#ffffff',
          colorNeutral: '#374151',
          colorDanger: '#ef4444',
          colorSuccess: '#10b981',
          colorWarning: '#f59e0b',
          borderRadius: '0.75rem',
          fontFamily: 'var(--font-geist-sans)',
        },
        elements: {
          modalContent: {
            backgroundColor: '#111827',
            border: '1px solid #374151',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(139, 92, 246, 0.1)',
            backdropFilter: 'blur(16px)',
          },
          modalCloseButton: {
            color: '#9ca3af',
            '&:hover': {
              color: '#f9fafb',
            },
          },
          headerTitle: {
            color: '#f9fafb',
            fontSize: '1.5rem',
            fontWeight: '600',
          },
          headerSubtitle: {
            color: '#9ca3af',
          },
          socialButtonsBlockButton: {
            backgroundColor: 'transparent',
            border: '1px solid #374151',
            color: '#f9fafb',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            '&:hover': {
              backgroundColor: '#1f2937',
              borderColor: '#8b5cf6',
            },
            '&:focus': {
              borderColor: '#8b5cf6',
              boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.2)',
            },
          },
          socialButtonsBlockButtonText: {
            color: '#f9fafb',
            fontWeight: '500',
          },
          dividerLine: {
            backgroundColor: '#374151',
          },
          dividerText: {
            color: '#9ca3af',
          },
          formFieldLabel: {
            color: '#f9fafb',
            fontWeight: '500',
          },
          formFieldInput: {
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            color: '#f9fafb',
            borderRadius: '0.75rem',
            '&:focus': {
              borderColor: '#8b5cf6',
              boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.2)',
            },
          },
          formButtonPrimary: {
            backgroundColor: '#8b5cf6',
            border: 'none',
            borderRadius: '0.75rem',
            padding: '0.75rem 1.5rem',
            fontWeight: '600',
            '&:hover': {
              backgroundColor: '#7c3aed',
              transform: 'translateY(-1px)',
            },
            '&:focus': {
              boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.4)',
            },
          },
          footerActionText: {
            color: '#9ca3af',
          },
          footerActionLink: {
            color: '#8b5cf6',
            fontWeight: '500',
            '&:hover': {
              color: '#a855f7',
            },
          },
          card: {
            backgroundColor: '#111827',
            border: '1px solid #374151',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          },
          navbar: {
            backgroundColor: '#111827',
            borderBottom: '1px solid #374151',
          },
          navbarButton: {
            color: '#9ca3af',
            '&:hover': {
              color: '#f9fafb',
              backgroundColor: '#1f2937',
            },
          },
          profileSectionPrimaryButton: {
            backgroundColor: '#8b5cf6',
            color: '#ffffff',
            borderRadius: '0.75rem',
            '&:hover': {
              backgroundColor: '#7c3aed',
            },
          },
          badge: {
            backgroundColor: '#8b5cf6',
            color: '#ffffff',
          },
          // Enhanced user button popover styling
          userButtonPopoverCard: {
            backgroundColor: '#111827',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '1rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(139, 92, 246, 0.2)',
            backdropFilter: 'blur(16px)',
            padding: '0.5rem',
          },
          userButtonPopoverActionButton: {
            borderRadius: '0.5rem',
            margin: '0.25rem 0',
            padding: '0.5rem 0.75rem',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              transform: 'translateX(4px)',
            },
          },
          userButtonPopoverActionButtonIcon: {
            color: 'rgba(139, 92, 246, 0.8)',
          },
          userButtonPopoverActionButtonText: {
            fontWeight: '500',
          },
          userButtonPopoverFooter: {
            display: 'none',
          },
          userPreviewMainIdentifier: {
            fontWeight: '600',
            color: '#f9fafb',
          },
          userPreviewSecondaryIdentifier: {
            color: 'rgba(139, 92, 246, 0.8)',
          },
          userButtonAvatarBox: {
            width: '2rem',
            height: '2rem',
            borderRadius: '0.5rem',
          },
        },
      }}
    >
      <html lang="en" className="dark">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-950 via-gray-900 to-black min-h-screen`}>
          {/* Animated background elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-4 -right-4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl"></div>
          </div>
          
          <header className="relative z-10 flex justify-between items-center p-6 h-20 backdrop-blur-xl bg-gray-900/30 border-b border-gray-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-md overflow-hidden">
                <img 
                  src="/OctoPulse_Final.png" 
                  alt="OctoPulse Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl tracking-widest uppercase font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent" style={{ letterSpacing: '0.15em' }}>
                OCTOPULSE
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                    Sign In with GitHub
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 ring-2 ring-purple-500/20 hover:ring-purple-500/50 transition-all duration-200",
                      userButtonBox: "hover:scale-105 transition-transform duration-200",
                      userButtonTrigger: "hover:opacity-90 focus:shadow-purple-500/20 focus:shadow-lg",
                      userButtonPopoverCard: "bg-gray-900/95 border border-purple-500/30 shadow-xl backdrop-blur-xl",
                      userButtonPopoverActionButton: "hover:bg-purple-500/10 hover:translate-x-1 transition-all duration-200 text-gray-300 hover:text-white my-1 rounded-md",
                      userButtonPopoverActionButtonText: "text-gray-300 font-medium",
                      userPreviewMainIdentifier: "text-white font-semibold",
                      userPreviewSecondaryIdentifier: "text-purple-400",
                    }
                  }}
                />
              </SignedIn>
            </div>
          </header>
          
          <main className="relative z-10">
            {children}
          </main>
          
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}