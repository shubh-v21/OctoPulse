"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Loader2,
  Github,
  Star,
  GitFork,
  Users,
  Code,
  Globe,
  Trophy,
  Search,
  ArrowRight,
  Info,
  PieChart,
  ChevronRight,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

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
  "Profile Completeness": <Trophy className="w-5 h-5" />,
};

const getScoreColor = (percentage: number) => {
  if (percentage >= 80) return "text-emerald-400";
  if (percentage >= 60) return "text-yellow-400";
  return "text-red-400";
};

const getScoreBgColor = (percentage: number) => {
  if (percentage >= 80) return "#10b981";
  if (percentage >= 60) return "#f59e0b";
  return "#ef4444";
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

// Circle Progress component
const CircleProgress = ({
  percentage,
  size = 160,
  strokeWidth = 8,
  label,
  color,
  children,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
  children?: React.ReactNode;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color || "currentColor"}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children ? (
          children
        ) : (
          <>
            <span className="text-3xl font-bold">{percentage}%</span>
            {label && (
              <span className="text-xs text-gray-400 mt-1">{label}</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default function GitHubScoreCalculator() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<{
    category: string;
    score: number;
    maxScore: number;
    details: Record<string, any>;
  } | null>(null);

  const calculateScore = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setScoreData(null);

    try {
      const response = await fetch(
        `/api/calculate-score?targetUsername=${encodeURIComponent(username)}`
      );
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
    <div className="max-w-[1400px] mx-auto p-4 md:p-6 space-y-6 pb-16">
      {/* Search Section */}
      {!scoreData && !loading && (
        <div className="flex flex-col items-center justify-center py-16 space-y-8">
          <div className="text-center space-y-4 max-w-2xl">
            <div className="flex justify-center mb-2">
              <div className="w-20 h-20 overflow-hidden">
                <img
                  src="/OctoPulse_Final.png"
                  alt="OctoPulse Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-wider uppercase bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              OCTOPULSE
            </h1>
            <p className="text-lg text-gray-400">
              Enter a GitHub username to analyze their developer pulse and
              generate a detailed metrics report.
            </p>
          </div>

          <Card className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
            <CardContent className="pt-6">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter GitHub username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && calculateScore()}
                  className="h-12 bg-gray-800/50 border-gray-600 text-white"
                />
                <Button
                  onClick={calculateScore}
                  disabled={loading || !username.trim()}
                  className="h-12 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-700 rounded-full animate-ping absolute"></div>
            <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-lg text-gray-300">
            Analyzing @{username}'s profile...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="max-w-md mx-auto bg-gray-900/50 backdrop-blur-xl border-red-800/20">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3 text-red-400">
              <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <span className="text-sm">!</span>
              </div>
              <p>{error}</p>
            </div>
            <Button
              className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white"
              onClick={() => setError("")}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Results Dashboard */}
      {scoreData && (
        <div className="animate-in slide-in-from-bottom duration-500 space-y-6">
          {/* Header with New Analysis Button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => {
                setScoreData(null);
                setUsername("");
              }}
            >
              New Analysis
            </Button>
          </div>

          {/* Profile and Score Section - Horizontal Layout */}
          <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Profile Information */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20 ring-4 ring-purple-500/20">
                      <AvatarImage src={scoreData.profileData.avatarUrl} />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                        {scoreData.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {scoreData.profileData.name || scoreData.username}
                      </h2>
                      <div className="flex items-center space-x-3 text-gray-400">
                        <span>@{scoreData.username}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-gray-400">
                          <Users className="w-4 h-4 mr-1" />
                          <span>
                            {scoreData.profileData.followers} followers
                          </span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <GitFork className="w-4 h-4 mr-1" />
                          <span>
                            {scoreData.profileData.following} following
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {scoreData.profileData.bio && (
                    <div className="bg-gray-800/30 p-4 rounded-lg">
                      <p className="text-gray-300 text-sm">
                        {scoreData.profileData.bio}
                      </p>
                    </div>
                  )}

                  {scoreData.profileData.location && (
                    <div className="flex items-center text-gray-400">
                      <Globe className="w-4 h-4 mr-2" />
                      <span>{scoreData.profileData.location}</span>
                    </div>
                  )}
                </div>

                {/* Vertical Divider for Desktop */}
                <div className="hidden lg:block w-px h-64 bg-gray-800/70"></div>

                {/* Score Circle */}
                <div className="flex-1 flex flex-col items-center">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-purple-400" />
                    Developer Pulse
                    <Zap className="w-5 h-5 ml-2 text-purple-400" />
                  </h3>

                  <CircleProgress
                    percentage={scoreData.percentage}
                    size={200}
                    strokeWidth={12}
                    color={getScoreBgColor(scoreData.percentage)}
                  >
                    <span className="text-4xl font-bold">
                      {scoreData.percentage}%
                    </span>
                    {/* <div
                      className={`text-xl font-bold mt-2 ${getScoreColor(
                        scoreData.percentage
                      )}`}
                    >
                      {getScoreGrade(scoreData.percentage)}
                    </div> */}
                  </CircleProgress>

                  <div className="mt-4 grid grid-cols-3 gap-4 text-center w-full max-w-xs">
                    <div>
                      <div
                        className="w-3 h-3 rounded-full mx-auto mb-1"
                        style={{ backgroundColor: "#10b981" }}
                      ></div>
                      <span className="text-xs text-gray-400">
                        80-100%
                        <br />
                        High Pulse
                      </span>
                    </div>
                    <div>
                      <div
                        className="w-3 h-3 rounded-full mx-auto mb-1"
                        style={{ backgroundColor: "#f59e0b" }}
                      ></div>
                      <span className="text-xs text-gray-400">
                        60-79%
                        <br />
                        Steady Pulse
                      </span>
                    </div>
                    <div>
                      <div
                        className="w-3 h-3 rounded-full mx-auto mb-1"
                        style={{ backgroundColor: "#ef4444" }}
                      ></div>
                      <span className="text-xs text-gray-400">
                        0-59%
                        <br />
                        Low Pulse
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown Grid */}
          <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-purple-400" />
                Pulse Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {scoreData.categories.map((category, index) => {
                  const percentage = Math.round(
                    (category.score / category.maxScore) * 100
                  );
                  // Take only the first 2 details to show in the card
                  const firstTwoDetails = Object.entries(
                    category.details
                  ).slice(0, 2);

                  return (
                    <div
                      key={index}
                      className="bg-gray-800/20 p-4 rounded-lg border border-gray-700/50 hover:bg-gray-800/40 hover:border-purple-500/30 transition-all cursor-pointer"
                      onClick={() => setSelectedCategory(category)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="p-1.5 bg-gray-800 rounded-md mr-3">
                            {
                              categoryIcons[
                                category.category as keyof typeof categoryIcons
                              ]
                            }
                          </div>
                          <h3 className="font-medium text-white">
                            {category.category}
                          </h3>
                        </div>
                        <Badge
                          className="text-xs"
                          style={{
                            backgroundColor: getScoreBgColor(percentage),
                          }}
                        >
                          {percentage}%
                        </Badge>
                      </div>

                      <div className="flex items-baseline mb-3">
                        <span className="text-xl font-bold">
                          {category.score}
                        </span>
                        <span className="text-gray-500 ml-1">
                          / {category.maxScore} points
                        </span>
                      </div>

                      <div className="space-y-1.5 border-t border-gray-700/30 pt-3">
                        {firstTwoDetails.map(([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between text-xs"
                          >
                            <span className="text-gray-400 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </span>
                            <span className="font-medium text-gray-200">
                              {Array.isArray(value)
                                ? value.length
                                : value?.toString()}
                            </span>
                          </div>
                        ))}

                        <div className="flex items-center justify-end text-xs text-purple-400 mt-1">
                          <span>View details</span>
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Category Details Dialog */}
          <Dialog
            open={selectedCategory !== null}
            onOpenChange={(open) => !open && setSelectedCategory(null)}
          >
            <DialogContent className="w-[85vw] max-w-md bg-gray-900/95 border-gray-700 text-white backdrop-blur-xl p-4">
              <DialogHeader className="pb-1 space-y-1">
                <DialogTitle className="flex items-center space-x-2 text-base">
                  {selectedCategory && (
                    <>
                      <div className="p-1 bg-gray-800 rounded-md">
                        {
                          categoryIcons[
                            selectedCategory.category as keyof typeof categoryIcons
                          ]
                        }
                      </div>
                      <span>{selectedCategory?.category}</span>
                    </>
                  )}
                </DialogTitle>
                <DialogDescription className="text-gray-400 text-xs">
                  Score: {selectedCategory?.score}/{selectedCategory?.maxScore}{" "}
                  points
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-2 custom-scrollbar pr-1 max-h-[50vh] overflow-y-auto text-sm">
                {selectedCategory && (
                  <>
                    {/* Score Bar */}
                    <div className="mt-1 mb-3">
                      {(() => {
                        const percentage = Math.round(
                          (selectedCategory.score / selectedCategory.maxScore) *
                            100
                        );
                        return (
                          <div className="w-full bg-gray-800/70 h-2 rounded overflow-hidden">
                            <div
                              className="h-full rounded"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: getScoreBgColor(percentage),
                              }}
                            ></div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Details */}
                    <div>
                      <h4 className="text-xs font-semibold text-white border-b border-gray-800 pb-1 mb-2">
                        Breakdown
                      </h4>
                      <div className="space-y-1.5">
                        {Object.entries(selectedCategory.details).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="bg-gray-800/30 p-1.5 rounded"
                            >
                              <div className="text-xs text-gray-400 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}:
                              </div>
                              <div className="font-medium text-gray-200 text-xs">
                                {Array.isArray(value) ? (
                                  <div className="flex flex-wrap gap-0.5 mt-1">
                                    {value.slice(0, 2).map((item, i) => (
                                      <Badge
                                        key={i}
                                        variant="secondary"
                                        className="text-[10px] py-0 px-1 h-4 bg-gray-700/50 text-gray-300"
                                      >
                                        {item}
                                      </Badge>
                                    ))}
                                    {value.length > 2 && (
                                      <Badge
                                        variant="outline"
                                        className="text-[10px] py-0 px-1 h-4"
                                      >
                                        +{value.length - 2} more
                                      </Badge>
                                    )}
                                  </div>
                                ) : (
                                  value?.toString()
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Tips - Only shown for low scores */}
                    {(() => {
                      const percentage = Math.round(
                        (selectedCategory.score / selectedCategory.maxScore) *
                          100
                      );
                      return percentage < 70 ? (
                        <div className="bg-purple-900/20 p-1.5 rounded border border-purple-500/20 mt-2">
                          <h4 className="text-[10px] font-semibold text-purple-400 flex items-center">
                            <Info className="w-3 h-3 mr-1" />
                            How to improve
                          </h4>
                          <p className="text-[10px] text-gray-300 mt-0.5">
                            {selectedCategory.category ===
                              "Open Source Contributions" &&
                              "Contribute to more open source projects and create meaningful pull requests."}
                            {selectedCategory.category ===
                              "Repository Quality" &&
                              "Add detailed README files, documentation, and increase test coverage."}
                            {selectedCategory.category ===
                              "Project Presentation" &&
                              "Add project descriptions, topics, and improve your repos' visual presentation."}
                            {selectedCategory.category ===
                              "Technical Diversity" &&
                              "Work with a wider range of programming languages and technologies."}
                            {selectedCategory.category ===
                              "Community Engagement" &&
                              "Engage more with the community by starring repositories and following developers."}
                            {selectedCategory.category ===
                              "Profile Completeness" &&
                              "Complete your profile with bio, location, and profile picture."}
                          </p>
                        </div>
                      ) : null;
                    })()}
                  </>
                )}
              </div>

              <div className="flex justify-end mt-1">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs border-gray-700 hover:bg-gray-800 text-gray-300"
                  >
                    Close
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
