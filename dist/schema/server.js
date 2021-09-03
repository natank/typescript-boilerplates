"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
console.log('Hi');
app.listen(4000, function () {
    console.log('Listening');
});
