import axios from "axios";

const url = process.env.VUE_APP_URL_SERVIDOR_DADOS;
axios.defaults.baseURL = url;

export default axios.create({
    baseURL: url,
    timeout: 180000,
    withCredentials: true
})