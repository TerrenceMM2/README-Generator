const fs = require("fs");
const inquirer = require("inquirer");
const api = require("./api")

const userInput = async () => {
    const data = await inquirer.prompt([
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "githubUsername"
        },
        {
            type: "input",
            message: "Project Title?",
            name: "projectTitle"
        },
        {
            type: "input",
            message: "Project Description?",
            name: "projectDescription"
        },
        {
            type: "input",
            message: "Please provide a Table of Contents",
            name: "tableOfContents",
            default: "Installation, Usage, Credits, License"
        },
        {
            type: "input",
            message: "Installation Instructions",
            name: "installation",
            default: "npm i"
        },
        {
            type: "input",
            message: "Usage Information",
            name: "usage"
        },
        {
            type: "list",
            message: "License",
            name: "license",
            choices: ["MIT", "Apache", "ISC", "GNU", "None"]
        },
        {
            type: "input",
            message: "Contribution Information",
            name: "contribution"
        },
        {
            type: "input",
            message: "Testing Information",
            name: "testing",
            default: "npm test"
        },
        {
            type: "input",
            message: "Question Information",
            name: "questions"
        },
    ]);

    const confirm = await inquirer.prompt([{
        type: "confirm",
        message: 
`GitHub Username: ${data.githubUsername}
Project Title: ${data.githubUsername}
Project Description: ${data.projectDescription}
Table of Contents: ${data.tableOfContents}
Installation: ${data.installation}
Usage: ${data.usage}
License: ${data.license}
Contribution: ${data.contribution}
Testing: ${data.testing}
Questions: ${data.questions}
Is this correct?`,
        name: "confirmed",
    }]);

    if (!confirm.confirmed) {
        userInput();
    }

    api.getGitHub(data.githubUsername);

}

userInput();