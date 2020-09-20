import { Application, Router, RouterContext } from './deps.ts';
import { AppConfiguration } from './configs/AppConfiguration.ts';
import { Logger } from './server-configs/Logger.ts';
import { Routes } from './server-configs/Routes.ts';

import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";

const app = new Application();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Logger.initLogger();
//
// for (const router of await Routes.getConfiguredRoutes()) {
//   app.use(router.routes());
//   app.use(router.allowedMethods());
// }
const types = gql`
  type Dino {
    name: String
    image: String
  }
  input DinoInput {
    name: String
    image: String
  }
  type ResolveType {
    done: Boolean
  }
  type Query {
    getDino(name: String): Dino
    getDinos: [Dino!]!
  }
  type Mutation {
    addDino(input: DinoInput!): ResolveType!
  }
`;

const dinos = [
  {
    name: "Tyrannosaurus Rex",
    image: "🦖",
  },
];

const resolvers = {
  Query: {
    getDino: (_: any, { name }: any) => {
      const dino = dinos.find((dino) => dino.name.includes(name));
      if (!dino) {
        throw new Error(`No dino name includes ${name}`);
      }
      return dino;
    },
    getDinos: () => {
      console.log('qwqwd')
      return dinos;
    },
  },
  Mutation: {
    addDino: (_: any, { input: { name, image } }: any) => {
      dinos.push({
        name,
        image,
      });
      return {
        done: true,
      };
    },
  },
};

const GraphQLService = await applyGraphQL({
  typeDefs: types,
  resolvers: resolvers,
  Router
});

app.use(GraphQLService.routes());
app.use( GraphQLService.allowedMethods());
console.log("Server start at http://localhost:8080");
await app.listen({ port: 8080 }); // AppConfiguration.server.port
