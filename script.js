document.querySelector('#hit').addEventListener('click', hit);
document.querySelector('#stand').addEventListener('click', stand);
document.querySelector('#deal').addEventListener('click', deal);



var wonSound = new Audio('blackjack_assets/sounds/cash.mp3')
var lostSound = new Audio('blackjack_assets/sounds/aww.mp3')
var hitSound = new Audio('blackjack_assets/sounds/swish.m4a')

var youPlay = true;
var dealerPlay = true;
var isDeal = false;
var youBust = false;
var dealerBust = false;

var blacjack = {
    'youScore': 0,
    'dealerScore': 0,
    'wins': 0,
    'losses': 0,
    'draws': 0,
}

function hit() {
    document.querySelector('#result-msg').innerHTML = `Let's Play!`;
    document.querySelector('#result-msg').style.color = `black`;
    if (youPlay) {
        let score = showCardsYou();
        let youScore = updateScoreYou(score);
        // dealerPlay = true;
        // console.log(youScore);
        blacjack['youScore'] = youScore;
        if (youScore > 21) {
            youPlay = false;
            youBust = true;
            isDeal = true;
            dealerPlay = false;
            // console.log(isDeal);
            result(blacjack['youScore'], blacjack['dealerScore']);
            return;
        } else {
            isDeal = false;
        }
    } else {
        document.querySelector('#deal').disable = true;
    }
    // console.log(dealerPlay);
}

var cards = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 10,
    'K': 10,
    'Q': 10,
    'A': [1, 11],
}

var cardsArray = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'];


async function autoCards() {
    youPlay = false;
    dealerPlay = false;
    blacjack['youScore'] = 0;
    blacjack['dealerScore'] = 0;
    for (let i = 0; i < 2; i++) {
        hitSound.muted = true;
        hitSound.play();
        hitSound.muted = false;
        let youScore = showCardsYou();
        updateScoreYou(youScore);
        blacjack['youScore'] += youScore;
        // console.log(blacjack['youScore']);
        await sleep(1000);

    }
    let dealerScore = showCardsDealer();
    updateScoreDealer(dealerScore);
    blacjack['dealerScore'] = dealerScore;
    // await sleep(3000);

    youPlay = true;
    dealerPlay = true;
}

autoCards();

function randomIndex() {
    return Math.floor(Math.random() * 13);
}


function showCardsYou() {

    let youScore = document.querySelector('#you-score').textContent;
    youScore = parseInt(youScore);

    if (youScore < 22) {

        let randomCard = cardsArray[randomIndex()];
        // console.log(randomCard);

        // let hitSound = new Audio('blackjack_assets/sounds/swish.m4a');
        hitSound.play();
        // hitSound.autoplay = true;
        // hitSound.muted = false;
        let cardImg = document.createElement('img');

        let cardNum = parseInt(cards[randomCard]);

        if (randomCard === 'A') {
            cardImg.src = `blackjack_assets/images/A.png`;
            if (youScore + cardNum <= 21) {
                setImageYou(cardImg);
                return 11;
            } else {
                setImageYou(cardImg);
                return 1;
            }
        } else {
            cardImg.src = `blackjack_assets/images/${randomCard}.png`;
            setImageYou(cardImg);
            return parseInt(cards[randomCard]);
        }
    } else {
        youBust = true;
    }

}



function showCardsDealer() {

    let dealerScore = document.querySelector('#dealer-score').textContent;
    dealerScore = parseInt(dealerScore);

    if (dealerScore < 22) {

        let randomCard = cardsArray[randomIndex()];
        // console.log(randomCard);
        hitSound.play();
        let cardImg = document.createElement('img');

        // let cardNum = parseInt(cards[randomCard]);

        if (randomCard === 'A') {
            cardImg.src = `blackjack_assets/images/A.png`;
            if (dealerScore + 11 <= 21) {
                setImageDealer(cardImg);
                return 11;
            } else {
                setImageDealer(cardImg);
                return 1;
            }
        } else {

            cardImg.src = `blackjack_assets/images/${randomCard}.png`;
            setImageDealer(cardImg);
            return parseInt(cards[randomCard]);
        }
    } else {
        dealerBust = true;
    }

}

