import { displayNavbar } from "./navbar.js";
import { getWorks } from "./api.js";
import { displayInfos } from "./display.js";
import { openModal, backModal, closeModal } from "./modal.js";

//get DOM element 
const body = document.getElementById("body");
const login = document.getElementById("loginNav");
const logout = document.getElementById("logoutNav"); 

const editBar = document.getElementById("edit");
const editWorks = document.getElementById("editWorks");

const filterAll = document.getElementById("all");
const filterObjects = document.getElementById("objects");
const filterApartments = document.getElementById("apartments");
const filterHotels = document.getElementById("hotels");

//all the html behaviour
const main = async () => {
  const projects = await getWorks();

  displayInfos(projects);

  //function for the filter ? or new script ?
  filterAll.addEventListener("click", () => {
    displayInfos(projects);
  })

  filterObjects.addEventListener("click", () => {
    const objectsFilter = projects.filter( projects => {
      return projects.categoryId === 1 
    })
    displayInfos(objectsFilter);
  })

  filterApartments.addEventListener("click", () => {
    const objectsFilter = projects.filter( projects => {
      return projects.categoryId === 2
    })
    displayInfos(objectsFilter);
  })

  filterHotels.addEventListener("click", () => {
    const objectsFilter = projects.filter( projects => {
      return projects.categoryId === 3 
    })
    displayInfos(objectsFilter);
  })

  // if Admin access
  if(localStorage.getItem("token")){
    login.classList.remove("edit");
    login.classList.add("noedit");
    logout.classList.remove("noedit");
    editBar.classList.remove("noedit");
    editBar.classList.add("flex");
    editWorks.classList.remove("noedit");
  }
}

const initEventListeners = () => {
  logout.addEventListener("click", () => {
    localStorage.clear()
  })

  document.querySelectorAll(".allmodal").forEach(a => {
    a.addEventListener("click", openModal)
  })

  //close modal if click aside, on the body
  body.addEventListener("click", (event) => {
    let modalId = event.target.id;
    
    if(modalId === "modal"){
      backModal();
      closeModal();
    }
  })
}

displayNavbar();
main();
initEventListeners();