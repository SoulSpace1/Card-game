import { templateEngine } from './js/templateEngine';

import { difficultyScreen } from './js/screenPatterns';

import { topBox } from './js/screenPatterns';

import './styles/styles.css';

import Swal from 'sweetalert2';

import '../node_modules/sweetalert2/dist/sweetalert2.css';

window.application = {
  screens: { renderDifficultyScreen },
  difficultyLevel: '',
  cardsTotal: [],
  cardsOpened: [],
  cardsToCompare: [],
  cardsLength: [],
  cardHideTimer: [],
  gameTimer: [],
};

function shuffle(array: string[]) {
  array.sort(() => Math.random() - 0.5);
}

function renderDifficultyScreen() {
  const container = document.querySelector('.container');
  container.innerHTML = '';
  container.appendChild(templateEngine(difficultyScreen));
  const difficultySelectBox = document.querySelector('.difficulty_box');
  const button = document.querySelector('.difficulty_button');
  difficultySelectBox.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    window.application.difficultyLevel = target.textContent;
    button.textContent = window.application.difficultyLevel;
  });
  button.addEventListener('click', () => {
    if (window.application.difficultyLevel === 'easy') {
      renderGame(3, 2);
    }
    if (window.application.difficultyLevel === 'normal') {
      renderGame(6, 4);
    }
    if (window.application.difficultyLevel === 'hard') {
      renderGame(9, 6);
    }
  });
}

function renderGame(difficulty: number, time: number) {
  const container = document.querySelector('.container');
  window.application.gameTimer.forEach((item) => {
    clearInterval(item);
  });
  window.application.gameTimer = [];
  window.application.cardsTotal = [];
  window.application.difficultyLevel = '';

  const cards = [
    '1_clover.png',
    '6_clover.png',
    '7_clover.png',
    '8_clover.png',
    '9_clover.png',
    '10_clover.png',
    'J_clover.png',
    'Q_clover.png',
    'K_clover.png',
    '1_diamond.png',
    '6_diamond.png',
    '7_diamond.png',
    '8_diamond.png',
    '9_diamond.png',
    '10_diamond.png',
    'J_diamond.png',
    'Q_diamond.png',
    'K_diamond.png',
    '1_hearts.png',
    '6_hearts.png',
    '7_hearts.png',
    '8_hearts.png',
    '9_hearts.png',
    '10_hearts.png',
    'J_hearts.png',
    'Q_hearts.png',
    'K_hearts.png',
    '1_spade.png',
    '6_spade.png',
    '7_spade.png',
    '8_spade.png',
    '9_spade.png',
    '10_spade.png',
    'J_spade.png',
    'Q_spade.png',
    'K_spade.png',
  ];

  container.innerHTML = '';
  container.appendChild(templateEngine(topBox));

  shuffle(cards);
  cards.length = difficulty;
  const generatedCards = [...cards, ...cards];

  shuffle(generatedCards);

  renderCards(generatedCards);

  restartCurrentGame(difficulty, time);

  timeCount(time);
}

function restartCurrentGame(difficulty: number, time: number) {
  const restartButton = document.querySelector('.restart_button');
  restartButton.addEventListener('click', () => {
    renderGame(difficulty, time);
  });
}

function renderCards(array: string[]) {
  const container = document.querySelector('.container');
  window.application.cardsTotal = array;
  window.application.cardsOpened = [];
  for (let i = 0; i < array.length; i++) {
    const card = document.createElement('img');
    card.classList.add('game__card');
    card.src = 'static/' + array[i];
    container.appendChild(card);
    const cardCover = document.createElement('img');
    cardCover.classList.add('game__card-cover', 'game__card-cover_hidden');
    container.appendChild(cardCover);

    hideCards(card, cardCover);

    openCards(cardCover, card, array[i]);
  }
}

function hideCards(card: HTMLImageElement, cardCover: HTMLImageElement) {
  let hideCards = setInterval(() => {
    card.classList.add('game__card_hidden');
    cardCover.classList.remove('game__card-cover_hidden');
    window.application.cardHideTimer.push(hideCards);
    window.application.cardHideTimer.forEach((item) => {
      clearInterval(item);
    });
  }, 5000);
}

function openCards(
  cardCover: HTMLImageElement,
  card: HTMLImageElement,
  arrayCard: any
) {
  cardCover.addEventListener('click', (event) => {
    let target = event.target;
    target = arrayCard;
    card.classList.remove('game__card_hidden');
    cardCover.classList.add('game__card-cover_hidden');
    window.application.cardsToCompare.push(target);
    if (window.application.cardsToCompare.length > 1) {
      compareCards();
    }
  });
}

function compareCards() {
  let card1 = window.application.cardsToCompare[0];
  let card2 = window.application.cardsToCompare[1];
  if (card1 === card2) {
    playerWin(window.application.cardsToCompare);
    window.application.cardsToCompare = [];
  } else {
    window.application.cardsToCompare = [];
    window.application.difficultyLevel = '';
    let gameTime = window.application.gameTimer.length;
    Swal.fire({
      title: 'Oops!',
      text: `Try again! The Game has ended in ${gameTime} sec`,
      icon: 'error',
      confirmButtonText: 'Ok',
    });
    window.application.gameTimer.forEach((item) => {
      clearInterval(item);
    });
    window.application.gameTimer = [];

    renderDifficultyScreen();
  }
}

function playerWin(cardsOpened: EventTarget) {
  window.application.cardsOpened.push(cardsOpened);
  let array2 = window.application.cardsTotal;
  let array1 = window.application.cardsOpened.flat();
  let gameTime = window.application.gameTimer.length;
  if (array1.length === array2.length) {
    Swal.fire({
      title: 'Congratulations!',
      text: `You won! You has completed the task in ${gameTime} sec`,
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    console.log(gameTime);
    window.application.gameTimer.forEach((item) => {
      clearInterval(item);
    });
    window.application.gameTimer = [];
    renderDifficultyScreen();
  }
}

function timeCount(time: number) {
  const timeBox = document.querySelector('.game__top-box_timer');
  timeBox.textContent = `${time}:00`;
  let timeMinut = time * 60;

  let timer = setInterval(function () {
    let seconds = timeMinut % 60;
    let minutes = (timeMinut / 60) % 60;
    let strTimer = `${Math.trunc(minutes)}:${seconds}`;
    timeBox.innerHTML = strTimer;

    --timeMinut;
    window.application.gameTimer.push(timer);

    if (timeMinut <= 0) {
      clearInterval(timer);
      Swal.fire({
        title: 'Sorry!',
        text: 'The time is over',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      renderDifficultyScreen();
    }
  }, 1000);
}
