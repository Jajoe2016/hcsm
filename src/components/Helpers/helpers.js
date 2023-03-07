import { useState, useEffect } from "react";
const loginUser = async (credentials) => {
  const data = await fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  return await data.json();
 };

 const createUser = async(userData)=>{
    return fetch('http://localhost:3001/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(data => data.json());
    
  };
export default {
  loginUser, 
  createUser,
};