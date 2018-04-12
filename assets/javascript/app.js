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
var timeoutID;
var counter;
var $answerText = '<p "class=answerText"></p>';
var $contentDiv = '<div class="contentDiv">' + 
                     '<h3 class="timerText">Time Remaining <span class="countdown">0</span></h3>' + 
                     '<p class="questionText"></p>' +
                  '</div>';

var $optionsList = '<ul class="optUl">' +
                        '<li class="option1 option"></li>'+ 
                        '<li class="option2 option"></li>'+ 
                        '<li class="option3 option"></li>'+ 
                        '<li class="option4 option"></li>'+ 
                    '</ul>'; 
var $restartButton = '<button id="restart">Restart</button>';

// startGame();


// function startGame(){
    $("#start").on("click",function () { 
        $(this).remove();
        $(".container").append( $contentDiv);
        ChooseRandomQues();
    });
// }

function ChooseRandomQues() {
    var keys = Object.keys(trivia);
    ranQuestion = keys[Math.floor(Math.random() * keys.length)];
    gameOn();
    // ChooseRandomQues();
    // if (pastQuestions.indexOf(ranQuestion) === -1) {
    //     pastQuestions.push(ranQuestion);
    //     gameOn();
    // } else {
    //     ChooseRandomQues();
    // }
}


function gameOn(){
    $(".contentDiv").append( $optionsList);
        var ques = (trivia[ranQuestion].question);
        var opt = trivia[ranQuestion].options;
        ans = trivia[ranQuestion].answer;
        $(".questionText").text(ques);
        $(".option1").text(opt[0]);
        $(".option2").text(opt[1]);
        $(".option3").text(opt[2]);
        $(".option4").text(opt[3]);
        counter = 10;
        timingIt();
        // takeAnswer();
    }


        
    $('.container').on("click", "li", function () {
        clearIt ();
        $("ul, li").remove();
        if($(this).text() == ans){
            $(".questionText").text("Correct!");
            waitForFewSec ();
            // trackQuestions(); 
        }else{
            $(".questionText").text("Wrong! The correct answer was " + ans);
            waitForFewSec ();
            // trackQuestions();
        }   
    });




function trackQuestions(){
    quesCounter += 1;
    if(quesCounter === Object.keys(trivia).length){
        $(".questionText").text("You got "+ correct + " correct!");
        // reset();
    }else{
         waitForFewSec ();      
    }
}


function timingIt () {
	coundown = setInterval(trackTimer,1000);
}

function waitForFewSec () {
	setInterval(ChooseRandomQues ,5000);
}

function trackTimer(){
    counter--;
    $(".countdown").text(counter);
	if (counter === 0) {
        $("ul, li").remove();
        $(".timerText").text("Your time is out!");
        $(".questionText").text("The correct answer was " + ans);
        clearIt ();        
	}
}

function clearIt () {
clearInterval(coundown);
}


function reset(){
    $(".contentDiv").remove();
    $(".container").append($restartButton);
    $("#restart").on("click",function(){
    $(this).remove();
      pastQuestions = []; 
      $(".container").append( $contentDiv);
      ChooseRandomQues();  
    });
  }

