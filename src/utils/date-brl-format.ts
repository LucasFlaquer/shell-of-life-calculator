export function createDateFromBRLFormat(dateString: string) {
  const [day, month, year] = dateString.split('/').map(Number)
  const date = new Date(
    `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`,
  )
  return date.getTime()
}
