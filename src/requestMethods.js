import axios from "axios";

const BASE_URL= "https://login-auth-database-pdf.onrender.com/api/";

export const publicRequest= axios.create({
    baseURL: BASE_URL,
});

