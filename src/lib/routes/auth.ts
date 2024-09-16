import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import { z } from 'zod';
import { JWT_SECRET } from '$env/static/private';
import { db, resend } from '$lib/db';
import { getCookie, setCookie } from 'hono/cookie';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { createMiddleware } from 'hono/factory';
import { hc } from 'hono/client';
import { check, login, refer } from '$lib/funcs/auth';
const app = new Hono();

export const auth = createMiddleware<{ Variables: { email: string } }>(async (c, next) => {
	const auth = getCookie(c, 'auth');
	if (!auth) {
		return c.json({ error: 'auth is required' }, 400);
	}
	const sub = await check(auth);
	if (!sub) {
		return c.json({ error: 'auth is invalid' }, 400);
	}
	c.set('email', sub);
	await next();
});

app.post(
	'/login',
	zValidator(
		'json',
		z.object({
			email: z.string().email()
		})
	),
	async (c) => {
		const { email }: { email: string } = await c.req.json();
		const { data, error } = await login(email);
		if (error) {
			return c.json({ error }, 500);
		}

		return c.json({ data });
	}
);

app.get(
	'/verify',
	zValidator(
		'query',
		z.object({
			auth: z.string()
		})
	),
	async (c) => {
		const auth = c.req.query('auth');
		if (!auth) {
			return c.json({ error: 'auth is required' }, 400);
		}
		const { sub } = await verify(auth, JWT_SECRET);
		setCookie(c, 'auth', auth, { maxAge: 1000 * 60 * 30 });
		return c.redirect('/');
	}
);

app.post('/logout', async (c) => {
	setCookie(c, 'auth', '', { maxAge: 0 });
	return c.json({ ok: true });
});

app.get('/me', auth, async (c) => {
	return c.json({ email: c.get('email') });
});

app.post(
	'/refer',
	zValidator(
		'json',
		z.object({
			email: z.string().email()
		})
	),
	auth,
	async (c) => {
		const { email }: { email: string } = await c.req.json();
		const { data, error } = await refer(email, c.get('email'));
		if (error) {
			return c.json({ error }, 500);
		}
		return c.json({ data });
	}
);

export default app;
