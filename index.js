// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generator = require('./generateMarkdown');

require("dotenv").config();


// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'Git_Owner',
        message: '"Enter the Owner of the Repo"',
    },
    {
        type: 'input',
        name: 'Project_Name',
        message: '"Enter the title of your project"',
    },
    {
        type: 'input',
        name: 'Description_Info',
        message: 'Enter a Description for your project',
    },
    {
        type: 'input',
        name: 'ToC_Info',
        message: 'Enter the different sections for the table of contents seperated by a space',
    },
    {
        type: 'input',
        name: 'Installation_Info',
        message: 'Enter the Installation Information',
    },
    {
        type: 'input',
        name: 'Usage_Info',
        message: 'Enter the Usage Information',
    },
    {
        type: 'input',
        name: 'Credits_Info',
        message: 'Enter the Names of people to credit',
    },
    {
        type: 'input',
        name: 'License_Info',
        message: 'Enter the License to use',
    },
    {
        type: 'input',
        name: 'Badges_Info',
        message: 'some',
    },
    {
        type: 'input',
        name: 'Features_Info',
        message: 'Enter the features of your project',
    },
    {
        type: 'input',
        name: 'Contributions_Info',
        message: 'some',
    },
    {
        type: 'input',
        name: 'Tests_Info',
        message: 'some',
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
    let tocValues, tocReplace;
    console.log(new_responses);
    for (const [key, value] of Object.entries(new_responses)) {
        if (key === 'ToC_Info') {
            tocValues = value.split(' ').filter(inputs => inputs);
            tocReplace = tocValues.map((value, index) => `* [${value.trim()}](https://github.com/${new_responses['Git_Owner'].trim()}/${new_responses['Project_Name'].trim()}#${value})`)

            template = template.replace(`{${key}}`, tocReplace.join('\n'));
        } else {
            template = template.replace(`{${key}}`, value.trim());
        }
    }

    writeToFile('result.md', template);
}

// Function call to initialize app
init() 