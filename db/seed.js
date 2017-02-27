'use strict'

const db = require('APP/db')
const products = require('APP/db/seeds/seed_info');

const seedUsers = () => db.Promise.map([
  {firstname: 'Han Hyuk', lastname: 'Cho', phone: '+1 555-555-5555', email: 'hanhyuk83.cho@gmail.com', password: '1234',  address_country: 'USA', address_city: 'New York', address_zip: '10022', address_line1: 'Lexington Midtown East', address_line2: ''},
  {firstname: 'Barack', lastname: 'Obama', phone: '+1 111-111-1111', email: 'barack@example.gov', password: '1234', address_country: 'USA', address_city: 'Washington DC', address_zip: '11111', address_line1: 'White House', address_line2: 'West Wing'},
], user => db.model('users').create(user))

const seedProducts = () => db.Promise.map([
  products.female_accessory_1,
  products.female_accessory_2,
  products.female_accessory_3,
  products.female_bag_1,
  products.female_bag_2,
  products.female_bag_3,
  products.female_bag_4,
  products.female_shoe_1,
  products.female_shoe_2,
  products.female_shoe_3,
  products.female_shoe_4,
  products.male_accessory_1,
  products.male_accessory_2,
  products.male_accessory_3,
  products.male_accessory_4,
  products.male_shoe_1,
  products.male_shoe_2,
  products.male_shoe_3
], product => db.model('products').create(product))


db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedProducts)
  .then(products => console.log(`Seeded ${products.length} products OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
