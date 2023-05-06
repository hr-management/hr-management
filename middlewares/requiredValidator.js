/**
 * @param {string} payload body | query
 * @param {string[]} requiredFields []
 */
 function requiredValidator(payload, requiredFields) {
    const validator = async (req, res, next) => {
      const bodyOrQuery = req[payload];
      const errors = [];
      requiredFields.forEach((requiredField) => {
        if (!bodyOrQuery[requiredField]) {
          errors.push(`${requiredField} is required`);
        }
      });
      if (errors.length > 0) {
        res.status(400).json({ success: false, errors });
      } else {
        next();
      }
    };
    return validator;
  }
  
  module.exports = requiredValidator;
  