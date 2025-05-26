"use client"

import GitHubScoreCalculator from "@/components/GitHubScoreCalculator"
import { useUser, SignInButton } from "@clerk/nextjs"
import { Loader2, Github, Zap, Activity } from "lucide-react"
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
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl mx-auto flex items-center justify-center shadow-2xl">
                <Activity className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Welcome to OctoSurf
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                Analyze GitHub profiles and discover developer insights with our comprehensive scoring system.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Github className="w-4 h-4 text-purple-400" />
                  <span>GitHub API</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span>Real-time Analysis</span>
                </div>
              </div>
              
              <SignInButton mode="modal">
                <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                  <Github className="w-5 h-5 mr-2" />
                  Sign In with GitHub
                </Button>
              </SignInButton>
              
              <p className="text-xs text-gray-500">
                Sign in to start analyzing GitHub profiles and get detailed developer insights.
              </p>
            </div>
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
