let showPicker = document.getElementsByClassName('show');
for (show of showPicker){
    show.addEventListener('click', function(event) {
        let userChoice = event.currentTarget.classList[1];
        runGame(userChoice);
    });
}

function runGame(pickedShow){
    if (pickedShow === 'himym'){

    } else if (pickedShow === 'tbbt'){

    } else if (pickedShow === 'friends'){

    } else {
        console.log(`Wrong show! ${pickedShow} does not exist`);
        throw(`Wrong show! ${pickedShow} does not exist`);
    }

}