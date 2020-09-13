import { Application, Router, RouterContext } from './deps.ts';
import { AppConfiguration } from './configs/AppConfiguration.ts';
import { Logger } from './server-configs/Logger.ts';
import { Routes } from './server-configs/Routes.ts';

import { applyGraphQL, gql, GQLError } from 'https://deno.land/x/oak_graphql/mod.ts';

const app = new Application();
Logger.initLogger();
//
// for (const router of await Routes.getConfiguredRoutes()) {
//   app.use(router.routes());
//   app.use(router.allowedMethods());
// }
const types = (gql as any)`
type User {
  firstName: String
  lastName: String
}

input UserInput {
  firstName: String
  lastName: String
}

type ResolveType {
  done: Boolean
}

type Query {
  getUser(id: String): User
}

type Mutation {
  setUser(input: UserInput!): ResolveType!
}
`;

const resolvers = {
    Query: {
        getUser: (parent: any, { id }: any, context: any, info: any) => {
            console.log('id', id, context);
            if(context.user === 'Aaron') {
                throw new GQLError({ type: 'auth error in context' })
            }
            return {
                firstName: 'wooseok',
                lastName: 'lee',
            };
        },
    },
    Mutation: {
        setUser: (parent: any, { input: { firstName, lastName } }: any, context: any, info: any) => {
            console.log('input:', firstName, lastName);
            return {
                done: true,
            };
        },
    },
};

const GraphQLService = await applyGraphQL({
    Router,
    path: '/graphql',
    typeDefs: types,
    resolvers: resolvers,
    context: (ctx: RouterContext) => {
        return { user: 'Aaron' };
    }
})

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

await app.listen({ port: 8080 }); // AppConfiguration.server.port
