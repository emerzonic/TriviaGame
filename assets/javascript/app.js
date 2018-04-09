var trivia = {
    test1:{
        question:"What is your name?",
        options:["John","Paul","Joe","Ed"],
        answer:"Ed"},
    test2:{
        question:"What is your age?",
        options:[20,30,40,50],
        answer:30},
    test3:{
        question:"What is your color?",
        options:["Red","Blue","Green","Yellow"],
        answer:"Green"},
    test4:{
        question:"What is your sport?",
        options:["Basketball","Soccer","Golf","Tennis"],
        answer:"Soccer"}
};
var pastQuestions = [];

var ans;
var ranQuestion;
var quesCounter = 0;
var correct = 0;
// var timeoutID;
var $answerText = '<p "class=answerText"></p>'
var $contentDiv = '<div class="contentDiv">' + 
                     '<h3 class="timerText">Time Remaining <span class="countdown">0</span></h3>' + 
                     '<p class="questionText"></p>' +
                  '</div>';

var $optionsList = '<ul class="optUl">' +
                        '<li class="option1"></li>'+ 
                        '<li class="option2"></li>'+ 
                        '<li class="option3"></li>'+ 
                        '<li class="option4"></li>'+ 
                    '</ul>'; 
var $restartButton = '<button id="restart">Restart</button>'

startGame();

function startGame(){
    $("#start").on("click",function () { 
        $(this).remove();
        $(".container").append( $contentDiv);
        ChooseRandomQues();
    })
}

function ChooseRandomQues() {
    var keys = Object.keys(trivia);
    ranQuestion = keys[Math.floor(Math.random() * keys.length)];
    if (pastQuestions.indexOf(ranQuestion) === -1) {
        pastQuestions.push(ranQuestion);
        gameOn();
    } else {
        ChooseRandomQues();
    }
}


function gameOn(){
    $(".contentDiv").append( $optionsList);
        const ques = (trivia[ranQuestion].question);
        const opt = trivia[ranQuestion].options;
        ans = trivia[ranQuestion].answer;
        $(".questionText").text(ques);
        $(".option1").text(opt[0]);
        $(".option2").text(opt[1]);
        $(".option3").text(opt[2]);
        $(".option4").text(opt[3]);
        takeAnswer();
        }

function takeAnswer() {
    $("li").on("click", function () { 
        $("ul, li").remove();
        if($(this).text() == ans){
            $(".questionText").text("Correct!");
            correct+= 1;
            trackQuestions();
        }else{
            $(".questionText").text("Wrong!");
            // $(".contentDiv").append($answerText);
            // $(".answerText").text("The correct answer was: " + ans);
            trackQuestions();
        }   
    })
}

function trackQuestions(){
    quesCounter += 1;
    if(quesCounter === Object.keys(trivia).length){
        setInterval(ChooseRandomQues,5000) 
        $(".questionText").text("You got "+ correct + " correct!");
        setInterval(ChooseRandomQues,5000)
        reset();
    }else{
        setInterval(ChooseRandomQues,5000) 
    }
}

function reset(){
  $(".contentDiv").remove();
  $(".container").append($restartButton);
  $("#restart").on("click",function(){
  $(this).remove();
    pastQuestions = []; 
    $(".container").append( $contentDiv);
    ChooseRandomQues();  
  })
}