function setImageYou(image) {
    image.height = '150';
    image.width = '100';
    document.querySelector('#you-cards').appendChild(image);
}

function setImageDealer(image) {
    image.height = '150';
    image.width = '100';
    document.querySelector('#dealer-cards').appendChild(image);
}

function updateScoreYou(score) {
    let youScore = document.querySelector('#you-score');
    let youPoints = parseInt(youScore.textContent);
    youPoints += score;
    if (youPoints <= 21) {
        youScore.textContent = youPoints;
    } else {
        youBust = true;
        youScore.textContent = 'BUST!';
        youScore.style.color = 'red';
    }

    return youPoints;
}

function updateScoreDealer(score) {
    let dealerScore = document.querySelector('#dealer-score');
    let dealerPoints = parseInt(dealerScore.textContent);
    dealerPoints += score;
    if (dealerPoints <= 21) {
        dealerScore.textContent = dealerPoints;
    } else {
        dealerBust = true;
        dealerScore.textContent = 'BUST!';
        dealerScore.style.color = 'red';
    }

    return dealerPoints;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// stand
async function stand() {

    if (dealerPlay) {
        youPlay = false;
        let dealerScore = 0;
        while (dealerScore < 17) {
            let score = showCardsDealer();
            dealerScore = updateScoreDealer(score);
            blacjack['dealerScore'] = dealerScore;
            await sleep(1000);
        }
        result(blacjack['youScore'], blacjack['dealerScore']);

        isDeal = true;
        dealerPlay = false;
    } else {
        isDeal = true;
    }

}

// deal 
function deal() {
    if (isDeal) {
        let resultMsg = document.querySelector('#result-msg');
        resultMsg.innerHTML = `Let's Play!`;
        resultMsg.style.color = 'black';
        // console.log("check");
        let youScore = document.querySelector('#you-score');
        youScore.textContent = '0';
        youScore.style.color = 'white';

        let dealerScore = document.querySelector('#dealer-score');
        dealerScore.textContent = '0';
        dealerScore.style.color = 'white';

        let youCards = document.querySelector('#you-cards');
        youCards.innerHTML = '';
        let dealerCards = document.querySelector('#dealer-cards');
        dealerCards.innerHTML = '';

        youPlay = true;
        dealerPlay = false;
        // result(blacjack['youScore'], blacjack['dealerScore']);

        autoCards();
        //reset
        youPlay = true;
        dealerPlay = true;
        isDeal = false;
        youBust = false;
        dealerBust = false;
    }
}


// RESULT
function result(youScore, dealerScore) {
    // console.log(youScore, dealerScore);
    let resultMsg = document.querySelector('#result-msg');
    let wins = document.querySelector('#wins');
    let losses = document.querySelector('#losses');
    let draws = document.querySelector('#draws');

    if (!youBust) {
        if (!dealerBust) {
            // console.log(dealerPlay);
            if ((dealerScore < youScore) && dealerScore > 0) {
                blacjack['wins']++;
                wins.textContent = `${blacjack['wins']}`;
                // console.log("You Won!");
                wonSound.play();
                resultMsg.innerHTML = 'You Won!';
                resultMsg.style.color = 'green';
            } else if (dealerScore === youScore) {
                blacjack['draws']++;
                draws.textContent = `${blacjack['draws']}`;
                // console.log("draw!");
                resultMsg.innerHTML = 'Draw!';
                resultMsg.style.color = 'yellow';
            } else if (dealerScore > youScore) {
                blacjack['losses']++;
                losses.textContent = `${blacjack['losses']}`;
                lostSound.play();
                resultMsg.innerHTML = 'You Lose!';
                resultMsg.style.color = 'red';
                // console.log("You Lose!");
            }

        } else {

            // console.log("You won!", wins);
            blacjack['wins']++;
            wins.textContent = blacjack['wins'];
            wonSound.play();
            resultMsg.innerHTML = 'You Won!';
            resultMsg.style.color = 'green';
        }
    } else {
        blacjack['losses']++;
        losses.textContent = blacjack['losses'];
        lostSound.play();
        resultMsg.innerHTML = 'You Lose!';
        resultMsg.style.color = 'red';
        // console.log("You Lose!");
    }

}