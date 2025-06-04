import fs from 'fs'
import table from '../../utils/table.js'

export class ExpenseModel {
  #dataExpense = []

  constructor (pathArchive, expenseFile) {
    this.pathArchive = pathArchive
    this.expenseFile = expenseFile

    if (!fs.existsSync(pathArchive)) {
      this.#setData([], 'al crear')
    }
  }

  #getData () {
    try {
      const data = fs.readFileSync(this.pathArchive, 'utf-8')
      const parseData = JSON.parse(data)
      this.#dataExpense = [...parseData]
    } catch (error) {
      console.error('error al leer el achivo de datos', error)
      process.exit()
    }
  }

  #setData (data, message) {
    try {
      fs.writeFileSync(this.pathArchive, JSON.stringify(data), 'utf-8')
    } catch (error) {
      console.error(`error ${message} el achivo de datos`)
      process.exit()
    }

    return true
  }

  getDate () {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()

    if (month < 10) {
      month = '0' + month
    }

    if (day < 10) {
      day = '0' + day
    }

    return `${year}/${month}/${day}`
  }

  verifiData (method, field) {
    if (method === 1) {
      return this.#dataExpense.find(expense => expense.descripcion === field)
    } else {
      console.log('metodo no escogido')
    }
  }

  add (descripcion, amount) {
    if (descripcion.length < 5) {
      return 'la descripcion es demasiada corta'
    }

    if (amount < 1) {
      return 'el monto no es un valor valido debe ser mayor a 0'
    }

    this.#getData()
    const data = this.#dataExpense

    /// /metodo para asegurarme que no existe algo

    if (this.verifiData(1, descripcion)) {
      return `Ya existe un gasto creado con esta descripcion : (${descripcion})`
    }

    const lastIdCreate = data.length
    const newId = lastIdCreate + 1
    const date = this.getDate()

    const newExpense = {
      id: newId,
      descripcion,
      amount,
      categoria: [],
      dateCreate: date,
      dateUpdate: ''
    }
    const newData = [...data, newExpense]

    const updateData = this.#setData(newData, 'al actualizar')

    if (updateData) {
      return `Gasto añadido satisfactoriamente (ID: ${newId})`
    } else {
      return 'No se pudo crear el gasto contacte a su administrador'
    }
  }

  list () {
    this.#getData()
    const data = this.#dataExpense

    if (data.length === 0) {
      return 'No hay datos que mostrar'
    }

    const headers = Object.keys(data[0])

    table(data, headers)
  }
}
