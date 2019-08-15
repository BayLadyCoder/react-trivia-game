// To  decode String URLs
function decode(string) {
  const newString = decodeURIComponent(string);
  return newString;
}

// Select, decode, and organize the (only) data that we need from API request
function fixString(data) {
  let eachQ = [];

  data.map(d => {
    const q = decode(d.question);
    const ca = decode(d.correct_answer);
    const ica = d.incorrect_answers.map(ia => decode(ia));

    eachQ.push([q, ca, ica]);
  });

  const decoded = {
    ready: eachQ
  };
  console.log("decoded", decoded);
  return decoded;
}

// To Shuffle array to make all answers order randomly
// Return a shuffled array
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;

  while (0 !== currentIndex) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Return a random element from an array
// (this function only use for emoji array in this program)
function randomEmoji(arr) {
  const randIndex = Math.floor(Math.random() * arr.length);
  const emoji = arr[randIndex];
  return emoji;
}

export default fixString;

export { shuffle, randomEmoji };
