const inquirer = require("inquirer");
const api = require("./api")
const fileMaker = require("./fileMaker");

const userInput = async () => {
    const data = await inquirer.prompt([
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "githubUsername",
            validate: function(value) {
                var pass = value.match(/./);
                if (pass) {
                    return true;
                }
                return 'Please provide your GitHub username.';
            }
        },
        {
            type: "input",
            message: "Project Title?",
            name: "projectTitle",
            validate: function(value) {
                var pass = value.match(/./);
                if (pass) {
                    return true;
                }
                return 'Please provide a README title.';
            }
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
            default: "Installation, Usage, License, Author"
        },
        {
            type: "input",
            message: "Installation Instructions",
            name: "installation",
            default: "npm install"
        },
        {
            type: "input",
            message: "Usage Information (Separate multiple steps with a comma)",
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
            message: "Contribution Information (Separate multiple steps with a comma)",
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
`
**********************************************************************************
GitHub Username: ${data.githubUsername}
Project Title: ${data.projectTitle}
Project Description: ${data.projectDescription}
Table of Contents: ${data.tableOfContents}
Installation: ${data.installation}
Usage: ${data.usage}
License: ${data.license}
Contribution: ${data.contribution}
Testing: ${data.testing}
Questions: ${data.questions}
**********************************************************************************
Is this correct?`,
        name: "confirmed",
    }]);

    if (!confirm.confirmed) {
        userInput();
    } else {
        data.ghData = await api.getGitHub(data.githubUsername);
        await fileMaker.generateReadme(data);
    }

}

userInput();