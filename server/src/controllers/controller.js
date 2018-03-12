import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models/index';

/**
 * Class representing the controller for the application.
 */
export default class appController {
  // /**
  //  * This selects a particular business from database when called withing other methods.
  //  * @param {Object} req - The client request object.
  //  * @param {Object} res - The server response object.
  //  * @returns {Object} The selected business
  //  */
  // static selectBusiness(req, res) {
  //   // const id = parseInt(req.params.businessId, 10);
  //   // if (!data[id]) return null;
  //   // return data[id];

  //   return db.Business
  //     .findById(appController.formatParamId(req, res))
  //     .then((business) => {
  //       if (!business) {
  //         return null;
  //       }
  //       return business; // res.status(200).send(business);
  //     })
  //     .catch(error => res.status(400).send(error));
  // }
  /**
   * This formats req.params.id to an integer
   * @param {Object} req - client request Object
   *  @param {Object} res - Server response Object
   * @returns {number} formatted number
   */
  static formatParamId(req, res) {
    const id = parseInt(req.params.businessId, 10);
    if (!id) return res.status(404).send({ message: 'Invalid ID' });
    return id;
  }
  /**
   * This gets all businesses which can be sorted by location or category
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Array} Business
   */
  static getAll(req, res) {
    if (req.query.category) {
      return db.Business
        .findAll({
          where: { category: req.query.category },
        })
        .then(businesses => res.status(200).send(businesses))
        .catch(error => res.send(400).send(error));
    }
    if (req.query.location) {
      // const filteredData = data.filter(business => business.location === req.query.location);
      // return res.status(200).send(filteredData);
      return db.Business
        .findAll({
          where: { location: req.query.location },
        })
        .then(businesses => res.status(200).send(businesses))
        .catch(error => res.send(400).send(error));
    }
    return db.Business
      .all()
      .then(businesses => res.status(200).send(businesses))
      .catch(error => res.status(400).send(error));
  }
  /**
   * This method gets a single business.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} business
   */
  static getOne(req, res) {
    return db.Business
      .findById(appController.formatParamId(req, res))
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'Invalid ID',
          });
        }
        return res.status(200).send(business);
      })
      .catch(() => res.status(404).send({ message: 'Invalid ID' }));
  }
  /**
   * This adds a business to the database.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} added business
   */
  static post(req, res) {
    if (req.body.name === undefined || req.body.description === undefined) {
      return res.status(400).send({ message: 'Business name and description required' });
    }
    return db.Business.create({
      // id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
      address: req.body.address,
      category: req.body.category,
      image: req.body.image,
      review: [],
      userId: req.decoded.id
    })
      .then((business) => {
        res.setHeader('Location', `businesses/${business.id}`);// check id if alright
        res.status(201).send(business);
      })
      .catch(error => res.status(400).send(error));
    // const business = {
    //   // id: data[data.length - 1].id + 1,
    //   name: req.body.name,
    //   description: req.body.description,
    //   email: req.body.email,
    //   phone: req.body.phone,
    //   location: req.body.location,
    //   address: req.body.address,
    //   category: req.body.category,
    //   image: req.body.image,
    //   review: [],
    // };
    // data.push(business);

    // const location = `businesses/${data[data.length - 1].id}`;
    // res.setHeader('Location', location);
    // res.status(201).send(data[data.length - 1]);
  }
  /**
   * This posts review to a business.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} reviewed business
   */
  static postReview(req, res) {
    // if (appController.selectBusiness(req) === null) return res.status(404).send({ message: 'Invalid ID' });
    // const item = appController.selectBusiness(req);
    // item.review.push(req.body.review);
    // data.splice(appController.formatParamId(req), 1, item);
    // res.setHeader('Location', `businesses/${appController.formatParamId(req)}${'/reviews'}`);
    // res.status(201).send(item);
    if (req.body.review === undefined) return res.status(400).send({ message: 'Review field cannot be empty'});
    return db.Business
      .findById(appController.formatParamId(req, res))
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'Invalid ID',
          });
        }
        business.review.push(req.body.review);
        business
          // .update(req.body.review, { fields: ['review'] })
          .update({ review: business.review }) // { where: { id: req.params.id } 
          .then(() => {
            // db.User
            //   .findById(business.userId)
            //   .then((user) => {
            //     if (user.notify) {
            //       const mailOptions = {
            //         from: 'no_reply@sinmi.com', to: user.email, subject: 'New Review from weconnect',
            //         html: '<p> Hey you got a new review for ' + business.name + ' Click this link to visit </p>' }
            //       sendMail(mailOptions);
            //     }
            //   })
            //   .catch(error => res.status(400).send(error));
            res.status(201).send(business);
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(() => res.status(404).send({ message: 'Invalid ID' }));
  }
  /**
   * This gets all reviews for a business
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Array} Reviews
   */
  static getReviews(req, res) {
    return db.Business
      .findById(appController.formatParamId(req, res))
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'Invalid ID',
          });
        }
        return res.status(200).send(business.review);
      })
      .catch(() => res.status(404).send({ message: 'Invalid ID' }));
  }
  /**
   * This updates an existing business
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} updated business
   */
  static update(req, res) {
    if (req.body.review) return res.status(400).send('pls remove review from request body');
    return db.Business
      .findById(appController.formatParamId(req, res))
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'Invalid ID',
          });
        }
        if (business.userId !== req.decoded.id) return res.status(403).send('Unauthorized User');
        return business
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => {
            res.status(200).send(business);
          })
          .catch(() => res.status(404).send({ message: 'Invalid ID' }));
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * This creates a new account for a user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static signUp(req, res) {
    // if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
    //   return res.status(400).send({ message: 'All fields are required' });
    // }
    // // req.body.id = user[user.length - 1].id + 1;
    // const newUser = {
    //   id: user[user.length - 1].id + 1,
    //   // name: req.body.name,
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   email: req.body.email,
    //   password: req.body.password,
    // };
    // user.push(newUser);
    // return res.status(201).send({ message: 'Successfully created an account' });
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    return db.User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.profilePicture || '',
      })
      // .then(user => res.status(201).send(user))
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
    // const item = user.filter(currentUser => currentUser.email === req.body.email);
    // if (req.body.password === item[0].password) {
    //   return res.status(201).send({ message: 'Successfully logged in' });
    // }
    // return res.status(401).send({ message: 'Invalid username or password' });
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
   * This destroys an existing business.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {null} nothing after deletion
   */
  static delete(req, res) {
    // if (appController.selectBusiness(req) === null) return res.status(404).send({ message: 'Invalid ID' });
    // data.splice(appController.formatParamId, 1);
    // return res.sendStatus(204);
    return db.Business
      .findById(appController.formatParamId(req, res))
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'Invalid ID',
          });
        }
        if (business.userId !== req.decoded.id) return res.status(403).send('Unauthorized User');
        return business
          .destroy()
          .then(() => res.sendStatus(204))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * This destroys an existing business.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {null} nothing after deletion
   */
  static resetPassword(req, res) {
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
          .update({ password: req.body.newPassword })
          .then(() => res.status(200).send({ message: 'Password successfully changed' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * This destroys an existing business.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {null} nothing after deletion
   */
  static deleteUser(req, res) {
    return db.User
      .findById(req.params.userId) // appController.formatParamId(req, res))
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
   * This destroys an existing business.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {null} nothing after deletion
   */
  static getUsers(req, res) {
    return db.User
      .all()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  }
}
