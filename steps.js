import { spawn } from "child_process"
import inquirer from "inquirer"

export async function getAction() {
  const answers = await inquirer.prompt({
    name: "action",
    type: "list",
    message: `What do you want to do?`,
    choices: [
      {
        name: "Create a new project",
        value: "new project"
      },
      {
        name: "Check the current git branch",
        value: "branch"
      }
    ]
  })

  return answers.action
}

export async function getNewProject() {
  const answers = await inquirer.prompt({
    name: "project",
    type: "list",
    message: `What boilerplate do you want to use?`,
    choices: [
      {
        name: "Vite",
        value: "vite"
      },
      {
        name: "Next.js",
        value: "nextjs"
      },
      {
        name: "T3",
        value: "t3"
      },
      {
        name: "SvelteKit",
        value: "svelte"
      },
      {
        name: "Astro",
        value: "astro"
      }
    ]
  })

  return answers.project
}

export async function handleAnswer(answer) {
  switch (answer) {
    case "new project":
      const project = await getNewProject()
      handleAnswer(project)
      break
    case "branch":
      spawn("git", ["branch"], { stdio: "inherit" })
      break
    case "vite":
      spawn("npm", ["create", "vite@latest"], { stdio: "inherit", shell: true })
      break
    case "nextjs":
      spawn("npx", ["create-next-app@latest"], {
        stdio: "inherit",
        shell: true
      })
      break
    case "t3":
      spawn("npm", ["create", "t3-app@latest"], {
        stdio: "inherit",
        shell: true
      })
      break
    case "svelte":
      spawn("npm", ["create", "svelte@latest"], {
        stdio: "inherit",
        shell: true
      })
      break
    case "astro":
      spawn("npm", ["create", "astro@latest"], {
        stdio: "inherit",
        shell: true
      })
      break
  }
}
