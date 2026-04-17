"use client"

import { Button } from "@heroui/react"
import { useState } from "react"

interface ApiResponse {
  message: string
  timestamp?: string
  status?: string
  data?: unknown
  error?: string
}

export default function TestPage() {
  const [getResponse, setGetResponse] = useState<ApiResponse | null>(null)
  const [postResponse, setPostResponse] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState({ get: false, post: false })

  const testGetRequest = async () => {
    setLoading((prev) => ({ ...prev, get: true }))
    try {
      const res = await fetch("/api/hello")
      const data = await res.json()
      setGetResponse(data)
    } catch (error) {
      setGetResponse({
        message: "Error",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setLoading((prev) => ({ ...prev, get: false }))
    }
  }

  const testPostRequest = async () => {
    setLoading((prev) => ({ ...prev, post: true }))
    try {
      const res = await fetch("/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ test: true, timestamp: Date.now() }),
      })
      const data = await res.json()
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

  return (
    <div className="min-h-screen w-full bg-(--color-bg-primary) pt-[calc(var(--navbar-height)+var(--space-xl))] pb-(--space-2xl) px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">
          API Test Page
        </h1>
        <p className="text-(--color-text-secondary) mb-8">
          Test the server-side API endpoints
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* GET Request Test */}
          <div className="p-6 rounded-xl border border-(--color-border-default) bg-(--color-bg-surface)/50">
            <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">
              GET Request
            </h2>
            <p className="text-sm text-(--color-text-secondary) mb-4">
              Tests the GET endpoint at /api/hello
            </p>
            <Button
              onPress={testGetRequest}
              isLoading={loading.get}
              className="w-full bg-(--color-accent-cyan) hover:bg-(--color-accent-cyan-hover) text-white font-medium"
            >
              Send GET Request
            </Button>
            {getResponse && (
              <div className="mt-4 p-4 rounded-lg bg-(--color-bg-primary) border border-(--color-border-default)">
                <p className="text-xs text-(--color-text-muted) mb-2">
                  Response:
                </p>
                <pre className="text-sm text-(--color-text-primary) overflow-auto">
                  {JSON.stringify(getResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* POST Request Test */}
          <div className="p-6 rounded-xl border border-(--color-border-default) bg-(--color-bg-surface)/50">
            <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">
              POST Request
            </h2>
            <p className="text-sm text-(--color-text-secondary) mb-4">
              Tests the POST endpoint at /api/hello with JSON body
            </p>
            <Button
              onPress={testPostRequest}
              isLoading={loading.post}
              className="w-full bg-(--color-accent-cyan) hover:bg-(--color-accent-cyan-hover) text-white font-medium"
            >
              Send POST Request
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
        </div>
      </div>
    </div>
  )
}
