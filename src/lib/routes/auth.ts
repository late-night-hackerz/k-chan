import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
const app = new Hono();

app.post('/login', zValidator('json', z.object({
  email: z.string().email(),
})), async (c) => {
  const { email } = await c.req.json();
  
  return c.json({ email });
})

export default app;