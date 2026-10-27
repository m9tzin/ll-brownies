type ClassValue = string | false | null | undefined

/** Junta classes ignorando valores vazios: cn("a", cond && "b"). */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
