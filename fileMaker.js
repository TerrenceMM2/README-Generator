const fs = require("fs");

exports.generateReadme = async (data) => {

    const tableOfContents = data.tableOfContents.split(", ");
    const usage = data.usage.split(", ");
    const contribution = data.contribution.split(", ");

    const fileData =
`
# ${data.projectTitle}
${data.projectDescription}

## Table of Contents
${tableOfContents.map(item => `- [${item}](#${item})  \n`).join('')}

## Installation
\`\`\`
${data.installation}
\`\`\`

## Usage
${usage.map((step, i) => `${(i + 1)}. ${step}\n`).join('')}

### License
![License Badge](https://img.shields.io/static/v1?style=for-the-badge&logo=open-source-initiative&label=License&message=${data.license}&color=#3DA639)

### Contributing
${contribution.map((step, i) => `${(i + 1)}. ${step}\n`).join('')}

### Testing
\`\`\`
${data.testing}
\`\`\`

### Author
<img width="40" height="40" style="border-radius: 50%;" src="${data.ghData.avatar_url}" alt="Github Profile Picture">\n
**${data.ghData.name}**\n
- 📧 Email: [${data.ghData.email}](${data.ghData.email})\n
- 💻 Portfolio: [${data.ghData.blog}](${data.ghData.blog})\n
`
    fs.writeFile("New-README.md", fileData, err => {
        if (err) throw err;
        console.log("\nNew-README.md generated!")
    });
};