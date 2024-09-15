import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { z } from "zod";
import { JWT_SECRET } from "$env/static/private";
import { db, resend } from "$lib/db";
import { getCookie, setCookie } from "hono/cookie";
import { users } from "$lib/db/schema";
import { eq } from "drizzle-orm";
const app = new Hono();

app.post('/login', zValidator('json', z.object({
  email: z.string().email(),
})), async (c) => {
  const { email }: {email: string} = await c.req.json();
  const user = await db.select().from(users).where(eq(users.email, email));
  if (!user[0]) {
    return c.json({ error: 'user not found' }, 404);
  }
  const key = await sign({ sub: email, exp: Date.now() + 1000 * 60 * 30 }, JWT_SECRET);
  const link = `http://localhost:5173/api/auth/verify?auth=${encodeURIComponent(key)}`;
  const {data, error} = await resend.emails.send({
    from: 'Auth <auth@localhost>',
    to: [email],
    subject: 'Login Link',
    html: `<a href="${link}">Login</a>`
  })
  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json({ data });
})

app.get('/verify', zValidator('query', z.object({
  auth: z.string(),
})), async (c) => {
  const auth = c.req.query('auth');
  if (!auth) {
    return c.json({ error: 'auth is required' }, 400);
  }
  const { sub } = await verify(auth, JWT_SECRET);
  setCookie(c, 'auth', auth, { maxAge: 1000 * 60 * 30 });
  return c.redirect('/');
})

app.post('/logout', async (c) => {
  setCookie(c, 'auth', '', { maxAge: 0 });
  return c.json({ ok: true });
})

app.get('/me', async (c) => {
  const auth = getCookie(c, 'auth');
  if (!auth) {
    return c.json({ error: 'auth is required' }, 400);
  }
  const payload = await verify(auth, JWT_SECRET);
  const sub = payload.sub as string;
  if (!sub) {
    return c.json({ error: 'sub is required' }, 400);
  }
  const user = await db.select().from(users).where(eq(users.email, sub));
  if (!user[0]) {
    return c.json({ error: 'user not found' }, 404);
  }
  return c.json({ user: user[0] });
})

export default app;