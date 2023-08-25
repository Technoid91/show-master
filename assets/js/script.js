

let showPicker = document.getElementsByClassName('show');
for (show of showPicker){
    show.addEventListener('click', function(event) {
        let userChoice = event.currentTarget.classList[1];
        quizTitle(userChoice);
        runGame(userChoice);
    });
}

/*
* Function to pick the question pool based on user's choice
*/
function runGame(pickedShow){

    /* define question list to show based on class of picked show image*/
    if (pickedShow === 'himym'){
        currentQuiz = himymQuiz;
    } else if (pickedShow === 'tbbt'){
        currentQuiz = tbbtQuiz;
    } else if (pickedShow === 'friends'){
        currentQuiz = friendsQuiz;
    } else {
        console.log(`Wrong show! ${pickedShow} does not exist`);
        throw(`Wrong show! ${pickedShow} does not exist`);
    }

    /* Hide show picker field with show posters and show quiz field */
    let pickerField = document.getElementsByClassName('show-picker')[0];
    let quizField = document.getElementsByClassName('quiz-field')[0];
    pickerField.setAttribute('hidden', 'true');
    quizField.removeAttribute('hidden');

    /* Show first question */
    /*askQuestion(currentQuiz[0]);*/

    /* Add event listener for submit button to show next question*/

    askQuestion(currentQuiz[0]);
    let submitButton = document.getElementsByTagName('button')[0];
    submitButton.addEventListener('click', function(){
        questionNumber = Number(document.getElementsByClassName('question-number')[0].textContent);
        console.log('Question: '+questionNumber);
        if (document.getElementsByClassName('user-answer').length > 0){
            console.log('Check question: '+(questionNumber-1));
            checkAnswer(currentQuiz[questionNumber-1][1]);
            if (questionNumber > 4){
                quizResult();
            }
            else{
                submitButton.classList.remove('active-button');
                askQuestion(currentQuiz[questionNumber]);
            }
        }else{
            alert('Please pick the answer and than hit "Submit Answer"');
        }

    });

}

/*
* Change h2 element to the show title
*/

function quizTitle(show){
    let quizTitle = '';
    switch (show){
        case 'himym':
            quizTitle = '"How I Met Your Mother"';
            break;
        case 'tbbt':
            quizTitle = '"The Big Bang Theory"';
            break;
        case 'friends':
            quizTitle = '"Friends"';
            break;
    }
    document.getElementsByTagName('h2')[0].textContent = quizTitle;
}

function askQuestion(questionData){

    // get all question data from the list
    let question = questionData[0];
    let allAnswers = [questionData[1], questionData[2], questionData[3], questionData[4]];
    let imgName;

    // randomize answers to show because the first one is always correct
    let answers = randomizeList(allAnswers);

    let img = document.getElementById('question-img');

    // check if image name is specified in the list by its length
    if (questionData.length > 5){
        img.src = 'assets/images/'+questionData[5];
        img.alt = 'Question supporting image without any clues';
    }
    else{
        img.src = 'assets/images/no-img.png';
        img.alt = 'No supporting image for this question';
    }

    // show corresponding image
    let questImage = document.getElementsByClassName('quiz-image')[0];
    questImage.innerHTML = '';
    questImage.appendChild(img);

    // show question
    document.getElementsByClassName('question')[0].textContent = question;

    // show answers
    questionAnswers = document.getElementsByClassName('answer');
    for (let i = 0; i < answers.length; i++){
        questionAnswers[i].textContent = answers[i];

        // add event listener to highlight hovered and chosen answer
        questionAnswers[i].addEventListener('click', function(event){
            let oldChoice = document.getElementsByClassName('user-answer');
            // if user changed his mind - remove highlight
            if (oldChoice){
                for (each of oldChoice){
                    each.classList.remove('user-answer');
                }
            questionAnswers[i].classList.add('user-answer');
            }
            // if user picked the answer - make submit button active
            let submit = document.getElementsByTagName('button')[0];
            submit.classList.add('active-button');
        });
    }
}

