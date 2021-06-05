import axios from "axios";

export default axios.create({
  baseURL: "http://132.145.210.248:8080/captain/funds/",
  responseType: "json"
});
