const questions = [
   {
      question: "What does CSS stand for?",
      answers: [
          {text:"Computer Style Sheets", correct:false},
          {text:"Cascading Style Sheets", correct:true},
          {text:"Creative Style System", correct:false},
          {text:"Colorful Style Sheets", correct:false}
      ]

   },
   {
    question: "Which HTML tag is used to apply internal CSS?",
      answers: [
          {text:"css", correct:false},
          {text:"script", correct:false},
          {text:"style", correct:true},
          {text:"link", correct:false}
      ]
   },
   {
     question: "Which property is used to change text color?",
       answers : [
          {text:"font-color", correct:false},
          {text:"text-color", correct:false},
          {text:"color", correct:true},
          {text:"background-color", correct:false}
       ]
   },
   {
    question: "How do you select an element with id 'container'?",
    answers: [
      { text: ".container", correct: false },
      { text: "#container", correct: true },
      { text: "*container", correct: false },
      { text: "container", correct: false }
    ]
   }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
   currentQuestionIndex = 0;
   score = 0;
    nextButton.style.display = "none";
   showQuestion();
}
function showQuestion(){
  resetState();
   let currentQuestion = questions[currentQuestionIndex];
   let questionNo = currentQuestionIndex+1;
   questionElement.innerHTML = questionNo + " . "+currentQuestion.question;


   currentQuestion.answers.forEach(answer => {
       const button = document.createElement("button");
       button.innerHTML = answer.text;
       button.classList.add("btn");
       if(answer.correct){
        button.dataset.correct = answer.correct;
       }
       button.addEventListener("click",selectAnswer);
           answerButtons.appendChild(button);
   });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
  }

function selectAnswer(e){
    const selectedBtn =e.target;
    const isCorrect =selectedBtn.dataset.correct === "true";
    if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
    } else{
      selectedBtn.classList.add("incorrect");
    }

  Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

  });

  nextButton.style.display = "block";

}
function showScore(){
   resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton(){
   currentQuestionIndex++;
   if(currentQuestionIndex< questions.length){
     showQuestion();
   }else{
    showScore();
   }
}
nextButton.addEventListener("click",()=>{
   if (currentQuestionIndex < questions.length) {
      handleNextButton();
     }else{
        startQuiz();
     }  
   
  
});
 startQuiz();
