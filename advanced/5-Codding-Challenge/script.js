// function Question(question, answers, correct) {
//   this.question = question;
//   this.answers = answers;
//   this.correct = correct;
// }

// Question.prototype.displayQuestion = function() {
//   console.log(this.question);
//   for(var i = 0; i< this.answers.length; i++) {
//     console.log(i+': '+this.answers[i]);
//   }
// }

// Question.prototype.checkAnswer = function (ans) {
//   if(ans === this.correct) {
//     console.log('Correct answer!');
//   } else {
//     console.log('Wrong answer');
//   }
// }

// var q1 = new Question('Is JS collest programming language?', [
//   'Yes',
//   'No'
// ], 0);

// var q2 = new Question('What is my name?', [
//   'Iskan',
//   'Iskandar aka',
//   'Iskandar'
// ], 1);

// var q3 = new Question('Describe codding?', [
//   'boring',
//   'hard',
//   'tedious'
// ], 1);

// var questions = [q1, q2, q3];
// var n = Math.floor(Math.random() * questions.length);

// questions[n].displayQuestion();

// var answer = parseInt(prompt('Please select the correct answer'));

// questions[n].checkAnswer(answer);  


function Question(question, answers, correct) {
  this.question = question;
  this.answers = answers;
  this.correct = correct;
}

Question.prototype.displayQuestion = function() {
  console.log(this.question);
  for(var i = 0; i< this.answers.length; i++) {
    console.log(i+': '+this.answers[i]);
  }
}

Question.prototype.checkAnswer = function (ans, callback) {
  var sc;
  if(ans === this.correct) {
    console.log('Correct answer!');
    sc = callback(true);
  } else {
    console.log('Wrong answer');
    sc = callback(false);
  }
  this.displayScore(sc);
}

Question.prototype.displayScore = function (score) {
  console.log('Your current score '+ score + '-----------------');
}

var q1 = new Question('Is JS collest programming language?', [
  'Yes',
  'No'
], 0);

var q2 = new Question('What is my name?', [
  'Iskan',
  'Iskandar aka',
  'Iskandar'
], 1);

var q3 = new Question('Describe codding?', [
  'boring',
  'hard',
  'tedious'
], 1);

function score() {
  var sc = 0;
  return function (correct) {
    if(correct) {
      sc ++;
    }
    return sc;
  }
}
var keepScore = score();
var questions = [q1, q2, q3];
function nextQuestion () {
  
  var n = Math.floor(Math.random() * questions.length);
  
  questions[n].displayQuestion();
  
  var answer =prompt('Please select the correct answer');
  
  if(answer !== 'exit') {
    questions[n].checkAnswer(parseInt(answer), keepScore);  
    nextQuestion();
  }

}


nextQuestion();