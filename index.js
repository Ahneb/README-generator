// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');


// TODO: Create an array of questions for user input
const questions = [
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
    // {
    //     type: 'input',
    //     name: 'Table_of_Contents',
    //     message: 'Do you want a table of contents?',
    // },
    // {
    //     type: 'input',
    //     name: 'ToC_Info',
    //     message: 'Enter the different sections for the table of contents',
    // },
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
    // {
    //     type: 'input',
    //     name: 'Badges',
    //     message: 'some',
    // },
    {
        type: 'input',
        name: 'Features_Info',
        message: 'Enter the features of your project',
    },
    // {
    //     type: 'input',
    //     name: 'How_to_Contribute',
    //     message: 'some',
    // },
    // {
    //     type: 'input',
    //     name: 'Tests',
    //     message: 'some',
    // },
];

inquirer.prompt(questions).then(responses => {
    // console.log(responses);

    let template = fs.readFileSync('template.md', 'utf8');
    // console.log(contents);

     for (const [key, value] of Object.entries(responses)) {
        template = template.replace(`{${key}}`, value);
     }

     console.log(template);
    fs.writeFileSync('results.md', template);
});


// TODO: Create a function to write README file
function writeToFile(fileName, data) {

}

// TODO: Create a function to initialize app
function init() {

}

// Function call to initialize app
init()