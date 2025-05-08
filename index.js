#!/usr/bin/env node

import fs from 'fs'
import { createDirname } from './utils/path.js'
import path from 'path'

const { __dirname } = createDirname(import.meta.url)
const TASK_FILE = 'tasks.json'

const pathArchive = path.join(__dirname, TASK_FILE)

if (!fs.existsSync(pathArchive)) {
  try {
    fs.writeFileSync(pathArchive, JSON.stringify([]), 'utf-8')
  } catch (error) {
    console.log(`error al crear el archivo ${TASK_FILE}`)
    process.exit()
  }
}

const command = process.argv[2] ?? ''
const commandValid = ['add', 'update', 'delete', 'view', 'sumary', 'list']

if (command === '') {
  console.log('Por favor ingrese un comando.')
  process.exit()
}

console.log(command)
