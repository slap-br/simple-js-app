
  //Create a new var "PokemonRepository" and assign to IIFE

  let pokemonRepository = (function() {
    let pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; // vai ser uma constante em vez de var
    
    // add item - pokemonList.push() adiciona novo item pra lista
    function add(item) {
      return pokemonList.push(item);
    }
    // getAll pega os pokemons da lista
    function getAll() {
      return pokemonList;
    };

    function loadList() { //LISTA LOAD
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
      //chamar aqui o capeta do loading
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

//funcao de modal interativo
  function showModal (pokemonDetails) {
    let modalContainer = document.getElementById('modal-container');
    const modalBody = modalContainer.querySelector('.modal-body');

    // Clear all existing modal content
    modalBody.innerHTML = '';

    // let modal = document.createElement('div');
    // modal.classList.add('modal');

    let titleElement = modalContainer.querySelector('.modal-title');
    titleElement.innerText = pokemonDetails.name;

    const heightText = `Height: ${pokemonDetails.height}`;
    let heightContentElement = document.createElement('p');
    heightContentElement.innerText = heightText;

    //map to get the array and define the property then join
    let typesNames = pokemonDetails.types.map(t => { return t.type.name; }); 
    console.log(typesNames);

    const typeText = `Types: ${typesNames.join(', ')}`;
    let typeContentElement = document.createElement('p');
    typeContentElement.innerText = typeText;


    let imageElement = document.createElement('img');
    imageElement.src = pokemonDetails.imageUrl;
    console.log(pokemonDetails)

    modalBody.appendChild(imageElement);
    modalBody.appendChild(heightContentElement);
    modalBody.appendChild(typeContentElement);
    
  }


    function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list"); //adiciona a classe na variavel pokemonList
      pokemonList.classList.add ('list-group');

      let listPokemon = document.createElement("li"); //cria lista na variavel listPokemon
      listPokemon.classList.add ('group-list-item');

      let button = document.createElement("button"); //cria variavel de botao
      button.classList.add ('btn', 'btn-primary');
      button.setAttribute('data-toggle','modal');
      button.setAttribute('data-target','#modal-container');
      button.setAttribute('data-backdrop','true');

      button.innerText = pokemon.name; //joga o nome do pokemon dentro do botao

      listPokemon.appendChild(button); //lista o boto na pagina

      pokemonList.appendChild(listPokemon);

      button.addEventListener('click', function(event) {
        showDetails(pokemon);
      });
      
    }

    function showDetails(pokemon){ 
      loadDetails(pokemon).then(function (pokemonDetails) {
        console.log(pokemonDetails);
        showModal(pokemonDetails);
    });
    }

    return {
        getAll : getAll,
        add : add,
        addListItem : addListItem,
        showDetails : showDetails,
        loadList : loadList,
        loadDetails : loadDetails,
        showModal : showModal,
      };
    
    })()
    
    pokemonRepository.loadList().then(() => {
      
      pokemonRepository.getAll().forEach(function(pokemon)
      {
        pokemonRepository.addListItem(pokemon); //addListItem inside forEach pokemon
      });
    });
    
    
    // window.addEventListener('keydown', (e) => {
    //   let modalContainer = document.getElementById('modal-container');
    //   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    //     hideModal();  
    //   }
    // });


