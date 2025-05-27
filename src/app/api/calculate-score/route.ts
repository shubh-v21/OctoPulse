import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

interface GitHubScore {
  category: string;
  score: number;
  maxScore: number;
  details: Record<string, any>;
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { success: false, message: "Unauthorized - Please sign in with GitHub" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const targetUsername = searchParams.get("targetUsername");

  if (!targetUsername) {
    return NextResponse.json(
      { success: false, message: "Target username is required" },
      { status: 400 }
    );
  }

  const githubToken = session.accessToken;

  try {
    // Simplified GitHub data query for limited scopes
    const mainQuery = `
  query($login: String!) {
    user(login: $login) {
      id
      login
      name
      bio
      location
      avatarUrl
      websiteUrl
      createdAt
      updatedAt
      followers { totalCount }
      following { totalCount }
      gists(privacy: PUBLIC) { totalCount }
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
      }
      repository(name: $login) {
        name
        readme: object(expression: "HEAD:README.md") {
          __typename 
        }
      }
      # --- All other public non-fork repos you already had ---
      repositories(first: 100, privacy: PUBLIC, ownerAffiliations: [OWNER], isFork: false) {
        totalCount
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage { name }
          createdAt
          pushedAt
          hasIssuesEnabled
          isArchived
          homepageUrl
          readme: object(expression: "HEAD:README.md") {
            __typename
          }
        }
      }
      pullRequests(first: 100, states: [MERGED]) {
        totalCount
        nodes {
          repository {
            owner { login }
            name
            isPrivate
          }
          mergedAt
        }
      }
    }
  }
`;

    const response = await axios.post(
      GITHUB_GRAPHQL_API,
      {
        query: mainQuery,
        variables: { login: targetUsername },
      },
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("GraphQL Response:", JSON.stringify(response.data, null, 2));

    const data = response.data as { data?: any; errors?: any };

    // Check for GraphQL errors
    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      // return NextResponse.json(
      //   { success: false, message: "Error fetching user data from GitHub" },
      //   { status: 500 }
      // );
    }

    // Check if response has the expected structure
    if (!data || !data.data || !data.data.user) {
      console.error("Unexpected response structure:", data);
      return NextResponse.json(
        {
          success: false,
          message: "User not found or invalid response from GitHub",
        },
        { status: 404 }
      );
    }

    const userData = data.data.user;

    // Calculate scores for each category
    const scores = calculateGitHubScores(userData);
    const totalScore = scores.reduce(
      (sum, category) => sum + category.score,
      0
    );
    const maxTotalScore = scores.reduce(
      (sum, category) => sum + category.maxScore,
      0
    );

    return NextResponse.json({
      success: true,
      data: {
        username: targetUsername,
        totalScore,
        maxTotalScore,
        percentage: Math.round((totalScore / maxTotalScore) * 100),
        categories: scores,
        profileData: {
          name: userData.name,
          bio: userData.bio,
          location: userData.location,
          avatarUrl: userData.avatarUrl,
          followers: userData.followers.totalCount,
          following: userData.following.totalCount,
        },
      },
    });
  } catch (error) {
    console.error("Error calculating GitHub score:", error);
    return NextResponse.json(
      { success: false, message: "Error calculating GitHub score" },
      { status: 500 }
    );
  }
}

function calculateGitHubScores(userData: any): GitHubScore[] {
  const scores: GitHubScore[] = [];

  // 1. Open Source Contribution Activity (25 points)
  const externalPRs = userData.pullRequests.nodes.filter(
    (pr: any) =>
      pr.repository.owner.login !== userData.login && !pr.repository.isPrivate
  );
  const uniqueRepos = new Set(
    externalPRs.map(
      (pr: any) => `${pr.repository.owner.login}/${pr.repository.name}`
    )
  );

  const contributionScore = Math.min(
    25,
    externalPRs.length * 0.5 +
      uniqueRepos.size * 1 +
      userData.contributionsCollection.totalPullRequestContributions * 0.1 +
      Math.min(
        5,
        userData.contributionsCollection.contributionCalendar
          .totalContributions * 0.1
      )
  );

  scores.push({
    category: "Open Source Contributions",
    score: Math.round(contributionScore),
    maxScore: 25,
    details: {
      externalPRsMerged: externalPRs.length,
      uniqueReposContributed: uniqueRepos.size,
      totalPRContributions:
        userData.contributionsCollection.totalPullRequestContributions,
      totalCommitContributionsLastYear:
        userData.contributionsCollection.contributionCalendar
          .totalContributions,
    },
  });

  // 2. Repository Quality (20 points)
  const repos = userData.repositories.nodes.filter(
    (repo: any) => !repo.isArchived
  );
  const totalStars = repos.reduce(
    (sum: number, repo: any) => sum + repo.stargazerCount,
    0
  );
  const totalForks = repos.reduce(
    (sum: number, repo: any) => sum + repo.forkCount,
    0
  );
  const recentRepos = repos.filter((repo: any) => {
    const pushedDate = new Date(repo.pushedAt);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return pushedDate > sixMonthsAgo;
  });

  const repoScore = Math.min(
    20,
    Math.min(8, totalStars * 0.1) +
      Math.min(4, totalForks * 0.2) +
      Math.min(4, repos.length * 0.5) +
      Math.min(4, recentRepos.length * 0.8)
  );

  scores.push({
    category: "Repository Quality",
    score: Math.round(repoScore),
    maxScore: 20,
    details: {
      totalRepositoriesOwned: repos.length,
      totalStars,
      totalForks,
      recentlyActiveRepos: recentRepos.length,
    },
  });

  // 3. Project Presentation (15 points)
  const projectReposWithDescription = repos.filter(
    (repo: any) => repo.description && repo.description.length > 10
  ).length;

  const projectReposWithReadme = repos.filter(
    (repo: any) => repo.readme && repo.readme.__typename === "Blob"
  ).length;

  const projectReposWithLiveLink = repos.filter(
    (repo: any) => repo.homepageUrl
  ).length;

  const presentationScore = Math.min(
    20,
    Math.min(5, (projectReposWithDescription / Math.max(repos.length, 1)) * 5) +
      Math.min(5, (projectReposWithReadme / Math.max(repos.length, 1)) * 5) +
      Math.min(10, (projectReposWithLiveLink / Math.max(repos.length, 1)) * 10)
  );

  scores.push({
    category: "Project Presentation",
    score: Math.round(presentationScore),
    maxScore: 20,
    details: {
      projectReposWithDescription,
      projectReposWithLiveLink,
      projectReposWithReadme,
    },
  });

  // 4. Technical Diversity (10 points)
  const languages = new Set();
  repos.forEach((repo: any) => {
    if (repo.primaryLanguage) languages.add(repo.primaryLanguage.name);
  });

  const diversityScore = Math.min(10, languages.size * 2.5);

  scores.push({
    category: "Technical Diversity",
    score: Math.round(diversityScore),
    maxScore: 10,
    details: {
      programmingLanguages: Array.from(languages),
      languageCount: languages.size,
    },
  });

  // 5. Community Engagement (15 points)
  const engagementScore = Math.min(
    15,
    Math.min(3, userData.followers.totalCount * 0.2) +
      Math.min(
        9,
        userData.contributionsCollection.totalIssueContributions * 0.4
      ) +
      Math.min(3, userData.gists.totalCount * 0.5)
  );

  scores.push({
    category: "Community Engagement",
    score: Math.round(engagementScore),
    maxScore: 15,
    details: {
      followers: userData.followers.totalCount,
      following: userData.following.totalCount,
      issueContributions:
        userData.contributionsCollection.totalIssueContributions,
      gists: userData.gists.totalCount,
    },
  });

  // 6. Profile Completeness (10 points)

  const profileScore =
    (userData.name ? 2 : 0) +
    (userData.bio ? 2 : 0) +
    (userData.location ? 2 : 0) +
    (userData.websiteUrl ? 2 : 0) +
    (userData?.repository?.readme?.__typename === "Blob" ? 2 : 0);
  scores.push({
    category: "Profile Completeness",
    score: profileScore,
    maxScore: 10,
    details: {
      hasName: userData.name !== null && userData.name.length > 0 ? "Yes" : "No",
      hasBio: userData.bio ? "Yes" : "No",
      hasLocation:  userData.location ? "Yes" : "No",
      hasWebsite: userData.websiteUrl ? "Yes" : "No",
      hasReadme:
        userData?.repository?.readme?.__typename === "Blob" ? "Yes" : "No",
    },
  });

  return scores;
}
