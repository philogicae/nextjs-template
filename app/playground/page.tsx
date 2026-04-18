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
import { memo, useCallback, useMemo, useState } from "react"

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
 * API endpoint card with method badge, status indicator, and response preview.
 * Memoized to prevent parent re-renders from affecting this component.
 */
interface EndpointCardProps {
  method: "GET" | "POST" | "PUT" | "DELETE"
  path: string
  description: string
  state: EndpointState
  onRun: () => void
}

const methodColors: Record<EndpointCardProps["method"], string> = {
  GET: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
  POST: "text-sky-500 bg-sky-500/10 border-sky-500/30",
  PUT: "text-amber-500 bg-amber-500/10 border-amber-500/30",
  DELETE: "text-rose-500 bg-rose-500/10 border-rose-500/30",
}

const EndpointCard = memo(function EndpointCard({
  method,
  path,
  description,
  state,
  onRun,
}: EndpointCardProps): React.ReactElement {
  const isPending = state.status === "loading"

  return (
    <Card className="border border-(--color-border-default) bg-(--color-bg-surface)/50 shadow-none">
      <CardHeader className="flex items-start justify-between gap-2 p-2 pb-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className={`shrink-0 inline-flex items-center justify-center rounded border px-1 py-0.5 text-[9px] sm:text-[10px] font-mono font-semibold ${methodColors[method]}`}
          >
            {method}
          </span>
          <code className="text-[10px] sm:text-xs text-(--color-text-primary) font-mono truncate">
            {path}
          </code>
        </div>
        <StatusBadge status={state.status} />
      </CardHeader>

      <CardContent className="px-2 py-0">
        <p className="text-[10px] sm:text-xs text-(--color-text-secondary) mb-1">
          {description}
        </p>

        {state.response && (
          <div className="rounded bg-(--color-bg-primary) border border-(--color-border-default) p-1.5 mb-1">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-(--color-text-muted) mb-0.5 font-medium">
              Response
            </p>
            <pre className="text-[9px] sm:text-xs text-(--color-text-primary) overflow-auto whitespace-pre-wrap wrap-break-word max-h-20 leading-snug">
              {typeof state.response === "string"
                ? state.response
                : JSON.stringify(state.response, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-2 pt-1">
        <Button
          onPress={onRun}
          isPending={isPending}
          size="sm"
          className="w-full bg-(--color-accent-cyan) hover:bg-(--color-accent-cyan-hover) text-black dark:text-white font-medium h-7 text-[10px] sm:text-xs"
        >
          {isPending ? "Sending..." : "Send"}
        </Button>
      </CardFooter>
    </Card>
  )
})

interface CounterControlsProps {
  onDecrement: () => void
  onIncrement: () => void
  onIncrementBy: (amount: number) => void
  onReset: () => void
  onUndo: () => void
  canUndo: boolean
}

const CounterControls = memo(function CounterControls({
  onDecrement,
  onIncrement,
  onIncrementBy,
  onReset,
  onUndo,
  canUndo,
}: CounterControlsProps): React.ReactElement {
  const handleIncrementBy = useCallback(() => {
    onIncrementBy(5)
  }, [onIncrementBy])

  return (
    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
      <Button
        onPress={onDecrement}
        variant="outline"
        size="sm"
        className="font-medium h-7 sm:h-8 min-w-[2rem] sm:min-w-[2.25rem] px-1.5 sm:px-2 text-xs"
      >
        -1
      </Button>
      <Button
        onPress={onIncrement}
        size="sm"
        className="bg-(--color-accent-cyan) hover:bg-(--color-accent-cyan-hover) text-black dark:text-white font-medium h-7 sm:h-8 min-w-[2rem] sm:min-w-[2.25rem] px-1.5 sm:px-2 text-xs"
      >
        +1
      </Button>
      <Button
        onPress={handleIncrementBy}
        variant="outline"
        size="sm"
        className="font-medium h-7 sm:h-8 min-w-[2rem] sm:min-w-[2.25rem] px-1.5 sm:px-2 text-xs"
      >
        +5
      </Button>
      <Button
        onPress={onReset}
        variant="ghost"
        size="sm"
        className="font-medium h-7 sm:h-8 px-1.5 sm:px-2 text-xs"
      >
        Reset
      </Button>
      <Button
        onPress={onUndo}
        isDisabled={!canUndo}
        variant="ghost"
        size="sm"
        className="font-medium h-7 sm:h-8 px-1.5 sm:px-2 text-xs"
      >
        Undo
      </Button>
    </div>
  )
})

/**
 * Interactive playground for testing API endpoints and Zustand state.
 *
 * Performance optimizations:
 * - useCallback for event handlers
 * - useMemo for derived values
 * - memoized sub-components
 * - Zustand selectors for granular subscription
 */
export default function PlaygroundPage(): React.ReactElement {
  const [state, setState] = useState(initialState)

  const count = useCounterStore((s) => s.count)
  const history = useCounterStore((s) => s.history)
  const increment = useCounterStore((s) => s.increment)
  const decrement = useCounterStore((s) => s.decrement)
  const incrementBy = useCounterStore((s) => s.incrementBy)
  const reset = useCounterStore((s) => s.reset)
  const undo = useCounterStore((s) => s.undo)

  const historyDisplay = useMemo(() => history.slice(-5).join(","), [history])
  const canUndo = useMemo(() => history.length > 0, [history])

  const runRequest = useCallback(
    async (
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
    },
    []
  )

  const testHello = useCallback((): void => {
    runRequest("hello", async () => {
      const res = await fetch("/api/hello")
      return (await res.json()) as ApiResponse
    })
  }, [runRequest])

  const testPost = useCallback((): void => {
    runRequest("post", async () => {
      const res = await fetch("/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ test: true, timestamp: Date.now() }),
      })
      return (await res.json()) as ApiResponse
    })
  }, [runRequest])

  const testSkills = useCallback((): void => {
    runRequest("skills", async () => {
      const res = await fetch("/skills.md")
      const text = await res.text()
      return text.slice(0, 500) + (text.length > 500 ? "..." : "")
    })
  }, [runRequest])

  return (
    <div className="relative w-full bg-(--color-bg-primary) flex-1 flex flex-col px-4 sm:px-0 py-[calc(var(--navbar-height-mobile)+var(--space-sm))] sm:py-[calc(var(--navbar-height)+var(--space-xl))] pb-(--space-md) sm:pb-(--space-2xl)">
      <Container size="xl" className="flex-1 flex flex-col justify-center">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-(--color-text-primary) mb-1 sm:mb-2">
            Playground
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-(--color-text-secondary) max-w-2xl">
            Test the server-side API endpoints and Zustand state management
            live.
          </p>
        </div>

        <section className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center justify-between flex-wrap gap-1 sm:gap-2 mb-2">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-(--color-text-primary)">
              State Manager
            </h2>
            <span className="text-[10px] sm:text-xs text-(--color-text-muted)">
              Zustand store
            </span>
          </div>

          <Card className="border border-(--color-border-default) bg-(--color-bg-surface)/50 shadow-none">
            <CardContent className="p-2 sm:p-3 md:p-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-(--color-accent-cyan) tabular-nums min-w-10 sm:min-w-14 text-center">
                  {count}
                </div>
                <CounterControls
                  onDecrement={decrement}
                  onIncrement={increment}
                  onIncrementBy={incrementBy}
                  onReset={reset}
                  onUndo={undo}
                  canUndo={canUndo}
                />
                {history.length > 0 && (
                  <div className="text-[10px] sm:text-xs text-(--color-text-muted) font-mono text-center">
                    hist: [{historyDisplay}]
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="flex items-center justify-between flex-wrap gap-1 mb-2">
            <h2 className="text-xs sm:text-base md:text-lg font-semibold text-(--color-text-primary)">
              API Endpoints
            </h2>
            <span className="text-[10px] sm:text-xs text-(--color-text-muted)">
              3 endpoints
            </span>
          </div>

          <div className="grid gap-2 sm:gap-3 md:gap-4 lg:grid-cols-3">
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
              description="Serves raw SKILLS.md content for AI agent discovery."
              state={state.skills}
              onRun={testSkills}
            />
          </div>
        </section>
      </Container>
    </div>
  )
}
