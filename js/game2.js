const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'foto_barata',
    'foto_boi',
    'foto_cachorro',
    'foto_cavalo',
    'foto_coelho',
    'foto_elefante',
    'foto_gato',
    'foto_jacare',
    'foto_macaco',
    'foto_peixe',
    'sinal_barata',
    'sinal_boi',
    'sinal_cachorro',
    'sinal_cavalo',
    'sinal_coelho',
    'sinal_elefante',
    'sinal_gato',
    'sinal_jacare',
    'sinal_macaco',
    'sinal_peixe',

];

const validPairs = {
  'foto_barata': 'sinal_barata',
  'sinal_barata': 'foto_barata',
  'foto_cachorro': 'sinal_cachorro',
  'sinal_cachorro': 'foto_cachorro',
  'foto_coelho': 'sinal_coelho',
  'sinal_coelho': 'foto_coelho',
  'foto_elefante': 'sinal_elefante',
  'sinal_elefante': 'foto_elefante',
  'foto_gato': 'sinal_gato',
  'sinal_gato': 'foto_gato',
  'foto_jacare': 'sinal_jacare',
  'sinal_jacare': 'foto_jacare',
  'foto_macaco': 'sinal_macaco',
  'sinal_macaco': 'foto_macaco',
  'foto_peixe': 'sinal_peixe',
  'sinal_peixe': 'foto_peixe',
  'foto_boi': 'sinal_boi',
  'sinal_boi': 'foto_boi',
  'foto_cavalo': 'sinal_cavalo',
  'sinal_cavalo': 'foto_cavalo',
};

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
  
    if (disabledCards.length === 20) {
      clearInterval(this.loop);
      setTimeout(() => {
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
      }, 500);
    }
  }
  

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (validPairs[firstCharacter] === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../imagens/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters];
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
