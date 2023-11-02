import { getWorks, apiDeleteWork, postWork } from "./api.js";
import { displayInfos, displayPhoto } from "./display.js";

const gallery= document.getElementById("galleryEdit")
const close = document.getElementById("close");
const addWork = document.getElementById("addWork");
const back = document.getElementById("back");
const addElements = document.getElementById("addElements");
const titleModal = document.getElementById("titlemodal");
const deleteGallery = document.getElementById("deleteGallery");
const photoInput = document.getElementById("photo");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const searchPicture = document.getElementById("searchPicture");
const divider = document.getElementById("divider");
const photoFile = document.getElementById("photoFile");
const inputPhoto = document.getElementById("inputPhoto");
const form = document.getElementById("form");

let modal = null;
let photo;
let title = "";
let category = "0";

// display project in the gallery
const displayModal = async () => {
    const infos = await getWorks();
  
    displayPhoto(infos);
}

//delete a project
const deleteWork = async (id) =>  {
    
    apiDeleteWork(id)    
    const infos = await getWorks();
    displayPhoto(infos);
    displayInfos(infos)

    initDeleteBtn();
}

//for each projects, add the delete button, and the event and delete
const initDeleteBtn = () => {
    let btnIcon = [...document.getElementsByClassName("btnIcon")];

    btnIcon.forEach(btn => {
        btn.addEventListener("click", () => {            
            deleteWork(btn.parentNode.id)
        })
    })
}

// display the modal
export const openModal = async event => {
    //let's get the modal href
    const target = document.querySelector(event.target.getAttribute("href"))
    target.style.display = "flex";
    target.setAttribute("aria-hidden", "false");
    target.setAttribute("aria-modal", "true");
    modal = target;
    close.addEventListener("click", closeModal);
    back.addEventListener("click", backModal);
    await displayModal()
    initDeleteBtn();
}

// get back

//can't we have a better way ??? very very verbous (is it english ?)
export const backModal = () => {
    galleryEdit.classList.remove("noedit");
    galleryEdit.style.display = "grid";
    addElements.classList.add("noedit");
    deleteGallery.classList.remove("noedit");
    addWork.classList.remove("noedit");
    divider.classList.remove("noedit");
    back.classList.add("noedit");
    titleModal.innerText = "Galerie Photo";
    photoFile.classList.add("noedit");
    inputPhoto.classList.remove("noedit");
    inputPhoto.classList.add("flex");
    titleInput.classList.add("borderInput");
    categoryInput.classList.add("borderInput");
    titleInput.classList.remove("redBorder");
    categoryInput.classList.remove("redBorder");
    searchPicture.classList.remove("redBorder");
    form.reset()
}

//close the modal
export const closeModal = () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-modal", "false");
    modal = null;
    backModal();
}
  
//valid the adding of a new project
const validateForm = () => {
    let hasError = false;
  
    titleInput.classList.add("borderInput");
    categoryInput.classList.add("borderInput");
    titleInput.classList.remove("redBorder");
    categoryInput.classList.remove("redBorder");
    searchPicture.classList.remove("redBorder");
  
    if(photo === undefined){
      hasError = true
      searchPicture.classList.add("redBorder");
    }
    if(title === ""){
      hasError = true
      titleInput.classList.remove("borderInput");
      titleInput.classList.add("redBorder");
    }
    if(category === "0"){
      hasError = true
      categoryInput.classList.remove("borderInput");
      categoryInput.classList.add("redBorder");
    }
  
    return hasError
}


//verification of the form
const handleForm = async () => {

    const hasError = validateForm();
    
    if(hasError){
    return;
    }

    const body = new FormData();
    //add the new datas
    body.append("image", photo);
    body.append("title", title);
    body.append("category", category); 
    
    await postWork(body);
        
    const infos = await getWorks();

    displayInfos(infos)
    displayPhoto(infos)
    backModal();
    closeModal();     
}

//Idea *lightbulb* !! 
//create an anchor and reload the site with the window to the anchor and we go to the new "project" directly

const initEventListeners = () => {
    //add new project 
    addWork.addEventListener("click", () =>{
        galleryEdit.classList.add("noedit");
        galleryEdit.style.display = "none";
        addElements.classList.remove("noedit");
        deleteGallery.classList.add("noedit");
        addWork.classList.add("noedit");
        divider.classList.add("noedit");
        back.classList.remove("noedit");
        titleModal.innerText = "Ajouter Projet";
    })

    // get the new pic
    photoInput.addEventListener('change', (event) => {
        photo = event.target.files[0]
        
        if(photo){
            const reader = new FileReader();

            reader.onload = function(event) {
            photoFile.src = event.target.result
            }

            reader.readAsDataURL(photo);
            photoFile.classList.remove("noedit");
            inputPhoto.classList.add("noedit");
            inputPhoto.classList.remove("flex")
        }

    })

    // get the title
    titleInput.addEventListener('change', (event) => {
    title = event.target.value;
    })

    // get the category
    categoryInput.addEventListener('change', (event) => {
    category = event.target.value;
    })

    // add the new project 
    form.addEventListener( "submit", (event) => {
        event.preventDefault()    
        handleForm()    
    })
}

initEventListeners();


  