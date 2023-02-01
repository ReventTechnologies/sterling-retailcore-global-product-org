// function camelize(str) {
//   return str
//     .replace(/[^a-z0-9]/gi, ' ')
//     .toLowerCase()
//     .split(' ')
//     .map((el, ind) => (ind === 0 ? el : el[0].toUpperCase() + el.substring(1, el.length)))
//     .join('')
// }

// console.log(camelize('firsT name'))

const a = ['films', 'film', 'some other', 'Prince', 'Bonaventure']
const b = ['film', 'king', 'Bonaventure', 'Ebuka', '']

const newArray = []

function matchValues(arr, matcher) {
  return arr.forEach((valueInsideA) => {
    const foundValue = matcher.find((valueInsideB) => valueInsideA === valueInsideB)

    if (!foundValue) {
      newArray.push(valueInsideA)
    }
  })
}

matchValues(a, b)
console.log(newArray)
