/* 
const createPokemonData = (data) => {
  const pokemon = {
    name: data.name,
    id: data.id,

    hp: data.stats[0].base_stat,
    atk: data.stats[1].base_stat,
    def: data.stats[2].base_stat,
    atk_spc: data.stats[3].base_stat,
    def_spc: data.stats[4].base_stat,
    speed: data.stats[5].base_stat,

    sprite: {
      front: data.sprites.front_default,
      back: data.sprites.front_default,
      front_shiny: data.sprites.front_shiny,
      back_shiny: data.sprites.back_shiny,
    },

    type:[data.types[0].type.name, data.types[0]?.type.name]
  }
  return pokemon
} */


const template_data = document.getElementById('template_data').content
const main = document.getElementById('main')
const sprite_container = document.getElementById('sprite_container')

let pokeData = {
  pokemon: undefined,
  shiny: false
}

//pokemon data

// Funciones

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const renderCard = (pokeData) => {
  const fragment = document.createDocumentFragment()
  const clone = template_data.cloneNode(true)
  

  if (pokeData.shiny) {
    clone.querySelector('#sprite').setAttribute('src',pokeData.pokemon.sprites.other["official-artwork"].front_shiny)
  }else{
    clone.querySelector('#sprite').setAttribute('src',pokeData.pokemon.sprites.other["official-artwork"].front_default)
  }

  clone.querySelector('#name').textContent = pokeData.pokemon.name
  clone.querySelector('#nro').textContent = '#'+pokeData.pokemon.id
  clone.querySelector('#type_1').textContent = `${pokeData.pokemon.types[0].type.name}`
  clone.querySelector('#type_1').classList.add(`${pokeData.pokemon.types[0].type.name}-bg`)
  clone.querySelector('#card').classList.add(`${pokeData.pokemon.types[0].type.name}-bg`)
  /* clone.querySelectorAll('.stat_name').classList.add(`${pokeData.pokemon.types[0].type.name}-font`) */
  if (pokeData.pokemon.types[1]?.type.name == undefined) {
    clone.querySelector('#type_2').classList.add('type-hide')
  }else{
    clone.querySelector('#type_2').textContent = `${pokeData.pokemon.types[1]?.type.name}`
    clone.querySelector('#type_2').classList.add(`${pokeData.pokemon.types[1]?.type.name}-bg`)
  }
  clone.querySelector('#hp_value').textContent = pokeData.pokemon.stats[0].base_stat
  clone.querySelector('#atk_value').textContent = pokeData.pokemon.stats[1].base_stat
  clone.querySelector('#def_value').textContent = pokeData.pokemon.stats[2].base_stat
  clone.querySelector('#atk_spc_value').textContent = pokeData.pokemon.stats[3].base_stat
  clone.querySelector('#def_spc_value').textContent = pokeData.pokemon.stats[4].base_stat
  clone.querySelector('#speed_value').textContent = pokeData.pokemon.stats[5].base_stat

  fragment.appendChild(clone)
  const nodo = main.children[0]
  main.replaceChild(fragment,nodo)
}

const fetchData = async (nro) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nro}`)
    pokeData.pokemon = await res.json()
    renderCard(pokeData)
  } catch (error) {
    console.log(error)
  }
}

// Eventos

document.addEventListener('DOMContentLoaded', () => {
  fetchData(getRandomInt(1,152))
})


btn_random.addEventListener('click', () => {
  fetchData(getRandomInt(1,152))
})

btn_prev.addEventListener('click',() => {
  if (pokeData.pokemon.id > 0) {
    fetchData(pokeData.pokemon.id-1)
  }
})

btn_next.addEventListener('click',() => {
  if (pokeData.pokemon.id < 150) {
    fetchData(pokeData.pokemon.id+1)
  }
})

