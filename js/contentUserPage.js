const userLogado = 1;
const url = `http://localhost:3333/decks/${userLogado}`;
const baralhos = document.querySelector('.baralhos > .row');

function getDecks(){
    axios.get(url)
    .then(response => {
        let withDeck = false;
        const data = response.data
        data.forEach(element => {
            let deck = {
                nome: element.nome,
                id: element.id
            };
            withDeck = true;
            baralhos.innerHTML += `
            <a href="./deck.html" class="col-md-4 mb-3 linkDeck" onclick="choosedDeck(${deck.id})">
                    <div class="card card-baralho">
                        <img src="../images/baralho.jpg" alt="...">
                        <div class="card-body card-body-baralho">
                            <h2 class="card-title">${deck.nome}</h2>
                        </div>
                    </div>
            </a>
            `
        });
        if(!withDeck){
            baralhos.innerHTML += `<div class="alert">Você ainda não tem baralhos</div>`
        }
    })
};

function choosedDeck(deck_id){
    localStorage.setItem('deck_id', deck_id);
}

getDecks();