import axios from "axios";

const getToken=()=>{
        const token=localStorage.getItem("auth_token");
        if (!token) {
          console.log("Token not found in local storage");
        }
    return token;
}
const token=getToken();

export const fetchUsersApi=()=>{
    return axios.get("http://127.0.0.1:8000/taskify/users/", {
      headers: {
        Authorization: "Token " + token,
      },
    });
}

export const fetchUserApi=(userId:any)=>{
    return axios.get(`http://127.0.0.1:8000/taskify/users/${userId}/`, {
      headers: {
        Authorization: "Token " + token,
      },
    });
}

export const createUserApi = (newUser: any) => {
  return axios.post("http://127.0.0.1:8000/taskify/users/", newUser, {
    headers: {
      Authorization: "Token " + token,
    },
  });
};

export const updateUserApi=(userId:any,newUser:any)=>{
    return axios.put(`http://127.0.0.1:8000/taskify/users/${userId}/`,newUser, {
      headers: {
        Authorization: "Token " + token,
      },
    });
}

export const deleteUserApi = (userId: any) => {
  return axios.delete(`http://127.0.0.1:8000/taskify/users/${userId}/`, {
    headers: {
      Authorization: "Token " + token,
    },
  });
};



