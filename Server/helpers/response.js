const {ApplicationError, createError} = require("../utils/error");

function sendResponse(res, payload, statusCode = 200) {
  if (payload instanceof ApplicationError) {
    const code = payload.statusCode || 500
    return res.status(code).json(formatError(payload))
  }

  if (payload instanceof Error) {
    const newError = createError(payload)
    const code = newError.statusCode || 500
    return res.status(code).json(formatError(newError))
  }

  return res.status(statusCode).json(formatResponse(payload))
}

function formatResponse(result) {
  return {
    data: result,
    success: true,
  }
}

function formatError(error) {
  const stackTrace = JSON.stringify(error, ['stack'], 4) || {}
  const newError = JSON.parse(JSON.stringify(error))

  newError.statusCode = undefined

  return {
    error: {
      ...newError,
      stack: stackTrace.stack
    },
    success: false,
  }
}

const setTokenInCookie = (res, token, time) => {
  res.cookie('token', token, 
  {
      httpOnly: true,
      maxAge: time
  });
}

module.exports = {
  sendResponse,
  formatResponse,
  formatError,
  setTokenInCookie,
}