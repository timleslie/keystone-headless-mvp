const { Keystone } = require('@keystone-alpha/keystone');
const { MongooseAdapter } = require('@keystone-alpha/adapter-mongoose');
const { Text } = require('@keystone-alpha/fields');
const { WebServer } = require('@keystone-alpha/server');

// Create a keystone object
const keystone = new Keystone({ name: 'Keystone Headless API', adapter: new MongooseAdapter() });

// Configure the schema
keystone.createList('Todo', { fields: { name: { type: Text } } });

// Connect to the database
keystone.connect();

// Setup the server
const server = new WebServer(keystone, { apiPath: '/api', port: 3000 });

// Start the server
server.start();
