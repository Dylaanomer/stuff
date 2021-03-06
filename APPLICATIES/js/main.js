
var timeleft = 300;

// Hoe veel tijd

var startTime = 0;
var currentTime = 0;

function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return nf(min, 2) + ':' + nf(sec, 2);
}

// Om de timer op een mooie format te hebben ipv 300 seconden

var ding;

function preload() {
  ding = loadSound('ding.mp3');
}

// Een geluid bestand speelt als de timer op gaat


function setup() {
  noCanvas();
  startTime = millis();

  var params = getURLParams();
  console.log(params);
  if (params.minute) {
    var min = params.minute;
    timeleft = min * 60;
  }

  var timer = select('#timer');
  timer.html(convertSeconds(timeleft - currentTime));

  var interval = setInterval(timeIt, 1000);

  function timeIt() {
    currentTime = floor((millis() - startTime) / 1000);
    timer.html(convertSeconds(timeleft - currentTime));
    if (currentTime == timeleft) {
      ding.play();
      clearInterval(interval);
      alert('TIME UP');
    }
  }
}

//// De hele Timer functie en dat het achter telt, Met functionaliteit dat het preventeert om niet door te tellen na 0.



let clickedCard = null;
let preventClick = false;
let combosFound = 0;

//kaarten opnieuw indelen (werkt niet met images..)

const images = [
    'sakura1',
    'sakura2',
    'sakura3',
    'sakura4',
    'sakura5',
    'sakura6',
    'sakura7',
    'sakura8',
]

const cards = [...document.querySelectorAll('.card')];
for (let image  of images) {
    const cardAINdex = parseInt(Math.random() * cards.length);
    const cardA = [cardAIndex];
    cards.splice(cardAIndex, 1);
    cardA.className += ` ${image}`;
    cardA.setAttribute('data-image', image);

    const cardBIndex = parseInt(Math.random() * cards.length);
    const cardB = [cardBIndex];
    cards.splice(cardBIndex, 1);
    cardB.className += ` ${image}`;
    cardB.setAttribute('data-image', image);
}

function onCardClicked(e) {
    const target = e.currentTarget;

    if (
        preventClick ||
        target === clickedCard ||
        target.className.includes('done')
    ) {
        return;
    }

    target.className = target.className
    .replace('image-hidden', '')
    .trim();
    target.className += ' done';

    if (!clickedCard) {
    // als er op de kaart is geklikt, hou het open, vertoon de afbeelding.
        clickedCard = target;
    }   else if (clickedCard) {
        // als er op de kaart is geklikt, controleer of de nieuwe kaart overeenkomt met de oude kaart.
        if (
            clickedCard.getAttribute('data-image') !== 
            target.getAttribute('data-image')
        ) {
            preventClick = true;
            setTimeout(() => {
            clickedCard.className = 
                clickedCard.className.replace('done', '').trim() + 
                'image-hidden';
            target.className =
                target.className.replace('done', '').trim() +
                'image-hidden';
            clickedCard = null;
            preventClick = false;
            }, 500);
        } else {
            combosFound++;
            clickedCard = null;
            if (combosFound === 8) {
                alert('YOU WIN!');
            }

            
        }
    }
}


