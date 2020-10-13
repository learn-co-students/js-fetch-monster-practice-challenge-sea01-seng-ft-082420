let pageNumber = 1

document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container')
    const createMonster = document.getElementById('create-monster')
    const backBtn = document.getElementById('back')
    const forwardBtn = document.getElementById('forward')

    let url = `http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`

    getMonsters()
    newMonsterForm()

    function getMonsters() {
        fetch(url)
        .then(res => res.json())
        .then(monsters => monsters.forEach(monster => buildMonster(monster)))
    }

    function postMonster(e){
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                name: e.target.name.value,
                age: e.target.age.value,
                description: e.target.description.value
            })
        })
        .then(resp => resp.json())
        .then(monster => {
            console.log(`name: ${monster.name}, age: ${monster.age}, bio: ${monster.description}`)
            createMonster.innerHTML = ''
            newMonsterForm();
        })
    }

    function buildMonster(monster) {
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        const h4 = document.createElement('h4')
        const p = document.createElement('p')

        h2.textContent = monster.name
        h4.textContent = `Age: ${monster.age}`
        p.textContent = `Bio: ${monster.description}`

        monsterContainer.appendChild(div)
        div.appendChild(h2)
        div.appendChild(h4)
        div.appendChild(p)
    }

    function newMonsterForm() {
        const form = document.createElement('form')
        const nameLabel = document.createElement('label')
        const monsterName = document.createElement('input')
        const ageLabel = document.createElement('label')
        const monsterAge = document.createElement('input')
        const descriptionLabel = document.createElement('label')
        const monsterDescription = document.createElement('input')
        const monsterSubmit = document.createElement('input')

        form.id = 'create-monster-form'
        nameLabel.textContent = "Name: " 
        monsterName.type = 'text'
        monsterName.id = 'name'

        ageLabel.textContent = "Age: "
        monsterAge.type = 'number'
        monsterAge.id = 'age'

        descriptionLabel.innerText = "Bio: "
        monsterDescription.type = 'text'
        monsterDescription.id = 'description'

        monsterSubmit.type = 'submit'
        monsterSubmit.id = 'create-monster-submit'
        monsterSubmit.value = 'Create Monster'

        form.addEventListener('submit', (e) => {
            e.preventDefault()
            postMonster(e)
        });

        createMonster.appendChild(form)
        form.appendChild(nameLabel)
        form.appendChild(monsterName)
        form.appendChild(ageLabel)
        form.appendChild(monsterAge)
        form.appendChild(descriptionLabel)
        form.appendChild(monsterDescription)
        form.appendChild(monsterSubmit)
    }

    forwardBtn.addEventListener('click', () => {
        pageNumber++
        getMonsters()
        console.log(`page number: ${pageNumber}`)
    })

    backBtn.addEventListener('click', () => {
        if (pageNumber > 1) {
            pageNumber--
        }
        else {
            pageNumber = 1
        }   
        getMonsters()
        console.log(`page number: ${pageNumber}`)
    })

})