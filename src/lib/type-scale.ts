export type TypeScaleId = "compact" | "balanced" | "editorial"

export interface SemanticTypeScale {
  display: number
  h1: number
  h2: number
  h3: number
  bodyLarge: number
  body: number
  small: number
  label: number
  code: number
}

export const TYPE_SCALES: Record<TypeScaleId, SemanticTypeScale> = {
  compact: {
    display: 42,
    h1: 34,
    h2: 26,
    h3: 20,
    bodyLarge: 16,
    body: 14,
    small: 12,
    label: 11,
    code: 12,
  },
  balanced: {
    display: 52,
    h1: 40,
    h2: 30,
    h3: 22,
    bodyLarge: 18,
    body: 16,
    small: 14,
    label: 12,
    code: 13,
  },
  editorial: {
    display: 64,
    h1: 48,
    h2: 36,
    h3: 26,
    bodyLarge: 20,
    body: 17,
    small: 14,
    label: 12,
    code: 14,
  },
}

export function getTypeScale(id: TypeScaleId): SemanticTypeScale {
  return TYPE_SCALES[id]
}
