import { Hono } from "hono";
import { cors } from "hono/cors";
import { DocumentManager } from "@y-sweet/sdk";

type Env = {
  Variables: {
    CONNECTION_STRING: string;
  };
};

const app = new Hono<Env>({});

app.use("*", cors());

const manager = new DocumentManager(process.env.CONNECTION_STRING as string);

app.post("/yjs/auth", async (c) => {
  const { docId } = await c.req.json<{ docId?: string }>();
  const clientToken = await manager.getOrCreateDocAndToken(docId);
  return c.json(clientToken);
});

export default {
  port: 4001,
  fetch: app.fetch,
};
