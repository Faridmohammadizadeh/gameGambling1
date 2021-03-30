'use strict';

// NEWPART selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scorePlayer0El = document.querySelector('#score--0');
const scorePlayer1El = document.getElementById('score--1');
const currentPlayer0El = document.getElementById('current--0');
const currentPlayer1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// NEWPART starter
let active = true;
const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
scorePlayer0El.textContent = 0;
scorePlayer1El.textContent = 0;
diceEl.classList.add('hidden');

// NEWPART random number generater
let dice = new Number();
const randomNumber = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

// NEWPART Swircher
const switcher = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// NEWPART rolling dice
btnRoll.addEventListener('click', function () {
  if (active) {
    dice = randomNumber();

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      console.log(`'Dice 1'switch to player ${activePlayer == 0 ? 1 : 0}`);
      switcher();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (active) {
    console.log(`'Hold' switch to player ${activePlayer == 0 ? 1 : 0}`);

    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      active = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else switcher();
  }
});

btnNew.addEventListener('click', function () {
  active = true;
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;
  currentScore = 0;
  scorePlayer0El.textContent = 0;
  scorePlayer1El.textContent = 0;
  currentPlayer0El.textContent = 0;
  currentPlayer1El.textContent = 0;

  diceEl.classList.add('hidden');

  document.querySelector(`.player--0`).classList.remove('player--winner');

  document.querySelector(`.player--1`).classList.remove('player--winner');

  document.querySelector(`.player--0`).classList.add('player--active');
  // player
});

// NEWPART about:
document.querySelector('.btn--about').addEventListener('click', function () {
  document.querySelector('.modal').classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');
});

document.querySelector('.overlay').addEventListener('click', function () {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
});
