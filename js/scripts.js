//Task 2.1 
//Classic pokemons list

let pokemonList = [
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

  // Height limit threshold
  let threshold = 8

  for (let i = 0; i < pokemonList.length; i++) {
    // Interpolates the string
    let text = `${pokemonList[i].name} (height: ${pokemonList[i].height}")`

    // If the height of the pokemon is bigger than 8, then:
    if (pokemonList[i].height > threshold) {
      // Concatenate the text 
      text = `${text} - Wow, that's big!`
    }

      let div = "<div class='poke'>" + text + "</div>"
      let lineBreak = "<br/>"

    document.write(div, lineBreak)
  }