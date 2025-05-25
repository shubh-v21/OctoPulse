"use client"

import GitHubScoreCalculator from "@/components/GitHubScoreCalculator"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser()
  const [targetUsername, setTargetUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [responseData, setResponseData] = useState<any>(null)

  const fetchUserData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/api/get-user-data?targetUsername=${targetUsername}`)
      if (response.status === 200) {
        console.log("User data:", response.data)
        setResponseData(response.data)
      }
    } catch (err) {
      console.error("Error fetching user data:", err)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>
  }

  if (!isSignedIn) {
    return <div className="flex items-center justify-center h-screen text-xl">Sign in to view this page</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Top 5 Repos */}
      {/* <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Hello, {user.firstName} 👋</h1>

        <input
          type="text"
          placeholder="Enter GitHub username"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setTargetUsername(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 disabled:opacity-50"
          onClick={fetchUserData}
          disabled={loading || !targetUsername}
        >
          {loading ? "Fetching..." : "Fetch Stats"}
        </button>

        {responseData && (
          <div className="text-sm text-gray-700">
            <pre className="bg-gray-100 p-4 rounded-xl overflow-auto max-h-64">{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        )}
      </div> */}
      {/* GitHub Score Calculator */}
      <GitHubScoreCalculator/>
    </div>
  )
}
