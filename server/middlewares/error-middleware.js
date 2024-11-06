const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || 'BACKEND ERROR'
    const extraDetails = err.extraDetails || 'Error from Backend'

    // console.log(status, message, extraDetails);

    return res.status(status).json({ message, extraDetails })
}

module.exports = errorMiddleware;