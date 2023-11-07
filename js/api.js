import { globalConfig } from "../config.js";

// get Api Elements
export const getWorks = async () => {
  try{

    const response  = await fetch(`${globalConfig.url}works`)
    if(response.ok)
    {
      const data = await response.json();
      console.log("données récupérées avec succès", data);
      return data;
    }
    else {
      throw new Error ("Erreur lors de la requête : ${response.status}");
    }}catch(error){
      console.error("API pour afficher pas API qui sait ? ");
      }
  }
  
  // Send elements to the Api
  export const postWork = async (body) => {
    try {
      let response = await fetch(`${globalConfig.url}works`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: body
      });
      if(response.ok)
      {
        const data = await response.json();
        console.log("données envoyées avec succès", data);
        return data;
      }else {
        throw new Error("Erreur lors de la requête : ${response.status}");
      }
    } catch(error){
      console.error("API pour envoyer pas API qui sait ? ")
    }
  }
  
  // delete elements on the Api
  export const apiDeleteWork  = async (id) => {

    try {
      let response = await fetch(`${globalConfig.url}works/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },        
      });

      if(response.ok)
      {
        console.log("projet supprimé avec succès");
      return response.status === 204 ? response.status : response.json();
      }else {
        throw new Error("Erreur lors de la requête : ${response.status}");
      }
    } catch(error){
      console.error("Erreur lors de la suppression du projet", error);
      throw error;
    }
   
    
  }
  
  // send logs infos
  export const postLoginInfo = async (data) => {
    let response = await fetch(`${globalConfig.url}users/login`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data) 
  }); 
  return response
  }