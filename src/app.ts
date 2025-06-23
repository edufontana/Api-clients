import fastify from "fastify";
import cors from "@fastify/cors";
import { Routes } from "./controllers/routes";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

app.register(cors, {
  origin: true, // Permite qualquer origem. Para produção, especifique a URL do front.
});

app.register(fastifyJwt, {
  secret: process.env.JWT!,
});

app.register(Routes);
