  const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// --- OUR CODE STARTS HERE ---

let userList = []
let userId = 1

async function main(){
    // get the project info and number of people to include
    const managerInfo = await inquirer.prompt([
        {
            name: "name",
            message: "Welcome to the glorious republic of eastern Moldavia.\n Comrade Manager, what is your name??"
        },
        {
            name: "email",
            message: "What is the manager's Email?"
        },
        {
            name: "office",
            message: "What is the manager's OfficeNumber?"
        },
        {
            name: "teamMembers",
            message: "How many members in your team?"
        }]
    )

    const manager = new Manager( managerInfo.name, userId++, managerInfo.email, managerInfo.office )
    userList.push( manager )

    let employee 

    // loop through and get user name/title for each person
    for( var i=0; i<managerInfo.teamMembers; i++ ){
       
        // ... YOUR CODE HERE PROMPT FOR THE EMPLOYEES ...
        const employeeInfo = await inquirer.prompt([
            {
                name: "name",
                message: "What is the employee's Name?"
            },
            {
                name: "email",
                message: "What is the employee's Email?"
            },
           
            {
                name: "role",
                type: "checkbox",
                message: "what is the employee's role?",
                choices: [
                    "people's engineer",
                    "future party member/intern",
                   
                ]
            }]
        
            
        )
        if(employeeInfo.role[0] === "people's engineer"){
            const githubInfo = await inquirer.prompt([{
                name: "github",
                message: "what is the comrade engineer's github repository?",

            }])

           employee = new Engineer ( employeeInfo.name, userId ++ , employeeInfo.email, githubInfo.github)

        
            
        }
        else{
            const schoolChoice = await inquirer.prompt([{
                name:"school",
                message: "what is the name and district prefect of the comrade scholar?"
            
            }])

            employee = new Intern (employeeInfo.name, userId ++, employeeInfo.email, schoolChoice.school)

        }
        

        
        userList.push( employee )
    }

    // Create the output directory if the output path doesn't exist
    if( !fs.existsSync(OUTPUT_DIR) ) fs.mkdirSync(OUTPUT_DIR)
    // use the pre-built render function to build the list...
    fs.writeFileSync(outputPath, render(userList), "utf-8");

    console.log( `Completed writing to: ${outputPath}` )
}
main()
