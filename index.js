#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { exit } from 'process'
import { createDirname } from './utils/path.js'
import validateCommand from './utils/validateCommand.js'
import { ExpennseController } from './src/controllers/expenseController.js'

const { __dirname } = createDirname(import.meta.url)
const EXPENSE_FILE = 'data.json'

const dataExpense = []

const pathArchive = path.join(__dirname, EXPENSE_FILE)

// creamos el archivo

if (!fs.existsSync(pathArchive)) {
  try {
    fs.writeFileSync(pathArchive, JSON.stringify([]), 'utf-8')
  } catch (error) {
    console.error(`error al crear el archivo ${EXPENSE_FILE}`)
    process.exit()
  }
} else {
  try {
    const data = fs.readFileSync(pathArchive, 'utf-8')
    dataExpense.push(...JSON.parse(data))
  } catch (error) {
    console.error('error al leer el achivo de datos')
  }
}

// tenemos los comandos habilitados
const command = process.argv[2] ?? ''

const result = validateCommand(command)

if (!result.status) {
  console.log(result.message)
  exit()
}

/// comprobamos el comando

const expense = new ExpennseController('modal')

expense[result.command](1)

console.log(result)

// verificamos los comandos que se ingresaron

// if (!command.startsWith('--')) {
//   console.log('comando no valido')
//   process.exit()
// }
