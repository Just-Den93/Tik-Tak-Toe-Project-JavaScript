for(let i = 0; i < 9; i++) {
    document.getElementById('game').innerHTML+='<div class="block"></div>';
}

let game = document.getElementById('game');
let blocks = document.querySelectorAll('.block');
let res = document.querySelector('.result');
let btnGame = document.querySelector('.new-game');
let currentPlayer = document.getElementById('cur-plr');

let step = false;
let player = '';
let score = {
    'x': 0,
    'o': 0,
    'd': 0,
};
count = 0;
let playerOne = 'x';
let playerSecond = '0';

function stepPlayerOne(target) {
    target.innerHTML = playerOne;
    target.classList.add('playerOne');
    count++;
};
function stepPlayerSecond(target) {
    target.innerHTML = playerSecond;
    target.classList.add('playerSecond');
    count++;
};
function init(e) {
     if(!step) stepPlayerOne(e.target);
     else stepPlayerSecond(e.target);
     step = !step;
    //  score[player] += 1;
     player = player == '0' ? 'x' : '0';
     currentPlayer.innerHTML = player.toUpperCase();
     checkWin();

};

function newGame() {
    step = false;
    count= 0;
    res.innerText = '';
    blocks.forEach(item => {
        item.innerHTML = '';
        currentPlayer.innerHTML = '';
        item.classList.remove('playerOne', 'playerSecond', 'active', 'negative');
        game.addEventListener('click', init);
        updateScore()
    })
};

function updateScore() {
    document.getElementById('sX').innerHTML = score.x;
    document.getElementById('sO').innerHTML = score.o;
    document.getElementById('sD').innerHTML = score.d;
}

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

        if (blocks[comb[i][0]].classList.contains('playerOne') &&
            blocks[comb[i][1]].classList.contains('playerOne') &&
            blocks[comb[i][2]].classList.contains('playerOne')) {
                setTimeout(() => {
                    blocks[comb[i][0]].classList.add('active');
                    blocks[comb[i][1]].classList.add('active');
                    blocks[comb[i][2]].classList.add('active');
                    res.innerText = 'Cross Win';
                }, 100);
                game.removeEventListener('click', init)
                score.x += 1
        }

        else if (blocks[comb[i][0]].classList.contains('playerSecond') &&
        blocks[comb[i][1]].classList.contains('playerSecond') &&
        blocks[comb[i][2]].classList.contains('playerSecond')) {
            setTimeout(() => {
                blocks[comb[i][0]].classList.add('active');
                blocks[comb[i][1]].classList.add('active');
                blocks[comb[i][2]].classList.add('active');
                res.innerText = 'Zero Win';
            }, 100);
            game.removeEventListener('click', init)
            score.o += 1
        }

        else if (count == 9 && i === 7) {
            blocks[comb[i][0]].classList.add('negative');
            blocks[comb[i][1]].classList.add('negative');
            blocks[comb[i][2]].classList.add('negative');
            res.innerText = 'Draw, try again';
            game.removeEventListener('click', init);
            console.log(score.d);
            score.d += 1;
        }
    }
};

btnGame.addEventListener('click', newGame);
game.addEventListener('click', init);
