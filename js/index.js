const monsterContainer = document.querySelector('#monster-container')
const createMonster = document.querySelector('#create-monster')
const forwardBtn = document.querySelector('#forward')
const backBtn = document.querySelector('#back')
let pageId = 1
let url = `http://localhost:3000/monsters/?_limit=50&_page=${pageId}`
forwardBtn.addEventListener('click', () => {
    pageId++
    nextMonsters()
})
backBtn.addEventListener('click', () => {
    if (pageId > 1) {
        pageId--
    }
    else {
        pageId = 1
    }   
    previousMonsters()
})
function getMonsters() {
    fetch(url)
    .then(res => res.json())
    .then(monsters => monsters.forEach(monster => buildMonster(monster)))
}
function postMonster(monster) {
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify( {
            name: monster.target[0].value,
            age: monster.target[1].value,
            description: monster.target[2].value
        })
    })
    .then(res => res.json())
    .then(monster)
}
getMonsters()
newMonsterForm()
function buildMonster(monster) {
    let div = document.createElement('div')
    let h2 = document.createElement('h2') 
    let h3 = document.createElement('h3')
    let p = document.createElement('p')
    h2.innerText = monster.name
    h3.innerText = `Age: ${parseInt(monster.age)}`
    p.innerText = monster.description
    div.appendChild(h2)
    div.appendChild(h3)
    div.appendChild(p)
    monsterContainer.appendChild(div)
}
function newMonsterForm() {
    let form = document.createElement('form')
    let nameLabel = document.createElement('label')
    let nameInput = document.createElement('input')
    let ageLabel = document.createElement('label')
    let ageInput = document.createElement('input')
    let descriptionLabel = document.createElement('label')
    let descriptionInput = document.createElement('input')
    let button = document.createElement('input')
    button.setAttribute("type", "submit")
    nameLabel.innerText = "Name:"
    ageLabel.innerText = "Age:"
    descriptionLabel.innerText = "Description:"
    // button.innerText = "Create Monster"
    form.appendChild(nameLabel)
    form.appendChild(nameInput)
    form.appendChild(ageLabel)
    form.appendChild(ageInput)
    form.appendChild(descriptionLabel)
    form.appendChild(descriptionInput)
    form.appendChild(button)
    createMonster.appendChild(form)
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        postMonster(e)
    })
}
function nextMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageId}`)
    .then(res => res.json())
    .then(monsters => monsters.forEach(monster => buildMonster(monster)))
}
function previousMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageId}`)
    .then(res => res.json())
    .then(monsters => monsters.forEach(monster => buildMonster(monster)))
}