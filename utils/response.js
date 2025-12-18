function success(res, data = null, message = 'OK', statusCode = 200) {
  return res.status(statusCode).json({ status: statusCode, message, data });
}

function error(res, message = 'Error', statusCode = 500, data = null) {
  return res.status(statusCode).json({ status: statusCode, message, data });
}

module.exports = { success, error };
