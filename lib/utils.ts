export function formatDate(dateString?: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export function formatDateRange(start?: string, end?: string, current?: boolean): string {
  const startStr = formatDate(start)
  if (current) {
    return `${startStr} — Present`
  }
  const endStr = formatDate(end)
  if (!endStr) return startStr
  return `${startStr} — ${endStr}`
}