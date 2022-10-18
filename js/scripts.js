let pokemonRepository = (function () {
  let pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(item) {
    return pokemonList.push(item);
  }
  function getAll() {
    return pokemonList;
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        const pokemons = response.results;
        pokemons.forEach(function (pokemon) {
          add({
            name: pokemon.name,
            detailsUrl: pokemon.url,
          });
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function addListItem(pokemon) {
    // let pokemonList = document.querySelector(".pokemon-list");
    let pokemonList = document.querySelector(".container");
    pokemonList.classList.add("list-group");
    pokemonList.classList.add(
      "mt-4",
      "mx-auto",
    )

    let listPokemon = document.createElement("li");
    listPokemon.classList.add("group-list-item");
    

    let button = document.createElement("button");
    button.classList.add(
      "btn",
      "btn-primary",
      "mt-3",
      "btn-md",
      "p-4",
      "btn-block",
      "list-unstyled"
    ); 
    listPokemon.style.listStyleType= "none";
    
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal-container");
    button.setAttribute("data-backdrop", "true");

    button.innerText = pokemon.name;
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        return item;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(pokemonDetails) {
    let modalContainer = document.getElementById("modal-container");
    const modalBody = modalContainer.querySelector(".modal-body");
    modalBody.innerHTML = "";

    let titleElement = modalContainer.querySelector(".modal-title");
    titleElement.innerText = pokemonDetails.name;

    const heightText = `Height: ${pokemonDetails.height}`;
    let heightContentElement = document.createElement("p");
    heightContentElement.innerText = heightText;

    let typesNames = pokemonDetails.types.map((t) => {
      return t.type.name;
    });
    console.log(typesNames);

    const typeText = `Types: ${typesNames.join(", ")}`;
    let typeContentElement = document.createElement("p");
    typeContentElement.innerText = typeText;

    let imageElement = document.createElement("img");
    imageElement.src = pokemonDetails.imageUrl;
    console.log(pokemonDetails);

    modalBody.appendChild(imageElement);
    modalBody.appendChild(heightContentElement);
    modalBody.appendChild(typeContentElement);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (pokemonDetails) {
      console.log(pokemonDetails);
      showModal(pokemonDetails);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
