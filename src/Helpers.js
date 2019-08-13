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

export default fixString;
