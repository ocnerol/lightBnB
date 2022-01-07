const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query('SELECT * FROM users WHERE email = $1;', [email])
    .then((response) => response.rows[0])
    .catch(() => null);
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query('SELECT * FROM users WHERE id = $1', [id])
    .then((response) => response.rows[0])
    .catch(() => console.log(error.message));
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return pool
    .query(`INSERT INTO users (name, email, password)VALUES ($1, $2, $3)RETURNING *;`, [user.name, user.email, user.password])
    .then((response) => response.rows[0])
    .catch(() => null);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query('SELECT * FROM reservations WHERE guest_id = $1 LIMIT $2', [guest_id, limit])
    .then((response) => response.rows)
    .catch((error) => console.log(error))
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id\n  `;

  // will be used to add an AND clause if there is at least 1 other query parameter
  // or start a WHERE clause if there is no other query parameters yet
  const addAppropriateClause = () => {
    switch (queryParams.length) {
      case 0: {
        return 'WHERE ';
      }
      case 1: {
        return 'WHERE ';
      }
      default: {
        return ' AND ';
      }
    }
  };

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += addAppropriateClause() + `properties.owner_id = $${queryParams.length}`;
  }

  // if the given city exists, and is a string with at least two characters
  // this escapes entering a nonsensical 2 character city name
  if (options.city && options.city.length >= 2) {
    queryParams.push(`%${options.city.substring(1)}%`); // remove first character from city to escape initial capital letter comparison
    queryString += addAppropriateClause() + `city LIKE $${queryParams.length} `;
  }

  if (options.minimum_price_per_night && options.minimum_price_per_night >= 0) {
    // given price is in dollars and price is in cents
    // so minimum_price_per_night needs to be multiplied by 100 to be in dollars
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += addAppropriateClause() + `cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += addAppropriateClause() + `cost_per_night <= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log('queryString:', queryString, 'queryParams:', queryParams);

  return pool.
    query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((error) => error.message);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
