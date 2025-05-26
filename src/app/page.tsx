"use client"

import GitHubScoreCalculator from "@/components/GitHubScoreCalculator"
import { useUser, SignInButton } from "@clerk/nextjs"
import { Loader2, Github, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto" />
          <p className="text-xl text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <Card className="max-w-lg mx-auto bg-gray-900/50 backdrop-blur-xl border-gray-700/50 shadow-2xl">
          <CardContent className="text-center space-y-8 p-12">
            <div className="space-y-4">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto flex items-center justify-center shadow-xl">
                <Activity className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                OctoSurf Dashboard
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                Get comprehensive GitHub profile analytics with our advanced scoring system.
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="relative w-72 h-72">
                {/* Circular chart for login screen */}
                <svg width="100%" height="100%" viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="8" 
                    strokeDasharray={2 * Math.PI * 40} strokeDashoffset={(2 * Math.PI * 40) * 0.25} />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="url(#gradient)" strokeWidth="8" 
                    strokeDasharray={2 * Math.PI * 40} strokeDashoffset={(2 * Math.PI * 40) * 0.7} strokeLinecap="round" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-white">75%</span>
                  <span className="text-gray-400 text-sm mt-1">Average Score</span>
                </div>
              </div>
            </div>
            
            <SignInButton mode="modal">
              <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                <Github className="w-5 h-5 mr-2" />
                Sign In with GitHub
              </Button>
            </SignInButton>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent">
      <GitHubScoreCalculator />
    </div>
  )
}
