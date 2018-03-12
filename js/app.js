/*
 * Create a list that holds all of your cards
 */

let cardList = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

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

shuffle(cardList);

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

const ulElement = document.querySelector('.deck');
const fragment = document.createDocumentFragment();

function gameBuilder() {
  while (ulElement.hasChildNodes()) {
    ulElement.removeChild(ulElement.lastChild);
  }

  for (let i = 0; i < cardList.length; i++) {
    let liElement = document.createElement('li');
    let iElement = document.createElement('i');
    liElement.classList.add('card');
    iElement.classList.add('fa');
    iElement.classList.add(`${cardList[i]}`);
    liElement.appendChild(iElement);
    fragment.appendChild(liElement);
   }

   ulElement.appendChild(fragment);
}

gameBuilder();

 /* DISPLAY CARD AND MATCH FUNCTION

 * the function operatetes on elements that DO NOT have class .match
 * if an element cointains class .open, thn is placed in the array of open elements
 * there is an array, classArray, that holds target element's child class name
 * as each <i> element has class of .fa (font-awesome class name), the function slice first 3 characters
 * if classes of two open cards match, point counter is increased by one, elements get class .match added
 * if classes of two open cards do not match, they are flipped back and classes .open .show are removed
 */

const deck = document.querySelector('.deck');
let pointCounter = 0;
let moveCounter = 0;

let classArray = [];
let arrayOfOpenCards = [];

const starsList = document.querySelector('.stars');
const stars = document.getElementsByClassName('fa-star');

let clickCountTest = 0;

const modalBox = document.querySelector('.modal');
const newGameButton = document.querySelector('.new-game');

function eventActions(e) {
		e.target.style.transform = 'rotateY(180deg)';
    e.target.backfaceVisibility = 'hidden';
    e.target.classList.add('open', 'show');
    arrayOfOpenCards.push(e.target);
	  classArray.push(e.target.lastChild.className.slice(3));
};

function displayCardSymbolAndMatch(e) {
  if (e.target.classList.contains('match') || e.target.classList.contains('open')) {
     e.preventDefault();
   } else {
      if (e.target.tagName === 'LI' && classArray.length===0) {
		      eventActions(e);
	    } else if (e.target.tagName === 'LI' && classArray.length===1) {
		      moveCounter++;
          eventActions(e)
			    if (classArray.length === 2 && classArray[0] === classArray[1]) {
            pointCounter++;
            let list = document.getElementsByClassName(classArray[0]);
            setTimeout(function() {
              for (let i = 0; i < list.length; i++) {
                list[i].parentNode.classList = 'card match';
                list[i].parentNode.style.animation = 'match 1s';
              }
              classArray = [];
              arrayOfOpenCards = [];
				    }, 1000);
          } else if (classArray.length === 2 && classArray[0] !== classArray[1]) {
              for (let i = 0; i < arrayOfOpenCards.length; i++) {
                if (arrayOfOpenCards[i].classList.contains('open')) {
                  setTimeout(function() {
                    arrayOfOpenCards[i].style.transform = 'rotateY(360deg)';
                    arrayOfOpenCards[i].backfaceVisibility = 'hidden';
                    arrayOfOpenCards[i].classList.remove('open', 'show');
                    classArray = [];
                  }, 1500);
                }
              }
            }
			  results();
      }
    }
}

deck.addEventListener('click', displayCardSymbolAndMatch);

 /*
 * RESULT FUNCTION
 * rating is based on move count stored in moveCounter variable
 * less than 20 moves is 3 stars, 20 moves is 2 stars, 28 moves is 1 star
 * game is over when all cards are matached and internal point counter is 8, which opens modal window
 * modal window with results gives information about: time, moves and star rating. Once closed, game is reset
 */

function results() {
  let finalTime = `${minute.textContent}:${second.textContent}`;
  if (moveCounter === 19) {
    starsList.removeChild(starsList.lastElementChild);
  } else if (moveCounter === 25) {
      starsList.removeChild(starsList.lastElementChild);
   }
   document.querySelector('.moves').innerHTML = moveCounter + ' Moves';

   if (pointCounter === 8) {
    clearInterval(interval);
    document.querySelector('.moves-count').innerHTML = moveCounter;
    document.querySelector('.time-counter').innerHTML = finalTime;
    document.querySelector('.star-rating').innerHTML = starsList.innerHTML;
    setTimeout(function() {
      modalBox.style.display = 'block';
    }, 1500);
    newGameButton.addEventListener('click', restart);
  }
}

function restart() {
   location.reload();
}

document.querySelector('.restart').addEventListener('click', restart);

 /*
 * TIMER FUNCTION
 * the function is fired once first card is clicked
 * integers between 0 and 59 are stored in variable 'time'
 * the number is being incremented every 1000 millisecond
 * once it higher than 59 'time' is set back to 0, while variable minuteCount count is incremented by 1
 */

let interval;
let time = 0;
let minuteCount = 0;
let second = document.querySelector('.second');
let minute = document.querySelector('.minute');

function intervalFunction() {
  time++;
  if (time > 59) {
    minuteCount++;
    time = 0;
    if(minuteCount < 10) {
      minute.innerHTML = '0' + minuteCount;
      second.innerHTML = '0'+ time;
    } else {
       minute.innerHTML = minuteCount;
       second.innerHTML = '0'+ time;
      }
  } else {
      if (time <= 9) {
        second.innerHTML = '0' + time;
       } else {
          second.innerHTML = time;
         }
     }
}

function timer() {
  interval = setInterval(intervalFunction, 1000);
  deck.removeEventListener('click', timer);
  if (moveCounter === 2) {
    clearInterval(interval);
  }
}

deck.addEventListener('click', timer);
