import { projectChoices } from "./choices.js"
import { input, prompt } from "./inquirer.js"
import { runCommand } from "./runCommand.js"

async function createProject() {
  const { project } = await prompt(
    "project",
    "What boilerplate do you want to use?",
    projectChoices
  )

  switch (project) {
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

async function tunnel() {
  const { port } = await input("port", "What is the port you want to tunnel?")
  runCommand("npx", `cloudflared tunnel --url http://localhost:${port}`, true)
}

export async function handleAnswer(answer) {
  switch (answer) {
    case "new project":
      await createProject()
      break
    case "tunnel":
      await tunnel()
      break
  }
}
