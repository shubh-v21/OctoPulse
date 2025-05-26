"use client"

import GitHubScoreCalculator from "@/components/GitHubScoreCalculator"
import { useUser, SignInButton } from "@clerk/nextjs"
import { Loader2, Github, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser()
  const [username, setUsername] = useState("")

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
      <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-12">
        <div className="text-center space-y-4 max-w-2xl">
          <div className="flex justify-center">
            <div className="w-28 h-28 rounded-full shadow-xl overflow-hidden bg-gray-900/50 p-1">
              <img 
                src="/OctoSpark_Final.png" 
                alt="OctoSpark Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-wider uppercase bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            OCTOSPARK
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Monitor the pulse of GitHub developers with our advanced metrics platform.
          </p>
        </div>
        
        {/* Search Input - Visible to non-logged in users */}
        <Card className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
          <CardContent className="pt-6 pb-6">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 bg-gray-800/50 border-gray-600 text-white"
              />
              <SignInButton mode="modal">
                <Button 
                  className="h-12 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  disabled={!username.trim()}
                >
                  <Github className="w-5 h-5" />
                </Button>
              </SignInButton>
            </div>
          </CardContent>
        </Card>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          <FeatureCard 
            title="Real-time Analysis" 
            description="Get instant insights into any GitHub developer's activity and contributions." 
            icon={<Zap className="w-6 h-6 text-purple-400" />}
          />
          <FeatureCard 
            title="Comprehensive Metrics" 
            description="Evaluate repository quality, community engagement, and technical diversity." 
            icon={<Github className="w-6 h-6 text-purple-400" />}
          />
          <FeatureCard 
            title="Developer Pulse" 
            description="Monitor the heartbeat of coding activity with our proprietary scoring system." 
            icon={<Zap className="w-6 h-6 text-purple-400" />}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent">
      <GitHubScoreCalculator />
    </div>
  )
}

// Helper component for feature cards
function FeatureCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50 hover:border-purple-500/20 transition-all">
      <div className="p-3 bg-purple-500/10 rounded-lg w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}
