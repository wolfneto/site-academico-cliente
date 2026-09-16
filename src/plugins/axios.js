import axios from "axios";

const fallbackUrl = "https://site-academico-servidor-production.up.railway.app";
let url = process.env.VUE_APP_URL_SERVIDOR_DADOS || process.env.VUE_APP_API_URL;

if (!url) {
  url = fallbackUrl;
}

// Some production builds still inject "/api" on the same domain without a live proxy.
// In that case, route calls directly to the public API server.
if (url.includes("academicosolident.com.br/api")) {
  url = fallbackUrl;
}

axios.defaults.baseURL = url;

export default axios.create({
  baseURL: url,
  timeout: 180000,
  withCredentials: true
})
