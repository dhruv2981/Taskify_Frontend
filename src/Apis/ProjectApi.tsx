import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    console.log("Token not found in local storage");
  }
  return token;
};
const token = getToken();

export const fetchProjectsApi = () => {
  return axios.get("http://127.0.0.1:8000/taskify/projects/", {
    headers: {
      Authorization: "Token " + token,
    },
  });
};

export const fetchProjectApi = (projectId: any) => {
  return axios.get(`http://127.0.0.1:8000/taskify/projects/${projectId}`, {
    headers: {
      Authorization: "Token " + token,
    },
  });
};

export const createProjectApi = (newProject: any) => {
  return axios.post("http://127.0.0.1:8000/taskify/projects/", newProject, {
    headers: {
      Authorization: "Token " + token,
    },
  });
};

export const updateProjectApi = (projectId: any, newProject: any) => {
  return axios.put(
    `http://127.0.0.1:8000/taskify/projects/${projectId}`,
    newProject,
    {
      headers: {
        Authorization: "Token " + token,
      },
    }
  );
};

export const deleteProjectApi = (projectId: any) => {
  return axios.delete(`http://127.0.0.1:8000/taskify/projects/${projectId}`, {
    headers: {
      Authorization: "Token " + token,
    },
  });
};
