import type { ReactNode } from "react"
import {
  DesignTokensContext,
  DesignTokensDispatchContext,
  useDesignTokensStore,
} from "./design-tokens-store"

export function DesignTokensProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useDesignTokensStore()

  return (
    <DesignTokensContext.Provider value={state}>
      <DesignTokensDispatchContext.Provider value={dispatch}>
        {children}
      </DesignTokensDispatchContext.Provider>
    </DesignTokensContext.Provider>
  )
}
