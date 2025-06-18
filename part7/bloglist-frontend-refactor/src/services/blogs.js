import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (newObject) => {
  const url = `${baseUrl}/${newObject.id}`;
  const response = await axios.put(url, newObject);
  return response.data;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/${blog.id}`;
  const response = await axios.delete(url, config);
  return response.data;
};

const addComment = async (blog, comment) => {
  const url = `${baseUrl}/${blog.id}/comments`;
  const response = await axios.post(url,{ comment });
  return response.data;
}

export default { getAll, create, setToken, update, deleteBlog, addComment };
