import { actionChoices, projectChoices } from "./choices.js"
import { confirm, input, prompt } from "./inquirer.js"
import { runCommand } from "./runCommand.js"

export async function getAction() {
  const { action } = await prompt(
    "action",
    "What do you want to do?",
    actionChoices
  )

  return action
}

export async function getNewProject() {
  const { project } = await prompt(
    "project",
    "What boilerplate do you want to use?",
    projectChoices
  )

  return project
}

export async function handleAnswer(answer) {
  switch (answer) {
    case "new project":
      const project = await getNewProject()
      handleAnswer(project)
      break
    case "branch":
      runCommand("git", "branch")
      break
    case "create branch":
      const { newBranch } = await input(
        "newBranch",
        "What is the name of the new branch?"
      )
      runCommand("git", `checkout -b ${newBranch}`)
      break
    case "change branch":
      console.log("Available branches:\n")
      await runCommand("git", "branch")
      const { branch } = await input(
        "branch",
        "What is the name of the branch you want to change to?"
      )
      runCommand("git", `checkout ${branch}`)
      break
    case "delete branch":
      console.log("Available branches:\n")
      await runCommand("git", "branch")
      const { branchToDelete } = await input(
        "branchToDelete",
        "What is the name of the branch you want to delete?"
      )
      runCommand("git", `branch -D ${branchToDelete}`)
      break
    case "commit":
      await runCommand("git", "add -A")

      const { message } = await input("message", "What is the commit message?")
      await runCommand("git", `commit -m ${message}`)

      const { push } = await confirm("push", "Do you want to push the changes?")
      push && runCommand("git", "push")
      break
    case "vite":
      runCommand("npm", "create vite@latest", true)
      break
    case "nextjs":
      runCommand("npx", "create-next-app@latest", true)
      break
    case "t3":
      runCommand("npm", "create t3-app@latest", true)
      break
    case "svelte":
      runCommand("npm", "create svelte@latest", true)
      break
    case "astro":
      runCommand("npm", "create astro@latest", true)
      break
  }
}
