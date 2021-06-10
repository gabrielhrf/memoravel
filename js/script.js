
var start = new Audio('sounds/start.wav');
var game_over_audio = new Audio('sounds/game-over.wav');
var green_audio = new Audio('sounds/green.wav');
var red_audio = new Audio('sounds/red.wav');
var yellow_audio = new Audio('sounds/yellow.wav');
var blue_audio = new Audio('sounds/blue.wav');




let order = [];
let clickOrder = [];
let score = 0;
let level = 1;


// 0 - verde
// 1 - vermelho 
// 2 - amarelo
// 3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');


let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order.push(colorOrder);
    clickOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        
        lightColor(elementColor, Number(i) + 1, order[i]);
        
    }
}

let lightColor = (element, number, color) => {
    number = number * 600;
    setTimeout(() => {
        element.classList.add('selected');
        if(color == 0)
        {
            green_audio.play();
        }else if (color == 1){
            red_audio.play();
        }else if(color == 2){
            yellow_audio.play();
        }else if(color == 3){
            blue_audio.play();
        }
    },number-500);
    

    setTimeout(() => {        
        element.classList.remove('selected');
    },number);
}

let checkOrder = () => {
    for(let i in clickOrder)
    {
        if(clickOrder[i] != order[i])
        {
            gameOver();
            break;
        }
    }    

    score = score + 100;
    document.querySelector('.score').innerHTML = "Pontuação " + score;

    if(clickOrder.length == order.length)
    {
        nextLevel();
    }
}

//função para o clique do usuário
let click = (color) => {
    clickOrder.push(color);
    createColorElement(color).classList.add('selected');

    if(color == 0)
    {
        green_audio.play();
    }else if (color == 1){
        red_audio.play();
    }else if(color == 2){
        yellow_audio.play();
    }else if(color == 3){
        blue_audio.play();
    }

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 150);

}

// função que retorna a cor
let createColorElement = (color) => {
    if(color == 0)
    {
        return green;
    }else if (color == 1){
        return red;
    }else if(color == 2){
        return yellow;
    }else if(color == 3){
        return blue;
    }
}

// função para o proximo nivel

let nextLevel = () => {
    alert("Nível atual " + level);
    level++;
    shuffleOrder();
    
}

// função game over
let gameOver = () => {
    game_over_audio.play()
    alert("Pontuação: "+score+"!\nVocê perdeu o jogo! Clique em OK para recomeçar");
    order = [];
    clickedOrder = [];
    level = 1;
    document.getElementById("button").disabled = false;
}

//função para iniciar o jogo
let playGame = () => {
    order = [];
    clickOrder = [];
    score = 0;
    document.getElementById("button").disabled = true;
    nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

