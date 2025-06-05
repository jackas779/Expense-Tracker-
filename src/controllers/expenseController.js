export class ExpenseController {
  #model
  constructor (expenseModel) {
    this.#model = expenseModel
  }

  add (...arg) {
    const descriptionCommand = arg[0][3] ?? null
    const description = arg[0][4] ?? null
    const amountCommand = arg[0][5] ?? null
    let amount = arg[0][6] ?? null

    if (descriptionCommand === null || amountCommand === null) {
      let message = ''
      if (!descriptionCommand) message = 'un segundo'
      else message = 'un tercer'

      console.log('Debe incluir ' + message + ' comando que sea valido')
      return
    }

    if (!descriptionCommand.startsWith('--') || !amountCommand.startsWith('--')) {
      console.log('el comando debe iniciar con los caracteres de --')
    }

    if (descriptionCommand !== '--description') {
      console.log(`Comando ${description} no reconocido`)
      return
    }
    if (amountCommand !== '--amount') {
      console.log(`Comando ${amountCommand} no reconocido`)
      return
    }

    if (description === null || amount === null) {
      let message = ''
      if (!description) message = 'una descripcion'
      else message = 'un valor de amount'

      console.log(`debe incluir ${message} `)
      return
    }

    if (typeof description !== 'string') {
      console.log('no es una cadena de texto')
      return
    }

    try {
      amount = parseInt(amount)
    } catch (error) {
      return 'El valor de amount debe ser un numero valido'
    }

    if (Number.isNaN(amount)) {
      console.log('El valor de amount no es un numero')
      return
    }

    return this.#model.add(description, amount)
  }

  update (...arg) {
    const property = arg[0][3] ?? ''
    const valueProperty = arg[0][4] ?? ''
    const findProperty = arg[0][5] ?? ''
    const newValue = arg[0][6] ?? ''

    if (!property) {
      return 'No puede estar vacia la propiedad a buscar'
    }

    if (!findProperty) {
      return 'No puede estar vacia la propiedad a modificar'
    }
    if (!property.startsWith('--') || !findProperty.startsWith('--')) {
      const invalidProperty = !property.startsWith('--') ? property : findProperty
      return `El propiedad debe comenzar con -- propiedad invalida (${invalidProperty})`
    }
    if (!valueProperty) {
      return 'El valor a buscar no puede esta vacio'
    }

    if (!newValue) {
      return 'no puede estar vacio el nuevo valor a modificar'
    }
    return this.#model.update(property, valueProperty, findProperty, newValue)
  }

  delete (...arg) {
    const argument = arg[0][3] ?? null
    const id = arg[0][4] ?? null

    if (argument === null) {
      return 'el argumento no pueede estar vacio'
    }
    if (!argument.startsWith('--')) {
      return 'el argumento debe comenzar con --'
    }

    if (id === null) {
      return 'El numero de identificacion no puede estar vacio '
    }

    return this.#model.delete(argument, id)
  }

  sumary (...arg) {
    const comand = arg[0][3] ?? null
    let value = arg[0][4] ?? null

    if (comand !== null) {
      if (!comand.startsWith('--')) {
        return 'El argumento es invalido debe comenzar con (--)'
      }

      if (value === null) {
        return 'El numero de mes no puede estar vacio'
      }

      try {
        value = parseInt(value)
      } catch (err) {
        return 'no se pudo convertir valor a numero'
      }

      if (isNaN(value)) {
        return 'El valor del mes no es un formato valido'
      }

      if (value < 1 || value > 12) {
        return 'El valor del mes debe ser un valor de 1 al 12 '
      }
    }

    return this.#model.sumary(comand, value)
  }

  list () {
    return this.#model.list()
  }

  help () {
    console.log(`
      📊 Expense Tracker CLI - Comandos disponibles:

      ## Operaciones básicas
      ▶ add --description "descripción" --amount [cantidad]
        - Añade un nuevo gasto
        - Ejemplo: add --description "Cena restaurante" --amount 50

      ▶ list
        - Muestra todos los gastos en formato de tabla

      ## Operaciones avanzadas  
      ▶ update --[propiedad] [valor] --[propiedad-a-modificar] [nuevo-valor]
        - Actualiza un gasto existente
        - Propiedades válidas: --id, --description
        - Campos modificables: --description, --amount, --categoria
        - Ejemplo: update --id 5 --amount 75 (actualiza el amount del gasto con ID 5)

      ▶ delete --id [id]
        - Elimina un gasto por su ID
        - Ejemplo: delete --id 3

      ▶ summary [--month [mes]]
        - Muestra el total de gastos
        - Opcional: filtrar por mes (1-12)
        - Ejemplo: summary --month 5 (gastos de mayo)

      ## Ayuda adicional
      ▶ Todos los comandos deben comenzar con --
      ▶ Las descripciones deben tener al menos 5 caracteres
      ▶ Los montos deben ser números positivos

      💡 Que te diviertas
    `)
  }
}
