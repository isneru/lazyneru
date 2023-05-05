#!/usr/bin/env node

import figlet from "figlet"
import gradient from "gradient-string"
import { getAction, handleAnswer } from "./utils/steps.js"

function start() {
  figlet("lazy neru", async (_, data) => {
    console.log(gradient.retro.multiline(data))
    const action = await getAction()

    await handleAnswer(action)
  })
}

start()
