import express from 'express';
const app = express();
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
);
console.log('Hi');
app.listen(4000, function () {
	console.log('Listening');
});
