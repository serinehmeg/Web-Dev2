window.onload = function() {
    const maxPokemon = 1025;

    // When click the search icon
    document.querySelector("#search").addEventListener("click", getPokemon);

    // When hit Enter in search bar
    document.getElementById('pokemonName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            getPokemon(); 
        }
    });

    // While typing in search bar
    document.getElementById('pokemonName').addEventListener('input', function(e) {
        if (e.target.value.trim() === "") {
            // Clear pokemon box if input is empty
            document.querySelector(".pokemonBox").innerHTML = "";
        }
    });

    // Capitalize the first letter (for printing Pokemon Name)
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // fetch from Pokemon API and display the result
    function getPokemon(){
        var pokemonName = document.querySelector("#pokemonName").value.toLowerCase();

        fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Pokemon not found');
                }
                return response.json();
            })
            .then((data) => {
                document.querySelector(".pokemonBox").innerHTML = `
                <div>
                    <h1>${capitalizeFirstLetter(data.name)}</h1>
                    <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
                </div>
                <div class="pokemonInfo">
                    <p>#${data.id}</p>
                    <p>Height: ${data.height}</p>
                    <p>Weight: ${parseInt(data.weight * 0.220462)} lbs</p>
                </div>
                `;
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
