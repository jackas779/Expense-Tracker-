export function table (data, headers) {
  const lineHorizontal = '─'
  const lineVertical = '│'
  const columnWidths = {}
  const totalKey = headers.length

  const topRightcorner = '┐'
  const topLeftcorner = '┌'
  const BottomLeftcorner = '└'
  const BottomRightcorner = '┘'
  const intertetionTop = '┬'
  const intertetionInT = '┼'
  const intertetionButtom = '┴'
  const intertetionLeft = '├'
  const intertetionRight = '┤'

  headers.forEach(header => {
    columnWidths[header] = header.length
  })

  const indices = Object.keys(data)

  indices.forEach(index => {
    headers.forEach(header => {
      if (columnWidths[header] < String(data[index][header]).length) {
        columnWidths[header] = String(data[index][header]).length
      }
    })
  })

  // header
  let lineHeadTop = ''
  let lineHeadButtom = ''
  let bodyHead = lineVertical

  headers.forEach((header, index) => {
    if (index === totalKey - 1) {
      lineHeadTop += lineHorizontal.repeat(columnWidths[header] + 2)
      lineHeadButtom += lineHorizontal.repeat(columnWidths[header] + 2)
    } else {
      lineHeadTop += lineHorizontal.repeat(columnWidths[header] + 2) + intertetionTop
      lineHeadButtom += lineHorizontal.repeat(columnWidths[header] + 2) + intertetionInT
    }
    const width = columnWidths[header] - header.length
    if (width > 0) {
      bodyHead += ' ' + header + ' '.repeat(width + 1) + lineVertical
    } else {
      bodyHead += ' ' + header + ' ' + lineVertical
    }
  })

  console.log(topLeftcorner + lineHeadTop + topRightcorner)
  console.log(bodyHead)
  console.log(intertetionLeft + lineHeadButtom + intertetionRight)

  // body

  indices.forEach(index => {
    let body = lineVertical
    headers.forEach(header => {
      const width = columnWidths[header] - String(data[index][header]).length
      if (width > 0) {
        body += ' ' + data[index][header] + ' '.repeat(width + 1) + lineVertical
      } else {
        body += ' ' + data[index][header] + ' ' + lineVertical
      }
    })
    console.log(body)
  })

  // footer

  let lineFooter = BottomLeftcorner
  let contador = 0
  for (const key in columnWidths) {
    contador++
    const isLast = contador === totalKey
    lineFooter += lineHorizontal.repeat(columnWidths[key] + 2) + (isLast ? BottomRightcorner : intertetionButtom)
  }
  console.log(lineFooter)
}
