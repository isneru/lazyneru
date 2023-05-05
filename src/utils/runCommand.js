const { spawn } = await import("child_process")

export async function runCommand(command, argums, shell = undefined) {
  let args = argums.split(" ")
  return new Promise((resolve, reject) => {
    spawn(command, args, { stdio: "inherit", shell }).on("close", () => {
      resolve()
    })
  })
}
