window.onload = function() {

    // When click the search icon
    document.querySelector("#search").addEventListener("click", getPokemon);

    // When hit Enter in search bar
    document.getElementById('pokemonName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            var pokemonName = document.querySelector("#pokemonName").value.toLowerCase();
            var fixedName = pokemonName.replace(/[.]/g, '');
            fixedName = fixedName.replace(/[' ']/g, '-');
            window.location.href = `./pokemon-detail.html?id=${fixedName}`;
        }
    });

    // While typing in search bar
    document.getElementById('pokemonName').addEventListener('input', function(e) {
        if (e.target.value.trim() === "") {
            // Clear pokemon box if input is empty
            document.querySelector(".pokemonBox").innerHTML = "";
        }
    });

    // fetch from Pokemon API and display the result
    function getPokemon(){
        var pokemonName = document.querySelector("#pokemonName").value.toLowerCase();
        var fixedName = pokemonName.replace(/[.]/g, '');
        fixedName = fixedName.replace(/[' ']/g, '-');

        fetch (`https://pokeapi.co/api/v2/pokemon/${fixedName}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Pokemon not found');
                }
                return response.json();
            })
            
            
    }

//----------Fills in grid with pokemon images-------------------------------------
function fillPokemonGrid() {
    for (let i = 1; i <= 24; i++) {
        const pokemonInfo = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const pokemonGridBox = document.createElement("div");
        document.querySelector("#pokemonGrid").appendChild(pokemonGridBox);
        fetch(pokemonInfo)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(data) {
                const pokemonGridName = data.name;
                const pokemonID = data.id;
                const pokemonGridImage = data.sprites['front_default'];
                const pokemonImage = document.createElement("img");
                pokemonImage.src = pokemonGridImage;
                pokemonGridBox.appendChild(pokemonImage);
                pokemonGridBox.innerHTML += pokemonGridName;
                
                // Add click event listener to each grid box
                pokemonGridBox.addEventListener('click', function() {
                    //document.querySelector("#pokemonName").value = pokemonID;
                    window.location.href = `./pokemon-detail.html?id=${pokemonID}`;
                });
            })
            .catch(function(error) {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
}    
    fillPokemonGrid();
    


    async function getPokemonID(string) {
        try {
            console.log('string is ' + string);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${string}`);
            const data = await response.json();
            console.log('data id is ' + data.id);
            return data.id;
        } catch (err) {
            console.log("Pokemon not found", err);
            throw err; // rethrowing error so it can be caught in getPokemonDescription
        }
    }

    async function getPokemonDescription(pokemonId) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/characteristic/${pokemonId}/`);
            const data = await response.json();
            console.log('data desc' + data.descriptions);
            console.log('hello')
            console.log('id is ' + pokemonId);
            
            document.querySelector(".pokemonBox").innerHTML += `
                <div class="pokemonInfo">
                <p>${data.descriptions[7].description}</p>
                </div>
            `;
        } catch (err) {
            console.log("Pokemon description not found", err);
        }
    }

    //getPokemon();
    //getPokemonDescription();
};
