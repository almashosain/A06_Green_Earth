
// Remove active class from all category buttons
const removeActiveClass = () => {
  buttonContainer.querySelectorAll("button").forEach(btn => {
    btn.classList.remove("bg-green-700");
    btn.classList.add("bg-green-500");
  });
};

// Load all plants
const loadAllPlants = () => {
  cardContainer.innerHTML = `<p class="text-center col-span-3"> Loading...</p>`
  fetch("https://openapi.programming-hero.com/api/plants")
  .then(res => res.json()) 
  .then(json => displayCards(json.plants || []));
}

// Fetch and display all categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => displayCategories(json.categories));
};

// Function category buttons 

const buttonContainer = document.getElementById("button_container");

const displayCategories = (categories) => {
  buttonContainer.innerHTML = "";

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `
      bg-green-500 text-white hover:bg-green-600 
      rounded-lg w-[200px] h-[40px] mb-2 flex items-center px-2
    `;
    btn.innerText = cat.category_name;

    btn.addEventListener("click", () => {
      removeActiveClass();
      btn.classList.add("bg-green-700");
      loadPlantsByCategory(cat.id);
    });

    buttonContainer.appendChild(btn);
  });

};
// Fetch plants by category ID
const loadPlantsByCategory = (id) => {
  cardContainer.innerHTML = `<p class="text-center col-span-3">Loading ...</p>`;
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(json => displayCards(json.plants || []));
};



// Display Plant Cards

const displayCards = (plants) => {
  cardContainer.innerHTML = "";

  if (!plants || plants.length === 0) {
    cardContainer.innerHTML = `<p class="text-center col-span-3 text-gray-500">No Plants Found!</p>`;
    return;
  }

  plants.forEach(plant => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg p-4 flex flex-col shadow cursor-pointer";

    card.innerHTML = `
      <img 
        class="w-full aspect-[16/9] object-cover rounded-lg" 
        src="${plant.image}" 
        alt="${plant.name}"
      >
      <h2 class="font-bold mt-3 text-lg plant-name">${plant.name}</h2>
      <p class="text-[12px] text-[#1F2937] mt-2">${plant.description}</p>
      <div class="flex justify-between items-center mt-2">
        <button class="bg-[#DCFCE7] text-[#15803D] p-1 rounded-lg text-xs">${plant.category}</button>
        <p class="text-sm font-semibold">৳${plant.price}</p>
      </div>
      <button 
        class="w-full rounded-3xl text-white mt-4 bg-[#15803D] py-2 px-4 add_to_cart"
      >
        Add to Cart
      </button>
    `;

    cardContainer.appendChild(card);

    //  name click Show modal

const modalContent = document.getElementById("modal_content");



    card.querySelector(".plant-name").addEventListener("click", () => {
      modalContent.innerHTML = `
        <h2 class="font-bold text-2xl mb-4">${plant.name}</h2>
        <img src="${plant.image}" class="w-full aspect-[16/9] object-cover rounded-lg mb-4">
       <p class="mt-2 font-semibold">Category: ${plant.category}</p>
      <p class="mt-1 font-semibold">Price: ৳${plant.price}</p>
        <p class="mt-1 text-1xl"><span class="font-semibold">Description:</span> ${plant.description}</p>
       
      `;
      modal.classList.remove("hidden");
    });

    // Add plant to cart
    card.querySelector(".add_to_cart").addEventListener("click", () => {
      cart.push(plant);
      alert(`Adding to cart: ${plant.name}`);
      updateCart();
    });
  });
};



// Modal Functions
const modal = document.getElementById("modal");

const closeModal = document.getElementById("close_modal");
closeModal.addEventListener("click", () => modal.classList.add("hidden"));

modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});



// Cart Function

const cardContainer = document.getElementById("card_container");

let cart = [];

const cartItems = document.getElementById("cart_items");
const cartTotal = document.getElementById("cart_total");

const updateCart = () => {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "flex justify-between items-center mb-2";

    div.innerHTML =  `
       <span class="bg-[#CFF0DC] flex justify-between items-center py-1 px-2 rounded-lg">
        <div>
        <span>${item.name}</span> <br>
        <span>${item.price}</span> 
        </div>
        <span class="cursor-pointer text-red-500" data-index="${index}">❌</span>
        </span>
      `;

    cartItems.appendChild(div);
    total += parseFloat(item.price);
  });

  cartTotal.innerText = `Total: ৳${total}`;

  // Remove item from cart
  cartItems.querySelectorAll("span[data-index]").forEach(span => {
    span.addEventListener("click", () => {
      const i = span.getAttribute("data-index");
      cart.splice(i, 1);
      updateCart();
    });
  });
};



loadCategories();
loadAllPlants();