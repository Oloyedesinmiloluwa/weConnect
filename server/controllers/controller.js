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
      // name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      address: req.body.address,
      category: req.body.category,
      review: [],
    };
    data.push(business);

    const location = `businesses/${data[data.length - 1].id}`;
    res.setHeader('Location', location);
    res.status(201).send(data[data.length - 1]);
  }
}
