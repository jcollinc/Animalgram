fetch('https://zoo-animal-api.herokuapp.com/animals/rand/10')
    .then (r => r.json())
    .then (animalObject => {
        console.log(animalObject)
        animalObject.forEach(animal => renderAnimal(animal))
        
    });

