import { globalConfig } from "../config.js";

// get Api Elements
export const getWorks = async () => {
    const response  = await fetch(`${globalConfig.url}works`)
    const data = await response.json();
    return data;
  }
  
  // Send elements to the Api
  export const postWork = async (body) => {
    let response = await fetch(`${globalConfig.url}works`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: body
    });
    return response
  }
  
  // delete elements on the Api
  export const apiDeleteWork  = async (id) => {
    let response = await fetch(`${globalConfig.url}works/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });     
    return response
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