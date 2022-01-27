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
const nameAnimal = document.getElementById('name-display')
const tagName = document.getElementById('tagName')
const tagDescription =document.getElementById('tagDescription')
const likedAnimals = document.getElementById('liked-animals')
const initialFeed = []

//Initial fetches, pushes fetched data into array

fetch('https://zoo-animal-api.herokuapp.com/animals/rand/10')
    .then (r => r.json())
    .then (animalObject => {
        animalObject.forEach(animal => {renderAnimal(animal); initialFeed.push(animal)})
    });

fetch('https://zoo-animal-api.herokuapp.com/animals/rand/10')
    .then (r => r.json())
    .then (animalObject => {
        animalObject.forEach(animal => {renderAnimal(animal); initialFeed.push(animal)})
    });

//Appends images to "home page" 

function renderAnimal(animal) {
    const newImg = document.createElement('img');
    newImg.addEventListener('click', () => animalSelector(animal))
    newImg.addEventListener('mouseover', () => newImg.style.cursor = 'pointer')
    newImg.src = animal.image_link;
    newImg.className = 'box';
    allAnimalImages.appendChild(newImg);
    defaultDisplay();
}

//Shows "home page" elements, hides "description page" elements

function defaultDisplay () {
    
    form.style.display = 'none';
    info.style.display = 'none';
    heart.style.display = 'none';
    like.style.display = 'none';
    description.style.display = 'none';
    animalDetail.style.display = 'none';
    nameAnimal.style.display = 'none';
    description.innerText = '';
    allAnimalImages.style.display = '';
    mainImage.src = "";
    tagName.style.display = 'none';
    tagDescription.style.display = 'none';
    likedAnimals.style.display = 'none';
    if (likedAnimalsArray.length === 0) {viewButton.style.display = 'none'}
    else{viewButton.style.display = ''};
}

//Creates description, shows "description page" elements, hides home page, adds 'back' button to reverse all this 

function animalSelector(animal) {
    
   mainImage.src = animal.image_link

        let a 
        if(animal.animal_type === undefined) {}
        else if(animal.animal_type[0] == 'A'){a = 'An'}
        else{a = 'A'}
        
        if (animal.latin_name != undefined){
        nameAnimal.innerText = `${animal.name}, (latin: ${animal.latin_name})` 
        description.innerText = `${a} ${animal.animal_type.toLowerCase()} which subsists on ${animal.diet.toLowerCase()}. It can be found primarily in the ${animal.habitat.toLowerCase()}.`}
        else {description.innerText = animal.description, nameAnimal.innerText = animal.name};
        
        nameAnimal.style.display = 'block'
        info.style.display = 'block';
        description.style.display = 'block';
        animalDetail.style.display = 'block'
        heart.style.display = 'inline-block'
        like.style.display = 'block'
        form.style.display = 'none'
        allAnimalImages.style.display = 'none';
        formButton.style.display = 'none';
        viewButton.style.display = 'none';
        tagName.style.display = 'inline-block';
        tagDescription.style.display = 'inline-block';
    
//Reverses all this 

    const button = document.createElement('button')
        button.title = 'back to main'
        button.className = 'button'
        button.id = 'backToMain'
        button.innerText = 'back'
        formBox.appendChild(button)
        
        button.addEventListener('click', () => {
            button.remove();
            defaultDisplay();
            formButton.style.display = '';
                if(likedAnimalsArray.length === 0){viewButton.style.display = 'none'}
                else if (likedAnimalsArray.length === 1) {
                    viewButton.style.display = '';
                    viewButton.innerText = 'View Liked Animal';
                }
                else {
                    viewButton.style.display = '';
                    viewButton.innerText = 'View Liked Animals'};
        })
                
// Simulates like persistence

    if (likedAnimalsArray.some(likedAnimal => likedAnimal.image_link === mainImage.src)){
        heart.innerText = '❤'
        heart.style.color = 'red'  
    }
    else{heart.innerText = '♡'
         heart.style.color = 'black'}
}

// Like/Unlike Manager

let likedAnimalsArray = []

heart.addEventListener('click', likeHandler)

// Toggles heart appearance on click

function likeHandler (e) {
    
    if (e.target.innerText === '❤') {
        e.target.innerText = '♡'
        e.target.style.color = 'black'
    }
    else {e.target.innerText = '❤'
          e.target.style.color = 'red'
    }

// On heart click: if animal has been liked, removes animal from liked array, otherwise adds it 

    if (likedAnimalsArray.some(animal => animal.image_link === mainImage.src)) {removeFromLiked()} 
    else {addImageToLiked()}    
} 

// Executes addition/removal of liked/unliked animals to liked array

function addImageToLiked() {

    const likedAnimal = {}
    likedAnimal.image_link = mainImage.src;
    likedAnimal.description = description.innerText;
    likedAnimal.name = nameAnimal.innerText;
    likedAnimalsArray.push(likedAnimal)
console.log(likedAnimal)
}

function removeFromLiked() {
    likedAnimalsArray = likedAnimalsArray.filter(animal => animal.image_link != mainImage.src) 
}

//Adds 'submit new animal' button which reveals form

formButton = document.createElement('button')
    formButton.className = 'button'
    formButton.id = 'form-button'
    formButton.innerText = 'Add New Animal'
    formBox.appendChild(formButton);
formButton.addEventListener('click', () => {
    form.style.display = 'inline-block';
    form.style.textAlign = 'center'
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
        initialFeed.push(animal)
        formButton.style.display = ''
    }
    else {
        form.style.display = 'none';
        formButton.style.display = '';
    }

    form.reset()
}

//Adds 'view liked animals button' if liked animals exist, renders liked animals on click

const viewButton = document.createElement('button')
    viewButton.className = 'button'
    viewButton.id = 'view-button'
    if(likedAnimalsArray.length === 0){viewButton.style.display = 'none'}
    else if (likedAnimalsArray.length === 1) {viewButton.innerText = 'View Liked Animal'}
    else {viewButton.innerText = 'View Liked Animals'}
    formBox.appendChild(viewButton);

//Deletes all images, repopulates using liked images array to show liked animals

viewButton.addEventListener('click', () => {
    
    allAnimalImages.innerHTML = ''
    likedAnimalsArray.forEach(animal => renderLikedAnimal(animal))

    const backButtonLiked = document.createElement('button')
    backButtonLiked.className = 'button'
    backButtonLiked.innerText = 'back'
    backButtonLiked.appendBefore(viewButton)
    viewButton.style.display = 'none'
    formButton.style.display = 'none'

//Uses stored fetch data to repopulate home page
    
    backButtonLiked.addEventListener('click', () => {
            
        allAnimalImages.innerHTML = ''
        initialFeed.forEach(initial => renderAnimal(initial))   
        backButtonLiked.remove();
        defaultDisplay();
        formButton.style.display = '';
    })
    
}) 
   
//Renders liked animals (called by view liked animals button)

function renderLikedAnimal(animal) {
    const newImg = document.createElement('img');
    newImg.addEventListener('click', () => {animalSelector(animal); document.getElementById('backToMain').remove();})
    newImg.addEventListener('mouseover', () => newImg.style.cursor = 'pointer')
    newImg.src = animal.image_link;
    newImg.style.cursor = 'auto'
    newImg.className = 'box';
    allAnimalImages.appendChild(newImg);
    defaultDisplay();
}

//Append prototype (thanks Google!)

Element.prototype.appendBefore = function (element) {
    element.parentNode.insertBefore(this, element);
  },false;