require('dotenv').config()
const axios = require("axios");

exports.getGitHub = async (user) => {
    try {
        const response = await axios({
            method: "get",
            url: `https://api.github.com/users/${user}`,
            headers: {"Authorization": `token ${process.env.GH_TOKEN}`}
        })
        const data = response.data;
        return data;
    }
    catch (error) {
        console.error(error)
    }
    
};