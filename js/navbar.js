const loginNav = document.getElementById('loginNav');
const projetsNav = document.getElementById('projetsNav');
const introduction = document.getElementById('introduction');
const loginPage = document.getElementById('loginPage');

export const displayNavbar = () => {
    if(introduction){
        projetsNav.className = 'bold';
    }else if(loginPage){
        loginNav.className = 'bold';
    }
   
}

