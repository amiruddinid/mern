export function getRandomNumbers(length) {
    const numbers = [];
    for (let i = 0; i < length; i++) {
      numbers.push(Math.floor(Math.random() * 100) + 1);
    }
    console.log(numbers)
    return numbers;
}