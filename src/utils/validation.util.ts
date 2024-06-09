export const isEven = (...numbers: number[]) => {
  return numbers.every(number => number % 2 === 0)
}

export const isOdd = (...numbers: number[]) => {
  return numbers.every(number => number % 2 !== 0)
}
