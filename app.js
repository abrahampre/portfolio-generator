const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');


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
            type: "confirm",
            name:"confirmAbout",
            message:"Will you like to enter some information about your self for an About section?",
            default: true
        },
        {
            type:'input',
            name:'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout})=>{
                if(confirmAbout){
                    return true;
                }else{
                    return false;
                }
            }
        }

    ])
};
const promptProject = portfolioData =>{
    //IF theres no 'projects' array property, create one
    if(!portfolioData.projects){ //if the portfolioData.projects doesnt exist... then create one. this is to run only in the first round and dont empty on each round
        portfolioData.projects = []; /// we jsut added the the projects array to
        //the portfolio data object.
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
            name:"description",
            message:"Provide a description of the project (required).",
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
    .then(projectData =>{  ///Despues de el then.... viene la informacion O RESPUESTAS DEL INQUIRER osea, seria projectData en este caso
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
    const pageHTML = generatePage(portfolioData);
    //console.log(portfolioData); // imprime todo los inputs porque en porfolio data es el blank array
    fs.writeFile('index.html', pageHTML, err => {
        if(err) throw err;
    
        console.log('portfolio complete! check out index.html to see the output!')
    });
});




// fs.writeFile('index.html', pageHTML, err => {
//     if(err) throw err;

//     console.log('portfolio complete! check out index.html to see the output!')
// });

// console.log(inquirer);no
//const profileDataArgs = process.argv.slice(2);//

// const pageHTML = generatePage(name, github)
