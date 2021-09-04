import axios from "axios";
function getAxiosWithTokenObj() {
  // get token
  let token = localStorage.getItem("token");
  // add token to header of req object
  let apiUrl = "http://localhost:4000";
  let axiosReqWithToken = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // bearer Authentication
  return axiosReqWithToken;
}
export default getAxiosWithTokenObj;
