
let newMonsterFormContainer
let monsterContainer
let pageNumber = 1
document.addEventListener('DOMContentLoaded', event => {
    newMonsterFormContainer = document.getElementById('create-monster')
    monsterContainer = document.getElementById('monster-container')

    document.getElementById('forward').addEventListener('click', e => hanldeForward())
    document.getElementById('back').addEventListener('click', e => handleBack())
    crateNewMonsterForm(newMonsterFormContainer)
    fetchMonsters()
})

function crateNewMonsterForm(container) {
    const form = document.createElement('form')
    form.innerHTML = `<form style="padding: 20px">
        <input type ='text' name="name" placeholder="monster name"></input>
        <input type ='number' step='any' name="age" placeholder="monster age"></input>
        <input type ='text' name="description" placeholder="description"></input>
        <input type='submit' value='Create Monster'></input>
    </form>`
    form.addEventListener('submit', event => createMonsterHandler(event))
    container.appendChild(form)
}

function createMonsterHandler(e) {
    e.preventDefault()
    fetch('http://localhost:3000/monsters/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            'name': e.target.name.value,
            'age': e.target.age.value,
            'description': e.target.description.value
        })
    })
        .then(res => res.json())
        .catch(err => console.error('Error POST :', err))

    e.target.reset()
}

function fetchMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=20&_page=${pageNumber}`)
        .then(res => res.json())
        .then(monsters => monsters.forEach(monster => displayMonster(monster)))
        .catch(error => console.error('Error fetching monsters', error))
}

function displayMonster(monster) {
    const m = document.createElement('div')
    m.innerHTML = `
        <h2 style="padding: '10px'">Name : ${monster.name}</h2>
        <h4 style="padding: '10px'">Age: ${monster.age}</h4>
        <p style="padding: '10px'">Bio: ${monster.description}</p>
    `
    monsterContainer.appendChild(m)
}

function hanldeForward() {
    pageNumber += 1
    monsterContainer.innerHTML = ''
    fetchMonsters()
}

function handleBack() {
    if (pageNumber > 1) {
        monsterContainer.innerHTML = ''
        pageNumber -= 1
        fetchMonsters()
    }
}

