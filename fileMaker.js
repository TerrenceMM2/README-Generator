const fs = require("fs");
const { BadgeFactory } = require('gh-badges');

exports.generateReadme = async (data) => {

    const bf = new BadgeFactory()
 
    const format = {
        text: [`${data.license}`, 'passed'],
        color: '#20c997',
        template: 'flat',
    }
 
    const svg = bf.create(format)

    const tableOfContents = data.tableOfContents.split(", ");

    const fileData =
`
# ${data.projectTitle}
${data.projectDescription}

## Table of Contents
${tableOfContents.map(item => `- [${item}](#${item})  \n`).join('')}

## Installation
\`\`\`${data.installation}\`\`\`

## Usage
${data.usage}

### License
${svg}

### Contributing
${data.contribution}

### Testing
\`\`\`${data.testing}\`\`\`

### Questions
${data.questions}

### Author
<img src="${data.ghData.avatar_url}" style="width: 40px; height: 40px; border-radius: 50%;" alt="Github Profile Picture">\n
**${data.ghData.name}**\n
- Email: [${data.ghData.email}](${data.ghData.email})\n
- Portfolio: [${data.ghData.blog}](${data.ghData.blog})\n
`
    fs.writeFile("New-README.md", fileData, err => {
        if (err) throw err;
        console.log("README.md generated!")
    });
};