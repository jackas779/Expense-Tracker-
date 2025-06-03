export function table (data) {
  const line = '─'
  const columnWidths = {}
  const levels = {}

  const indices = Object.keys(data)

  indices.forEach(index => {
    const result = recovery(data[index], 0)
    levels[index] = result
  })
  console.log(levels[0].categoria)

  // data.forEach(element => {
  //   console.log(typeof element)
  //   if (typeof element === 'object') {
  //     console.log('this is object')
  //   }
  // })

  // console.log(indices)
}

// class recovery {
//   constructor(){
//     this.nodoHijo = null
//     this.level = 0
//   }
// }

function recovery (dataElement, level) {
  if (typeof dataElement !== 'object') {
    return { level }
  }
  const floor = { level }

  // if (property) {
  //   floor[property] = property
  // }

  for (const key in dataElement) {
    if (
      Object.prototype.hasOwnProperty.call(dataElement, key) &&
      typeof dataElement[key] === 'object'
    ) {
      const depth = recovery(dataElement[key], level + 1)

      floor[key] = depth
    }
  }
  return floor
}
const objeto = [
  {
    id: 1,
    descripcion: 'maslarga',
    amount: 5,
    categoria: {
      moder: {
        id: 1
      },
      date: ''
    },
    dateCreate: '2025/05/01',
    dateUpdate: ''
  },
  {
    id: 2,
    descripcion: 'motros',
    amount: 5,
    categoria: {},
    dateCreate: '2025/05/02',
    dateNoUpdate: ''
  }
]

table(objeto)
// console.table(})

// if (Array.isArray(dataElement)) {
//   for (const item of dataElement) {
//     const depth = recovery(item, level + 1)
//     if (depth > floor) {
//       floor = depth
//     }
//   }
// } else { // Si es un objeto "plano"
//   for (const key in dataElement) {
//     console.log(typeof dataElement[key])
//     if (Object.prototype.hasOwnProperty.call(dataElement, key) && typeof dataElement[key] === 'object') {
//       const depth = recovery(dataElement[key], level + 1, dataElement[key])
//       if (depth > floor) {
//         floor = depth
//       }
//     }
//   }
// }

// function recovery (dataElement, level, property = null) {
//   if (typeof dataElement !== 'object' || dataElement === null) {
//     return level
//   }

//   const floor = { level: level + 1, property }

//   for (const key in dataElement) {
//     if (
//       Object.prototype.hasOwnProperty.call(dataElement, key) &&
//       typeof dataElement[key] === 'object'
//     ) {
//       const depth = recovery(dataElement[key], level + 1, key)
//       if (depth > floor.level) {
//         floor.level = depth
//       }
//     }
//   }

//   return floor
// }
