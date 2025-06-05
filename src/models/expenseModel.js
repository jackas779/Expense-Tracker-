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

  update (property, valueProperty, findProperty, newValue) {
    const propertyvalidFind = {
      descripcion: 'String',
      id: 'Number'
    }
    const propertyValid = {
      ...propertyvalidFind,
      amount: 'Number',
      categoria: 'String'
    }
    const cleanProperty = property.substring(2)
    const cleanFindProperty = findProperty.substring(2)

    if (!propertyvalidFind[cleanProperty]) {
      return `propiedad no valida (${property})`
    }

    if (cleanProperty === 'id') {
      try {
        valueProperty = parseInt(valueProperty)
      } catch (error) {
        return 'Hubo un error al convertir la cadena en un numero '
      }
    }

    if (!propertyValid[cleanFindProperty]) {
      return `propiedad no valida para su actualizacion(${findProperty})`
    }

    if (propertyValid[cleanFindProperty] === 'Number') {
      try {
        newValue = parseInt(newValue)
      } catch (error) {
        return 'Hubo un error al convertir la cadena en un numero '
      }

      if (newValue < 1) {
        return 'El valor no puede ser menor a 1'
      }
    } else {
      if (newValue.length < 5) {
        return 'La cadena de texto no puede tener una longitud menor a 5 caracteres'
      }
    }

    this.#getData()
    const data = this.#dataExpense

    const findExpense = data.filter(expense => expense[cleanProperty] === valueProperty)

    if (!findExpense) {
      return 'no se encontro ningun gasto'
    }

    if (!findExpense[0][cleanFindProperty]) {
      return `propiedad no encontrada (${findProperty})`
    }

    findExpense[0][cleanFindProperty] = newValue

    const result = this.#setData(data, 'al actualizar')

    if (result) {
      return 'Gasto actualizado satisfactoriamente.'
    }

    return 'No se pudo actualizar el gasto'
  }
}
