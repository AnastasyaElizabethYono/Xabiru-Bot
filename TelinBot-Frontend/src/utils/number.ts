function getRandomInt(min: number, max: number) {
  min = Math.ceil(min); // Ensure the minimum is rounded up to the nearest whole number
  max = Math.floor(max); // Ensure the maximum is rounded down to the nearest whole number
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

export { getRandomInt };
