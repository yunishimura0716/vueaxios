import axios from "axios";

const projectID = "vueaxios-9795a";
const firestoreURL = `https://firestore.googleapis.com/v1/projects/${projectID}/databases/(default)/documents\n`;
const instance = axios.create({
    baseURL: firestoreURL
})

export default instance;