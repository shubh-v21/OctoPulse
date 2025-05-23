import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const targetUsername = searchParams.get("targetUsername");

  const provider = "github"; // The provider you want to use
  const client = await clerkClient();

  const clerkResponse = await client.users.getUserOauthAccessToken(
    userId,
    provider
  );

  console.log("clerkResponse", clerkResponse);

  const githubToken = clerkResponse.data[0].token || "";
  if (!githubToken)
    return NextResponse.json(
      { success: false, message: "No GitHub token found" },
      { status: 401 }
    );

  // Use this token to call GitHub's GraphQL API
  const query = `
  query {
    user(login: "${targetUsername}") {
      login
      name
      repositories(first: 5, orderBy: { field: STARGAZERS, direction: DESC }) {
        nodes {
          name
          url
          stargazerCount
        }
      }
    }
  }
`;

  const githubResponse = await axios.post(
    "https://api.github.com/graphql",
    { query },
    {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        "Content-Type": "application/json",
      },
    }
  );  

  const data = githubResponse.data;
  return NextResponse.json({ success: true, data: data }, { status: 200 });
}
