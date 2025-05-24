import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const { userId } = await auth();

  const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
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

  const provider = "github"; // The provider you want to use
  const client = await clerkClient();

  const clerkResponse = await client.users.getUserOauthAccessToken(
    userId,
    provider
  );

  const githubToken = clerkResponse.data[0].token || "";
  if (!githubToken)
    return NextResponse.json(
      { success: false, message: "No GitHub token found" },
      { status: 401 }
    );

  try {
    // Use this token to call GitHub's GraphQL API
    // 1. Get total repo count
    const countQuery = `
      query($login: String!) {
        user(login: $login) {
          repositories(isFork: false, ownerAffiliations: [OWNER]) {
            totalCount
          }
        }
      }
    `;

    interface CountResponse {
      data: {
        user?: {
          repositories?: {
            totalCount?: number;
          };
        };
      };
    }

    const countRes = await axios.post<CountResponse>(
      GITHUB_GRAPHQL_API,
      {
        query: countQuery,
        variables: { login: targetUsername }, // Replace with your default username
      },
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const totalCount = countRes.data.data.user?.repositories?.totalCount;
    const fetchCount = Math.min(totalCount || 0, 100);

    // Get user's node ID for author filtering
    const userQuery = `
      query($login: String!) {
        user(login: $login) {
          id
        }
      }
    `;

    interface UserResponse {
      data: {
        user?: {
          id?: string;
        };
      };
    }

    const userRes = await axios.post<UserResponse>(
      GITHUB_GRAPHQL_API,
      {
        query: userQuery,
        variables: { login: targetUsername },
      },
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const userNodeId = userRes.data.data.user?.id;

    // 2. Get commit data
    const repoQuery = `
      query($login: String!, $first: Int!, $authorId: ID!) {
        user(login: $login) {
          repositories(first: $first, orderBy: { field: PUSHED_AT, direction: DESC }, isFork: false, ownerAffiliations: [OWNER]) {
            nodes {
              name
              url
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(author: { id: $authorId }) {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    interface RepoResponse {
      data: {
        user?: {
          repositories?: {
            nodes?: Array<{
              name: string;
              url: string;
              defaultBranchRef?: {
                target?: {
                  history?: {
                    totalCount?: number;
                  };
                };
              };
            }>;
          };
        };
      };
    }

    const repoRes = await axios.post<RepoResponse>(
      GITHUB_GRAPHQL_API,
      {
        query: repoQuery,
        variables: { login: targetUsername, first: fetchCount, authorId: userNodeId },
      },
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("repoRes : ", repoRes.data);
    

    const repos = repoRes?.data?.data?.user?.repositories?.nodes;


    if (!repos || !Array.isArray(repos)) {
      return NextResponse.json(
        { success: false, message: "No repositories found" },
        { status: 401 }
      );
    }

    const topFive = repos
      .filter(
        (repo) => repo?.defaultBranchRef?.target?.history?.totalCount !== undefined
      )
      .sort(
        (a, b) =>
          (b.defaultBranchRef?.target?.history?.totalCount ?? 0) -
          (a.defaultBranchRef?.target?.history?.totalCount ?? 0)
      )
      .slice(0, 5)
      .map((repo) => ({
        name: repo.name,
        url: repo.url,
        commitsByUser: repo.defaultBranchRef?.target?.history?.totalCount ?? 0,
      }));

    return NextResponse.json({ success: true, data: topFive }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data from GitHub API", error);
    return NextResponse.json(
      { success: false, message: "Error fetching data from GitHub API" },
      { status: 500 }
    );
  }
}
