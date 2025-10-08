export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({
      message: 'Datos inválidos',
      details: error.details.map(d => ({ path: d.path.join('.'), message: d.message })),
    });
  }
  req.body = value;
  next();
};
