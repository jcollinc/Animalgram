// HTML Elements
const allAnimalImages = document.getElementById('animal-menu')
const mainImage = document.querySelector('#animal-detail img')
const animalDetail = document.getElementById('animal-detail')
const description = document.getElementById('comment-display')
const heart = document.getElementById('heart')
const form = document.getElementById('new-animal')
const header = document.querySelector('header')
const info = document.querySelector('h3')
const like = document.getElementById('like')
const formBox = document.getElementById('form-box')

//Initial fetches
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

//Shows "home page", hides "description page"
function defaultDisplay () {
    form.style.display = 'none';
    info.style.display = 'none';
    heart.style.display = 'none';
    like.style.display = 'none';
    description.style.display = 'none';
    animalDetail.style.display = 'none';
    description.innerText = '';
    allAnimalImages.style.display = ''
    mainImage.src = "";
    heart.innerText = '♡'; 
    heart.style.color = 'black';
    formButton.style.display = 'block'
}

//Creates image grid 
function renderAnimal(animal) {
    const newImg = document.createElement('img');
    newImg.addEventListener('click', () => animalSelector(animal))
    newImg.src = animal.image_link;
    newImg.className = 'box';
    allAnimalImages.appendChild(newImg);
    defaultDisplay();
}

//Creates/shows "description page", hides "home page", adds button to reverse this 
function animalSelector(animal) {
    
    mainImage.src = animal.image_link
        if (animal.latin_name != undefined) {description.innerText = `${animal.name}, (latin: ${animal.latin_name}), is a ${animal.animal_type.toLowerCase()} which subsists on ${animal.diet.toLowerCase()}. It can be found primarily in the ${animal.habitat.toLowerCase()}.`}
        else {description.innerText = animal.description};
    
    info.style.display = 'block';
    description.style.display = 'block';
    animalDetail.style.display = 'block'
    heart.style.display = 'inline-block'
    like.style.display = 'block'
    form.style.display = 'none'
    allAnimalImages.style.display = 'none';
    formButton.style.display = 'none';
  
//reverses this ^
    const button = document.createElement('button')
        button.className = 'button'
        button.innerText = 'back'
        formBox.appendChild(button)
        button.addEventListener('click', () => {
            button.remove();
            defaultDisplay();
        })
    
}

// Adds "like" functionality
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

//Adds button to reveal form

formButton = document.createElement('button')
    formButton.className = 'button'
    formButton.innerText = 'Add New Animal'
    formBox.appendChild(formButton);
formButton.addEventListener('click', () => {
    form.style.display = 'block'
    formButton.style.display = 'none'
})

//Adds form functionality
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
    else {
        form.style.display = 'none';
        formButton.style.display = 'block';
    }

    form.reset()
}



