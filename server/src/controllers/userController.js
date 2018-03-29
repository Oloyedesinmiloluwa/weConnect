import { user } from '../model/data';

/**
 * Class representing the controller for Users in the application.
 */
export default class UsersController {
  /**
   * This creates a new account for a user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static signUp(req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (req.body.email.indexOf('@') === -1 || req.body.email.indexOf('.') === -1) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    const newUser = {
      id: user[user.length - 1].id + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    user.push(newUser);
    return res.status(201).json({ message: 'Successfully created an account' });
  }
  /**
   * This validates the credentials of a user to allow or disallow login.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static login(req, res) {
    const item = user.filter(currentUser => currentUser.email === req.body.email);
    if (req.body.password === item[0].password) {
      return res.status(201).json({ message: 'Successfully logged in' });
    }
    return res.status(401).json({ message: 'Invalid username or password' });
  }
}
