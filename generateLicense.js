const axios = require('axios');

const markdownLicense = {  
  // TODO: Create a function that returns a license badge based on which license is passed in
  // If there is no license, return an empty string
  renderLicenseBadge: async (license) => {
    const response = await axios.get(`https://api.github.com/licenses/${license}`);
    console.log(response.data.name);
    
  },

  // TODO: Create a function that returns the license link
  // If there is no license, return an empty string
  renderLicenseLink: async (license) => {
    const response = await axios.get(`https://api.github.com/licenses/${license}`);
    // console.log(response.data);
    console.log(response.data.url);
  },

  // TODO: Create a function that returns the license section of README
  // If there is no license, return an empty string
  renderLicenseSection: async (license) => {
    const response = await axios.get(`https://api.github.com/licenses/${license}`);
    console.log(response.data.body);
  },

  // TODO: Create a function to generate markdown for README
  generateMarkdown: (data) => {
    return `# ${data.title}`;
  }
}

module.exports = markdownLicense;
