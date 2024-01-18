export function calculatePercentage(
  fabricatedAt: Date,
  expiredAt: Date,
  target: Date,
) {
  const expirationTime = expiredAt.getTime() - fabricatedAt.getTime()
  const targetCalc = target.getTime() - fabricatedAt.getTime()
  const expirationPercentage = (100 * targetCalc) / expirationTime
  return 100 - expirationPercentage
}
