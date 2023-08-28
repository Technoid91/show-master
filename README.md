
# Show Master
<hr>
Show master - is the entertaining web application. It is a survey that allows you to choose subject and test your knowledge.

![Responsive layout](https://i.ibb.co/tJ9HvW4/2023-08-28-20-04-10.png)

## Features
<hr>

- ### Username
Player's name is required to start the game. It should be longer than 4 characters and does not contain any numbers. 
If user do not meet these requirements or if the input field is left empty, the user will see alert window with a reminder to enter player's name. 

![username field](https://i.ibb.co/5KNhWSF/2023-08-28-20-06-51.png)
- ### Subject menu
The user can choose the subject of the survey from three options. When the mouse cursor hovers the poster - orange border
appears and the poster becomes bigger. It shows the user that these elements are interactive. Once one of them is clicked
the game begins.
![show picker](https://i.ibb.co/xgZbjBV/2023-08-28-20-08-28.png)

- ### Game interface
The interface is simple and straight forward. At the very top - Show Master title. It's clickable and allows to reload
the page (interrupt the survey and start all over again). When the subject is chosen - it's title appears below the
app title. The game field consists of question number, question corresponding image, the question itself, four answer
options and "Submit answer" button to confirm users choice. Questions appear one by one.
![interface](https://i.ibb.co/W2v9L1F/2023-08-28-20-09-45.png)
- ### Survey questions
Survey questions are stored in *.js file as a list of lists. Each element is a list, which contains all the data for one question.
The order is very important and should be based on the following example:
1) question
2) correct answer
3) incorrect answer
4) incorrect answer
5) incorrect answer
6) (optional) file name of corresponding image (e.g. myImg.jpg)

7) If the question requires supporting image - it can be specified as the last element of the list. If not - the user will
see a placeholder image - a video frame with a question mark.
![no image screenshot](https://i.ibb.co/jfydWxC/2023-08-28-20-11-36.png)

- ### Answers and submit button
When the mouse cursor hovers over the answers - orange border appears, showing that they are interactive (2). When user clicks 
on one of the answers it's background turns orange to show which answer has been picked (3). The user still can change his mind 
and pick another option. His answer will be accepted only when the "Submit Answer" button was clicked. This button is
inactive (grey colour), when none of the answers has been choosen (1). If the button is clicked when it's inactive - the
alert message appears to ask user to pick one of the answers and then click on the button. The button turns green when
it's active, inviting the user to click on it to submit the picked answer.
![answering-stages](https://i.ibb.co/42Y7Cj1/answers-screens.jpg)

- ### Score
The correct answer brings to the user 20 scores, while incorrect - reduces his result by 5 scores.

- ### Game results
After answering the final question, the user will see congratulations with his name, the image of the picked subject,
his score and the range based on score (bronze, silver, golden). The background of total score and level section changes
according to user's level. If user has not been able to achieve at least bronze level - it will be "beginner" and the
cheer up message will appear.

![results screen](https://i.ibb.co/NjV53mN/2023-08-28-20-49-45.png)

- ### New game
Below the game results appears the button "Start New Game" inviting the user to play once more. The user can interrupt
the current game at any time, by clicking on the title (Show master).
![start new game screen](https://i.ibb.co/ZGcy4F2/2023-08-28-20-49-52.png)

- ### Randomization
Randomization feature is rather important, as the correct answer always has the same position in the list, thus it
appears as the first option. By implementing this function, we shuffle all the answers, so the correct one could be at
any place. Just to make the game more interesting, questions are also randomised. It means that they appear in different
order every time.

- ### Responsive design
This web application was designed to work with different devices. On the mobile screens buttons are bigger for finger
control - the user does not have to aim the small button. The game field was made of the size of the mobile screen, so
user doesn't have to scroll, which can be annoying.
![mobile buttons](https://i.ibb.co/WD3Pc83/2023-08-28-20-52-23.jpg)
## Testing
<hr>
I tested all the features manually using devices with different screens and browsers Google Chrome and Safari.

![performance test](https://i.ibb.co/86f42Ys/2023-08-28-21-01-59.png)
- ### HTML

No errors were returned when passing the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Ftechnoid91.github.io%2Fshow-master%2F).

- ### CSS

No errors were found when passing through official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Ftechnoid91.github.io%2Fshow-master%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=ru
).

## Deployment
<hr>
Website was deployed using GitHub Pages feature to be accessible.

Link for the website: https://technoid91.github.io/show-master/

## Credits
<hr>

Images for questions were taken from images.google.com search
Questions based on my own experience after watching these shows.

## Improvement
<hr>
The project can be improved and become more interesting by implementing following features:

- ### Enlarge question pool

More questions - more fun. As the questions are randomized, more questions will make the game more unpredictable. Every
time the user starts the new game - the new questions may occur.

- ### Number of questions

User may like to be able to choose the amount of questions in the quiz.

- ### Difficulty

The game will be more challenging if the user can pick up the difficulty. In this case the questions should be manually
sorted in the list from the easiest to the hardest and the JavaScript Code can slice that this list into three sections
for "easy", "medium" and "hard" and pick the questions from the specified range based on users choice of difficulty. 

- ### Timer
The limited time might be an interesting feature for some players, providing more difficulty and exciting
game experience.

