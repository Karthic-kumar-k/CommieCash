const sendSuccessResponse = (msg) => {
  return { status: 'success', message: msg }
}

const sendInternalServerErrorResponse = (err) => {
  return { status: 'error', message: err }
}

module.exports = {
  sendSuccessResponse,
  sendInternalServerErrorResponse
}
