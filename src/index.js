let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.querySelector(`#add-toy-form`).addEventListener("submit", handleSubmit)

function handleSubmit(event){
    event.preventDefault();
    let toyObj = {
      name: event.target.name.value,
      image: event.target.image.value,
      id: event.target.id.value,
      likes: event.target.id.value
    }
    renderOneToy(toyObj)
    createToy(toyObj)
};

function renderOneToy(toy){
  let card = document.createElement('li')
  card.className = 'card'
  card.innerHTML = `
    <img src="${toys.image}" class="toy-avatar">
    <div class="content">
      <h2> ${toys.name} </h2>
      <p> ${toys.likes} </p> Likes
      <button class="like-btn" id="${toys.id}"> Like </button>
    </div>
  `
  card.querySelector(`#like`).addEventListener(`click`, () => {
    toys.likes+= 1
    card.querySelector(`span`).textContent = toys.likes
    updateLikes(toy)}
    )

  document.querySelector(`#toy-collection`).appendChild(card)
}

function getAllToys() {
  fetch(`http://localhost:3000/toys`)
    .then(res => res.json())
    .then(toys => toys.forEach(toy => renderOneToy(toy)))
  }

function createToy(toyObj){
  fetch(`http://localhost:3000/toys`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(toyObj)
  })
    .then(res => res.json())
    .then(toy => console.log(toy))
  }

function updateLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: `PATCH`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": newNumberOfLikes
  })
    .then(res => res.json())
    .then(toy => console.log(toy))
})
}
//let toys = document.querySelector(`#toy-collection`)//
function initialize(){
  getAllToys()
}
initialize ()