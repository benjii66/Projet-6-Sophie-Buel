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
let body;
let isFormValid = false;
let isTitleValid = true;
let isCategoryValid = true;

// display project in the gallery
const displayModal = async () => {
    const infos = await getWorks();  
    displayPhoto(infos);
}


deleteGallery.addEventListener("click", () => {
    deleteAllGallery();
});

//delete a project
const deleteWork = async (id) =>  {
    try {
        await apiDeleteWork(id);           
        const infos = await getWorks();
        displayPhoto(infos);
        displayInfos(infos)  
        initDeleteBtn();
    }catch(error){
        if(error instanceof SyntaxError)
        {
            console.log("Projet supprimé avec succès !");
        }else{

            console.error("erreur lors de la suppression", error);
        }
    }
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

const deleteAllGallery = async () => {
    try {
        const works = await getWorks();

        for (const work of works) {
            await apiDeleteWork(work.id);
        }
        const infos = await getWorks();
        displayPhoto(infos);
        displayInfos(infos);
        initDeleteBtn();
        console.log("Tous les projets ont été supprimés avec succès !");
    } catch (error) {
        console.error("erreur lors de la suppression de la galerie", error);
    }

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
    titleInput.classList.remove("redBorder");
    categoryInput.classList.add("borderInput");
    categoryInput.classList.remove("redBorder");
    searchPicture.classList.remove("redBorder");

    form.reset();

    photo = undefined;
    title = "";
    category = "0";
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
    let errors = {};

    titleInput.classList.add("borderInput");
    categoryInput.classList.add("borderInput");
    titleInput.classList.remove("redBorder");
    categoryInput.classList.remove("redBorder");
    searchPicture.classList.remove("redBorder");

    if (photo === undefined) {
        errors.photo = true;
        searchPicture.classList.add("redBorder");
        photo = undefined;
        photoInput.value ="";
    }

    if (title === "") {
        errors.title = true;
        titleInput.classList.remove("borderInput");
        titleInput.classList.add("redBorder");
        
        title = "";
        titleInput.value = ""; 
    }

    if (category === "0") {
        errors.category = true;
        categoryInput.classList.remove("borderInput");
        categoryInput.classList.add("redBorder");
        
        category = "0"; 
        categoryInput.value = "0"; 
    }

    if (!errors.photo && !errors.title && !errors.category) {
        isFormValid = true;
    } else {
        isFormValid = false;

        form.reset();
        photoInput.value = "";
        titleInput.value = "";
        categoryInput.value = "0";

        title = "";
        category = "0";
        photo = undefined;
        photoFile.classList.add("noedit");
            inputPhoto.classList.add("flex");
    }

    return errors;
};


//verification of the form
const handleForm = async () => {

    validateForm();
    if (!isFormValid) {
        form.reset();
        photoInput.value = ""; 
        titleInput.value = ""; 
        categoryInput.value = "0";   
        
        if (!photoInput.value || !titleInput.value || categoryInput.value === "0") {
            isFormValid = false;
        }

        return;
    }

    body = new FormData();
    body.append("image", photo);
    body.append("title", title);
    body.append("category", category); 

    await postWork(body);
    console.log("Données dans le body :", body);

    const infos = await getWorks();
    
    displayInfos(infos)
    displayPhoto(infos)   
    closeModal(); 

    
    photo = undefined;
    title = "";
    category = "0";

   
    form.reset();
    photoInput.value = "";
    titleInput.value = ""; 
    categoryInput.value = "0"; 
        
}


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
        event.preventDefault();
        console.log(titleInput.value + " " + categoryInput.value + " " + photoInput.value); 
        handleForm()   
        form.reset();
        photoInput.value = ""; 
        titleInput.value = ""; 
        categoryInput.value = "0";  
    })

}

initEventListeners();


  