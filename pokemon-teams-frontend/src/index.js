const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
    getPokemons()
});

const getPokemons = () => {
    axios.get(TRAINERS_URL)
        .then(resp => {
            for (let trainer of resp.data) {
                createTrainer(trainer)
            }
        })
}

const postPokemon = (e) => {
    const ul = e.target.parentElement.querySelector('ul')
    if (ul.children.length < 6) {
        axios.post(POKEMONS_URL, {
            trainer_id: e.target.parentElement.id
        }).then(resp => {
            const li = createPokemonLi(resp.data)
            ul.appendChild(li)
        })
    }
   
    console.log(e.target.parentElement)
}

const releasePokemon = pokemon => {
    axios.delete(`${POKEMONS_URL}/${pokemon.id}`)
        .then(resp => {
            const oldPokemon = document.getElementById(pokemon.id)
            oldPokemon.remove()
        })
}

const createTrainer = trainer => {
    const main = document.querySelector('main')

    const div = document.createElement('div')
    const p = document.createElement('p')
    const btn = document.createElement('button')
    const ul = document.createElement('ul')

    div.classList.add('card')
    div.id = trainer.id
    div.setAttribute('data-id', trainer.id)
    p.innerText = trainer.name
    btn.setAttribute('data-trainer-id', trainer.id)
    btn.innerText = 'Add Pokemon'

    btn.addEventListener('click', postPokemon)

    for (let pokemon of trainer.pokemons) {
        const li = createPokemonLi(pokemon)
        ul.appendChild(li)
    }

    div.append(p, btn, ul)
    main.appendChild(div)
}

const createPokemonLi = pokemon => {
    const li = document.createElement('li')
    const btn = document.createElement('button')

    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    li.id = pokemon.id
    btn.classList.add('release')
    btn.setAttribute('data-pokemon-id', pokemon.id)
    btn.innerText = "Release"
    li.appendChild(btn)

    btn.addEventListener('click', () => releasePokemon(pokemon))

    return li
}
