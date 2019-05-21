const express = require("express");
const { Keystone } = require("@keystone-alpha/keystone");
const { MongooseAdapter } = require("@keystone-alpha/adapter-mongoose");
const { Text } = require("@keystone-alpha/fields");
const { GraphQLApp } = require("@keystone-alpha/app-graphql");

// Create a keystone object
const keystone = new Keystone({ name: "Keystone Headless API", adapter: new MongooseAdapter() });

// Configure the schema
keystone.createList("Todo", { fields: { name: { type: Text } } });

// Connect to the database
keystone.connect();

// Prepare the middleware applications and start the server
keystone.prepare({ apps: [new GraphQLApp({ apiPath: "/api" })] })
  .then(({ middlewares }) => express().use(middlewares).listen({ port: 3000 }));
