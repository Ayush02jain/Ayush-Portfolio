import { NextResponse } from "next/server"

export async function GET() {
  try {
    const query = `
      query userProblemsSolved($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
      },
      body: JSON.stringify({
        query,
        variables: { username: "ayush02_jain" },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch LeetCode data")
    }

    const data = await response.json()

    if (data.errors) {
      throw new Error(data.errors[0]?.message || "GraphQL error")
    }

    const allQuestions = data.data.allQuestionsCount
    const solvedQuestions = data.data.matchedUser?.submitStatsGlobal?.acSubmissionNum

    if (!solvedQuestions) {
      throw new Error("User not found")
    }

    const stats = {
      total: {
        solved: solvedQuestions.find((q: { difficulty: string }) => q.difficulty === "All")?.count || 0,
        total: allQuestions.find((q: { difficulty: string }) => q.difficulty === "All")?.count || 0,
      },
      easy: {
        solved: solvedQuestions.find((q: { difficulty: string }) => q.difficulty === "Easy")?.count || 0,
        total: allQuestions.find((q: { difficulty: string }) => q.difficulty === "Easy")?.count || 0,
      },
      medium: {
        solved: solvedQuestions.find((q: { difficulty: string }) => q.difficulty === "Medium")?.count || 0,
        total: allQuestions.find((q: { difficulty: string }) => q.difficulty === "Medium")?.count || 0,
      },
      hard: {
        solved: solvedQuestions.find((q: { difficulty: string }) => q.difficulty === "Hard")?.count || 0,
        total: allQuestions.find((q: { difficulty: string }) => q.difficulty === "Hard")?.count || 0,
      },
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("LeetCode API error:", error)
    // Return fallback data if API fails
    return NextResponse.json({
      total: { solved: 88, total: 3873 },
      easy: { solved: 41, total: 932 },
      medium: { solved: 44, total: 2026 },
      hard: { solved: 3, total: 915 },
    })
  }
}
