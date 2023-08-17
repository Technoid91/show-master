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
        runQuiz(himymQuiz);
    } else if (pickedShow === 'tbbt'){
        runQuiz(tbbtQuiz);
    } else if (pickedShow === 'friends'){
        runQuiz(friendsQuiz);
    } else {
        console.log(`Wrong show! ${pickedShow} does not exist`);
        throw(`Wrong show! ${pickedShow} does not exist`);
    }
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

function runQuiz(currentQuiz){

    let pickerField = document.getElementsByClassName('show-picker')[0];
    let quizField = document.getElementsByClassName('quiz-field')[0];
    pickerField.setAttribute('hidden', 'true');
    askQuestion(currentQuiz[0]);
    quizField.removeAttribute('hidden');

}

function askQuestion(questionData){
    let question = questionData[0];
    let answers = [questionData[1], questionData[2], questionData[3], questionData[4]];
    let correctAnswer = questionData[1];

    document.getElementsByClassName('question')[0].textContent = question;
    questionAnswers = document.getElementsByClassName('answer');

    for (let i = 0; i < answers.length; i++){
        document.getElementsByClassName('answer')[i].textContent = answers[i];
    }

    let quizField = document.getElementsByClassName('quiz-field')[0];
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
    ["Second Question",
    "Answer1",
    "Answer2"]
    ];

let tbbtQuiz = [
    ['element1', 'element2'],
    ['element3', 'element4']
    ];

let friendsQuiz = [];
