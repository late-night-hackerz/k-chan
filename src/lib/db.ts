import { createClient } from "@libsql/client/web";
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, RESEND_TOKEN } from "$env/static/private";
import { drizzle } from "drizzle-orm/libsql";
import { Resend } from "resend";

const turso = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN
})

export const db = drizzle(turso);

export const resend = new Resend(RESEND_TOKEN);