import { db } from '$lib/db';
import { posts } from '$lib/db/schema';
import { Hono } from 'hono';

const app = new Hono();

app.get('/posts', async (c) => {
	const postlist = await db.select().from(posts);
	return c.json(postlist);
});

export default app;
