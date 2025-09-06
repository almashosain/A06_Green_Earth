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


// const loadImages =() => {
//     fetch("https://openapi.programming-hero.com/api/category/1")
//     .then((res) => res.json())
//     .then((json) => displayImages(json.categories))

//     const displayImages= (images) => {
        
//         const imageContainer = document.getElementById("image_Container")
//         imageContainer.innerHTML = "";
//         for( let image of images){
//             const btnImg = document.createElement('Div');
//             btnImg.innerHTML =`
//             <button class="hover:bg-green-600 hover:text-white hover:rounded-lg w-[200px] h-[40px] flex items-start"> ${image.category_img}</button>
//             </div>
//             `
//             imageContainer.append(btnImg)
//         }
//     }
// }
// loadImages()