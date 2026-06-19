export const PROTANOPIA_MATRIX = [
  0.567, 0.433, 0, 0, 0,
  0.558, 0.442, 0, 0, 0,
  0, 0.242, 0.758, 0, 0,
  0, 0, 0, 1, 0,
].join(" ")

export const DEUTERANOPIA_MATRIX = [
  0.625, 0.375, 0, 0, 0,
  0.7, 0.3, 0, 0, 0,
  0, 0.3, 0.7, 0, 0,
  0, 0, 0, 1, 0,
].join(" ")

export const TRITANOPIA_MATRIX = [
  0.95, 0.05, 0, 0, 0,
  0, 0.433, 0.567, 0, 0,
  0, 0.475, 0.525, 0, 0,
  0, 0, 0, 1, 0,
].join(" ")

export type CVDType = "protanopia" | "deuteranopia" | "tritanopia"

export function getCVDMatrix(type: CVDType): string {
  switch (type) {
    case "protanopia":
      return PROTANOPIA_MATRIX
    case "deuteranopia":
      return DEUTERANOPIA_MATRIX
    case "tritanopia":
      return TRITANOPIA_MATRIX
  }
}

export function getCVDFilterId(type: CVDType): string {
  return `${type}-filter`
}
