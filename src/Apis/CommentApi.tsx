import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    console.log("Token not found in local storage");
  }
  return token;
};

const token = getToken();

export const createCommentApi = (newComment: any) => {
  return axios.post("http://127.0.0.1:8000/taskify/comments/", newComment, {
    headers: {
      Authorization: "Token " + token,
    },
  });
};
