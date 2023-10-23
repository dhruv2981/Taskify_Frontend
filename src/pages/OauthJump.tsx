import { useNavigate } from "react-router-dom";
import { useEffect } from "react";





export default function OauthJump(){

    const navigate=useNavigate();
    useEffect(()=>{
        if(token!=null){
            navigate("/dashboard/");
        }
        else{
            navigate("/")
        }
        
    });
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get("token");
      console.log(token)
      if(token!=null){
        localStorage.setItem("auth_token", token);
      }
    // const searchParams = new URLSearchParams(window.location.search);
    // const token = searchParams.get("token");
    // console.log(token);

    // if (token != null) {
    //   // Set the cookie with the token
    //   document.cookie = `auth_token=${token}; expires=; path=/`;
    // }
      
    

    return (
        <>
        </>
    )

} ;