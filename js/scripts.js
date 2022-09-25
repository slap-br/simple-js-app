  //Task 2.1 
  //Classic pokemons list
  //Create a new var "PokemonRepository" and assign to IIFE

  let pokemonRepository = (function() {
    let pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; // vai ser uma constante em vez de var
    
    // add item - pokemonList.push() adiciona novo item pra lista
    function add(item) {
      return pokemonList.push(item);
    }
    
    function getAll() {
      return pokemonList;
    };

    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function(response) {
        const pokemons = response.results;
        //carregando os dados do repositorio/api
          pokemons.forEach(function (pokemon) {
            add({
              name: pokemon.name,
              detailsUrl: pokemon.url
            });
          });
      }).catch(function (e) {
        console.error(e);
      })
    }

    //load pokemon details 
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
          return response.json();
      }).then(function (details) {
        // add detalhes
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        return item;
    }).catch(function (e) {
          console.error(e);
      });
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
      });
      
    }

    function showDetails(pokemon){ 
      loadDetails(pokemon).then(function (pokemonDetails) {
        console.log(pokemonDetails);
    });
    }

    return {
        getAll : getAll,
        add : add,
        addListItem : addListItem,
        showDetails : showDetails,
        loadList : loadList,
        loadDetails : loadDetails,
      };
    
    })()
    
  /*adding a new pokemon to rep.
    pokemonRepository.add({
      name: 'Krabby', height: 0.4, types : 'water'});

    
      let pokemonList = pokemonRepository.getAll();
      console.log(pokemonList);
    
    // Height limit threshold
    const threshold = 8;
  */
    pokemonRepository.loadList().then(() => {
      pokemonRepository.getAll().forEach(function(pokemon)
      {
        pokemonRepository.addListItem(pokemon); //addListItem inside forEach pokemon
      });
    });
  
    /** pokemonDetails
      // Interpolates the string
      let pokemonDescription = `${pokemon.name} (height: ${pokemon.height}")`;
      if (pokemon.height > threshold) {
        // Concatenate the text 
        pokemonDescription = `${pokemonDescription} - Wow, that's big!`;
      }
      let div = "<div class='poke'>" + pokemonDescription + "</div>";
    document.write(div);
      });  
      
      
      })*/
    
    
    