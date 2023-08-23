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
    askQuestion(currentQuiz[0]);
    let nextQuestion = document.getElementsByTagName('button')[0];
    nextQuestion.addEventListener('click', function(){
       questionNumber = Number(document.getElementsByClassName('question-number')[0].textContent);
       askQuestion(currentQuiz[questionNumber]);
    })
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
    let answers = [questionData[1], questionData[2], questionData[3], questionData[4]];

/*    console.log('QUESTION: '+question);
    console.log('ANSWERS: ' + answers);
    console.log('CORRECT: '+ correctAnswer);*/

    let img = document.createElement('img');
    img.src = 'assets/images/test-img.png';
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
        })
    }
    if (document.getElementsByClassName('user-answer')[0]){
        let submit = document.getElementsByTagName('button')[0];
        submit.addEventListener('click', checkAnswer(correctAnswer));
    }
    /*let quizField = document.getElementsByClassName('quiz-field')[0];*/

}

function checkAnswer(correctAnswer){
    console.log("ANSWER TO CHECK: "+correctAnswer);

    let answerElement = document.getElementsByClassName('user-answer')[0];
    let userAnswer = answerElement.textContent;
    console.log(`User picked ${userAnswer}`);
    console.log(`Correct answer: ${correctAnswer}`);
    if (userAnswer === correctAnswer){
        alert('Correct!')
    }
    else{
       alert('You are wrong :(   The correct answer is '+correctAnswer);
    }
    answerElement.classList.remove('user-answer');
    let nextQuestion = Number(document.getElementsByClassName('question-number')[0].textContent);
    nextQuestion++;
    document.getElementsByClassName('question-number')[0].textContent = nextQuestion;
}

function randomizeElements(initialArray){
    let randNum = Math.floor(Math.random() * (i+1));
    let randArray = [];
    let addElement = initialArray.pop(randNum);
    randArray.push(addElement);
}
let himymQuiz = [
    ["What thing Ted stole from the restaurant several times to impress Robin?",
    "Blue french horn",
    "Green lantern",
    "Weird picture",
    "Robin's purse"],
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
    "Yellow wellies"]
    ];

let tbbtQuiz = [
    ['element1', 'element2'],
    ['element3', 'element4']
    ];

let friendsQuiz = [];
