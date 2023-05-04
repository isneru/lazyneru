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
      },
      {
        name: "Create a new branch",
        value: "create branch"
      },
      {
        name: "Change the current branch",
        value: "change branch"
      },
      {
        name: "Delete a branch",
        value: "delete branch"
      },
      {
        name: "Commit changes",
        value: "commit"
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
    case "create branch":
      const { branch } = await inquirer.prompt({
        name: "branch",
        type: "input",
        message: `What is the name of the new branch?`
      })
      spawn("git", ["checkout", "-b", branch], { stdio: "inherit" })
      break
    case "change branch":
      console.log("Available branches:")
      spawn("git", ["branch"], { stdio: "inherit" }).on("close", async () => {
        const { branch } = await inquirer.prompt({
          name: "branch",
          type: "input",
          message: `What is the name of the branch you want to change to?`
        })
        spawn("git", ["checkout", branch], { stdio: "inherit" })
      })
      break
    case "delete branch":
      console.log("Available branches:")
      spawn("git", ["branch"], { stdio: "inherit" }).on("close", async () => {
        const { branch } = await inquirer.prompt({
          name: "branch",
          type: "input",
          message: `What is the name of the branch you want to delete?`
        })
        spawn("git", ["branch", "-D", branch], { stdio: "inherit" })
      })
      break
    case "commit":
      spawn("git", ["add", "-A"], { stdio: "inherit" }).on(
        "close",
        async () => {
          const { message } = await inquirer.prompt({
            name: "message",
            type: "input",
            message: `What is the commit message?`
          })
          spawn("git", ["commit", "-m", `"${message}"`], {
            stdio: "inherit"
          }).on("close", async () => {
            const { push } = await inquirer.prompt({
              name: "push",
              type: "confirm",
              message: `Do you want to push the changes?`
            })
            if (push) {
              spawn("git", ["push"], { stdio: "inherit" })
            }
          })
        }
      )
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
