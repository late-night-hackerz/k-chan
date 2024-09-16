import type { Config } from "drizzle-kit";

export default {
  schema: './src/lib/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || 'libsql://test-karmakarmeghdip.turso.io',
    authToken: process.env.TURSO_AUTH_TOKEN || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjY0MzMwNzYsImlkIjoiMjFjM2E5NmUtN2NjNC00ZWRmLThhNmQtMTg1MjViYTJhZWI1In0.VqYWxVzRmAm2vRpraiYvO01Fm6VH6t3vM9BwuOkzVIDC_Ofoz4dI2f9DG2MBbfjn2WJJIKUHWWFFCfgy7eMTBQ'
  }
} satisfies Config;