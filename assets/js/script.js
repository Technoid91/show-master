

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
        if (document.querySelector('.user-answer')){
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
            alert('You should pick the answer first');
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
    let question = questionData[0];
    let correctAnswer = questionData[1];
    let allAnswers = [questionData[1], questionData[2], questionData[3], questionData[4]];
    let imgPath = [questionData[5]];
    console.log(imgPath);

    // randomize answers to show
    let answers = randomizeList(allAnswers);


    let img = document.getElementById('question-img');
    img.src = 'assets/images/no-img.png';

    /*if (imgPath){
        img.src = 'assets/images/'+imgPath;
        console.log('image found');
    }
    else{
        console.log('IMAGE NOT FOUND!!!')
        img.src = 'assets/images/no-img.png';
    }*/

    img.alt = 'Question supporting image';
    let questImage = document.getElementsByClassName('quiz-image')[0];
    questImage.innerHTML = '';
    questImage.appendChild(img);

    document.getElementsByClassName('question')[0].textContent = question;
    questionAnswers = document.getElementsByClassName('answer');

    for (let i = 0; i < answers.length; i++){
        questionAnswers[i].textContent = answers[i];

        questionAnswers[i].addEventListener('click', function(event){
            let oldChoice = document.getElementsByClassName('user-answer');
            if (oldChoice){
                for (each of oldChoice){
                    each.classList.remove('user-answer');
                }
            questionAnswers[i].classList.add('user-answer');
            }
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
        alert('Correct!')
        userScore(true);
    }
    else{
       alert('You are wrong :(   The correct answer is '+correctAnswer);
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
    alert('Congratulations! You have passed our quiz!');
    /*window.location.reload();*/
}

function randomizeList(initial){

    let newList = [];
    for (let i = initial.length; i > 0; i--){
        let randNum = Math.floor(Math.random() * (i+2));
        element = initial.pop(randNum);
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
    "Yellow wellies"],
    ["Question 5",
    "Correct answer",
    "Answer2",
    "Answer3",
    "Answer4"],
    ["Never shown question",
    "No answer 1",
    "No answer 2",
    "No answer 3",
    "No answer 4",]
    ];

let tbbtQuiz = [
    ['element1', 'element2'],
    ['element3', 'element4']
    ];

let friendsQuiz = [];
