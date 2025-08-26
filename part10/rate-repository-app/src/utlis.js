const numberSuffixValues = [
  { value: 1000000, suffix: "m" },
  { value: 1000, suffix: "k" }
].sort((a, b) => b.value - a.value)

export const numberToSimplifiedString = (number) => {
  for (let suffixValue of numberSuffixValues) {
    if (number >= suffixValue.value)
      return (number / suffixValue.value).toFixed(1) + suffixValue.suffix
  }
  return number.toString()
}