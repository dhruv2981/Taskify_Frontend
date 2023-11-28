import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    console.log("Token not foun in local storage");
  }
  return token;
};
const token = getToken();

export const fetchListsApi = () => {
  return axios.get("http://127.0.0.1:8000/taskify/lists/", {
    headers: {
      Authorization: "Token " + token,
    },
  });
};
export const fetchListApi = (listId:any) => {
  return axios.get(`http://127.0.0.1:8000/taskify/lists/${listId}`, {
    headers: {
      Authorization: "Token " + token,
    },
  });
};
export const createListApi = (newList: any) => {
  return axios.post("http://127.0.0.1:8000/taskify/lists/", newList, {
    headers: {
      Authorization: "Token " + token,
    },
  });
};
export const updateListApi = (listId: any, newList: any) => {
  return axios.put(
    `http://127.0.0.1:8000/taskify/lists/${listId}`,
    newList,
    {
      headers: {
        Authorization: "Token " + token,
      },
    }
  );
};
export const deleteListApi = (listId: any) => {
  return axios.delete(`http://127.0.0.1:8000/taskify/lists/${listId}`, {
    headers: {
      Authorization: "Token " + token,
    },
  });
};