function checkAnswer(correctAnswer){
    console.log("ANSWER TO CHECK: "+correctAnswer);

    let answerElement = document.getElementsByClassName('user-answer')[0];
    let userAnswer = answerElement.textContent;
    console.log(`User picked ${userAnswer}`);
    console.log(`Correct answer: ${correctAnswer}`);
    if (userAnswer === correctAnswer){
        userScore(true);
    }
    else{
       userScore(false);
    }
    answerElement.classList.remove('user-answer');
    let nextQuestion = Number(document.getElementsByClassName('question-number')[0].textContent);
    nextQuestion++;
    console.log('Next question: '+nextQuestion);
    document.getElementsByClassName('question-number')[0].textContent = nextQuestion;
}

function userScore(action){
    let scoreCounter = document.getElementsByClassName('user-score')[0];
    let score = Number(scoreCounter.textContent);
    if (action === true) {
        score+=100;
    }
    else{
        score-=50;
    }
    scoreCounter.textContent = score;

}

function quizResult(){
    // Change field to the one with user score
    let quizField = document.getElementsByClassName('quiz-field')[0];
    let resultField = document.getElementsByClassName('result-field')[0];
    quizField.setAttribute('hidden', true);
    resultField.removeAttribute('hidden');

    // Define how well user passed the quiz
    let userRange;
    let totalScore = Number(document.getElementsByClassName('user-score')[0].textContent);
    document.getElementsByClassName('final-score')[0].textContent = totalScore;
    if (totalScore > 450){
        userRange = "golden";
    } else if (totalScore > 300){
        userRange = "silver";
    } else if (totalScore > 1 ){
        userRange = "bronze";
    } else {
        userRange: "Beginner";
        // if user has 0 or less scores
        document.getElementsByClassName('score-field')[0].setAttribute('hidden', true);
        document.getElementsByClassName('user-data')[0].setAttribute('hidden', true);
        document.getElementsByTagName('button')[2].setAttribute('hidden', true);
        document.getElementsByClassName('cheer-up')[0].removeAttribute('hidden');
    }
    document.getElementsByClassName('score-range')[0].textContent = userRange;
    document.getElementsByClassName('score-field')[0].classList.add('range-'+userRange);

    let inputField = document.getElementById('username');
    let certButton = document.getElementsByClassName('cert-button')[0];

    inputField.addEventListener('input', function(){
        // get value from user input field
        let userInput = inputField.value;
        // check if input contains digits
        let digits = /\d/.test(userInput);

        // input should be at least 4 characters without numbers
        if (userInput.length > 3 && !digits){
            certButton.classList.add('active-button');
        }
        else{
            certButton.classList.remove('active-button');
        }
    })

    certButton.addEventListener('click', function(){
        let userName = inputField.value;
        if (document.getElementsByClassName('active-button').length > 2){
            window.open("cert.html", "_blank");
        }
        else{
            alert('Please enter your name. It should be at lest 4 letters without numbers. For example: Tony');
        }

    })

    let restartButton = document.getElementsByTagName('button')[1];
    restartButton.addEventListener('click', function(){
        window.location.reload();
        /*window.open("cert.html", "_blank");*/
    })
}

function randomizeList(initial){

    let newList = [];
    for (let i = initial.length; i > 0; i--){
        let randNum = Math.floor(Math.random() * (i));
        element = initial.splice(randNum, 1)[0];
        newList.push(element);
    }
    return newList;
}

let himymQuiz = [
    ["What thing Ted stole from the restaurant several times to impress Robin?",
    "Blue french horn",
    "Green lantern",
    "Weird picture",
    "Robin's purse",
    "test-img.png"],
    ["How called the Marshal's and Barney's annual tradition?",
    "Slapsgiving Day",
    "St Barney's Day",
    "Desperate ",
    "Last Answer"],
    ["Each Halloween Ted was looking for a mystery girl dressed as...",
    "Slutty pumpkin",
    "Space spud",
    "Empire State Building",
    "Barney"],
    ["What was the favorite Ted's shoes?",
    "Red cowboy boots",
    "Grinch slippers",
    "College trainers",
    "Yellow wellies",
    "test-img.png"],
    ["Question 5",
    "Correct answer",
    "Answer2",
    "Answer3",
    "Answer4"],
    ["Never shown question",
    "No answer 1",
    "No answer 2",
    "No answer 3",
    "No answer 4"]
    ];

let tbbtQuiz = [
    ['element1', 'element2'],
    ['element3', 'element4']
    ];

let friendsQuiz = [];
