document.addEventListener('DOMContentLoaded', function() {
    // Variable Assignment
    const baseUrl = 'http://localhost:3000'
    const fullUrl = 'http://localhost:3000/monsters'
    const _limit = 50
    const forwardBtn = document.querySelector('#forward')
    const backBtn = document.querySelector('#back')
    let monsterContainer = document.querySelector('#monster-container')
    let createMonsterContainer = document.querySelector('#create-monster')
    let _page = 1

    // Stand-alone Event Listeners
    forwardBtn.addEventListener('click', () => {
        monsterContainer.innerHTML = ''
        _page++
        getMonsters(baseUrl, _limit, _page)
    })

    backBtn.addEventListener('click', () => {
        monsterContainer.innerHTML = ''
        _page--
        getMonsters(baseUrl, _limit, _page)
    })

    // Call Fetch Functions
    getMonsters(baseUrl, _limit, _page)

    // Call Functions
    createMonster()

    // Fetch Functions
    function getMonsters(url, limit, page) {
        fetch(url + `/monsters/?_limit=${limit}&_page=${page}`)
        .then(resp => resp.json())
        .then(monsters => monsters.forEach(monster => showMonsters(monster)))
    }

    // Functions
    const showMonsters = (monster) => {
        let h1 = document.createElement('h1')
        let h2 = document.createElement('h2')
        let p = document.createElement('p')
        let h5 = document.createElement('h5')

        h1.innerText = monster.name
        h2.innerText = monster.age
        p.innerText = monster.description
        h5.innerText = monster.id

        monsterContainer.appendChild(h1)
        monsterContainer.appendChild(h2)
        monsterContainer.appendChild(p)
        monsterContainer.appendChild(h5)
    }

    function createMonster() {
        let monsterForm = document.createElement('form')
        let nameLabel = document.createElement('label')
        let nameInput = document.createElement('input')
        let ageLabel = document.createElement('label')
        let ageInput = document.createElement('input')
        let descriptionLabel = document.createElement('label')
        let descriptionInput = document.createElement('input')
        let monsterBtn = document.createElement('button')

        nameLabel.innerText = 'name'
        ageLabel.innerText = 'age'
        descriptionLabel.innerText = 'description'
        monsterBtn.innerText = 'Create Monster'

        nameInput.id = 'name'
        ageInput.id = 'age'
        descriptionInput.id = 'description'
        
        monsterForm.appendChild(nameLabel)
        monsterForm.appendChild(nameInput)
        monsterForm.appendChild(ageLabel)
        monsterForm.appendChild(ageInput)
        monsterForm.appendChild(descriptionLabel)
        monsterForm.appendChild(descriptionInput)
        monsterForm.appendChild(monsterBtn)

        createMonsterContainer.appendChild(monsterForm)

        monsterForm.addEventListener('submit', (e) => {
            e.preventDefault()
            let monsterName = e.target.name.value
            let monsterAge = e.target.age.value
            let monsterDescription = e.target.description.value

            const formData = {
                name: monsterName,
                age: monsterAge,
                description: monsterDescription
            }

            const configObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            }

            fetch(fullUrl, configObj)
            .then(resp => resp.json())
            .then(monster => console.log(monster))

        })
        
    }

})