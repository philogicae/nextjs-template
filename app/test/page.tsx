"use client"

import { Button } from "@heroui/react"
import { useCounterStore } from "@stores"
import { useState } from "react"

/**
 * API Response type definition
 */
interface ApiResponse {
  message: string
  timestamp?: string
  status?: string
  data?: unknown
  error?: string
}

/**
 * Loading states for each request type
 */
interface LoadingState {
  hello: boolean
  post: boolean
  skills: boolean
}

/**
 * TestPage Component
 *
 * Provides a UI for testing the server-side API endpoints
 * and demonstrating Zustand state management.
 */
export default function TestPage(): React.ReactElement {
  const [helloResponse, setHelloResponse] = useState<ApiResponse | null>(null)
  const [postResponse, setPostResponse] = useState<ApiResponse | null>(null)
  const [skillsResponse, setSkillsResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState<LoadingState>({
    hello: false,
    post: false,
    skills: false,
  })

  // Counter store for state management demo
  const { count, history, increment, decrement, incrementBy, reset, undo } =
    useCounterStore()

  /**
   * Test the GET endpoint at /api/hello
   */
  const testHelloRequest = async (): Promise<void> => {
    setLoading((prev) => ({ ...prev, hello: true }))
    try {
      const res = await fetch("/api/hello")
      const data = (await res.json()) as ApiResponse
      setHelloResponse(data)
    } catch (error) {
      setHelloResponse({
        message: "Error",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setLoading((prev) => ({ ...prev, hello: false }))
    }
  }

  /**
   * Test the POST endpoint at /api/hello
   */
  const testPostRequest = async (): Promise<void> => {
    setLoading((prev) => ({ ...prev, post: true }))
    try {
      const res = await fetch("/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ test: true, timestamp: Date.now() }),
      })
      const data = (await res.json()) as ApiResponse
      setPostResponse(data)
    } catch (error) {
      setPostResponse({
        message: "Error",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setLoading((prev) => ({ ...prev, post: false }))
    }
  }

  /**
   * Test the GET endpoint at /skills.md
   */
  const testSkillsRequest = async (): Promise<void> => {
    setLoading((prev) => ({ ...prev, skills: true }))
    try {
      const res = await fetch("/skills.md")
      const text = await res.text()
      setSkillsResponse(text.slice(0, 500) + (text.length > 500 ? "..." : ""))
    } catch (error) {
      setSkillsResponse(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      )
    } finally {
      setLoading((prev) => ({ ...prev, skills: false }))
    }
  }

  return (
    <div className="min-h-screen w-full bg-(--color-bg-primary) pt-[calc(var(--navbar-height)+var(--space-xl))] pb-(--space-2xl) px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">
          API Test Page
        </h1>
        <p className="text-(--color-text-secondary) mb-8">
          Test the server-side API endpoints and Zustand state management
        </p>

        {/* Zustand State Demo Section */}
        <div className="mb-12 p-6 rounded-xl border border-(--color-border-default) bg-(--color-bg-surface)/50">
          <h2 className="text-2xl font-semibold text-(--color-text-primary) mb-4">
            Zustand State Demo
          </h2>
          <p className="text-sm text-(--color-text-secondary) mb-6">
            Demonstrates global state management with history tracking and undo
            functionality
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="text-4xl font-bold text-(--color-accent-cyan)">
              {count}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                onPress={decrement}
                variant="outline"
                className="font-medium"
              >
                -1
              </Button>
              <Button
                onPress={increment}
                className="bg-(--color-accent-cyan) hover:bg-(--color-accent-cyan-hover) text-white font-medium"
              >
                +1
              </Button>
              <Button
                onPress={() => incrementBy(5)}
                variant="outline"
                className="font-medium"
              >
                +5
              </Button>
              <Button onPress={reset} variant="ghost" className="font-medium">
                Reset
              </Button>
              <Button
                onPress={undo}
                isDisabled={history.length === 0}
                variant="ghost"
                className="font-medium"
              >
                Undo ({history.length})
              </Button>
            </div>
          </div>

          {history.length > 0 && (
            <div className="mt-4 text-sm text-(--color-text-muted)">
              History: [{history.join(", ")}]
            </div>
          )}
        </div>

        {/* API Tests Section */}
        <h2 className="text-2xl font-semibold text-(--color-text-primary) mb-6">
          API Tests
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* GET /api/hello Test */}
          <div className="p-6 rounded-xl border border-(--color-border-default) bg-(--color-bg-surface)/50">
            <h3 className="text-xl font-semibold text-(--color-text-primary) mb-4">
              GET /api/hello
            </h3>
            <p className="text-sm text-(--color-text-secondary) mb-4">
              Tests the hello endpoint
            </p>
            <Button
              onPress={testHelloRequest}
              isPending={loading.hello}
              className="w-full bg-(--color-accent-cyan) hover:bg-(--color-accent-cyan-hover) text-white font-medium"
            >
              Send Request
            </Button>
            {helloResponse && (
              <div className="mt-4 p-4 rounded-lg bg-(--color-bg-primary) border border-(--color-border-default)">
                <p className="text-xs text-(--color-text-muted) mb-2">
                  Response:
                </p>
                <pre className="text-sm text-(--color-text-primary) overflow-auto">
                  {JSON.stringify(helloResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* POST /api/hello Test */}
          <div className="p-6 rounded-xl border border-(--color-border-default) bg-(--color-bg-surface)/50">
            <h3 className="text-xl font-semibold text-(--color-text-primary) mb-4">
              POST /api/hello
            </h3>
            <p className="text-sm text-(--color-text-secondary) mb-4">
              Tests POST with JSON body
            </p>
            <Button
              onPress={testPostRequest}
              isPending={loading.post}
              className="w-full bg-(--color-accent-cyan) hover:bg-(--color-accent-cyan-hover) text-white font-medium"
            >
              Send Request
            </Button>
            {postResponse && (
              <div className="mt-4 p-4 rounded-lg bg-(--color-bg-primary) border border-(--color-border-default)">
                <p className="text-xs text-(--color-text-muted) mb-2">
                  Response:
                </p>
                <pre className="text-sm text-(--color-text-primary) overflow-auto">
                  {JSON.stringify(postResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* GET /skills.md Test */}
          <div className="p-6 rounded-xl border border-(--color-border-default) bg-(--color-bg-surface)/50">
            <h3 className="text-xl font-semibold text-(--color-text-primary) mb-4">
              GET /skills.md
            </h3>
            <p className="text-sm text-(--color-text-secondary) mb-4">
              Returns raw SKILLS.md content
            </p>
            <Button
              onPress={testSkillsRequest}
              isPending={loading.skills}
              className="w-full bg-(--color-accent-cyan) hover:bg-(--color-accent-cyan-hover) text-white font-medium"
            >
              Send Request
            </Button>
            {skillsResponse && (
              <div className="mt-4 p-4 rounded-lg bg-(--color-bg-primary) border border-(--color-border-default)">
                <p className="text-xs text-(--color-text-muted) mb-2">
                  Response (first 500 chars):
                </p>
                <pre className="text-sm text-(--color-text-primary) overflow-auto whitespace-pre-wrap">
                  {skillsResponse}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
