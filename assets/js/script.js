
let showPicker = document.getElementsByClassName('show');
let inputField = document.getElementById('username');
let username;
for (show of showPicker){
    show.addEventListener('click', function(event) {
        let userInput = inputField.value;
        // check if input contains digits
        let digits = /\d/.test(userInput);
        // input should be at least 4 characters without numbers
        if (userInput.length > 3 && !digits){
            let userChoice = event.currentTarget.classList[1];
            username = userInput;
            quizTitle(userChoice);
            runGame(userChoice);
        }else{
            alert('Please enter your name\n(minimum 4 characters without numbers)');
        }
    });
}

/*
* Function to pick the question pool based on user's choice
*/
function runGame(pickedShow){

    // pick the corresponding image for final results page
    let imgFile = document.createElement('img');
    imgFile.src = 'assets/images/'+pickedShow+'.jpg';
    imgFile.alt = 'Smiling characters of the show-quiz you have passed';
    document.getElementsByClassName('show-img')[0].appendChild(imgFile);

    // define question list to show based on class of picked show image
    if (pickedShow === 'himym'){
        currentQuiz = randomizeList(himymQuiz);
    } else if (pickedShow === 'tbbt'){
        currentQuiz = randomizeList(tbbtQuiz);
    } else if (pickedShow === 'friends'){
        currentQuiz = randomizeList(friendsQuiz);
    } else {
        console.log(`Wrong show! ${pickedShow} does not exist`);
        throw(`Wrong show! ${pickedShow} does not exist`);
    }

    // Hide show picker field with show posters and show quiz field
    let pickerField = document.getElementsByClassName('show-picker')[0];
    let quizField = document.getElementsByClassName('quiz-field')[0];
    let userData = document.getElementsByClassName('user-data')[0];
    pickerField.setAttribute('hidden', 'true');
    userData.setAttribute('hidden', 'true');
    quizField.removeAttribute('hidden');

    // Show first question
    askQuestion(currentQuiz[0]);

    // add event listener to the submit answer button to check the answer and show next question
    let submitButton = document.getElementsByTagName('button')[0];
    submitButton.addEventListener('click', function(){
        // get the number of the question from html
        questionNumber = Number(document.getElementsByClassName('question-number')[0].textContent);
        if (document.getElementsByClassName('user-answer').length > 0){
            // if user picked the answer and press the button - check if it's correct
            checkAnswer(currentQuiz[questionNumber-1][1]);
            if (questionNumber > 4){
                // show total result after 5th question
                quizResult();
            }
            else{
                // make button inactive for the second question
                submitButton.classList.remove('active-button');
                //ask next question
                askQuestion(currentQuiz[questionNumber]);
            }
        }else{
            // if button is clicked with no answer picked
            alert('Please pick the answer first and than hit "Submit Answer"');
        }
    });
}

