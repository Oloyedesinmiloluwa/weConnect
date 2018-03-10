import { data, user } from '../model/data';

/**
 * Class representing the controller for the application.
 */
export default class appController {
  /**
   * This selects a particular business from database when called withing other methods.
   * @param {Object} req - The client request object.
   * @returns {Object} The selected business
   */
  static selectBusiness(req) {
    const id = parseInt(req.params.businessId, 10);
    if (!data[id]) return null;
    return data[id];
  }
  /**
   * This formats req.params.id to an integer
   * @param {Object} req - client request Object
   * @returns {number} formatted number
   */
  static formatParamId(req) {
    const id = parseInt(req.params.businessId, 10);
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
      const filteredData = data.filter(business => business.category === req.query.category);
      return res.status(200).send(filteredData);
    }
    if (req.query.location) {
      const filteredData = data.filter(business => business.location === req.query.location);
      return res.status(200).send(filteredData);
    }
    return res.status(200).send(data);
  }
  /**
   * This method gets a single business.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} business
   */
  static getOne(req, res) {
    if (appController.selectBusiness(req) === null) return res.status(404).send({ message: 'Invalid ID' });
    res.status(200).send(appController.selectBusiness(req));
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
    const business = {
      id: data[data.length - 1].id + 1,
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
      address: req.body.address,
      category: req.body.category,
      image: req.body.image,
      review: [],
    };
    data.push(business);

    const location = `businesses/${data[data.length - 1].id}`;
    res.setHeader('Location', location);
    res.status(201).send(data[data.length - 1]);
  }
  /**
   * This posts review to a business.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} reviewed business
   */
  static postReview(req, res) {
    if (appController.selectBusiness(req) === null) return res.status(404).send({ message: 'Invalid ID' });
    const item = appController.selectBusiness(req);
    item.review.push(req.body.review);
    data.splice(appController.formatParamId(req), 1, item);
    res.setHeader('Location', `businesses/${appController.formatParamId(req)}${'/reviews'}`);
    res.status(201).send(item);
  }
  /**
   * This gets all reviews for a business
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Array} Reviews
   */
  static getReviews(req, res) {
    const item = appController.selectBusiness(req);
    return res.status(200).send(item.review);
  }
  /**
   * This updates an existing business
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} updated business
   */
  static update(req, res) {
    if (appController.selectBusiness(req) === null) return res.status(404).send({ message: 'Invalid ID' });
    const item = appController.selectBusiness(req);
    Object.assign(item, req.body);
    res.status(200).send(item);
  }
  /**
   * This creates a new account for a user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static signUp(req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    // req.body.id = user[user.length - 1].id + 1;
    const newUser = {
      id: user[user.length - 1].id + 1,
      // name: req.body.name,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    user.push(newUser);
    return res.status(201).send({ message: 'Successfully created an account' });
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
      return res.status(201).send({ message: 'Successfully logged in' });
    }
    return res.status(401).send({ message: 'Invalid username or password' });
  }
  /**
   * This destroys an existing business.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {null} nothing after deletion
   */
  static delete(req, res) {
    if (appController.selectBusiness(req) === null) return res.status(404).send({ message: 'Invalid ID' });
    data.splice(appController.formatParamId, 1);
    return res.sendStatus(204);
  }
}
