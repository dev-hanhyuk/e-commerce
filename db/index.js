'use strict'
const debug = require('debug')('sql')
const chalk = require('chalk')
const Sequelize = require('sequelize')
const app = require('APP')

const name = (process.env.DATABASE_NAME || app.name) +
  (app.isTesting ? '_test' : '')


/* setup for AWS DB server */
// const db_name = process.env.RDS_DB_NAME || name;
// const db_username = process.env.RDS_USERNAME || 'root';
// const db_password = process.env.RDS_PASSWORD || null;
// const db_hostname = process.env.RDS_HOSTNAME || 'localhost';
// const db_port = process.env.RDS_PORT || 5432;
// const url = `postgres://${db_hostname}:${db_port}/${db_name}`;


/* setup for Heroku server */
const url = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`
console.log(chalk.yellow(`Opening database connection to ${url}`));


// create the database instance
const db = module.exports = new Sequelize(url, {
  logging: debug, // export DEBUG=sql in the environment to get SQL queries
  native: true,   // lets Sequelize know we can use pg-native for ~30% more speed
  define: {
    underscored: true,       // use snake_case rather than camelCase column names
    freezeTableName: true,   // don't change table names from the one specified
    timestamps: true,        // automatically include timestamp columns
  }
})

// pull in our models
require('./models')

// sync the db, creating it if necessary
function sync(force=app.isTesting, retries=0, maxRetries=5) {
  return db.sync({force})
    .then(ok => console.log(`Synced models to db ${url}`))
    .catch(fail => {
      // Don't do this auto-create nonsense in prod, or
      // if we've retried too many times.
      if (app.isProduction || retries > maxRetries) {
        console.error(chalk.red(`********** database error ***********`))
        console.error(chalk.red(`    Couldn't connect to ${url}`))
        console.error()
        console.error(chalk.red(fail))
        console.error(chalk.red(`*************************************`))
        return
      }
      // Otherwise, do this autocreate nonsense
      console.log(`${retries ? `[retry ${retries}]` : ''} Creating database ${name}...`)
      return new Promise((resolve, reject) =>
        require('child_process').exec(`createdb "${name}"`, resolve)
      ).then(() => sync(true, retries + 1))
    })
}

db.didSync = sync()