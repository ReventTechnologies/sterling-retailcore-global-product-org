export function compareTwoArrays(base: Array<string>, comparedWith: Array<string>) {
  return base.every((v) => comparedWith.includes(v.trim()))
}
