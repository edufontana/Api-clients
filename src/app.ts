import fastify from "fastify";

import { Routes } from "./controllers/routes";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

app.register(fastifyJwt, {
  secret: process.env.JWT!,
});

app.register(Routes);