/*
* Change h2 element to the show title
* decoration function
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

/*
* Show question: image, question, answers.
* Function takes list as the argument. Each element - the part of a question:
* question, correct answer, 3 other answers, (optional) name of image file
*/
function askQuestion(questionData){

    // get all question data from the list
    let question = questionData[0];
    let allAnswers = [questionData[1], questionData[2], questionData[3], questionData[4]];
    let imgName;

    // randomize answers to show, because the first one is always correct
    let answers = randomizeList(allAnswers);

    let img = document.getElementById('question-img');

    // check if image name is specified in the list by its length
    if (questionData.length > 5){
        img.src = 'assets/images/'+questionData[5];
        img.alt = 'Question supporting image';
    }
    else{
        // image placeholder if image name is not specified in a list
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

/*
* Function defines if user answer was correct or not
* by comparing passed argument with actual user's answer.
* Increase question number by 1
*/
function checkAnswer(correctAnswer){

    let answerElement = document.getElementsByClassName('user-answer')[0];
    let userAnswer = answerElement.textContent;
    if (userAnswer === correctAnswer){
        // increase user's score
        userScore(true);
    }
    else{
        // decrease user's score
       userScore(false);
    }
    // remove highlight from the answer
    answerElement.classList.remove('user-answer');
    let nextQuestion = Number(document.getElementsByClassName('question-number')[0].textContent);
    // increase question number
    nextQuestion++;
    document.getElementsByClassName('question-number')[0].textContent = nextQuestion;
}


/*
* Function counts user score.
* Passed argument should be true to increase score
* and false to decrease it.
*/
function userScore(action){
    let scoreCounter = document.getElementsByClassName('user-score')[0];
    let score = Number(scoreCounter.textContent);
    if (action === true) {
        score+=20;
    }
    else{
        score-=5;
    }
    scoreCounter.textContent = score;
}

/*
* Function shows the congratulations and total result.
* It also changes style, based on user's success in the game
*
*/
function quizResult(){
    // Change game field to the user score
    document.getElementsByClassName('quiz-field')[0].setAttribute('hidden', true);
    document.getElementsByClassName('result-field')[0].removeAttribute('hidden');

    // Congratulations to username
    document.getElementsByClassName('congrat-user')[0].textContent = 'Congratulations, '+username+'!'

    // get total score
    let totalScore = Number(document.getElementsByClassName('user-score')[0].textContent);

    // Define how well user passed the quiz
    let userRange;
    if (totalScore > 80){
        userRange = "golden";
    } else if (totalScore > 70){
        userRange = "silver";
    } else if (totalScore > 40 ){
        userRange = "bronze";
    } else {
        userRange = "beginner";
        // if user has less than 0 scores
        totalScore = (totalScore < 0) ? 0 : totalScore;
        // if user's result is not very high - show cheer up message
        document.getElementsByClassName('cheer-up')[0].removeAttribute('hidden');
    }
    // display total score, user range and change style of background accordingly
    document.getElementsByClassName('final-score')[0].textContent = totalScore+" / 100";
    document.getElementsByClassName('score-range')[0].textContent = userRange;
    document.getElementsByClassName('score-field')[0].classList.add('range-'+userRange);

    // the button to start a new game
    let restartButton = document.getElementsByTagName('button')[1];
    restartButton.addEventListener('click', function(){
        // if pressed - reload the page
        window.location.reload();
    })
}

/*
* Function takes a list as an argument, shuffle it's elements
* and returns the new list
*/
function randomizeList(initial){

    let newList = [];
    for (let i = initial.length; i > 0; i--){
        let randNum = Math.floor(Math.random() * (i));
        element = initial.splice(randNum, 1)[0];
        newList.push(element);
    }
    return newList;
}


/*
* Define here questions for the quiz in the following order:
* question
* correct answer
* answer 2
* answer 3
* answer 4
* (optional) file name of the corresponding image, e.g. 'no-img.png'
*/

let himymQuiz = [
    ["What thing Ted stole from the restaurant several times to impress Robin?",
    "Blue french horn",
    "Green lantern",
    "Weird picture",
    "Robin's purse"],
    ["What is the name of Marshall's and Barney's annual tradition?",
    "Slapsgiving Day",
    "St Barney's Day",
    "Desperation Day ",
    "Intervention",
    "himym2.png"],
    ["What costume had Ted's mystery Halloween girl?",
    "Slutty pumpkin",
    "Spudnik",
    "Grinch",
    "Barney",
    "himym3.png"],
    ["Who dumped Ted at the altar?",
    "Stella",
    "Viktoria",
    "Zoey",
    "Tracy",
    "himym4.png"],
    ["What was Robin's scene name?",
    "Robin Sparkles",
    "Robin Canada",
    "ms. Beaver",
    "Robin Glitter",
    "himym5.png"]
];

let tbbtQuiz = [
    ["Sheldon's Halloween costume was...",
    "Doppler's effect",
    "Dispersion",
    "Train",
    "Flash",
    "tbbt1.png"],
    ["Which of these languages doesn't Howard know?",
    "Spanish",
    "Russian",
    "Chinese",
    "French"],
    ["What is Penny's native state?",
    "Nebraska",
    "Texas",
    "Michigan",
    "Alabama",
    "tbbt3.png"],
    ["What name has Raj's dog?",
    "Cinnamon",
    "Princess",
    "Tinkerbell",
    "Pluto",
    "tbbt4.png"],
    ["Whose sister Leonard was dating?",
    "Rajesh",
    "Sheldon",
    "Howard",
    "Penny",
    "tbbt5.png"],
    ["What was the first job Penny had in the show?",
    "Waitress",
    "Actress",
    "Sales agent",
    "Model"]
];

let friendsQuiz = [
    ["What is the name of Phoebe's most famous song?",
    "Smelly Cat",
    "My Coma Guy",
    "Crusty Old Man",
    "Sticky Shoes",
    "friends1.png"],
    ["What is Chandler's middle name?",
    "Muriel",
    "Nancy",
    "Joey",
    "Sarah",
    "friends2.png"],
    ["What's the name of Rachel's coworker, who secretly loves her?",
    "Gunter",
    "Bob",
    "Greg",
    "Willy",
    "friends3.png"],
    ["What uniform was Joey dressed in at Chandler's wedding?",
    "Soldier",
    "Firefighter",
    "Baseball player",
    "Builder",
    "friends4.png"],
    ["What was Janice's catchphrase?",
    "Oh my god!",
    "Bazinga!",
    "Speak to the hand",
    "No way!",
    "friends5.png"
    ]
];