import { response } from 'express';
import axios from 'axios';

const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

type User = { id: string; firstName: string; age: number; companyId: string };

const CompanyType = new GraphQLObjectType({
	name: 'Company',
	fields: {
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
	},
});

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt },
		company: {
			type: CompanyType,
			resolve(parentValue: User, args: unknown) {
				return axios
					.get<User>(`http://localhost:3000/companies/${parentValue.companyId}`)
					.then(res => res.data as User);
			},
		},
	},
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue: unknown, args: { id: string }) {
				return axios
					.get(`http://localhost:3000/users/${args.id}`)
					.then(resp => resp.data);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
