const inquirer = require('inquirer');

const promptUser = () => {
return inquirer
    .prompt([
        {
            type: "input",
            name: 'name',
            message: "What is your name?",
            validate: nameInput =>{
                if(nameInput){
                    return true;
                }else{
                    console.log('Please enter your name!')
                    return false;
                }
            }
        },
        {
            type: "input",
            name: 'github',
            message: "Enter your Github Username",
            validate: userInput =>{
                if(userInput){
                    return true;
                }else{
                    console.log('Please enter your name!')
                    return false;
                }
            }
        },
        {
            type: "input",
            name:"about",
            message:"Provide some information about yourself:"
        }

    ])
};
const promptProject = portfolioData =>{
    //IF theres no 'projects' array property, create one
    if(!portfolioData.projects){
        portfolioData.projects = [];
    } ;

    console.log(`
    ===================
    ADD A NEW PROJECT)
    ===================
    `);
    return inquirer.prompt([
        {
            type:"input",
            name: "name",
            message:"Whats the name of your project?",
            validate: projectNameInput =>{
                if(projectNameInput){
                    return true;
                }else{
                    console.log('Please enter your name!')
                    return false;
                }
            }
        },
        {
            type:"input",
            name:"desciption",
            message:"Provide a description of the project (required)."
            validate: projectDescriptionInput =>{
                if(projectDescriptionInput){
                    return true;
                }else{
                    console.log('Please enter your name!')
                    return false;
                }
            }
        },
        {
            type:"checkbox",
            name: "languages",
            message:"What did you build the project with?(check all that apply)",
            choices: ['Javascript',"html","CSS","ES6", "jQuery","Bootstrap","Node"]
        },
        {
            type:"input",
            name:"link",
            message:"Enter the GitHub link to your project (required)",
            validate: linkInput =>{
                if(linkInput){
                    return true;
                }else{
                    console.log('Please enter your name!')
                    return false;
                }
            }
        },
        {
            type:"input",
            name: "feature",
            message:"Would you like to feature this project?",
            default: false
        },
        {
            type:"confirm",
            name:"confirmAddProject",
            message:"Would you like to add another project?",
            default: false
        }
    ])
    .then(projectData =>{
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject){
            return promptProject(portfolioData);
        }else{
            return portfolioData;
        }
    });
};



promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });


// const fs = require('fs'); //
// const generatePage = require('./src/page-template'); // 

// //const profileDataArgs = process.argv.slice(2);//

// const pageHTML = generatePage(name, github);


// fs.writeFile('index.html', pageHTML, err => {
//     if(err) throw err;

//     console.log('portfolio complete! check out index.html to see the output!')
// });
// console.log(inquirer);no