const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        next()
    } catch (err) {
        // console.log(error);
        const status = 422
        const message = 'Fill the input properly'
        const extraDetails = err.errors[0].message
        // res.status(400).json({message: message})

        const error = {
            status,
            message,
            extraDetails
        }
        next(error)
    }
}

module.exports = validate;