// let questions = [];
// let index = 0;
// let score = 0;
// let totalTime = 600;
// let timerInterval;

// let startBtn = document.getElementById("startBtn");
// let quizBox = document.getElementById("quizBox");
// let questionDiv = document.getElementById("question");
// let optionsForm = document.getElementById("optionsForm");
// let progressBar = document.getElementById("progressBar");
// let timer = document.getElementById("timer");

// startBtn.onclick = function () {
//   startBtn.style.display = "none";
//   quizBox.style.display = "block";
//   startTimer();
//   fetchQuiz();
// };

// function fetchQuiz() {
//   fetch("https://opentdb.com/api.php?amount=20")
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       questions = data.results;
//       showQuestion();
//     });
// }

// function showQuestion() {
//   let q = questions[index];
//   questionDiv.innerHTML = "Q" + (index + 1) + ": " + decodeHTML(q.question);

//   let answers = q.incorrect_answers.concat(q.correct_answer);
//   answers.sort(function () { return 0.5 - Math.random(); });

//   optionsForm.innerHTML = "";
//   for (let i = 0; i < answers.length; i++) {
//     let option = decodeHTML(answers[i]);

//     let label = document.createElement("label");
//     label.className = "option-label";

//     let input = document.createElement("input");
//     input.type = "radio";
//     input.name = "option";
//     input.value = option;
//     input.onclick = function () {
//       handleSelect(option, q.correct_answer);
//     };

//     label.appendChild(input);
//     label.appendChild(document.createTextNode(option));
//     optionsForm.appendChild(label);
//   }

//   updateProgress();
// }

// function handleSelect(selected, correct) {
//   if (selected === correct) {
//     score++;
//   }
//   index++;
//   setTimeout(function () {
//     if (index < questions.length) {
//       showQuestion();
//     } else {
//       endQuiz();
//     }
//   }, 300); // Small delay for user experience
// }

// function updateProgress() {
//   let percent = ((index) / questions.length) * 100;
//   progressBar.style.width = percent + "%";
// }

// function startTimer() {
//   timerInterval = setInterval(function () {
//     totalTime--;
//     let min = Math.floor(totalTime / 60);
//     let sec = totalTime % 60;
//     timer.innerHTML = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);

//     if (totalTime <= 0) {
//       clearInterval(timerInterval);
//       endQuiz();
//     }
//   }, 1000);
// }

// function endQuiz() {
//   clearInterval(timerInterval);
//   Swal.fire({
//     title: "Quiz Finished!",
//     html: "Your Score: <b>" + score + "</b> out of <b>" + questions.length + "</b>",
//     icon: "success",
//     confirmButtonText: "Restart Quiz",
//     showCancelButton: true,
//     cancelButtonText: "Exit"
//   }).then(function (result) {
//     if (result.isConfirmed) {
//       location.reload();
//     }
//   });
// }

// function decodeHTML(html) {
//   let txt = document.createElement("textarea");
//   txt.innerHTML = html;
//   return txt.value;
// }



let questions = [];
let index = 0;
let score = 0;
let totalTime = 600;
let timerInterval;

let startBtn = document.getElementById("startBtn");
let quizBox = document.getElementById("quizBox");
let questionDiv = document.getElementById("question");
let optionsForm = document.getElementById("optionsForm");
let nextBtn = document.getElementById("nextBtn");
let progressBar = document.getElementById("progressBar");
let timer = document.getElementById("timer");

startBtn.onclick = function () {
  startBtn.style.display = "none";
  quizBox.style.display = "block";
  startTimer();
  fetchQuiz();
};

function fetchQuiz() {
  fetch("https://opentdb.com/api.php?amount=20")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      questions = data.results;
      showQuestion();
    });
}

function showQuestion() {
  let q = questions[index];
  questionDiv.innerHTML = "Q" + (index + 1) + ": " + decodeHTML(q.question);

  let answers = q.incorrect_answers.concat(q.correct_answer);
  answers.sort(function () { return 0.5 - Math.random(); });

  optionsForm.innerHTML = "";

  answers.forEach(function (answer) {
    let option = decodeHTML(answer);

    let label = document.createElement("label");
    label.className = "option-label";

    let input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.value = option;

    input.onclick = function () {
      updateProgress(); // ✅ Update progress on selection
    };

    label.appendChild(input);
    label.appendChild(document.createTextNode(option));
    optionsForm.appendChild(label);
  });
}

nextBtn.onclick = function () {
  let selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    Swal.fire("Please select an answer before continuing.");
    return;
  }

  let correct = decodeHTML(questions[index].correct_answer);
  if (selected.value === correct) {
    score++;
  }

  index++;

  if (index < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
};

function updateProgress() {
  let percent = ((index + 1) / questions.length) * 100;
  progressBar.style.width = percent + "%";
}

function startTimer() {
  timerInterval = setInterval(function () {
    totalTime--;
    let min = Math.floor(totalTime / 60);
    let sec = totalTime % 60;
    timer.innerHTML = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);

    if (totalTime <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  Swal.fire({
    title: "Quiz Completed!",
    html: "Your Score: <b>" + score + "</b> / <b>" + questions.length + "</b>",
    icon: "success",
    confirmButtonText: "Restart Quiz",
    showCancelButton: true,
    cancelButtonText: "Exit"
  }).then(function (result) {
    if (result.isConfirmed) {
      location.reload();
    }
  });
}

function decodeHTML(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
