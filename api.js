const axios = require("axios");

exports.getGitHub = (user) => {
    axios.get(`https://api.github.com/users/${user}`)
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
};