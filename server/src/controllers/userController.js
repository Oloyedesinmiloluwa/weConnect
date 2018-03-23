import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models/index';
import sendMail from '../middlewares/mail';

/**
 * Class representing the controller for the application.
 */
export default class appController {
/**
   * This creates a new account for a user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static signUp(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    return db.User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        notify: req.body.notify || false,
        password: hashedPassword,
        profilePicture: req.body.profilePicture || '',
      })
      .then((user) => {
        const {
          id, email, firstName, lastName
        } = user;
        const token = jwt.sign({
          id, email, firstName, lastName
        }, process.env.secret_key, { expiresIn: '1h' });
        process.env.token = token;
        return res.status(201).send({ message: 'Successfully created an account' });
      })
      .catch(error => (res.status(400).send(error)));
  }
  /**
   * This validates the credentials of a user to allow or disallow login.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static login(req, res) {
    return db.User
      .find({
        where: {
          email: req.body.email,
        },
      })
      .then((user) => {
        if (!user) {
          res.status(401).send({ message: 'Invalid username' });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((response) => {
            if (response) {
              const {
                id, email, firstName, lastName
              } = user;
              const token = jwt.sign({
                id, email, firstName, lastName
              }, process.env.secret_key, { expiresIn: '1h' });
              process.env.token = token;
              return res.status(201).send({ message: 'Successfully logged in' });
            }
            return res.status(401).send({ message: 'Invalid Password' });
          })
          .catch(error => res.status(404).send(error.message));
      })
      .catch(error => res.status(400).send(error.message));
  }
  /**
   * This password of a user.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} success or failure message
   */
  static resetPassword(req, res) {
    if (req.body.newPassword === '' || req.body.newPassword === undefined) return res.status(400).send({ message: 'Password must have a value' });
    return db.User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Invalid ID',
          });
        }
        if (req.body.newPassword === user.password) return res.status(400).send({ message: 'Password must be new' });
        if (user.email !== req.decoded.email) return res.status(403).send({ message: 'Unauthorized User' });
        return user
          .update({ password: req.body.newPassword })
          .then(() => res.status(200).send({ message: 'Password successfully changed' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * This destroys an existing user.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} nothing after deletion
   */
  static deleteUser(req, res) {
    return db.User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Invalid ID',
          });
        }
        if (user.email !== req.decoded.email) return res.status(403).send('Unauthorized User');
        return user
          .destroy()
          .then(() => res.status(200).send({ message: 'Account Deleted Successfully' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * This gets all users.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Array} nothing after deletion
   */
  static getUsers(req, res) {
    if (req.decoded.email !== 'admin@weconnect.com') return res.status(403).send({ message: 'Unauthorized User'});
    return db.User
      .all()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  }
}
