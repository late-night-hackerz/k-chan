import { Hono } from "hono";
import authR from "./routes/auth";


const app = new Hono();

app.route('/auth', authR);

export const api = new Hono().route('/api', app);

export type Router = typeof app;