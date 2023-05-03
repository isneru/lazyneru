#!/usr/bin/env node

import figlet from "figlet"
import gradient from "gradient-string"

import { getAction, handleAnswer } from "./steps.js"

async function start() {
  figlet("lazy neru", async (_, data) => {
    console.log(gradient.retro.multiline(data))
    const action = await getAction()

    await handleAnswer(action)
  })
}

await start()
