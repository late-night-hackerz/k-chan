import { Hono } from 'hono';
import authR from './routes/auth';
import postsR from './routes/posts';
import { hc } from 'hono/client';

const app = new Hono();

app.route('/auth', authR);
app.route('/posts', postsR);

export const api = new Hono().route('/api', app);

type AppType = typeof app;

export const client = hc<AppType>('/api');
