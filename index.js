const axios = require('axios');
// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'Email',
        message: 'Enter your email address: ',
    },
    {
        type: 'input',
        name: 'Git_Owner',
        message: 'Enter the Owner of the Repo: ',
    },
    {
        type: 'input',
        name: 'Project_Name',
        message: 'Enter the title of your project: ',
    },
    {
        type: 'input',
        name: 'Description_Info',
        message: 'Enter a Description for your project: ',
    },
    {
        type: 'input',
        name: 'Installation_Info',
        message: 'Enter the Installation Information: ',
    },
    {
        type: 'input',
        name: 'Usage_Info',
        message: 'Enter the Usage Information: ',
    },
    {
        type: 'list',
        name: 'License_Info',
        message: 'Enter the License to use: ',
        choices: [
            {value: 'mit', name: "MIT License"},
            {value: 'apache-2.0', name: "Apache License 2.0"},
            {value: 'agpl-3.0', name: "GNU Affero General Public License v3.0"},
            {value: 'bsd-2-clause', name: "BSD 2-Clause \"Simplified\" License"},
            {value: 'bsd-3-clause', name: "BSD 3-Clause \"New\" or \"Revised\" License"},
            {value: 'bsl-1.0', name: "Boost Software License 1.0"},
            {value: 'cc0-1.0', name: "Creative Commons Zero v1.0 Universal"},
            {value: 'epl-2.0', name: "Eclipse Public License 2.0"},
            {value: 'gpl-2.0', name: "GNU General Public License v2.0"},
            {value: 'gpl-3.0', name: "GNU General Public License v3.0"},
            {value: 'lgpl-2.1', name: "GNU Lesser General Public License v2.1"},
            {value: 'mpl-2.0', name: "Mozilla Public License 2.0"},
            {value: 'unlicense', name: "The Unlicense"},
        ]
    },
    {
        type: 'input',
        name: 'Contributions_Info',
        message: 'Enter how people can help contribute: ',
    },
    {
        type: 'input',
        name: 'Tests_Info',
        message: 'Enter the test information: ',
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
}

// TODO: Create a function to initialize app
function init() {
    console.log('Type esc to exit the program at anytime');
    
    function askQuestion(index) {
        if (index >= questions.length) {
            // all questions have been answered, process the responses
            processResponses(new_responses);
            return;
        }
    
        let currentQuestion = questions[index];

        inquirer.prompt(currentQuestion).then(answer => {
            let keyTerm = currentQuestion.name;
            
            if (answer[keyTerm] === 'esc') {
                process.exit();
            }

            if (!answer[keyTerm].trim()) {
                console.log("Answer cannot be empty. Please enter a valid answer.");
                askQuestion(index);
                return;
            }

            // console.log(answer);
            // console.log(currentQuestion.name);
            // console.log(typeof currentQuestion.name);
            // console.log(answer[keyTerm]);
    
            new_responses[currentQuestion.name] = answer[keyTerm];
            // console.log(new_responses);
            askQuestion(index + 1);
        });
    
    }

    let new_responses = {};
    askQuestion(0);
}

function processResponses(new_responses) {
    let template = fs.readFileSync('template.md', 'utf8');
    // console.log(new_responses);
    for (const [key, value] of Object.entries(new_responses)) {
        if (key != 'Project_Name' && key != 'License_Info' && key != 'Git_Owner') {
            template = template.replace(`{${key}}`, value.trim());
        } else if (key === 'Git_Owner') {
            newVal = value.trim().replace(/\s+/g, '-');
            template = template.replace(`{${key}}`, `https://github.com/${newVal}`);
        } else if (key === 'Project_Name'){
            projName = value.trim().replace(/\s+/g, '-');
            template = template.replace(`{${key}}`, value.trim());
        } else if (key === 'License_Info') {
            axios.get(`https://api.github.com/licenses/${value}`).then(response => {
                let name = response.data.name.trim().replace(' ', '%20');
                let url = `https://choosealicense.com/licenses/${response.data.key}`;
                let body = response.data.body;
                let badge = `[![${response.data.name}](https://img.shields.io/badge/license-${name}-blue.svg)](${url})`;

                template = template.replace('{Badge_Icon}', badge);
                template = template.replace(`{${key}}`, body);
                writeToFile('result.md', template);
                // console.log(response.data);
            });
        }
    }
    writeToFile('result.md', template);
}

// Function call to initialize app
init()  