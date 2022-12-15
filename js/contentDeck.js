const userLogado = 1;
const urlCards = `http://localhost:3333/cards/${userLogado}`;
const urlDifficultyCardsStudent = `http://localhost:3333/difficultyCardsStudent/${userLogado}`;
const theCard = document.querySelector('.the-card');
const infoProgressoDOM = document.querySelector('#infoProgresso')
const progresso = document.querySelector("#barra div")
let cards;
let difficultCardsStudent;

getDifficultyCardsStudent();
getCards();

var iterifyArr = function (arr) {
    var cur = 0;
    arr.next = (function () { return (++cur >= this.length) ? false : this[cur]; });
    arr.prev = (function () { return (--cur < 0) ? false : this[cur]; });
    return arr;
};


function getCards(){
    axios.get(urlCards)
        .then(response => {
            cards = response.data;
            const countAulas = cards.length;
            let countConcluido = 0;
            iterifyArr(cards)
            let card = cards[0]
            calcularProgresso(countConcluido, countAulas);
            carregarCard(card, countConcluido, countAulas);
            // cards.forEach(element => {
            //     let card = {
            //         id: element.id,
            //         frasePort: element.frasePort,
            //         fraseIng: element.fraseIng
            //     }
                
            // });
        })
}

function getDifficultyCardsStudent(){
    axios.get(urlDifficultyCardsStudent)
        .then(response => {
            difficultCardsStudent = response.data;
        })
    
}



// const cards = [
//     {
//         id: "1",
//         ingSide: "How do you pronounce...?",
//         porSide: "Como se pronuncia...?"
//     },
//     {
//         id: "2",
//         ingSide: "Can you repeat that?",
//         porSide: "Pode repetir isso?"
//     },
//     {
//         id: "3",
//         ingSide: "Let's have dinner!",
//         porSide: "Vamos jantar!"
//     },
//     {
//         id: "4",
//         ingSide: "How do you say 'water' in Japanese",
//         porSide: "Como se diz 'água' em japonês"
//     }
// ]
// iterifyArr(cards);

// card = cards[0];
// carregarCard();



// calcularProgresso();


function carregarCard(card, countConcluido, countAulas){
    console.log(card)
    let difficulty = 0;
    difficultCardsStudent.forEach(element => {
        console.log(element);
        if(element.card_id == card.id){
            difficulty = element.difficulty;
        }
    });
    theCard.innerHTML = `
        <div class="row front-card" onclick="virar()">
            <div class="col-12 col-sm-8 col-md-6 col-lg-4 mb-3">
                <div class="card card-baralho">
                    <p class="frase">${card.fraseIng}</p>
                    <div class="card-body card-body-baralho">
                        <h2 class="card-title">Virar Carta -></h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="row back-card">
            <div class="col-12 col-sm-8 col-md-6 col-lg-4 mb-3">
                <div class="card card-baralho">
                    <p class="frase" onclick="desvirar()">${card.frasePort}</p>
                    <div class="card-body card-body-baralho">
                        <div class="classificacao">
                            <button class="dificuldade" onclick="avaliar(${countConcluido}, ${countAulas})">
                                <div class="emoji">
                                    &#x1F600
                                </div>
                                <div>
                                    Fácil
                                </div>
                            </button>
                            <button class="dificuldade" onclick="avaliar(${countConcluido}, ${countAulas})">
                                <div class="emoji">
                                    &#x1F642
                                </div>
                                <div>
                                    Normal
                                </div>
                            </button>
                            <button class="dificuldade" onclick="avaliar(${countConcluido}, ${countAulas})">
                                <div class="emoji">
                                    &#x1F61F
                                </div>
                                <div>
                                    Difícil
                                </div>
                            </button>
                            <button class="dificuldade" onclick="avaliar(${countConcluido}, ${countAulas})">
                                <div class="emoji">
                                    &#x1F616
                                </div>
                                <div>
                                    Não sei
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div>${difficulty}</div>
            </div>
        </div>
    `
}

function virar() {
    card = document.querySelector('.the-card');
    card.style.transform = "rotateY(180deg)"
    
}

function desvirar() {
    card = document.querySelector('.the-card');
    card.style.transform = "rotateY(0deg)"
}

async function avaliar(countConcluido, countAulas) {
    desvirar();
    await sleep(250);
    card = cards.next();
    countConcluido++;
    calcularProgresso(countConcluido, countAulas);
    
    if(card != false){
        carregarCard(card, countConcluido, countAulas);
    }else {
        theCard.innerHTML= `
            <div class="row front-card" onclick="virar()">
                <div class="col-12 col-sm-8 col-md-6 col-lg-4 mb-3">
                    <div class="card card-baralho">
                        <p class="frase">Baralho finalizado!</p>
                        
                        <a href="./userPage.html">
                            <div class="card-body card-body-baralho">
                                <h2 class="card-title">Voltar a tela inicial</h2>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        `
    }
}

function calcularProgresso(countConcluido, countAulas) {
    let progressoAtual = (countConcluido / countAulas) * 100;
    progresso.style.width= `${progressoAtual}%`
    infoProgressoDOM.innerHTML = `${~~progressoAtual}% - ${countConcluido}/${countAulas}<br>`
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}