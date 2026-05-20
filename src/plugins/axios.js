import axios from "axios";

const url = process.env.VUE_APP_URL_SERVIDOR_DADOS || process.env.VUE_APP_API_URL;
axios.defaults.baseURL = url;

export default axios.create({
  baseURL: url,
  timeout: 180000,
  withCredentials: true
})
