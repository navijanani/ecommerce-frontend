import axios from "axios";

export default axios.create({
    baseURL:  "http://localhost:5000/api" ,  // Ensure this is correct
    headers: {
        "Content-Type": "application/json",
    },
});
