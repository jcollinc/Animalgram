const allAnimalImages = document.getElementById('animal-menu')
const mainImage = document.querySelector('#animal-detail img')
const description = document.getElementById('comment-display')
const heart = document.getElementById('heart')
const form = document.getElementById('new-animal')

fetch('https://zoo-animal-api.herokuapp.com/animals/rand/5')
    .then (r => r.json())
    .then (animalObject => {
        console.log(animalObject)
        animalObject.forEach(animal => renderAnimal(animal))
    });

function renderAnimal(animal) {
    const newImg = document.createElement('img');
    newImg.addEventListener('click', () => animalSelector(animal))
    newImg.src = animal.image_link
    allAnimalImages.appendChild(newImg)
}

function animalSelector(animal) {
    mainImage.src = animal.image_link
    if (animal.latin_name != undefined) {description.innerText = `${animal.name}, (latin: ${animal.latin_name}), lives in the ${animal.habitat}.`}
    else {description.innerText = animal.description}
    heart.style.color = 'black'
    heart.style.fontWeight = 'normal'
}

heart.addEventListener('click', likeHandler)

function likeHandler (e) {
    
    if (e.target.style.color === 'red') {
        e.target.style.color = 'black'
        e.target.style.fontWeight = 'normal'
    }
    else {e.target.style.color = 'red';
          e.target.style.fontWeight = 'bold'}
} 

form.addEventListener('submit', submitHandler)

function submitHandler(e) {
    e.preventDefault()
    
    const animal = {}

    animal.name = e.target.name.value
    animal.image_link = e.target.image.value
    animal.description = e.target.description.value

    renderAnimal(animal)
    animalSelector(animal)

    form.reset()
}



