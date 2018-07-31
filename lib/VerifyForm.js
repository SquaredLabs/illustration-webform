const keysToCheck = [
  "description",
  "contactName",
  "contactEmail",
  "contactPhone",
  "KFS"
]
function verify(data) {
  for (let index in keysToCheck) {
    // For some reason, a for...of loop will crash
    let key = keysToCheck[index]
    if (key === "KFS" && data.cover) continue
    if (!data[key] || data[key] === "") return `Missing Field: ${key}`
  }
  return 0
}

module.exports = verify;
