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


//Initial fetches


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

console.log(initialFeed)


//Shows "home page", hides "description page"


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


//Creates default grid 


function renderAnimal(animal) {
    const newImg = document.createElement('img');
    newImg.addEventListener('click', () => animalSelector(animal))
    newImg.src = animal.image_link;
    newImg.className = 'box';
    allAnimalImages.appendChild(newImg);
    defaultDisplay();
}


//Creates liked grid


function renderLikedAnimal(animal) {
    const newImg = document.createElement('img');
    newImg.addEventListener('click', (e) => {})
    newImg.src = animal.image_link;
    newImg.className = 'box';
    allAnimalImages.appendChild(newImg);
    defaultDisplay();
}


//Creates/shows "description page", hides "home page", adds button to reverse this 


function animalSelector(animal) {
    
   mainImage.src = animal.image_link

        let a 
        if(animal.animal_type[0] == 'A'){a = 'An'}
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
    

//reverses this ^


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
        
        
// Simulates "like" persistence


    if (likedAnimalsArray.some(initial => initial.image_link === mainImage.src)){
        heart.innerText = '❤'
        heart.style.color = 'red'  
    }
    else{heart.innerText = '♡'
         heart.style.color = 'black'}
}


// Handles like functionality


let likedAnimalsArray = []
likedAnimalsArray = likedAnimalsArray.filter(animal => animal.image_link != mainImage.src)

heart.addEventListener('click', likeHandler)

function likeHandler (e) {
    
    if (e.target.innerText === '❤') {
        e.target.innerText = '♡'
        e.target.style.color = 'black'
    }
    else {e.target.innerText = '❤'
          e.target.style.color = 'red'
    }

    if (likedAnimalsArray.some(animal => animal.image_link === mainImage.src)) {removeFromLiked()} 
        
    else {addImageToLiked()}    
} 


// Manages add to/remove from array of liked images


function addImageToLiked() {

    const likedAnimal = {}
    likedAnimal.image_link = mainImage.src
    likedAnimalsArray.push(likedAnimal)
    console.log(likedAnimalsArray)
}

function removeFromLiked() {
    likedAnimalsArray = likedAnimalsArray.filter(animal => animal.image_link != mainImage.src) 
    console.log(likedAnimalsArray)
}


//Adds button to reveal form


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


//View liked button - displays liked animals


const viewButton = document.createElement('button')
    viewButton.className = 'button'
    viewButton.id = 'view-button'
    if(likedAnimalsArray.length === 0){viewButton.style.display = 'none'}
    else if (likedAnimalsArray.length === 1) {
        viewButton.innerText = 'View Liked Animal'
    }
    else {viewButton.innerText = 'View Liked Animals'}
    formBox.appendChild(viewButton);

viewButton.addEventListener('click', () => {
    
    allAnimalImages.innerHTML = ''
    likedAnimalsArray.forEach(animal => renderLikedAnimal(animal))

    const backButtonLiked = document.createElement('button')
    backButtonLiked.className = 'button'
    backButtonLiked.innerText = 'back'
    backButtonLiked.appendBefore(viewButton)
    viewButton.style.display = 'none'
    formButton.style.display = 'none'
    
        backButtonLiked.addEventListener('click', () => {
            
            allAnimalImages.innerHTML = ''
            initialFeed.forEach(initial => renderAnimal(initial))   
            backButtonLiked.remove();
            defaultDisplay();
            formButton.style.display = '';
            console.log(initialFeed)
        })
    
}) 
   

//Append prototype (thanks Google!)


Element.prototype.appendBefore = function (element) {
    element.parentNode.insertBefore(this, element);
  },false;