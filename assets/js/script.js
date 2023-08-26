

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
        currentQuiz = himymQuiz;
    } else if (pickedShow === 'tbbt'){
        currentQuiz = tbbtQuiz;
    } else if (pickedShow === 'friends'){
        currentQuiz = friendsQuiz;
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

    // Add event listener for submit button to show next question

    askQuestion(currentQuiz[0]);
    let submitButton = document.getElementsByTagName('button')[0];
    submitButton.addEventListener('click', function(){
        questionNumber = Number(document.getElementsByClassName('question-number')[0].textContent);
        if (document.getElementsByClassName('user-answer').length > 0){
            checkAnswer(currentQuiz[questionNumber-1][1]);
            if (questionNumber > 4){
                quizResult();
            }
            else{
                submitButton.classList.remove('active-button');
                askQuestion(currentQuiz[questionNumber]);
            }
        }else{
            alert('Please pick the answer first and than hit "Submit Answer"');
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

    let answerElement = document.getElementsByClassName('user-answer')[0];
    let userAnswer = answerElement.textContent;
    if (userAnswer === correctAnswer){
        userScore(true);
    }
    else{
       userScore(false);
    }
    answerElement.classList.remove('user-answer');
    let nextQuestion = Number(document.getElementsByClassName('question-number')[0].textContent);
    nextQuestion++;
    document.getElementsByClassName('question-number')[0].textContent = nextQuestion;
}

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
    console.log('Score: '+score);
}

function quizResult(){
    // Change field to the one with user score
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
        totalScore = (totalScore < 0) ? 0 : totalScore;
        // if user has 0 or less scores
        document.getElementsByClassName('user-data')[0].setAttribute('hidden', true);
        document.getElementsByTagName('button')[2].setAttribute('hidden', true);
        document.getElementsByClassName('cheer-up')[0].removeAttribute('hidden');
    }
    console.log('Score:'+totalScore+' Range: '+userRange )
    // display total score, user range and change style of background accordingly
    document.getElementsByClassName('final-score')[0].textContent = totalScore+" / 100";
    document.getElementsByClassName('score-range')[0].textContent = userRange;
    document.getElementsByClassName('score-field')[0].classList.add('range-'+userRange);

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


/*
* Define here questions for the quiz in the following order:
* question
* correct answer
* answer 2
* answer 3
* answer 4
* file name of the corresponding image (optional), e.g. 'no-img.png'
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
    "Empire State Building",
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