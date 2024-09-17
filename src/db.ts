import { createClient } from "@libsql/client/web";
// import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, RESEND_TOKEN } from "$env/static/private";
import { drizzle } from "drizzle-orm/libsql";
import { Resend } from "resend";
import { z } from "zod";

const TURSO_DATABASE_URL = z.string().parse(process.env.TURSO_DATABASE_URL);
const TURSO_AUTH_TOKEN = z.string().parse(process.env.TURSO_AUTH_TOKEN);
const RESEND_TOKEN = z.string().parse(process.env.RESEND_TOKEN);

const turso = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN
})

export const db = drizzle(turso);

export const resend = new Resend(RESEND_TOKEN);