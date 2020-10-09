let pageNumber = 1;

window.addEventListener('DOMContentLoaded', () => {
    const monsterDisplayDiv = document.getElementById('monster-container');
    const backBtn = document.getElementById('back');
    const forwardBtn = document.getElementById('forward');
    const monsterFormDiv = document.getElementById('create-monster');

    backBtn.disabled = true;
    getMonsters();
    buildNewMonsterForm();

    function getMonsters(){
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
        .then(resp => resp.json())
        .then(monsters => {
            monsterDisplayDiv.innerHTML = '';
            monsters.forEach(monster => buildMonsterDiv(monster));
        });
    }

    function createMonster(e){
        let monsterData = {
            name: e.target.name.value,
            age: e.target.age.value,
            description: e.target.description.value
        };

        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(monsterData)
        })
        .then(resp => resp.json())
        .then(monster => {
            console.log(`Added: ${monster.name}`)
            monsterFormDiv.innerHTML = ''
            buildNewMonsterForm();
            let createMessage = document.createElement('span');
            createMessage.textContent = `Added: ${monster.name}`;
            monsterFormDiv.appendChild(createMessage);
        })
    }

    function buildMonsterDiv(monster){
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');

        h2.textContent = monster.name;
        h4.textContent = `Age: ${monster.age}`;
        p.textContent = `Bio: ${monster.description}`;

        monsterDisplayDiv.appendChild(div);
        div.appendChild(h2);
        div.appendChild(h4);
        div.appendChild(p);
    }

    function buildNewMonsterForm(){
        const monsterForm = document.createElement('form');
        const monsterName = document.createElement('input');
        const monsterAge = document.createElement('input');
        const monsterDesc = document.createElement('input');
        const monsterSubmit = document.createElement('input');

        monsterForm.id = 'create-monster-form';
        monsterName.placeholder = 'name'
        monsterName.type = 'text';
        monsterName.id = 'name';
        monsterAge.placeholder = 'age';
        monsterAge.type = 'number';
        monsterAge.id = 'age';
        monsterDesc.placeholder = 'bio';
        monsterDesc.type = 'text';
        monsterDesc.id = 'description';
        monsterSubmit.type = 'submit';
        monsterSubmit.id = 'create-monster-submit';
        monsterSubmit.value = 'Create Monster';

        monsterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            createMonster(e)
        });

        monsterFormDiv.appendChild(monsterForm);
        monsterForm.appendChild(monsterName);
        monsterForm.appendChild(monsterAge);
        monsterForm.appendChild(monsterDesc);
        monsterForm.appendChild(monsterSubmit);
    }



    forwardBtn.addEventListener('click', () => {
        pageNumber++;
        getMonsters();
        backBtn.disabled = false;
    })

    backBtn.addEventListener('click', () => {
        if (pageNumber > 1){
            pageNumber--;
            getMonsters();
                if(pageNumber == 1){
                    backBtn.disabled = true;
                }
        }
    })


});