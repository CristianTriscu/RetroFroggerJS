
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

const timeLeftDisplay = document.querySelector('#time-left');
const resutlDisplay = document.querySelector('#result');
const startPauseButton = document.querySelector('#start-pause-button');
const squares = document.querySelectorAll('.grid div');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');
let currentIndex = 76;
const width = 9;
let timerId;
let currentTime = 20;
let outcomeTimerId;
let touchstartX = 0
let touchendX = 0
let touchstartY = 0
let touchendY = 0


const targetElement = document.querySelector('body');

// 3. ...in some event handler after showing the target element...disable body scroll
disableBodyScroll(targetElement);
function checkDirection() {
    console.log(currentIndex)

}

document.body.addEventListener('touchstart', function(e) {
    if(e.target.getInnerHTML() !==' Start/Stop\n        '){
         e.preventDefault();
    }
 
},{passive:false});


document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
})

document.addEventListener('touchstart', e => {
    touchstartY = e.changedTouches[0].screenY
})

document.addEventListener('touchend', e => {
    touchendY = e.changedTouches[0].screenY
    checkDirection()
})

function moveLeft() {
    if (currentIndex % width < width - 1) currentIndex -= 1;
    touchstartX = 0
    touchendX = 0
    touchstartY = 0
    touchendY = 0
    return
}

function moveRight() {
    if (currentIndex % width < width - 1) currentIndex += 1;
    touchstartX = 0
    touchendX = 0
    touchstartY = 0
    touchendY = 0
    return
}

function moveUp() {
    if (currentIndex - width >= 0) currentIndex -= width;
    touchstartX = 0
    touchendX = 0
    touchstartY = 0
    touchendY = 0
    return
}

function moveDown() {
    if (currentIndex + width < width * width) currentIndex += width;
    touchstartX = 0
    touchendX = 0
    touchstartY = 0
    touchendY = 0
    return
}

function x() {
    if (touchendX < touchstartX) {
        console.log("touchend", touchendX);
        console.log("touchstart", touchstartX)
        moveLeft();

    }
    if (touchendX > touchstartX) {
        console.log("touchend", touchendX);
        console.log("touchstart", touchstartX);
        moveRight();


    }
    if (touchendY < touchstartY) {
        console.log("touchend", touchendX);
        console.log("touchstart", touchstartX)
        moveUp();



    }
    if (touchendY > touchstartY) {
        console.log("touchend", touchendX);
        console.log("touchstart", touchstartX)
        moveDown();



    }
}
function moveFrog(e) {
    squares[currentIndex].classList.remove('frog');
    x();
    // switch (e.key) {
    //     case 'ArrowLeft':
    //         if (currentIndex % width !== 0) currentIndex -= 1;
    //         break;
    //     case 'ArrowRight':
    //         if (currentIndex % width < width - 1) currentIndex += 1;
    //         break;
    //     case 'ArrowUp':
    //         if (currentIndex - width >= 0) currentIndex -= width;
    //         break;
    //     case 'ArrowDown':
    //         if (currentIndex + width < width * width) currentIndex += width;
    //         break;



    // }

    // checkDirection()
    squares[currentIndex].classList.add('frog')
}



function autoMoveElements() {
    currentTime -= 1;
    timeLeftDisplay.textContent = currentTime;
    logsLeft.forEach(logLeft => moveLogLeft(logLeft));
    logsRight.forEach(logRight => moveLogRight(logRight));
    carsLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarRight(carRight));

}


function checkOutcomes() {
    lose();
    win();
}
function moveLogLeft(logLeft) {
    switch (true) {
        //moving left
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1');
            logLeft.classList.add('l2');
            break;
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2');
            logLeft.classList.add('l3');
            break;
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3');
            logLeft.classList.add('l4');
            break;
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4');
            logLeft.classList.add('l5');
            break;
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5');
            logLeft.classList.add('l1');
            break;
    }
}

function moveLogRight(logRight) {
    switch (true) {
        //moving left
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1');
            logRight.classList.add('l5');
            break;
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2');
            logRight.classList.add('l1');
            break;
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3');
            logRight.classList.add('l2');
            break;
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4');
            logRight.classList.add('l3');
            break;
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5');
            logRight.classList.add('l4');
            break;
    }
}

function moveCarLeft(carLeft) {
    switch (true) {
        //moving left
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1');
            carLeft.classList.add('c2');
            break;
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2');
            carLeft.classList.add('c3');
            break;
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3');
            carLeft.classList.add('c1');
            break;

    }
}

function moveCarRight(carRight) {
    switch (true) {
        //moving left
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1');
            carRight.classList.add('c3');
            break;
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2');
            carRight.classList.add('c1');
            break;
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3');
            carRight.classList.add('c2');
            break;
    }
}

function lose() {
    if (squares[currentIndex].classList.contains('c1')
        || squares[currentIndex].classList.contains('l4')
        || squares[currentIndex].classList.contains('l5') || currentTime <= 0) {
        resutlDisplay.textContent = 'YOU LOSE!';
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        squares[currentIndex].classList.remove('frog');
        document.removeEventListener('keyup', moveFrog);
    }

}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        resutlDisplay.textContent = 'YOU WIN!';
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        document.removeEventListener('keyup', moveFrog);
    }
}
startPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        outcomeTimerId = null;
        timerId = null;
        document.removeEventListener('keyup', moveFrog);

    } else {

        timerId = setInterval(autoMoveElements, 1000);
        outcomeTimerId = setInterval(checkOutcomes, 50);
        document.addEventListener('keyup', moveFrog);
        document.addEventListener('touchend', moveFrog);
    }
})


