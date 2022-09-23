//Task 2.1 
//Classic pokemons list
//Create a new var "PokemonRepository" and assign to IIFE

let pokemonRepository = (function() {
  let pokemonList = []

  
  // add item - pokemonList.push() adiciona novo item pra lista
  function add(item) {
    return pokemonList.push(item);
  }
  
  function getAll() {
    return pokemonList;
  };

  function heightGreaterThan (height) {
    let pokemons = pokemonList.filter((p) => { return p.height > height });
    return pokemons;
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list"); //adiciona a classe na variavel pokemonList

    let listpokemon = document.createElement("li"); //cria lista na variavel listPokemon

    let button = document.createElement("button"); //cria variavel de botao

    button.innerText = pokemon.name; //joga o nome do pokemon dentro do botao

    button.classList.add("button-class"); //cria a classe do botao

    listpokemon.appendChild(button); //lista o boto na pagina

    pokemonList.appendChild(listpokemon);

    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    })
    
  }

  function showDetails(pokemon){
    console.log(pokemon);
  }

   return {
      getAll : getAll,
      add : add,
      heightGreaterThan : heightGreaterThan,
      addListItem : addListItem,
      showDetails : showDetails
    };
  
  })()
  
  //adding a new pokemon to rep.
  pokemonRepository.add({
    name: 'Krabby', height: 0.4, types : 'water'});
  
    let pokemonList = pokemonRepository.getAll();
    console.log(pokemonList);
  
  // Height limit threshold
  const threshold = 8;
  
  pokemonList.forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });

  
  /**
    // Interpolates the string
    let pokemonDescription = `${pokemon.name} (height: ${pokemon.height}")`;
    if (pokemon.height > threshold) {
      // Concatenate the text 
      pokemonDescription = `${pokemonDescription} - Wow, that's big!`;
    }
    let div = "<div class='poke'>" + pokemonDescription + "</div>";
  document.write(div);
    });  */
  
  
  