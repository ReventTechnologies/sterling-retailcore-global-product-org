let array1 = [1, 2, 3],
  array2 = [1, 2, 3, 4],
  array3 = [1, 2]

export function compareTwoArrays(base: Array<string>, comparedWith: Array<string>) {
  return base.every((v) => comparedWith.includes(v.trim()))
}

// console.log(checker(array2, array1));  // true
// console.log(checker(array3, array1));
