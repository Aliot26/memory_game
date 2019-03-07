function setArrCards() {
    let possibleElements = ["fa-bluetooth", "fa-fort-awesome-alt", "fa-bitcoin", "fa-apple",
        "fa-cc-visa", "fa-discord", "fa-facebook-f", "fa-github",
        "fa-linux", "fa-python", "fa-js", "fa-java",
        "fa-youtube", "fa-quora", "fa-html5", "fa-firefox",
        "fa-android", "fa-npm", "fa-php", "fa-react"];
    let gameBoard = document.getElementById("game");
    let numberCards = gameBoard.dataset.index;
    let shuffleElementsArr = randomShuffle(possibleElements);
    let cardsArr = shuffleElementsArr.slice(0, numberCards);

    cardsArr = cardsArr.concat(cardsArr);
    cardsArr = randomShuffle(cardsArr);
    return cardsArr;
}


function timer(seconds, tick, result) {
    if (seconds > 0) {
        tick(seconds);
        seconds -= 1;
        setTimeout(function () {
            timer(seconds, tick, result);
        }, 1000);
    } else {
        result();
    }
}

function tick(seconds) {
    let timerBlock = document.getElementById('safeTimerDisplay');
    timerBlock.textContent = seconds;
}

function stopTimer() {
    let timerBlock = document.getElementById('safeTimerDisplay');
    timerBlock.textContent = "Time over";
    timerBlock.setAttribute('style', 'background-color:#4bd7dd; color:#C7143A');
}

function stopGame() {
    stopTimer();
    reloadWithMessage("Time over!");
}


function winCondition(backImage) {
    let unflippedCards = document.getElementsByClassName(backImage);

    if (unflippedCards.length === 0) {
        setTimeout(function () {
            reloadWithMessage("You won!");
        }, 500);
        return true;
    }
    return false
}


function randomShuffle(elementsArr) {
    let i = elementsArr.length - 1;
    while (i > 0) {
        let index = Math.floor((Math.random() * i));
        temp = elementsArr[i];
        elementsArr[i] = elementsArr[index];
        elementsArr[index] = temp;
        i--;
    }
    return elementsArr;
}

function reloadWithMessage(message) {
    setTimeout(function () {
        alert(message + "\nNow we reload the page and so you can try again.");
        window.location.reload(true);
    }, 500);
}

function flipCard(card, classToRemove, classToAdd) {
    card.classList.remove(classToRemove);
    card.classList.add(classToAdd);
}


function main() {
    /*
    1. IDLE: idle (nothing opened, except old card)
    2. FIRST: first clicked (firstIndex)
    3. SECOND_NO_MATCH: second clicked, no match (firstIndex, secondIndex)
    4. SECOND_MATCH: second clicked, match
    5. STOP
*/
    let cards = document.getElementsByClassName("card");
    let cardImageArr = setArrCards();
    let status = 'IDLE';
    let firstIndex;

    timer(30, tick, stopGame);

    for (let index = 0; index < cards.length; index++) {
        cards[index].addEventListener('click', function handler() {
            const backImage = "fa-twitter";
            let unflippedCard = cards[index].classList.contains(backImage);

            if (status === 'FIRST' && unflippedCard) {
                let secondIndex = index;
                flipCard(cards[secondIndex], backImage, cardImageArr[secondIndex]);
                if (cardImageArr[firstIndex] === cardImageArr[secondIndex]) {
                    status = 'SECOND_MATCH';
                } else {
                    setTimeout(function () {
                        flipCard(cards[firstIndex], cardImageArr[firstIndex], backImage);
                        flipCard(cards[secondIndex], cardImageArr[secondIndex], backImage);
                    }, 500);
                    status = 'SECOND_NO_MATCH';
                }
            }
            if (status === 'IDLE' && unflippedCard) {
                firstIndex = index;
                flipCard(cards[firstIndex], backImage, cardImageArr[firstIndex]);
                status = 'FIRST';
            }
            if (status === 'SECOND_MATCH') {
                if (!winCondition(backImage)) {
                    status = 'IDLE';
                }
            }
            if (status === 'SECOND_NO_MATCH') {
                status = 'IDLE';
            }
        })
    }
}

main();