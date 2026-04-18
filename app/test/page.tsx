"use client"

import { Container, StatusBadge } from "@components"
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@heroui/react"
import { useCounterStore } from "@stores"
import { useState } from "react"

/**
 * API Response type definition
 */
interface ApiResponse {
  message?: string
  timestamp?: string
  status?: string
  data?: unknown
  error?: string
}

type RequestKey = "hello" | "post" | "skills"

type Status = "idle" | "loading" | "success" | "error"

interface EndpointState {
  status: Status
  response: ApiResponse | string | null
}

const initialState: Record<RequestKey, EndpointState> = {
  hello: { status: "idle", response: null },
  post: { status: "idle", response: null },
  skills: { status: "idle", response: null },
}

/**
 * TestPage Component
 *
 * Interactive playground for testing server-side API endpoints and the
 * Zustand counter store.
 */
export default function TestPage(): React.ReactElement {
  const [state, setState] = useState(initialState)

  const { count, history, increment, decrement, incrementBy, reset, undo } =
    useCounterStore()

  const runRequest = async (
    key: RequestKey,
    fn: () => Promise<ApiResponse | string>
  ): Promise<void> => {
    setState((prev) => ({
      ...prev,
      [key]: { status: "loading", response: null },
    }))
    try {
      const response = await fn()
      setState((prev) => ({
        ...prev,
        [key]: { status: "success", response },
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        [key]: {
          status: "error",
          response: {
            error: error instanceof Error ? error.message : "Unknown error",
          },
        },
      }))
    }
  }

  const testHello = (): Promise<void> =>
    runRequest("hello", async () => {
      const res = await fetch("/api/hello")
      return (await res.json()) as ApiResponse
    })

  const testPost = (): Promise<void> =>
    runRequest("post", async () => {
      const res = await fetch("/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ test: true, timestamp: Date.now() }),
      })
      return (await res.json()) as ApiResponse
    })

  const testSkills = (): Promise<void> =>
    runRequest("skills", async () => {
      const res = await fetch("/skills.md")
      const text = await res.text()
      return text.slice(0, 500) + (text.length > 500 ? "..." : "")
    })

  return (
    <div className="relative w-full bg-(--color-bg-primary) flex-1 pt-[calc(var(--navbar-height)+var(--space-lg))] sm:pt-[calc(var(--navbar-height)+var(--space-xl))] pb-(--space-2xl)">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-(--color-text-primary) mb-2">
            Playground
          </h1>
          <p className="text-sm sm:text-base text-(--color-text-secondary) max-w-2xl">
            Test the server-side API endpoints and Zustand state management
            live.
          </p>
        </div>

        {/* Zustand Section */}
        <section className="mb-10 sm:mb-12">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-(--color-text-primary)">
              Zustand State Demo
            </h2>
            <span className="text-xs text-(--color-text-muted)">
              counter store &middot; no persistence
            </span>
          </div>

          <Card className="border border-(--color-border-default) bg-(--color-bg-surface)/50 shadow-none">
            <CardHeader className="flex items-start justify-between gap-3 p-5 pb-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="text-5xl sm:text-6xl font-bold text-(--color-accent-cyan) tabular-nums min-w-16 text-center">
                  {count}
                </div>
                <div className="flex flex-col text-xs text-(--color-text-muted) gap-1">
                  <span>current count</span>
                  <span className="text-(--color-text-secondary)">
                    history: {history.length}/10
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-wrap gap-2 flex-1 sm:justify-end">
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

              {history.length > 0 && (
                <div className="mt-5 pt-4 border-t border-(--color-border-default) text-xs text-(--color-text-muted) font-mono break-all">
                  history: [{history.join(", ")}]
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* API Section */}
        <section>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-(--color-text-primary)">
              API Endpoints
            </h2>
            <span className="text-xs text-(--color-text-muted)">
              3 endpoints
            </span>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            <EndpointCard
              method="GET"
              path="/api/hello"
              description="Returns a hello message with timestamp."
              state={state.hello}
              onRun={testHello}
            />
            <EndpointCard
              method="POST"
              path="/api/hello"
              description="Echoes back a JSON body with timestamp."
              state={state.post}
              onRun={testPost}
            />
            <EndpointCard
              method="GET"
              path="/skills.md"
              description="Serves raw SKILLS.md content."
              state={state.skills}
              onRun={testSkills}
            />
          </div>
        </section>
      </Container>
    </div>
  )
}

/**
 * EndpointCard subcomponent — displays a single API endpoint with
 * run button, status, and response preview.
 */
interface EndpointCardProps {
  method: "GET" | "POST" | "PUT" | "DELETE"
  path: string
  description: string
  state: EndpointState
  onRun: () => Promise<void> | void
}

const methodColors: Record<EndpointCardProps["method"], string> = {
  GET: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
  POST: "text-sky-500 bg-sky-500/10 border-sky-500/30",
  PUT: "text-amber-500 bg-amber-500/10 border-amber-500/30",
  DELETE: "text-rose-500 bg-rose-500/10 border-rose-500/30",
}

function EndpointCard({
  method,
  path,
  description,
  state,
  onRun,
}: EndpointCardProps): React.ReactElement {
  const isPending = state.status === "loading"

  return (
    <Card className="border border-(--color-border-default) bg-(--color-bg-surface)/50 shadow-none flex flex-col">
      <CardHeader className="flex items-start justify-between gap-3 p-5 pb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`shrink-0 inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-mono font-semibold ${methodColors[method]}`}
          >
            {method}
          </span>
          <code className="text-sm text-(--color-text-primary) font-mono truncate">
            {path}
          </code>
        </div>
        <StatusBadge status={state.status} />
      </CardHeader>

      <CardContent className="px-5 py-0 flex-1">
        <p className="text-sm text-(--color-text-secondary) mb-4">
          {description}
        </p>

        {state.response && (
          <div className="rounded-lg bg-(--color-bg-primary) border border-(--color-border-default) p-3 mb-3">
            <p className="text-[10px] uppercase tracking-wider text-(--color-text-muted) mb-2 font-medium">
              Response
            </p>
            <pre className="text-xs text-(--color-text-primary) overflow-auto whitespace-pre-wrap wrap-break-word max-h-52 leading-relaxed">
              {typeof state.response === "string"
                ? state.response
                : JSON.stringify(state.response, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-5 pt-3">
        <Button
          onPress={onRun}
          isPending={isPending}
          className="w-full bg-(--color-accent-cyan) hover:bg-(--color-accent-cyan-hover) text-white font-medium"
        >
          {isPending ? "Sending..." : "Send Request"}
        </Button>
      </CardFooter>
    </Card>
  )
}
