const mauroBoard = document.getElementById('mauro-board');
const mauroRestartButton = document.getElementById('mauro-restart');
let mauroCards = [];
let mauroFlippedCards = [];
let mauroMatchedCards = [];

const mauroCardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const mauroShuffledValues = [...mauroCardValues, ...mauroCardValues].sort(() => Math.random() - 0.5);

function createCards() {
    for (let i = 0; i < mauroShuffledValues.length; i++) {
        const mauroCard = document.createElement('div');
        mauroCard.classList.add('mauro-card');
        mauroCard.setAttribute('data-id', i);
        mauroCard.addEventListener('click', onCardClick);
        mauroCard.dataset.value = mauroShuffledValues[i];
        mauroBoard.appendChild(mauroCard);
        mauroCards.push(mauroCard);
    }
}

function onCardClick(event) {
    const mauroCard = event.target;
    if (mauroCard.classList.contains('flipped') || mauroFlippedCards.length === 2) return;

    mauroCard.classList.add('flipped');
    mauroCard.textContent = mauroCard.dataset.value;
    mauroFlippedCards.push(mauroCard);

    if (mauroFlippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = mauroFlippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        // Si las cartas coinciden, se eliminan del tablero
        card1.classList.add('matched');
        card2.classList.add('matched');
        mauroMatchedCards.push(card1, card2);

        // Eliminar las cartas del DOM para que desaparezcan
        setTimeout(() => {
            card1.style.visibility = 'hidden';
            card2.style.visibility = 'hidden';
        }, 500);

        // Si todas las cartas han sido emparejadas, muestra la alerta de SweetAlert2
        if (mauroMatchedCards.length === mauroShuffledValues.length) {
            setTimeout(() => {
                Swal.fire({
                    title: '¡Felicidades!',
                    text: 'Has ganado el juego.',
                    icon: 'success',
                    confirmButtonText: '¡Genial!'
                });
            }, 500);
        }
    } else {
        // Si no coinciden, se aplica el efecto de sacudida
        card1.classList.add('shake');
        card2.classList.add('shake');

        // Eliminar el efecto después de la animación
        setTimeout(() => {
            card1.classList.remove('shake');
            card2.classList.remove('shake');
        }, 500);

        // Si no coinciden, se voltean nuevamente después de un breve retraso
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 500);
    }
    mauroFlippedCards = [];
}

function resetGame() {
    mauroMatchedCards = [];
    mauroFlippedCards = [];
    mauroShuffledValues.sort(() => Math.random() - 0.5);
    mauroCards.forEach((card, index) => {
        card.classList.remove('flipped', 'matched', 'shake');
        card.textContent = '';
        card.style.visibility = 'visible';
        card.dataset.value = mauroShuffledValues[index];
    });
}

mauroRestartButton.addEventListener('click', resetGame);

createCards();
