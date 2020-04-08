import axios from "axios";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

console.log("token in axios", localStorage.getItem("token"));

export default axios;
