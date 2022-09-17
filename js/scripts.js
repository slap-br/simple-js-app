//Task 2.1 
//Classic pokemons list
//Create a new var "PokemonRepository" and assign to IIFE

let pokemonRepository = (function() {
  let pokemonList = [ //array with pokemons
      {
        name : 'bulbasaur',
        height : 7,
        types : ['grass', 'poison']
      },
  
      {
        name : 'charmander',
        height : 8,
        types : ['fire']
      },
      
      {
        name : 'butterfree',
        height : 10,
        types : ['bug', 'flying']
      },
  
      {
        name : 'squirtle',
        height : 6,
        types : ['water']
      },
  
      {
          name: 'pidgeotto',
          height: 5,
          types: ['flying', 'normal']
      },
  
      {
          name: 'pikachu',
          height: 4,
          types: 'electric',
      }
   ]
  
  // add item - pokemonList.push()
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
  
  
   return {
      getAll : getAll,
      add : add,
      heightGreaterThan : heightGreaterThan
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
    // Interpolates the string
    let pokemonDescription = `${pokemon.name} (height: ${pokemon.height}")`;
    if (pokemon.height > threshold) {
      // Concatenate the text 
      pokemonDescription = `${pokemonDescription} - Wow, that's big!`;
    }

    let div = "<div class='poke'>" + pokemonDescription + "</div>";

  document.write(div);
    });
  
  
  