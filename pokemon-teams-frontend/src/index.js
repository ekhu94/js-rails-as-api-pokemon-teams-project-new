const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
    getTrainersPokemon()
});

//! GET FETCH REQUEST
const getTrainersPokemon = () => {
    axios.get(TRAINERS_URL)
        .then(resp => {
            for (let trainer of resp.data) {
                createCard(trainer)
            }
        })
}

//! POST FETCH REQUEST
const postPokemon = (e) => {
    const ul = e.target.nextSibling
    if (ul.children.length < 6) {
        axios.post(POKEMONS_URL, {
            trainer_id: e.target.id
        })
            .then(resp => {
                const li = createLi(resp.data)
                ul.appendChild(li)
            })
    }
}

//! DELETE FETCH REQUEST
const releasePokemon = pokemon => {
    axios.delete(`${POKEMONS_URL}/${pokemon.id}`)
        .then(resp => {
            const oldPokemon = document.getElementById(pokemon.id)
            oldPokemon.parentElement.remove()
        })
}

//! CREATE CARD DIV
const createCard = card => {
    const main = document.querySelector('main')

    //! CREATE ELEMENTS
    const div = document.createElement('div')
    const p = document.createElement('p')
    const btn = document.createElement('button')
    const ul = document.createElement('ul')

    //! ADD CLASSES AND/OR INNERTEXT/IDS, ETC
    div.className = 'card'
    btn.id = card.id
    div.setAttribute('data-id', card.id)
    p.innerText = card.name
    btn.setAttribute('data-trainer-id', card.id)
    btn.innerText = 'Add Pokemon'

    //! Add event listener to 'add pokemon' btn for POST
    btn.addEventListener('click', postPokemon)

    //! Take the UL, and iterate through pokemons, creating LIs
    for (let pokemon of card.pokemons) {
        const li = createLi(pokemon)
        ul.appendChild(li)
    }

    //! APPEND ELEMENTS
    div.append(p, btn, ul)
    main.appendChild(div)
}

const createLi = (pokemon) => {
    const li = document.createElement('li')
    const btn = document.createElement('button')

    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    btn.className = 'release'
    btn.setAttribute('data-pokemon-id', pokemon.id)
    btn.innerText = 'Release :('
    btn.id = pokemon.id

    //! Event listener for delete btn
    btn.addEventListener('click', () => releasePokemon(pokemon))

    li.appendChild(btn)
    return li
    // ul.appendChild(li)
}