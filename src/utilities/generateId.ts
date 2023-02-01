export function generateID() {
  let id = new Date().getTime().toString() + Math.floor(Math.random() * 1000000000000)
  return id.slice(0, 10) + id.slice(10, 20)
}
