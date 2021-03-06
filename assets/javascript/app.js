var quesCounter = 0;
var correct = 0;
var wrong = 0;
var index = 0;
var unanswered = 0;
var countdown;
var counter;

//===============================================================/
//             Dynamic page contents to be loaded
//===============================================================/
var $answerText = '<p "class=answerText"></p>';
var $contentDiv = '<div class="contentDiv">' +
    '<span class="timerText">Time Remaining: </span><span class="countdown">0</span><span class="second"> seconds</span>' +
    '<p class="questionText"></p>' +
    '</div>';

var $optionsList = '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mx-auto">'+
        '<ul>' +
                '<li class="option1 option"></li>' +
                '<li class="option2 option"></li>' +
                '<li class="option3 option"></li>' +
                '<li class="option4 option"></li>' +
        '</ul>'+
    '</div>';

var $results = '<ul>' +
    '<li class="results correct"></li>' +
    '<li class="results wrong"></li>' +
    '<li class="results unanswered"></li>' +
    '</ul>';

var $image = '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mx-auto">'+
                    '<img src="" class="image" alt="image">' +
            '</div>'+ '<br>';
var $loading = '<img src="assets/images/loading.gif" class="loading" alt="loading">' + '<br>';
var $next = '<p class="next">Loading next question...</p>';
var $restartButton = '<button id="restart">Restart</button>';

//===============================================================/
//                     GAME FUNCTIONS
//===============================================================/

//this function listens for click even to start the game
$("#start").on("click", function () {
    $(this).remove();
    $(".sub-content").append($contentDiv);
    setUpQuestion();
});

//setup questions set from the array of objects
function setUpQuestion() {
    $("br").remove();
    $(".next").remove();
    $(".loading").remove();
    $(".image").remove();
    $(".contentDiv").append($optionsList);
    $(".questionText").text(trivia[index].question);
    $(".option1").text(trivia[index].options[0]);
    $(".option2").text(trivia[index].options[1]);
    $(".option3").text(trivia[index].options[2]);
    $(".option4").text(trivia[index].options[3]);
    $(".timerText").text("Time Remaining: ");
    $(".second").text(" seconds");
    counter = 30;
    $(".countdown").text(counter);
    countdown = setInterval(trackTimer, 1000);
}


//tracks and updates the counter
function trackTimer() {
    counter--;
    $(".timerText").text("Time Remaining: ");
    if (counter < 10) {
        counter = "0" + counter;
    }
    $(".countdown").text(counter);
    $(".second").text(" seconds");
    if (counter == "0" + 0) {
        unanswered++;
        $("ul, li").remove();
        $(".timerText").text("Your time is out! ");
        $(".second").text(" second");
        $(".questionText").text("The correct answer was " + trivia[index].answer + ".");
        stopInterval();
        imageManager();
    }
}

//clears the timeInterval betwwen questions
function stopInterval() {
    clearInterval(countdown);
}


//listens for Click events for user answer
$('.sub-content').on("click", "li", function () {
    stopInterval();
    $("ul, li").remove();
    if ($(this).text() == trivia[index].answer) {
        correct++;
        $(".questionText").text("Correct!");
        imageManager();
    } else {
        wrong++;
        $(".questionText").text("Wrong! The correct answer was: " + trivia[index].answer + ".");
        imageManager();
    }
});

//manages the images
function imageManager() {
    $(".contentDiv").append($image).append($loading).append($next);
    $(".image").attr("src", trivia[index].image);
    $(".image").fadeIn(3000, function () {
        setTimeout(trackQuestions, 3000);
    });
}

//tracks and update questions status
function trackQuestions() {
    quesCounter += 1;
    if (quesCounter === trivia.length) {
        $(".image").remove();
        $(".next").remove();
        $(".contentDiv").append($results);
        $(".questionText").text("The end, here is your result:");
        $(".correct").text("Correct Answers: " + correct);
        $(".wrong").text("Incorrect Answers: " + wrong);
        $(".unanswered").text("Unanswered: " + unanswered);
        $(".contentDiv").append($restartButton);
    } else {
        index++;
        setUpQuestion();
    }
}

//Reset the game
$(".sub-content").on("click", "button", function () {
    $(this).remove();
    $("ul, li").remove();
    correct = 0;
    quesCounter = 0;
    index = 0;
    setUpQuestion();
});