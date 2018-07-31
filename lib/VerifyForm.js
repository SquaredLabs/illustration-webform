const keysToCheck = [
  "description",
  "contactName",
  "contactEmail",
  "contactPhone",
  "KFS"
]
function verify(data) {
  for (let key of keysToCheck) {
    if (!data[key] || data[key] === "") return `Missing Field: ${key}`
  }
  return 0
}
export default verify
