const allAnimalImages = document.getElementById('animal-menu')
const mainImage = document.querySelector('#animal-detail img')
const description = document.getElementById('comment-display')
const heart = document.getElementById('heart')
const form = document.getElementById('new-animal')
const header = document.querySelector('header')

fetch('https://zoo-animal-api.herokuapp.com/animals/rand/10')
    .then (r => r.json())
    .then (animalObject => {
        animalObject.forEach(animal => renderAnimal(animal))
    });

fetch('https://zoo-animal-api.herokuapp.com/animals/rand/10')
    .then (r => r.json())
    .then (animalObject => {
        animalObject.forEach(animal => renderAnimal(animal))
    });

function renderAnimal(animal) {
    const newImg = document.createElement('img');
    newImg.addEventListener('click', () => animalSelector(animal))
    newImg.src = animal.image_link
    newImg.className = 'box'
    allAnimalImages.appendChild(newImg)
}

function animalSelector(animal) {
    allAnimalImages.style.height = '.00001px';
    mainImage.src = animal.image_link
        if (animal.latin_name != undefined) {description.innerText = `${animal.name}, (latin: ${animal.latin_name}), is a ${animal.animal_type.toLowerCase()} which subsists on ${animal.diet.toLowerCase()}. It can be found primarily in the ${animal.habitat.toLowerCase()}.`}
        else {description.innerText = animal.description};
    
    heart.style.color = 'black'
    heart.style.fontWeight = 'normal'
    
    const button = document.createElement('button')
        button.innerText = 'back'
        header.appendChild(button)
        button.addEventListener('click', () => {
            allAnimalImages.style.height = '100%'; button.remove();mainImage.src = ""; heart.innerText = '♡'; heart.style.color = 'black'
            description.innerText = ''
        })
        
}

heart.addEventListener('click', likeHandler)

function likeHandler (e) {
    
    if (e.target.innerText === '❤') {
        e.target.innerText = '♡'
        e.target.style.color = 'black'
    }
    else {e.target.innerText = '❤'
          e.target.style.color = 'red'
    }
} 

form.addEventListener('submit', submitHandler)

function submitHandler(e) {
    e.preventDefault()
    
    const animal = {}

    animal.name = e.target.name.value
    animal.image_link = e.target.image.value
    animal.description = e.target.description.value

    if (e.target.image.value != "") {
    renderAnimal(animal);
    }

    form.reset()
}



