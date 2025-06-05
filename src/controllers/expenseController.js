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

  sumary () {

  }

  list () {
    return this.#model.list()
  }
}
