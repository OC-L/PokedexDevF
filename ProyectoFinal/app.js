const pokemonContainer = document.querySelector(".pokemon-container");
var next = document.getElementById("mas")
let pageCounter = 1
let offset = 1;
let limit = 8;


next.addEventListener("click", () => {
    offset += 9;
    fetchPokemons(offset, limit);
    pageCounter++
});

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
		.then((data) => data.json())
		.then((response) => {
			createPokemon(response);
		});
}

function fetchPokemons(offset, limit) {
    for (let i = offset; i <= offset + limit; i++) {
      fetchPokemon(i);
    }
}

function home() {
    location.href = "./index.html";
}

function goSearch() {
    location.href = "./Search/search.html";
}

function createPokemon(pokemon) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const imgCont = document.querySelector(".img-container");
    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;
    

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
      	const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");

    cardBack.appendChild(statusCard(pokemon.stats));

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
}

function statusCard(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");

    for (let i = 0; i < 4; i++) {
		const stat = stats[i];

		const statPercent = stat.base_stat
		const statContainer = document.createElement("stat-container");
		statContainer.classList.add("stat-container");

		const statName = document.createElement("p");
		statName.textContent = stat.stat.name;

		const progress = document.createElement("div");

		const progressStat = document.createElement("div");
		progressStat.setAttribute("aria-valuenow", stat.base_stat);

		progressStat.style.width = statPercent;

		progressStat.textContent = stat.base_stat;

		progress.appendChild(progressStat);
		statContainer.appendChild(statName);
		statContainer.appendChild(progress);

		statsContainer.appendChild(statContainer);
    }

    return statsContainer;
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
      	parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit);