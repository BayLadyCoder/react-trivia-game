function decode(string) {
  const newString = decodeURIComponent(string);
  return newString;
}

function fixString(data) {
  let questions = [],
    correctAns = [],
    incorrectAns = [],
    eachQ = [],
    allQ = [];
  let count = 1;

  data.map(d => {
    const q = decode(d.question);
    const ca = decode(d.correct_answer);
    const ica = d.incorrect_answers.map(ia => decode(ia));

    questions.push(q);
    correctAns.push(ca);
    incorrectAns.push(ica);

    const strCount = "Q" + count.toString();
    eachQ.push([q, ca, ica]);

    count++;
  });

  const decoded = {
    ready: eachQ
  };
  console.log("decoded", decoded);
  return decoded;
}

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function randomEmoji(arr) {
  const randIndex = Math.floor(Math.random() * arr.length);
  const emoji = arr[randIndex];
  return emoji;
}

export default fixString;

export { shuffle, randomEmoji };
