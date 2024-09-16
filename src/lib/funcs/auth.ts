import { JWT_SECRET } from '$env/static/private';
import { db, resend } from '$lib/db';
import { users } from '$lib/db/schema';
import { sign, verify } from 'hono/jwt';
import { eq } from 'drizzle-orm';

export const check = async (auth: string) => {
	const payload = await verify(auth, JWT_SECRET);
	const sub = payload.sub as string;
	if (!sub) {
		return null;
	}
	const user = await db.select().from(users).where(eq(users.email, sub));
	if (!user[0]) {
		return null;
	}
	return user[0].email;
};

export const login = async (email: string) => {
	const user = await db.select().from(users).where(eq(users.email, email));
	if (!user[0]) {
		return { error: 'User not found' };
	}
	const key = await sign({ sub: email, exp: Date.now() + 1000 * 60 * 30 }, JWT_SECRET);
	const link = `http://localhost:5173/api/auth/verify?auth=${encodeURIComponent(key)}`;
	const { data, error } = await resend.emails.send({
		from: 'auth@k-chan.tech',
		to: [email],
		subject: 'Login Link',
		html: `<a href="${link}">Login</a>`
	});
	if (error) {
		return { error: 'Failed to send email' };
	}
	return { data };
};

export const refer = async (email: string, currEmail: string) => {
	// Check if the user has already been invited
	const user = await db.select().from(users).where(eq(users.email, email));
	if (user[0]) {
		return { error: 'User already exists' };
	}
	const currentUser = await db.select().from(users).where(eq(users.email, currEmail));
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
	});
	if (error) {
		return { error: 'Failed to send email' };
	}
	return { data };
};
