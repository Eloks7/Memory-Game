/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let cards = document.querySelectorAll('ul.deck li');
let container = document.querySelector('.deck');
container.innerHTML = '';
shuffledCards = shuffle(Array.from(cards));
let openCards = [];
correctGuess = 0;
movesElement = document.querySelector('.moves');
moves = 0;
stars = document.querySelectorAll('ul.stars li');
// movesElement.textContent = moves;

for (let card of shuffledCards) {
    card.className = 'card'; 
    container.appendChild(card);
}


container.addEventListener('click', function(e) {
    target = e.target;
    if (target.classList.contains('card') && !openCards.includes(target)) {
        if (!target.classList.contains('match') && openCards.length < 2) {
            openCards.push(target);
            target.classList.toggle('open');
            moves += 1;
            movesElement.textContent = moves;
            // compare();
        }
    }
    rating();
    
    if (openCards.length == 2) {
        compare();
    }
    if (correctGuess == 8) {
        // Game Over
    }
})

function compare() {
    card1 = openCards[0];
    card2 = openCards[1];

    if (card1.firstElementChild.className === card2.firstElementChild.className) {
        correctGuess += 1;
        card1.classList.add('match');
        card2.classList.add('match');
        openCards = [];
    }
    else {
        setTimeout(function() {
            openCards = [];
            card1.classList.toggle('open');
            card2.classList.toggle('open');
        }, 1500)
    }
}

function rating() {
    if (moves > 9) {
        stars[2].style.display = 'none';
    }
    if (moves > 14) {
        stars[1].style.display = 'none';
    }
    if (moves > 18) {
        stars[0].style.display = 'none';
    }
}