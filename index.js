const fs = require("fs");
const inquirer = require("inquirer");
const api = require("./api")

const userInput = async () => {
    const data = await inquirer.prompt([
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "githubUsername"
        }
    ]);

    const confirm = await inquirer.prompt([{
        type: "confirm",
        message: `GitHub Username: ${data.githubUsername}\nIs this correct?`,
        name: "confirmed",
    }]);

    if (!confirm.confirmed) {
        userInput();
    }

    api.getGitHub(data.githubUsername);

}

userInput();