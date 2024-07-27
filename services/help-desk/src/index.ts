import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { DataSource } from "typeorm";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: ["src/entities/user.entity.ts"],
  synchronize: true,
});

const main = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({ resolvers: [UserResolver] });
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at: ${url}`);
};

main();
