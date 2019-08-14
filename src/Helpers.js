function decode(string) {
  let newString = decodeURIComponent(string);
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
    let q = decode(d.question);
    let ca = decode(d.correct_answer);
    let ica = d.incorrect_answers.map(ia => decode(ia));

    questions.push(q);
    correctAns.push(ca);
    incorrectAns.push(ica);

    let strCount = "Q" + count.toString();
    eachQ.push([q, ca, ica]);

    count++;
  });

  let decoded = {
    ready: eachQ
  };
  console.log("decoded", decoded);
  return decoded;
}

function shuffle(array) {
  var currentIndex = array.length,
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

// Used like so
// var arr = [2, 11, 37, 42];
// arr = shuffle(arr);
// console.log(arr);

export default fixString;

export { shuffle };
