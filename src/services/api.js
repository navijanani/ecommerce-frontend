import axios from "axios";

export default axios.create({
    baseURL:  "https://ecommerce-api-g0ul.onrender.com/api" ,  // Ensure this is correct
    headers: {
        "Content-Type": "application/json",
    },
});
