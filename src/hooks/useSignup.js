import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useSignup = () => {

const [loading,setLoading]=useState(false);
const {authUser,setAuthUser}=useAuthContext()
const signup=async({fullName,username,password,confirmPassword,gender})=>{
   
const success=handleInputErr({fullName,username,password,confirmPassword,gender});
if(!success) return;

setLoading(true);
try{
    const res=await fetch("http://localhost:5000/api/auth/Signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({fullName,username,password,confirmPassword,gender})
    })

    const data=await res.json();
    if(data.error){
        throw new Error(dats.error)
    }
    localstorage.setItem("chat-user",JSON.stringify(data));
    //context
}
catch(error){
toast.error(error.message);
}
finally{
    setLoading(false);
}




}


  return {loading,signup};
}

export default useSignup

function handleInputErr({fullName,username,password,confirmPassword,gender}){
if(!fullName || !username||!password||!confirmPassword||!gender){
    toast.error("please fill in all fields")
    return false
}

if(password !== confirmPassword){
    toast.error("password do not match")
    return false;
}

if(password.length <6){
    toast.error("password must be atleast greater than 6")
    return false;
}

return true;
}