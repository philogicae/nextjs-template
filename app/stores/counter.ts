import { create } from "zustand"

/**
 * Counter State Interface
 *
 * Example store demonstrating basic Zustand patterns.
 * Use as a reference for creating your own stores.
 */
interface CounterState {
  /** Current count value */
  count: number
  /** History of count changes for undo functionality */
  history: number[]
  /** Maximum history size */
  maxHistorySize: number
  /** Actions */
  increment: () => void
  decrement: () => void
  incrementBy: (amount: number) => void
  reset: () => void
  undo: () => void
}

/**
 * Counter Store
 *
 * A demo store showing Zustand patterns:
 * - Basic state management
 * - Computed values (history tracking)
 * - Undo functionality
 *
 * @example
 * const { count, increment } = useCounterStore()
 * const count = useCounterStore(state => state.count)
 */
export const useCounterStore = create<CounterState>()((set) => ({
  count: 0,
  history: [],
  maxHistorySize: 10,

  increment: () =>
    set((state) => ({
      count: state.count + 1,
      history: [...state.history.slice(-state.maxHistorySize + 1), state.count],
    })),

  decrement: () =>
    set((state) => ({
      count: state.count - 1,
      history: [...state.history.slice(-state.maxHistorySize + 1), state.count],
    })),

  incrementBy: (amount: number) =>
    set((state) => ({
      count: state.count + amount,
      history: [...state.history.slice(-state.maxHistorySize + 1), state.count],
    })),

  reset: () =>
    set((state) => ({
      count: 0,
      history: [...state.history.slice(-state.maxHistorySize + 1), state.count],
    })),

  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state
      const previousCount = state.history[state.history.length - 1]
      return {
        count: previousCount,
        history: state.history.slice(0, -1),
      }
    }),
}))
