export class ExpennseController {
  constructor (expenseModal) {
    this.expenseModal = expenseModal
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
      console.log('El valor de amount debe ser un numero valido')
      return
    }

    if (Number.isNaN(amount)) {
      console.log('El valor de amount no es un numero')
      return
    }

    console.log('Ya aqui eliges tu mismo que hacer')
  }

  update () {

  }

  delete () {

  }

  view () {

  }

  sumary () {

  }

  list () {

  }
}
