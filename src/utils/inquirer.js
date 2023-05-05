import inquirer from "inquirer"

export async function prompt(name, message, choices) {
  return await inquirer.prompt({
    name,
    type: "list",
    message,
    choices
  })
}

export async function input(name, message) {
  return await inquirer.prompt({
    name,
    type: "input",
    message
  })
}

export async function confirm(name, message) {
  return await inquirer.prompt({
    name,
    type: "confirm",
    message
  })
}
