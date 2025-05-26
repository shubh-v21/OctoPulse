"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Github, Star, GitFork, Users, Code, Globe, Trophy, Search, Zap, Activity } from "lucide-react";

interface ScoreData {
  username: string;
  totalScore: number;
  maxTotalScore: number;
  percentage: number;
  categories: Array<{
    category: string;
    score: number;
    maxScore: number;
    details: Record<string, any>;
  }>;
  profileData: {
    name: string;
    bio: string;
    location: string;
    avatarUrl: string;
    followers: number;
    following: number;
  };
}

const categoryIcons = {
  "Open Source Contributions": <Github className="w-5 h-5" />,
  "Repository Quality": <Star className="w-5 h-5" />,
  "Project Presentation": <Globe className="w-5 h-5" />,
  "Technical Diversity": <Code className="w-5 h-5" />,
  "Community Engagement": <Users className="w-5 h-5" />,
  "Profile Completeness": <Trophy className="w-5 h-5" />
};

const getScoreColor = (percentage: number) => {
  if (percentage >= 80) return "text-emerald-400";
  if (percentage >= 60) return "text-yellow-400";
  return "text-red-400";
};

const getScoreBgColor = (percentage: number) => {
  if (percentage >= 80) return "from-emerald-500/20 to-green-500/20";
  if (percentage >= 60) return "from-yellow-500/20 to-orange-500/20";
  return "from-red-500/20 to-pink-500/20";
};

const getScoreGrade = (percentage: number) => {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C+";
  if (percentage >= 40) return "C";
  return "D";
};

export default function GitHubScoreCalculator() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [error, setError] = useState("");

  const calculateScore = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setScoreData(null);

    try {
      const response = await fetch(`/api/calculate-score?targetUsername=${encodeURIComponent(username)}`);
      const result = await response.json();

      if (result.success) {
        setScoreData(result.data);
      } else {
        setError(result.message || "Failed to calculate score");
      }
    } catch (err) {
      setError("An error occurred while calculating the score");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 pb-0">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Activity className="w-12 h-12 text-purple-400 animate-pulse" />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
            GitHub Score Calculator
          </h1>
        </div>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Analyze any GitHub profile and get a comprehensive score based on contributions, 
          repository quality, community engagement, and more.
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Zap className="w-4 h-4" />
          <span>Powered by GitHub GraphQL API</span>
        </div>
      </div>

      {/* Search Card */}
      <Card className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-xl border-gray-700/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-white flex items-center justify-center space-x-2">
            <Search className="w-6 h-6 text-purple-400" />
            <span>Enter GitHub Username</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="e.g., octocat, torvalds, gaearon"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && calculateScore()}
              className="h-14 text-lg bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
            />
          </div>
          <Button 
            onClick={calculateScore} 
            disabled={loading || !username.trim()}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center space-x-3">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Analyzing Profile...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Activity className="h-6 w-6" />
                <span>Calculate Score</span>
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="max-w-2xl mx-auto bg-red-950/30 backdrop-blur-xl border-red-800/50 animate-in slide-in-from-top duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3 text-red-400">
              <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <span className="text-sm">!</span>
              </div>
              <p className="text-center">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {scoreData && (
        <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
          {/* Profile Overview */}
          <Card className={`bg-gradient-to-br ${getScoreBgColor(scoreData.percentage)} backdrop-blur-xl border-gray-700/50 shadow-2xl`}>
            <CardContent className="pt-8">
              <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="relative">
                  <Avatar className="w-32 h-32 ring-4 ring-gray-700/50">
                    <AvatarImage src={scoreData.profileData.avatarUrl} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                      {scoreData.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-gray-900 rounded-full p-2">
                    <Github className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                
                <div className="flex-1 text-center lg:text-left space-y-3">
                  <h2 className="text-4xl font-bold text-white">
                    {scoreData.profileData.name || scoreData.username}
                  </h2>
                  <p className="text-xl text-gray-400">@{scoreData.username}</p>
                  {scoreData.profileData.bio && (
                    <p className="text-gray-300 text-lg max-w-2xl">{scoreData.profileData.bio}</p>
                  )}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-purple-400" />
                      <span className="font-medium">{scoreData.profileData.followers}</span>
                      <span className="text-gray-400">followers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GitFork className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">{scoreData.profileData.following}</span>
                      <span className="text-gray-400">following</span>
                    </div>
                    {scoreData.profileData.location && (
                      <div className="flex items-center space-x-2">
                        <Globe className="w-5 h-5 text-emerald-400" />
                        <span>{scoreData.profileData.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-center bg-gray-900/50 rounded-2xl p-6 backdrop-blur-sm">
                  <div className={`text-6xl font-bold ${getScoreColor(scoreData.percentage)} mb-2`}>
                    {getScoreGrade(scoreData.percentage)}
                  </div>
                  <div className="text-gray-400 text-sm mb-1">
                    {scoreData.totalScore}/{scoreData.maxTotalScore} pts
                  </div>
                  <div className="text-2xl font-semibold text-white">
                    {scoreData.percentage}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overall Score */}
          <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span>Overall GitHub Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-lg text-gray-300">
                  <span>Score: {scoreData.totalScore} / {scoreData.maxTotalScore}</span>
                  <span className="font-semibold">{scoreData.percentage}%</span>
                </div>
                <div className="relative">
                  <Progress value={scoreData.percentage} className="h-4 bg-gray-800" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scoreData.categories.map((category, index) => {
              const percentage = Math.round((category.score / category.maxScore) * 100);
              return (
                <Card key={index} className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3 text-lg text-white group-hover:text-purple-400 transition-colors">
                      <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                        {categoryIcons[category.category as keyof typeof categoryIcons]}
                      </div>
                      <span>{category.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-white">{category.score}</span>
                      <span className="text-lg text-gray-400">/ {category.maxScore}</span>
                    </div>
                    <div className="relative">
                      <Progress value={percentage} className="h-3 bg-gray-800" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed Insights */}
          <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white flex items-center space-x-2">
                <Code className="w-6 h-6 text-blue-400" />
                <span>Detailed Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {scoreData.categories.map((category, index) => (
                  <div key={index} className="space-y-4 p-4 bg-gray-800/30 rounded-xl">
                    <h4 className="font-semibold text-lg text-white flex items-center space-x-2">
                      {categoryIcons[category.category as keyof typeof categoryIcons]}
                      <span>{category.category}</span>
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(category.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-start">
                          <span className="text-gray-400 capitalize text-sm">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <div className="text-right">
                            {Array.isArray(value) ? (
                              <div className="flex flex-wrap gap-1 justify-end max-w-xs">
                                {value.slice(0, 3).map((item, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs bg-gray-700/50 text-gray-300 border-gray-600">
                                    {item}
                                  </Badge>
                                ))}
                                {value.length > 3 && (
                                  <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                                    +{value.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-300 font-medium">{value?.toString()}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
