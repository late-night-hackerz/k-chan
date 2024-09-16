import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { z } from "zod";
import { JWT_SECRET } from "$env/static/private";
import { db, resend } from "$lib/db";
import { getCookie, setCookie } from "hono/cookie";
import { users } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import { createMiddleware } from "hono/factory";
const app = new Hono();


export const auth = createMiddleware<{ Variables: { email: string } }>(async (c, next) => {
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
  c.set('email', sub);
  await next();
})

app.post('/login', zValidator('json', z.object({
  email: z.string().email(),
})), async (c) => {
  const { email }: { email: string } = await c.req.json();
  const user = await db.select().from(users).where(eq(users.email, email));
  if (!user[0]) {
    return c.json({ error: 'user not found' }, 404);
  }
  const key = await sign({ sub: email, exp: Date.now() + 1000 * 60 * 30 }, JWT_SECRET);
  const link = `http://localhost:5173/api/auth/verify?auth=${encodeURIComponent(key)}`;
  const { data, error } = await resend.emails.send({
    from: 'auth@k-chan.tech',
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

app.get('/me', auth, async (c) => {

  return c.json({ email: c.get('email') });
})

app.post('/refer', zValidator('json', z.object({
  email: z.string().email(),
})), auth, async (c) => {
  const { email }: { email: string } = await c.req.json();
  // Check if the user has already been invited
  const user = await db.select().from(users).where(eq(users.email, email));
  if (user[0]) {
    return c.json({ error: 'user already exists' }, 400);
  }
  const currentUser = await db.select().from(users).where(eq(users.email, c.get('email')));
  // insert the user into the db (create a new user)
  const res = await db.insert(users).values({
    email: email,
    role: 'User',
    bio: '',
    interests: 'newcomer',
    invitedBy: currentUser[0].id,
    profile: ''
  });
  // send an email to the user
  const { data, error } = await resend.emails.send({
    from: 'onboarding@k-chan.tech',
    to: [email],
    subject: 'Welcome to K-Chan!',
    html: `
    <h1>Welcome to K-Chan!</h1>
    <p>You have been invited by ${currentUser[0].email} to join K-Chan.
    <a href="https://k-chan.tech">Click here to join</a>
    </p>
    `
  })
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  return c.json({ data });
})

export default app;