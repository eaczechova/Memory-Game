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

 const deck = document.querySelector('.deck');
 let pointCounter = 0;
 let moveCounter = 0;

 let classArray = [];
 let arrayOfUnmached = [];

 const starsList = document.querySelector('.stars');
 const stars = document.getElementsByClassName('fa-star');

 const modalBox = document.querySelector('.modal');
 const newGameButton = document.querySelector('.new-game');

 let arrayOfOpenCards = [];


 /* DISPLAY CARD AND MATCH FUNCTION

 * the function operatetes on elements that DO NOT have class .match
 * if an element cointains class .open, thn is placed in the array of open elements
 * there is an array, classArray, that holds target element's child class name
 * as each <i> element has class of .fa (font-awesome class name), the function slice first 3 characters
 * if classes of two open cards match, point counter is increased by one, elements get class .match added
 * if classes of two open cards do not match, they are flipped back and classes .open .show are removed
 */

 function displayCardSymbolAndMatch(e) {
   if (e.target.classList.contains('match')) {
     e.preventDefault();
   } else {
       if (e.target.tagName === 'LI') {
          moveCounter++;
          e.target.style.transform = 'rotateY(180deg)';
          e.target.backfaceVisibility = 'hidden';
          e.target.classList.add('open', 'show');
       }
   }

   if (e.target.classList.contains('open')) {
     arrayOfOpenCards.push(e.target);
     classArray.push(e.target.lastChild.className.slice(3));
   }

   if (classArray.length === 2 && classArray[0] === classArray[1]) {
     pointCounter++;
     let list = document.getElementsByClassName(classArray[0]);
     setTimeout(function() {
       for(let i = 0; i < list.length; i++) {
           list[i].parentNode.classList = 'card match';
           list[i].parentNode.style.animation = 'match 1s';
         }
       }, 1000);
       classArray = [];
       arrayOfOpenCards = [];
     } else if (classArray.length === 2 && classArray[0] !== classArray[1]) {
         for (let i = 0; i < arrayOfOpenCards.length; i++) {
           if (arrayOfOpenCards[i].classList.contains('open')) {
             setTimeout(function() {
               arrayOfOpenCards[i].style.transform = 'rotateY(360deg)';
               arrayOfOpenCards[i].backfaceVisibility = 'hidden';
               arrayOfOpenCards[i].classList.remove('open', 'show');
             }, 1500);}
         classArray = [];
         }
       }
 }

 deck.addEventListener("click", displayCardSymbolAndMatch);
