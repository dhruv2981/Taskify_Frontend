import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    console.log("Token not found in local storage");
  }
  return token;
};
const token = getToken();

export const fetchCardsApi = () => {
  return axios.get("http://127.0.0.1:8000/taskify/cards/", {
    headers: {
      Authorization: "Token " + token,
    },
  });
};

export const fetchCardApi = (cardId: any) => {
  return axios.get(`http://127.0.0.1:8000/taskify/cards/${cardId}`, {
    headers: {
      Authorization: "Token " + token,
    },
  });
};

export const createCardApi = (newCard: any) => {
  return axios.post("http://127.0.0.1:8000/taskify/cards/", newCard, {
    headers: {
      Authorization: "Token " + token,
    },
  });
};

export const updateCardApi = (cardId: any, newCard: any) => {
  return axios.put(`http://127.0.0.1:8000/taskify/cards/${cardId}`, newCard, {
    headers: {
      Authorization: "Token " + token,
    },
  });
};

export const deleteCardApi = (cardId: any) => {
  return axios.delete(`http://127.0.0.1:8000/taskify/cards/${cardId}`, {
    headers: {
      Authorization: "Token " + token,
    },
  });
};
