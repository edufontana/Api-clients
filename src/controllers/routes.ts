import { FastifyInstance } from "fastify";
import { create } from "./create-client";
import { auth } from "./auth";
import { sale } from "./create-sale";
import { deleteClient } from "./delete-client";
import { listClientByName } from "./list-client-by-name";
import { salesStats } from "./sales-stats";
import { salesClientLeaders } from "./sales-client-leaders";
import { checkJWT } from "@/middlewares/check-jwt";
import { updateClient } from "./update-client";

export async function Routes(app: FastifyInstance) {
  app.post("/clients", create);
  app.post("/session", auth);
  app.post("/sale", sale);
  app.delete("/clients/:id", { onRequest: [checkJWT] }, deleteClient);
  app.get("/clients/search", { onRequest: [checkJWT] }, listClientByName);
  app.get("/sales/stats", salesStats);
  app.get("/sales/leaders", salesClientLeaders);
  app.put("/clients/:id", { onRequest: [checkJWT] }, updateClient);
}
