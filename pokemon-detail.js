// Set color for each type
const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
};

// Get the pokemon ID from the link
const pokemonID = new URLSearchParams(window.location.search).get("id");

let pokemonDetail = () => {
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)

        .then((response) => {
            if (!response.ok) {
                throw new Error('Pokemon not found');
            }
            return response.json();
        })

        .then((data) => {

            // Get necessary data and assign it to variables
            const hp = data.stats[0].base_stat;
            const imgSrc = data.sprites.other["official-artwork"].front_default;
            const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
            const statAttack = data.stats[1].base_stat;
            const statDefense = data.stats[2].base_stat;
            const statSpeed = data.stats[5].base_stat;
            const statHeight = data.height;
            const statWeight = (data.weight * 0.220462).toFixed(0);

            // Set themeColor based on pokemon type
            const themeColor = typeColor[data.types[0].type.name];
            
            // Display the pokemon
            document.querySelector(".pokemonBox").innerHTML = `
                <div id = card>
                    <p class="hp">
                        <span>HP</span>
                         ${hp}
                    </p>
                    <img src=${imgSrc} />
                    <h2 class="poke-name">${pokeName}</h2>
                    <div class="types">
                    
                    </div>
                    <div class="stats">
                        <div>
                            <h3>${statAttack}</h3>
                            <p>Attack</p>
                        </div>
                        <div>
                            <h3>${statDefense}</h3>
                            <p>Defense</p>
                        </div>
                        <div>
                            <h3>${statSpeed}</h3>
                            <p>Speed</p>
                        </div>
                        <div>
                            <h3>${statHeight}</h3>
                            <p>Height</p>
                        </div>
                        <div>
                            <h3>${statWeight}</h3>
                            <p>Weight</p>
                        </div>
                    </div>
                    
                </div>
            `;
            appendTypes(data.types);
            styleCard(data.types);
            document.querySelector("#exitBox").style.display = "block"; //adds the exit button to remove pokemon card
            // Call getPokemonDescription to get the description
            getPokemonDescription(data.id);
        })

        .catch(error => {
            console.log("Error fetching Pokemon data:", error);
            if (error.message === 'Pokemon not found') {
                document.querySelector(".pokemonBox").innerHTML = `
                <div>
                <h1>Wrong ID or Pokemon Name, Try again</h1>
                </div>
                `;
            }
        });
}

// Display types of the pokemon
let appendTypes = (types) => {
    types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;
    document.querySelector(".types").appendChild(span);
    });
};

// Set background of the card
let styleCard = (types) => {
    // color of the circle
    card.style.background = `radial-gradient(circle at 50% 0%, ${typeColor[types[0].type.name]} 36%, #ffffff 36%)`;

    // color of the types
    const typeSpans = card.querySelectorAll(".types span");
    typeSpans.forEach((typeSpan, index) => {
        const type = types[index].type.name;
        typeSpan.style.backgroundColor = typeColor[type];
    });
};

function getPokemonDescription(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)

        .then((response) => {
            if (!response.ok) {
                throw new Error('Pokemon not found');
            }
            return response.json();
        })

        .then((data) => {

            // Get desctiption of the pokemon
            pokemonDesc = data["flavor_text_entries"][10]["flavor_text"];
            
            
            // Display the pokemon
            document.querySelector(".pokemonDescription").innerHTML = `
                <p>${pokemonDesc}</p>
            `;
        })

        .catch(error => {
            console.log("Error fetching Pokemon data:", error);
            if (error.message === 'Pokemon not found') {
                document.querySelector(".pokemonBox").innerHTML = `
                <div>
                <h1>Wrong ID or Pokemon Name, Try again</h1>
                </div>
                `;
            }
        });
}

    //----------------------------removes the pokemon card
    /*document.querySelector("#exitBox").onclick = function(){
        document.querySelector("#pokemonName").value = "";
        document.querySelector(".pokemonBox").innerHTML = "";
        document.querySelector("#exitBox").style.display = "none";

    }
    */

window.addEventListener("load", pokemonDetail);
