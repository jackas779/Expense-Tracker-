#!/usr/bin/env node

import fs from 'fs'
import { createDirname } from './utils/path.js'
import path from 'path'

const { __dirname } = createDirname(import.meta.url)
const EXPENSE_FILE = 'data.json'

const dataExpense = []

const pathArchive = path.join(__dirname, EXPENSE_FILE)

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

const command = process.argv[2] ?? ''
const commandValid = ['add', 'update', 'delete', 'view', 'sumary', 'list']

if (command === '') {
  console.log('Por favor ingrese un comando.')
  process.exit()
}
if (!command.startsWith('--')) {
  console.log('comando no valido')
  process.exit()
}

const argCommmand = command.substring(2).toLowerCase()

if (commandValid.includes(argCommmand)) {
  switch (argCommmand) {
    case 'add':
      console.log('comando elegido fue el add')
      break
    case 'update':
      break
    case 'delete':
      break
    case 'sumary':
      break
    case 'list':
      break
    default:
      console.log('Comando no reconocido por favor verifique nuevamente')
      break
  }
} else {
  console.log('Comando no reconocido por favor verifique nuevamente')
  process.exit()
}

console.log(argCommmand)
