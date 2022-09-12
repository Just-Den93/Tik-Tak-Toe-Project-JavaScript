for(let i = 0; i < 9; i++) {
    document.getElementById('game').innerHTML+='<div class="block"></div>';
}

let game = document.getElementById('game');
let blocks = document.querySelectorAll('.block');
let stat = document.querySelector('.status-text');
let btnGame = document.querySelector('.new-game');

let step = false;
let player = '';
let score = {
    'x': 0,
    'o': 0,
    'd': 0,
};
let count = 0;
let playerOne = 'x';
let playerSecond = '0';

const isPlayerOneWin = (blocks, comb, i) => [0, 1, 2].every(index => blocks[comb[i][index]].classList.contains(playerOne));
const isPlayerSecond = (blocks, comb, i) => [0, 1, 2].every(index => blocks[comb[i][index]].classList.contains(playerSecond));

const addActiveClass = (blocks, comb, i) => {
    blocks[comb[i][0]].classList.add('active');
    blocks[comb[i][1]].classList.add('active');
    blocks[comb[i][2]].classList.add('active');
};

const addNegativeClass = (blocks, comb, i) => {
    blocks[comb[i][0]].classList.add('negative');
    blocks[comb[i][1]].classList.add('negative');
    blocks[comb[i][2]].classList.add('negative');
};

const handlePlayerClick = (target, player) => {
    if(target.innerHTML !== playerOne && target.innerHTML !== playerSecond) {
        target.innerHTML = player;
        target.classList.add(player);
        count++;
        player = player == playerSecond ? playerOne : playerSecond;
        stat.textContent = `${player} Turn`;
    }
};

function init(e) {
     if(!step) handlePlayerClick(e.target, playerOne); 
     else handlePlayerClick(e.target, playerSecond);
     step = !step;
     checkWin();
};

function newGame() {
    step = false;
    count= 0;
    btnGame.style.display = 'none';
    blocks.forEach(item => {
        item.innerHTML = '';
        stat.innerHTML = `X Turn`;
        item.classList.remove(playerOne, playerSecond, 'active', 'negative');
        game.addEventListener('click', init);
        updateScore()
    })
};

function updateScore() {
    document.getElementById('sX').innerHTML = score.x;
    document.getElementById('sO').innerHTML = score.o;
    document.getElementById('sD').innerHTML = score.d;
};

function checkWin() {
    let comb = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    for(let i = 0; i < comb.length; i++) {

        if (isPlayerOneWin(blocks, comb, i)) {
            addActiveClass(blocks, comb, i);
            stat.innerText = `X Wins!`;
            game.removeEventListener('click', init)
            score.x += 1
            btnGame.style.display = "block"
        }

        else if (isPlayerSecond(blocks, comb, i)) {
            addActiveClass(blocks, comb, i);
            stat.innerText = `0 Wins!`;
            game.removeEventListener('click', init)
            score.o += 1
            btnGame.style.display = "block"
        }

        else if (count == 9 && i === 7) {
            addNegativeClass(blocks, comb, i);
            stat.innerText = `It's a Tie`;
            game.removeEventListener('click', init);
            score.d += 1;
            btnGame.style.display = "block"
        }
    }
};

btnGame.addEventListener('click', newGame);
game.addEventListener('click', init);
