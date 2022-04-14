export function shuffleArray(array) {
  let shuffledArray = [];

  if (array.length) {
    shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[rand]] = [
        shuffledArray[rand],
        shuffledArray[i],
      ];
    }
  }

  return shuffledArray;
}

export function getRandomNumbers() {
  const num1 = Math.floor(Math.random() * 10 + 1);
  const num2 = Math.floor(Math.random() * 10 + 1);

  if (num1 === num2) {
    getRandomNumbers();
  }

  return { num1, num2 };
}
