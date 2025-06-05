export default function validateCommand (command) {
  const commandValid = ['add', 'update', 'delete', 'view', 'sumary', 'list', 'help']
  command = command.toLowerCase()

  if (command === '' || command.length === 0) {
    return { status: false, message: 'Por favor ingrese un comando.' }
  }

  if (!commandValid.includes(command)) {
    return { status: false, message: 'Comando no reconocido por favor verifique nuevamente' }
  }

  return { status: true, command }
}

// switch (command) {
//   case 'add':
//     console.log('comando elegido fue el add')
//     // nota:
//     // los comando de descripcion siempre se esperan con un estimado de algo mas de 5 caracteres y luego sigue otros comandos
//     break
//   case 'update':
//     break
//   case 'delete':
//     break
//   case 'sumary':
//   // / nota:
//   // puede tener otros comandos adicionales
//     break
//   case 'list':
//     break
//   default:
//     console.log('Comando no encontrado por favor verifique nuevamente')
//     break
