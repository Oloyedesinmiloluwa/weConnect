import validator from 'validator';
import { isString } from 'util';

/**
 * Class representing the validator for the application.
 */
export default class InputValidator {
  /**
   * This validates a new business if it is in the right format.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @param {Object} next - call next route handler
   * @returns {Object} suceess or failure
   */
  static post(req, res, next) {
    if (req.body.name === undefined || req.body.description === undefined) {
      return res.status(400).json({ message: 'Business name and description required' });
    }
    const keys = Object.keys(req.body);
    keys.forEach((key) => {
      if (!isString(req.body[key])) return res.status(400).json({ message: `Invalid Format for ${key} field` });
    });
    if (req.body.name.indexOf(' ') !== -1) {
      let test = req.body.name;
      for (let i = 0; i < test.length; i += 1) {
        test = test.replace(' ', '');
      }
      if (!validator.isAlphanumeric(test)) {
        return res.status(400).json({ message: 'Business name can only contain space & alphanumeric characters' });
      }
    } else if (!validator.isAlphanumeric(req.body.name)) {
      return res.status(400).json({ message: 'Business name can only contain space & alphanumeric characters' });
    }
    next();
  }
  /**
   * This validates update inputs
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   *  @param {Object} next - call next route handler
   * @returns {Object} success or fail
   */
  static update(req, res, next) {
    const keys = Object.keys(req.body);
    keys.forEach((key) => {
      if (!isString(req.body[key])) return res.status(400).json({ message: `Invalid Format for ${key} field` });
    });
    if (req.body.name && req.body.name.indexOf(' ') !== -1) {
      let test = req.body.name;
      for (let i = 0; i < test.length; i += 1) {
        test = test.replace(' ', '');
      }
      if (!validator.isAlphanumeric(test)) {
        return res.status(400).json({ message: 'Business name can only contain space & alphanumeric characters' });
      }
    } else if (req.body.name && !validator.isAlphanumeric(req.body.name)) {
      return res.status(400).json({ message: 'Business name can only contain space & alphanumeric characters' });
    }
    next();
  }
}
