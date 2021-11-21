module.exports = {
  response: (res, result, status, err) => {
    const resultPrint = {}
    resultPrint.status = 'success'
    resultPrint.code = status
    resultPrint.data = result
    resultPrint.error = err || null
    return res.status(status).json(resultPrint)
  },
  reject: (res, result, status, err) => {
    const resultPrint = {}
    resultPrint.status = 'reject'
    resultPrint.code = status
    resultPrint.data = result
    resultPrint.error = err || null
    return res.status(status).json(resultPrint)
  }
}