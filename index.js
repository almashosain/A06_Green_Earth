const loadImages=()=>{
     fetch("https://openapi.programming-hero.com/api/categories")
     .then((res) => res.json())
     .then((json) => displayImages(json.categories))
};
const displayImages=(images) =>{
    const buttonContainer = document.getElementById("button_container")
    buttonContainer.innerHTML = "";
    for( let image of images){
        const btnImg = document.createElement("div");
        btnImg.innerHTML=`
        
        <button class="hover:bg-green-600 hover:text-white hover:rounded-lg w-[200px] h-[40px] flex items-start"> ${image.category_name}</button>
         
        `
         buttonContainer.append(btnImg)
    }
    }

loadImages()


// Load categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => displayCategories(json.categories));
};

const displayCategories = (categories) => {
  const buttonContainer = document.getElementById("button_container");
  buttonContainer.innerHTML = "";
  // All Trees Button (show All)
const allBtn = document.createElement("button");
allBtn.className = "bg-green-500 text-white rounded-lg w-[200px] h-[40px] mb-2"
 allBtn.innerText = "All Trees";
  allBtn.addEventListener("click", loadAllPlants);
  buttonContainer.appendChild(allBtn);

  // Category Buttons
  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.className = "hover:bg-green-600 hover:text-white hover:rounded-lg w-[200px] h-[40px] flex items-center px-2";
    btn.innerText = category.category_name;

    // On click → load plants by category
    btn.addEventListener("click", () => loadPlantsByCategory(category.category_id));

    buttonContainer.appendChild(btn);
  });
};

// Load Plants By Category 

const loadPlantsByCategory = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res)=> res.json())
    .then((json)=> {
         displayCards(json.plants || [])
    })
}


// Load all plants initially
// const loadAllPlants = () => {
//   fetch("https://openapi.programming-hero.com/api/plants")
//     .then(res => res.json())
//     .then(json => displayCards(json.plants));
// };



// Display cards in the middle part
const displayCards = (plants) => {
  const cardContainer = document.getElementById("card_container");
  cardContainer.innerHTML = ""; // clear old cards

if(!plants || plants.length === 0){
    cardContainer.innerHTML = `<p class="text-center
     text-gray-500 col-span-3"> No Plants Found! </p>`
     return
}


  plants.forEach(plant => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg p-4 flex flex-col shadow";

    card.innerHTML = `
      <img class="w-full aspect-[16/9] object-cover rounded-lg" src="${plant.image}" alt="${plant.name}">
      <h2 class="font-bold mt-3 text-lg">${plant.name}</h2>
      <p class="text-[12px] text-[#1F2937] mt-2">${plant.description}</p>
      <div class="flex justify-between items-center mt-2">
        <button class="bg-[#DCFCE7] text-[#15803D] p-1 rounded-lg text-xs">${plant.category}</button>
        <p class="text-sm font-semibold">৳${plant.price}</p>
      </div>
      <button class="w-full rounded-3xl text-white mt-4 bg-[#15803D] py-2 px-4">Add to Cart</button>
    `;
    cardContainer.appendChild(card);
  });
};


// Initial load
loadCategories();
loadAllPlants();
