#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { exit } from 'process'
import { createDirname } from './utils/path.js'
import validateCommand from './utils/validateCommand.js'
import { ExpenseController } from './src/controllers/expenseController.js'
import { ExpenseModel } from './src/models/expenseModel.js'


const { __dirname } = createDirname(import.meta.url)
const EXPENSE_FILE = 'data.json'
const dataExpense = []

const pathArchive = path.join(__dirname, EXPENSE_FILE)

// tenemos los comandos habilitados
const command = process.argv[2] ?? ''

const resultValidateCommand = validateCommand(command)

if (!resultValidateCommand.status) {
  console.log(resultValidateCommand.message)
  exit()
}

/// comprobamos el comando
const expenseModel = new ExpenseModel(pathArchive,EXPENSE_FILE)
const expense = new ExpenseController(expenseModel)

const result = expense[resultValidateCommand.command](process.argv)

console.log(result)

console.log(resultValidateCommand)

// verificamos los comandos que se ingresaron

// if (!command.startsWith('--')) {
//   console.log('comando no valido')
//   process.exit()
// }
