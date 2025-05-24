"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Github, Star, GitFork, Users, Code, Globe, Trophy } from "lucide-react";

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
  if (percentage >= 80) return "text-green-600";
  if (percentage >= 60) return "text-yellow-600";
  return "text-red-600";
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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">GitHub Score Calculator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Analyze any GitHub profile and get a comprehensive score based on contributions, 
          repository quality, community engagement, and more.
        </p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Enter GitHub Username</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="e.g., octocat"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && calculateScore()}
          />
          <Button 
            onClick={calculateScore} 
            disabled={loading || !username.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating Score...
              </>
            ) : (
              "Calculate Score"
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="max-w-md mx-auto border-red-200">
          <CardContent className="pt-6">
            <p className="text-red-600 text-center">{error}</p>
          </CardContent>
        </Card>
      )}

      {scoreData && (
        <div className="space-y-6">
          {/* Profile Overview */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={scoreData.profileData.avatarUrl} />
                  <AvatarFallback>{scoreData.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{scoreData.profileData.name || scoreData.username}</h2>
                  <p className="text-gray-600">@{scoreData.username}</p>
                  {scoreData.profileData.bio && (
                    <p className="text-gray-700 mt-2">{scoreData.profileData.bio}</p>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span>{scoreData.profileData.followers} followers</span>
                    <span>{scoreData.profileData.following} following</span>
                    {scoreData.profileData.location && (
                      <span>{scoreData.profileData.location}</span>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(scoreData.percentage)}`}>
                    {getScoreGrade(scoreData.percentage)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {scoreData.totalScore}/{scoreData.maxTotalScore} pts
                  </div>
                  <div className="text-lg font-semibold">
                    {scoreData.percentage}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle>Overall GitHub Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Score: {scoreData.totalScore} / {scoreData.maxTotalScore}</span>
                  <span>{scoreData.percentage}%</span>
                </div>
                <Progress value={scoreData.percentage} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scoreData.categories.map((category, index) => {
              const percentage = Math.round((category.score / category.maxScore) * 100);
              return (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      {categoryIcons[category.category as keyof typeof categoryIcons]}
                      <span>{category.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">{category.score}</span>
                      <span className="text-sm text-gray-600">/ {category.maxScore}</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="space-y-1">
                      {Object.entries(category.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="font-medium">
                            {Array.isArray(value) ? value.length : value?.toString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scoreData.categories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold">{category.category}</h4>
                    <div className="space-y-1 text-sm">
                      {Object.entries(category.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span>
                            {Array.isArray(value) ? (
                              <div className="flex flex-wrap gap-1">
                                {value.slice(0, 3).map((item, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {item}
                                  </Badge>
                                ))}
                                {value.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{value.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            ) : (
                              value?.toString()
                            )}
                          </span>
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
