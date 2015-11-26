'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/ambest-dev'
  },

  seedDB: true,
  imgDir: 'public/',
  imgTmpDir: 'tmp/'
};
