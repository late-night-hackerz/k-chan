import { Hono } from "hono";
import authR from "./routes/auth";
import userR from "./routes/user";


const app = new Hono();

app.route('/auth', authR);
app.route('/users', userR);

export const api = new Hono().route('/api', app);

export type Router = typeof app;