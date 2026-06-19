declare module "culori" {
  export function oklch(color: string): { l: number; c: number; h?: number; mode: "oklch" }
  export function formatHex(color: string): string
  export function formatHex(color: { mode: string; l?: number; c?: number; h?: number; s?: number; v?: number }): string
  export function hsv(color: string): { h: number; s: number; v: number }
  export function random(mode: string): { mode: string; l: number; c: number; h: number }
  export function wcagLuminance(color: string): number
  export function wcagContrast(bg: string, fg: string): number
}
