const { defineConfig } = require("cypress");
const dotenv = require('dotenv');

dotenv.config();


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    downloadsFolder: 'cypress/downloads'
  },
  env: {
    password: process.env.PASSWORD,
    code: process.env.CODE,
    state_id:process.env.STATE_ID,
    state_password:process.env.STATE_PASSWORD,

  },
});
