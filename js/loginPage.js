import { displayNavbar } from "./navbar.js";
import { postLoginInfo } from "./api.js";

//Get DOM Element
const loginForm = document.getElementById("loginForm")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const invalidSpan = document.getElementById("invalidSpan")
const labelEmail = document.getElementById("labelEmail");
const labelPwd = document.getElementById("labelPwd");
const missingEmail = document.getElementById("missingEmail");
const invalidEmail = document.getElementById("invalidEmail");

let email;
let password;

//stock the token in local storage
const getToken = (parseResponse) => {
    localStorage.setItem("token", parseResponse.token)
}

//server issues
//if good answer (200) redirect to the index
const goToAdminPage = (response) => {
    if(response.status === 200){
        window.location = "index.html";
    } else if (response.status === 401 || response.status === 404 ){
       emailInput.classList.remove("borderInput");
       passwordInput.classList.remove("borderInput")
       emailInput.classList = "redBorder";
       passwordInput.classList = "redBorder";
       invalidSpan.classList = "redWarning";
       invalidSpan.classList = "redWarning";
       labelEmail.classList = "errorMessage";
       labelPwd.classList = "errorMessage";
    } else {
       emailInput.classList ="borderInput";
       passwordInput.classList ="borderInput";
       emailInput.classList.remove("redBorder");
       passwordInput.classList.remove("redBorder");
       invalidSpan.classList.remove("redWarning");
       invalidSpan.classList.remove("redWarning");
       labelEmail.classList.remove("errorMessage");
       labelPwd.classList.remove("errorMessage");
       alert('Server issue...')
    }
}

//send log informations
const login = async (data) => {
    try{
    const response = await postLoginInfo(data)
    const parseResponse = await response.json()
    getToken(parseResponse)
    goToAdminPage(response)
                                                                          
    }catch(error){
        alert('Server issue...')
    }
}

const validateFormLogin = () => {
    invalidSpan.classList.add("invalid");
    invalidEmail.classList.add("invalid");
    missingEmail.classList.add("invalid");        
    let hasError = false;
    if(email === undefined || password === undefined){
        hasError = true;
        missingEmail.classList.add("redWarning")
        missingEmail.classList.remove("invalid")
    }
    return hasError;
}

const initEventListeners = () => {
    // get the email
    emailInput.addEventListener("change", (event) => {
        //hello regex my old friend
        //any word capital or not, the @ and again any words
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        email = event.target.value;
        if(!regex.test(email)){
            invalidEmail.classList="redWarning";
        }
    })

    //get the password
    passwordInput.addEventListener("change", (event) => {
        password = event.target.value;
    })

    //connexion on the submit
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const hasError = validateFormLogin();
        if(hasError)return;        
        
        let data = {
            email: email,
            password: password,
        }        
        login(data)
    })
}

displayNavbar();
initEventListeners();
