import axios from "axios";

const refresh = axios.create({
    baseURL: `https://securetoken.googleapis.com/v1`
});

export default refresh;