'use strict';

var nope = document.getElementById('nope');
var love = document.getElementById('love');
var flip = document.getElementById('flip');
var deckContainer = document.querySelector('.deck');
var allCards;
        
function initCards(card, index) {
  console.log('applog: initializing cards!')
  var newCards = document.querySelectorAll('.deck--card:not(.removed)');
  console.log('applog.initCards-allCards ' + allCards.length + ' newCards ' + newCards.length);
  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    card.style.opacity = (10 - index) / 10;
  });
  
  deckContainer.classList.add('loaded');
}

function createButtonListener(love) {
  return function (event) {
    var cards = document.querySelectorAll('.deck--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;
    if (!cards.length) return false;
    var card = cards[0];
    card.classList.add('removed');

    if (love) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }
    initCards();
    event.preventDefault();
  };
};

function flipListener(event) {
  var cards = document.querySelectorAll('.deck--card:not(.removed)');
  if (!cards.length) return false;
  var card = cards[0];
  var innercard = card.querySelectorAll('.deck--card-inner')[0];
  innercard.style.transform = 'rotateY(180deg)';
  event.preventDefault();
};

function initDocument() {
  
  console.log('applog: initializing document!');
 
  var request = new XMLHttpRequest();   request.open('GET','https://raw.githubusercontent.com/cyberdefendersprogram/securityplus-flashcards/main/content/data/flashcards.json', true);
 
  request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        data[1].cards.forEach(function(e){
          var card = document.createElement("div");
          var cardClass = document.createAttribute("class");
          cardClass.value = 'deck--card';
          card.setAttributeNode(cardClass);
          
          var innercard = document.createElement("div");
          var cardInnerClass = document.createAttribute("class");
          cardInnerClass.value = 'deck--card-inner';
          innercard.setAttributeNode(cardInnerClass);
          
          var frontcard = document.createElement("div");
          var frontCardClass = document.createAttribute("class");
          frontCardClass.value = 'deck--card-front';
          frontcard.setAttributeNode(frontCardClass);
          var frontcardImg = document.createElement("img");
          var frontcardImgSrc = document.createAttribute("src");
          frontcardImgSrc.value = 'https://placeimg.com/600/300/random';
          frontcardImg.setAttributeNode(frontcardImgSrc);
          frontcard.appendChild(frontcardImg);
          var frontcardH3 = document.createElement("h3");
          frontcardH3.innerText = e.term;
          frontcard.appendChild(frontcardH3);
          
          var backcard = document.createElement("div");
          var backCardClass = document.createAttribute("class");
          backCardClass.value = 'deck--card-back';
          backcard.setAttributeNode(backCardClass);
          backcard.innerText = e.definition;
          
          innercard.appendChild(frontcard);
          innercard.appendChild(backcard);
          card.appendChild(innercard);
          //console.log(card);  
          
          //Add to webpage
          var deckContainer = document.querySelector('.deck--cards');
          deckContainer.appendChild(card);         
        });

        
        // Initialize the page
        allCards = document.querySelectorAll('.deck--card');
        initCards();

        var nopeListener = createButtonListener(false);
        var loveListener = createButtonListener(true);
        nope.addEventListener('click', nopeListener);
        love.addEventListener('click', loveListener);
        flip.addEventListener('click', flipListener);
        
      } else {
      // We reached our target server, but it returned an error
      }
  };
  
  request.onerror = function() {
      // There was a connection error of some sort
  };
  request.send();
};

initDocument();



/*
allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    deckContainer.classList.toggle('deck_love', event.deltaX > 0);
    deckContainer.classList.toggle('deck_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    deckContainer.classList.remove('deck_love');
    deckContainer.classList.remove('deck_nope');

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle('removed', !keep);

    if (keep) {
      event.target.style.transform = '';
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      initCards();
    }
  });
});
*/