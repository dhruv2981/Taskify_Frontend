import axios from "axios";
import { setUserData } from "../app/features/singleUserSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const CurrentUser = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast.error("Token not found in local storage");
      return;
    }
    try {
      const response = await axios.get("http://127.0.0.1:8000/taskify/check_login/", {
        headers: {
          Authorization: "Token " + token,
        },
      });
      console.log(response.data.user, "v");
      if (!response.status) {
        //   console.log("kuch to gadbad hai daya");
        window.location.href = "http://127.0.0.1:3000/";
      } else {
        //   console.log("you can make this happen");
        dispatch(setUserData(response.data.user));
      }
      
    } catch (error) {
      toast.error("Login first");
    }
  };

  useEffect(() => {
    fetchData();
    // return () => {
    //   second
    // }
  }, [])
  

  return <></>;
};
export default CurrentUser;
