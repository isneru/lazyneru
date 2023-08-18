#!/usr/bin/env node

import figlet from "figlet"
import gradient from "gradient-string"
import { actionChoices } from "./utils/choices.js"
import { prompt } from "./utils/inquirer.js"
import { handleAnswer } from "./utils/steps.js"

function start() {
  figlet("lazy neru", async (_, data) => {
    console.log(gradient.retro.multiline(data))
    const { action } = await prompt(
      "action",
      "What do you want to do?",
      actionChoices
    )

    await handleAnswer(action)
  })
}

start()
