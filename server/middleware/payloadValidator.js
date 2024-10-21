import Ajv from 'ajv';

const ajv = new Ajv();

export const validateSchema = (schema) => (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
        return res.status(400).json({ errors: validate.errors });
    }
    next();
};
