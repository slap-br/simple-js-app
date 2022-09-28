
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
    let modalContainer = document.querySelector('.pokemon-details-modal');
    // Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content!!!
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);


    let titleElement = document.createElement('h1');
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

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightContentElement);
    modal.appendChild(typeContentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');


    function hideModal() {
      let modalContainer = document.querySelector('.pokemon-details-modal');
      modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });

    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
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
    
    
    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('.pokemon-details-modal');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });


