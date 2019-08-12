function decode(string) {
  let newString = decodeURIComponent(string);
  return newString;
}

function fixString(data) {
  let questions = [];
  let correctAns = [];
  let incorrectAns = [];
  data.map(d => {
    let q = decode(d.question);
    let ca = decode(d.correct_answer);
    let ica = d.incorrect_answers.map(ia => decode(ia));

    questions.push(q);
    correctAns.push(ca);
    incorrectAns.push(ica);
  });

  let decoded = {
    questions: questions,
    correctAns: correctAns,
    incorrectAns: incorrectAns
  };
  console.log(decoded);
  return decoded;
}

export default fixString;
